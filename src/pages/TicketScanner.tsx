import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BarcodeFormat, BrowserCodeReader, BrowserMultiFormatReader, type IScannerControls } from "@zxing/browser";
import { DecodeHintType } from "@zxing/library";
import { Camera, CheckCircle2, QrCode, Ticket, XCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEvents } from "@/lib/events";

type BufferStatus = "idle" | "ready" | "error";
type ScanFlash = "none" | "success" | "error";
type BufferSource = "camera" | "barcode-scanner" | "manual";
type VipCheckIn = {
  id: string;
  event_id: number;
  person_name: string;
  checked_in: boolean;
};

type LegacyNavigator = Navigator & {
  getUserMedia?: (
    constraints: MediaStreamConstraints,
    successCallback: (stream: MediaStream) => void,
    errorCallback: (error: Error) => void,
  ) => void;
  webkitGetUserMedia?: (
    constraints: MediaStreamConstraints,
    successCallback: (stream: MediaStream) => void,
    errorCallback: (error: Error) => void,
  ) => void;
};

const TicketScanner = () => {
  const { events, isLoading, isError } = useEvents();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scannerControlsRef = useRef<IScannerControls | null>(null);
  const scannerReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const lastCameraScanRef = useRef<{ value: string; at: number }>({ value: "", at: 0 });
  const flashTimeoutRef = useRef<number | null>(null);
  const submitAbortRef = useRef<AbortController | null>(null);

  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [ticketIdInput, setTicketIdInput] = useState("");
  const [lastBufferedTicketId, setLastBufferedTicketId] = useState<string>("");
  const [lastSubmittedTicketId, setLastSubmittedTicketId] = useState<string>("");
  const [bufferStatus, setBufferStatus] = useState<BufferStatus>("idle");
  const [bufferSource, setBufferSource] = useState<BufferSource | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isStartingCamera, setIsStartingCamera] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [cameraStatus, setCameraStatus] = useState("Camera idle.");
  const [scanFlash, setScanFlash] = useState<ScanFlash>("none");
  const [vipList, setVipList] = useState<VipCheckIn[]>([]);
  const [vipSearchTerm, setVipSearchTerm] = useState("");
  const [vipListStatus, setVipListStatus] = useState<"idle" | "loading" | "error">("idle");
  const [vipListError, setVipListError] = useState("");
  const [updatingCheckInId, setUpdatingCheckInId] = useState("");

  const backendBaseUrl = "https://csh50th-website-backend-csh-50th-draft-site.apps.okd4.csh.rit.edu";
  const submitUrl = `${backendBaseUrl}/scan-ticket`;

  const selectedEventName = useMemo(() => {
    if (!selectedEventId) {
      return "";
    }

    const match = events.find((event) => String(event.id) === selectedEventId);
    return match?.title ?? "";
  }, [events, selectedEventId]);

  const canScan = selectedEventId.length > 0;

  const filteredVipList = useMemo(() => {
    const normalizedSearchTerm = vipSearchTerm.trim().toLowerCase();

    if (!normalizedSearchTerm) {
      return vipList;
    }

    return vipList.filter((person) => person.person_name.toLowerCase().includes(normalizedSearchTerm));
  }, [vipList, vipSearchTerm]);

  const loadVipList = useCallback(async (eventId: string, signal?: AbortSignal) => {
    if (!eventId) {
      setVipList([]);
      setVipSearchTerm("");
      setVipListStatus("idle");
      setVipListError("");
      return;
    }

    setVipListStatus("loading");
    setVipListError("");

    try {
      const response = await fetch(`${backendBaseUrl}/event-check-ins/${eventId}`, { signal });

      if (!response.ok) {
        throw new Error(`VIP list request failed (${response.status})`);
      }

      const data = (await response.json()) as VipCheckIn[];
      setVipList(data);
      setVipListStatus("idle");
    } catch (error) {
      if (signal?.aborted) {
        return;
      }

      setVipList([]);
      setVipSearchTerm("");
      setVipListStatus("error");
      setVipListError(error instanceof Error ? error.message : "Unable to load VIP list.");
    }
  }, [backendBaseUrl]);

  const getUserMediaCompat = useCallback(async (constraints: MediaStreamConstraints): Promise<MediaStream> => {
    if (navigator.mediaDevices?.getUserMedia) {
      return navigator.mediaDevices.getUserMedia(constraints);
    }

    const legacyNavigator = navigator as LegacyNavigator;
    const legacyGetUserMedia = legacyNavigator.getUserMedia || legacyNavigator.webkitGetUserMedia;

    if (!legacyGetUserMedia) {
      throw new Error("Camera APIs unavailable in this context");
    }

    return await new Promise<MediaStream>((resolve, reject) => {
      legacyGetUserMedia.call(legacyNavigator, constraints, resolve, reject);
    });
  }, []);

  const triggerScanFlash = useCallback((flashType: Exclude<ScanFlash, "none">) => {
    setScanFlash(flashType);

    if (window.navigator.vibrate) {
      window.navigator.vibrate(flashType === "success" ? [35, 20, 35] : [60]);
    }

    if (flashTimeoutRef.current !== null) {
      window.clearTimeout(flashTimeoutRef.current);
    }

    flashTimeoutRef.current = window.setTimeout(() => {
      setScanFlash("none");
      flashTimeoutRef.current = null;
    }, 900);
  }, []);

  const bufferTicketCode = useCallback((rawTicketId: string, source: BufferSource) => {
    const trimmedTicketId = rawTicketId.trim();

    if (!canScan || trimmedTicketId.length === 0) {
      setBufferStatus("error");
      setSubmissionStatus("idle");
      setSubmissionMessage("");
      triggerScanFlash("error");
      return;
    }

    setTicketIdInput(trimmedTicketId);
    setLastBufferedTicketId(trimmedTicketId);
    setBufferSource(source);
    setBufferStatus("ready");
    setSubmissionStatus("idle");
    setSubmissionMessage("");
  }, [canScan, triggerScanFlash]);

  const handleCameraScan = useCallback((rawTicketId: string) => {
    bufferTicketCode(rawTicketId, "camera");
    triggerScanFlash("success");
  }, [bufferTicketCode, triggerScanFlash]);

  const handleBarcodeScannerComplete = useCallback((rawTicketId: string) => {
    bufferTicketCode(rawTicketId, "barcode-scanner");
    triggerScanFlash("success");
  }, [bufferTicketCode, triggerScanFlash]);

  const handleSubmitTicket = useCallback(async () => {
    const trimmedTicketId = ticketIdInput.trim();

    if (!canScan || trimmedTicketId.length === 0) {
      setSubmissionStatus("error");
      setSubmissionMessage("Choose an event and enter a ticket code first.");
      triggerScanFlash("error");
      return;
    }

    submitAbortRef.current?.abort();
    submitAbortRef.current = new AbortController();

    setSubmissionStatus("submitting");
    setSubmissionMessage("");

    try {
      const response = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: Number(selectedEventId),
          ticket_id: trimmedTicketId,
        }),
        signal: submitAbortRef.current.signal,
      });

      if (response.status === 409) {
        setSubmissionStatus("error");
        setSubmissionMessage(`Ticket ${trimmedTicketId} was already used for ${selectedEventName}.`);
        triggerScanFlash("error");
        return;
      }

      if (!response.ok) {
        throw new Error(`Submission failed (${response.status})`);
      }

      setLastSubmittedTicketId(trimmedTicketId);
      setSubmissionStatus("success");
      setSubmissionMessage(`Submitted ${trimmedTicketId} for ${selectedEventName}.`);
      setBufferStatus("idle");
      setTicketIdInput("");
      setBufferSource(null);
      triggerScanFlash("success");
    } catch {
      setSubmissionStatus("error");
      setSubmissionMessage(`Could not submit the buffered code to ${submitUrl}. Check the backend endpoint and try again.`);
      triggerScanFlash("error");
    }
  }, [canScan, selectedEventName, submitUrl, ticketIdInput, triggerScanFlash]);

  const handleToggleVipCheckIn = useCallback(async (checkIn: VipCheckIn) => {
    setUpdatingCheckInId(checkIn.id);
    setVipListError("");

    try {
      const response = await fetch(`${backendBaseUrl}/event-check-ins/${checkIn.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checked_in: !checkIn.checked_in,
        }),
      });

      if (!response.ok) {
        throw new Error(`Check-in update failed (${response.status})`);
      }

      const updatedCheckIn = (await response.json()) as VipCheckIn;
      setVipList((current) => current.map((entry) => (entry.id === updatedCheckIn.id ? updatedCheckIn : entry)));
    } catch (error) {
      setVipListError(error instanceof Error ? error.message : "Unable to update check-in status.");
    } finally {
      setUpdatingCheckInId("");
    }
  }, [backendBaseUrl]);

  const stopCameraScanner = useCallback(() => {
    scannerControlsRef.current?.stop();
    scannerControlsRef.current = null;
    scannerReaderRef.current = null;
    BrowserCodeReader.releaseAllStreams();
    setIsCameraActive(false);
  }, []);

  const refreshCameras = useCallback(async () => {
    try {
      const devices = await BrowserCodeReader.listVideoInputDevices();
      const videoDevices = devices.filter((device) => device.kind === "videoinput");
      setAvailableCameras(videoDevices);

      if (!selectedCameraId && videoDevices.length > 0) {
        setSelectedCameraId(videoDevices[0].deviceId);
      }
    } catch {
      setAvailableCameras([]);
    }
  }, [selectedCameraId]);

  const startCameraScanner = useCallback(async () => {
    if (!videoRef.current) {
      setCameraError("Camera preview element is not ready yet.");
      return;
    }

    if (!window.isSecureContext) {
      setCameraError("Camera access requires HTTPS (or localhost). This page cannot access cameras over insecure HTTP.");
      setCameraStatus("Blocked: insecure context.");
      return;
    }

    const legacyNavigator = navigator as LegacyNavigator;
    const hasCameraApi = Boolean(navigator.mediaDevices?.getUserMedia || legacyNavigator.getUserMedia || legacyNavigator.webkitGetUserMedia);

    if (!hasCameraApi) {
      setCameraError("Camera API is unavailable in this Safari context. If embedded, allow camera in iframe permissions and Safari Website Settings.");
      setCameraStatus("Camera API unavailable in current browser context.");
      return;
    }

    setIsStartingCamera(true);
    setCameraError("");
    setCameraStatus("Requesting camera permission...");
    stopCameraScanner();

    try {
      // iOS Safari may not prompt reliably unless getUserMedia is called directly in this user gesture.
      const requestWithTimeout = async (constraints: MediaStreamConstraints, timeoutMs = 10000) => {
        return await Promise.race([
          getUserMediaCompat(constraints),
          new Promise<never>((_, reject) => {
            window.setTimeout(() => reject(new Error("Camera permission request timed out.")), timeoutMs);
          }),
        ]);
      };

      let permissionStream: MediaStream | null = null;
      const candidateConstraints: MediaStreamConstraints[] = [
        selectedCameraId
          ? { video: { deviceId: { exact: selectedCameraId } }, audio: false }
          : { video: { facingMode: { ideal: "environment" } }, audio: false },
        { video: true, audio: false },
      ];

      for (const constraints of candidateConstraints) {
        try {
          permissionStream = await requestWithTimeout(constraints);
          break;
        } catch {
          // Try the next fallback constraint.
        }
      }

      if (!permissionStream) {
        throw new Error("No camera stream could be opened.");
      }

      setCameraStatus("Permission granted. Starting scanner...");
      permissionStream.getTracks().forEach((track) => track.stop());

      await refreshCameras();

      const readerHints = new Map<DecodeHintType, unknown>([
        [DecodeHintType.TRY_HARDER, true],
        [DecodeHintType.POSSIBLE_FORMATS, [
          BarcodeFormat.QR_CODE,
          BarcodeFormat.AZTEC,
          BarcodeFormat.DATA_MATRIX,
          BarcodeFormat.PDF_417,
          BarcodeFormat.CODABAR,
          BarcodeFormat.CODE_128,
          BarcodeFormat.CODE_39,
          BarcodeFormat.CODE_93,
          BarcodeFormat.EAN_13,
          BarcodeFormat.EAN_8,
          BarcodeFormat.UPC_A,
          BarcodeFormat.UPC_E,
          BarcodeFormat.UPC_EAN_EXTENSION,
          BarcodeFormat.ITF,
          BarcodeFormat.RSS_14,
          BarcodeFormat.RSS_EXPANDED,
        ]],
      ]);
      const reader = new BrowserMultiFormatReader(readerHints);
      scannerReaderRef.current = reader;

      videoRef.current.setAttribute("playsinline", "true");
      videoRef.current.setAttribute("autoplay", "true");

      const controls = await reader.decodeFromVideoDevice(
        selectedCameraId || undefined,
        videoRef.current,
        (result, error) => {
          if (result) {
            const value = result.getText();
            const now = Date.now();
            const last = lastCameraScanRef.current;

            if (last.value === value && now - last.at < 1200) {
              return;
            }

            lastCameraScanRef.current = { value, at: now };
            handleCameraScan(value);
            return;
          }

          if (error) {
            const ignorable = new Set(["NotFoundException", "ChecksumException", "FormatException"]);
            if (!ignorable.has(error.name)) {
              return;
            }
          }
        }
      );

      scannerControlsRef.current = controls;
      setIsCameraActive(true);
      setCameraStatus("Camera active. Point at a QR or barcode.");
      await refreshCameras();
    } catch (error) {
      const errorName = error instanceof Error ? error.name : "";
      const errorMessage = error instanceof Error ? error.message : "Unknown camera error";

      if (errorName === "NotAllowedError" || errorName === "PermissionDeniedError") {
        setCameraError("Camera permission was denied. In iOS Safari: aA > Website Settings > Camera > Allow.");
      } else if (errorName === "NotFoundError" || errorName === "DevicesNotFoundError") {
        setCameraError("No local camera was found on this device.");
      } else {
        setCameraError("Unable to access camera. Check browser permissions and use HTTPS. If this page is embedded, allow camera in iframe Permissions-Policy.");
      }
      setCameraStatus(`Camera start failed: ${errorName || "Error"} - ${errorMessage}`);
      setIsCameraActive(false);
    } finally {
      setIsStartingCamera(false);
    }
  }, [getUserMediaCompat, handleCameraScan, refreshCameras, selectedCameraId, stopCameraScanner]);

  useEffect(() => {
    refreshCameras();
  }, [refreshCameras]);

  useEffect(() => {
    const controller = new AbortController();

    if (selectedEventId) {
      void loadVipList(selectedEventId, controller.signal);
    } else {
      setVipList([]);
      setVipSearchTerm("");
      setVipListStatus("idle");
      setVipListError("");
    }

    return () => {
      controller.abort();
    };
  }, [loadVipList, selectedEventId]);

  useEffect(() => {
    return () => {
      stopCameraScanner();
      submitAbortRef.current?.abort();

      if (flashTimeoutRef.current !== null) {
        window.clearTimeout(flashTimeoutRef.current);
      }
    };
  }, [stopCameraScanner]);

  return (
    <Layout>
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(217,119,6,0.22),transparent_45%),radial-gradient(circle_at_88%_0%,rgba(190,24,93,0.14),transparent_38%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <p className="uppercase tracking-[0.2em] text-xs text-csh-magenta font-semibold">Admin Tool</p>
          <h1 className="text-4xl md:text-6xl font-display font-black mt-2 mb-3">Ticket Scanner</h1>
          <p className="text-muted-foreground max-w-3xl text-lg">
            Select an event, then scan with a camera or barcode scanner. The most recent code stays buffered until you submit it.
          </p>
          <p className="text-muted-foreground/90 max-w-3xl text-sm mt-2">
            Camera access is local to each device and browser session. Only this device's connected cameras can be used.
          </p>
          <p className="text-muted-foreground/80 max-w-3xl text-xs mt-2">
            Submissions go to <span className="font-semibold">{submitUrl}</span> and send <span className="font-semibold">event_id</span> and <span className="font-semibold">ticket_id</span>.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="glass rounded-2xl border border-border p-5 md:p-7 max-w-2xl">
            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 inline-block">Event</label>
                <Select value={selectedEventId} onValueChange={setSelectedEventId}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={isLoading ? "Loading events..." : isError ? "Unable to load events" : "Choose an event"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem key={event.id} value={String(event.id)}>
                        {event.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="ticket-id" className="text-sm font-semibold text-foreground mb-2 inline-block">Buffered Ticket ID</label>
                <div className="relative">
                  <Ticket className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="ticket-id"
                    value={ticketIdInput}
                    onChange={(event) => {
                      setTicketIdInput(event.target.value);
                      setBufferStatus("idle");
                      setSubmissionStatus("idle");
                      setSubmissionMessage("");
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleBarcodeScannerComplete(event.currentTarget.value);
                      }
                    }}
                    className="pl-9"
                    placeholder={canScan ? "Scan or type ticket ID to buffer it" : "Select an event first"}
                    disabled={!canScan}
                    autoComplete="off"
                    autoFocus
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {bufferStatus === "ready"
                    ? `Buffered from ${bufferSource ?? "input"}.`
                    : bufferStatus === "error"
                      ? "Enter a valid ticket code first."
                      : "A barcode scanner can type directly into this field while the camera scans QR codes."}
                </p>
              </div>

                <div
                  className={`space-y-3 rounded-xl border p-4 transition-colors ${
                    bufferStatus === "ready"
                      ? "border-emerald-400/70 bg-emerald-500/10 shadow-[0_0_0_1px_rgba(16,185,129,0.22)]"
                      : "border-border bg-muted/20"
                  }`}
                >
                <div className="flex flex-col gap-3 md:flex-row md:items-end">
                  <div className="w-full md:flex-1">
                    <label className="text-sm font-semibold text-foreground mb-2 inline-block">Camera</label>
                    <Select
                      value={selectedCameraId || "auto"}
                      onValueChange={(cameraId) => {
                        setSelectedCameraId(cameraId === "auto" ? "" : cameraId);
                        setCameraError("");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a camera" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto (recommended)</SelectItem>
                        {availableCameras.length > 0 ? (
                          availableCameras.map((camera, index) => (
                            <SelectItem key={camera.deviceId} value={camera.deviceId}>
                              {camera.label || `Camera ${index + 1}`}
                            </SelectItem>
                          ))
                        ) : null}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    {isCameraActive ? (
                      <Button type="button" variant="hero-outline" onClick={stopCameraScanner}>
                        Stop Camera
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="hero"
                        onClick={startCameraScanner}
                        disabled={isStartingCamera}
                      >
                        <Camera className="w-4 h-4" />
                        {isStartingCamera ? "Starting..." : "Start Camera Scan"}
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className={`text-sm ${lastBufferedTicketId ? "text-emerald-200" : "text-muted-foreground"}`}>
                    {lastBufferedTicketId ? `Ready to submit: ${lastBufferedTicketId}` : "No ticket code buffered yet."}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="hero-outline"
                      onClick={() => {
                        setTicketIdInput("");
                        setLastBufferedTicketId("");
                        setBufferStatus("idle");
                        setBufferSource(null);
                        setSubmissionStatus("idle");
                        setSubmissionMessage("");
                      }}
                    >
                      Clear Buffer
                    </Button>
                    <Button
                      type="button"
                      variant="hero"
                      onClick={handleSubmitTicket}
                      disabled={submissionStatus === "submitting" || !canScan || ticketIdInput.trim().length === 0}
                    >
                      {submissionStatus === "submitting" ? "Submitting..." : bufferStatus === "ready" ? "Submit Ready Ticket" : "Submit"}
                    </Button>
                  </div>
                </div>

                <div
                  className={`relative overflow-hidden rounded-lg border aspect-video transition-all duration-200 ${
                    scanFlash === "success"
                      ? "border-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.35)]"
                      : scanFlash === "error"
                        ? "border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.35)]"
                        : "border-border"
                  }`}
                >
                  <video
                    ref={videoRef}
                    className="w-full h-full bg-black/40 object-cover"
                    muted
                    playsInline
                  />

                  <div
                    className={`pointer-events-none absolute inset-0 transition-colors duration-200 ${
                      scanFlash === "success"
                        ? "bg-emerald-500/25"
                        : scanFlash === "error"
                          ? "bg-red-500/25"
                          : "bg-transparent"
                    }`}
                  />

                  <div
                    className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-all duration-200 ${
                      scanFlash === "none" ? "opacity-0 scale-90" : "opacity-100 scale-100"
                    }`}
                  >
                    {scanFlash === "success" && (
                      <span className="rounded-full bg-emerald-500/90 p-3 text-white shadow-lg">
                        <CheckCircle2 className="w-8 h-8" />
                      </span>
                    )}
                    {scanFlash === "error" && (
                      <span className="rounded-full bg-red-500/90 p-3 text-white shadow-lg">
                        <XCircle className="w-8 h-8" />
                      </span>
                    )}
                  </div>
                </div>

                {availableCameras.length === 0 && !isCameraActive && (
                  <p className="text-sm text-muted-foreground">
                    Camera list may appear empty on iPhone until permission is granted. Tap Start Camera Scan to request access.
                  </p>
                )}

                {cameraError && (
                  <p className="text-sm text-red-300">{cameraError}</p>
                )}

                <p className="text-xs text-muted-foreground">{cameraStatus}</p>

                {!cameraError && (
                  <p className="text-xs text-muted-foreground">
                    Privacy note: video stays on-device for decoding; no camera stream is sent to the server.
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-4 min-h-16">
                {submissionStatus === "idle" && bufferStatus === "idle" && (
                  <p className="text-sm text-muted-foreground inline-flex items-center gap-2">
                    <QrCode className="w-4 h-4" />
                    Waiting for a camera scan or barcode scan.
                  </p>
                )}
                {bufferStatus === "error" && (
                  <p className="text-sm text-red-300 inline-flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Select an event and enter a ticket ID before buffering.
                  </p>
                )}
                {bufferStatus === "ready" && (
                  <p className="text-sm text-emerald-300 inline-flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    Ticket buffered and ready to submit: <span className="font-semibold">{ticketIdInput}</span> from <span className="font-semibold">{bufferSource ?? "input"}</span>.
                  </p>
                )}
                {submissionStatus === "success" && (
                  <p className="text-sm text-emerald-300 inline-flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Submitted <span className="font-semibold">{lastSubmittedTicketId}</span> for <span className="font-semibold">{selectedEventName}</span>.
                  </p>
                )}
                {submissionStatus === "error" && (
                  <p className="mt-2 text-sm text-red-300 inline-flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    {submissionMessage}
                  </p>
                )}
                {submissionStatus === "submitting" && (
                  <p className="mt-2 text-sm text-muted-foreground inline-flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Sending buffered ticket to the backend...
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">VIP List</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedEventId ? `Check in people for ${selectedEventName || "this event"}.` : "Choose an event to load its VIP list."}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {filteredVipList.length} shown, {vipList.filter((person) => person.checked_in).length} checked in
                  </p>
                </div>

                <div>
                  <label htmlFor="vip-search" className="text-sm font-semibold text-foreground mb-2 inline-block">
                    Search by name
                  </label>
                  <Input
                    id="vip-search"
                    value={vipSearchTerm}
                    onChange={(event) => setVipSearchTerm(event.target.value)}
                    placeholder="Type a name to filter the list"
                    autoComplete="off"
                    disabled={!selectedEventId}
                  />
                </div>

                {vipListStatus === "loading" && (
                  <p className="text-sm text-muted-foreground">Loading VIP list...</p>
                )}

                {vipListStatus === "error" && (
                  <p className="text-sm text-red-300">{vipListError || "Unable to load VIP list."}</p>
                )}

                {!selectedEventId && (
                  <p className="text-sm text-muted-foreground">Select an event to see the people expected for check-in.</p>
                )}

                {selectedEventId && vipListStatus !== "loading" && vipList.length === 0 && (
                  <p className="text-sm text-muted-foreground">No VIP entries were returned for this event.</p>
                )}

                {selectedEventId && vipListStatus !== "loading" && vipList.length > 0 && filteredVipList.length === 0 && (
                  <p className="text-sm text-muted-foreground">No VIP names matched your search.</p>
                )}

                {filteredVipList.length > 0 && (
                  <div className="grid gap-2">
                    {filteredVipList.map((person) => (
                      <div
                        key={person.id}
                        className={`flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between ${
                          person.checked_in ? "border-emerald-400/60 bg-emerald-500/10" : "border-border bg-background/40"
                        }`}
                      >
                        <div>
                          <p className="font-semibold text-foreground">{person.person_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {person.checked_in ? "Checked in" : "Not checked in yet"}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant={person.checked_in ? "hero-outline" : "hero"}
                          onClick={() => handleToggleVipCheckIn(person)}
                          disabled={updatingCheckInId === person.id}
                        >
                          {updatingCheckInId === person.id
                            ? "Updating..."
                            : person.checked_in
                              ? "Mark Not Checked In"
                              : "Mark Checked In"}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TicketScanner;