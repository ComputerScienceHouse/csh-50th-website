import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import type { ScheduleEvent } from "../pages/ScheduleEvent";

const EVENTS_API_URL = "https://csh50th-website-backend-csh-50th-draft-site.apps.okd4.csh.rit.edu/events";
const EVENT_TIME_ZONE_OFFSET = "-04:00";

type ApiEvent = {
  id: number;
  title: string;
  description?: string | null;
  date: string;
  start_time?: string | null;
  end_time?: string | null;
  location_short_name?: string | null;
  address?: string | null;
  dress_code?: string | null;
  type?: ScheduleEvent["type"] | null;
  tags?: string[] | null;
  ticket_url?: string | null;
  is_support_event?: boolean | null;
  related_to_id?: number | null;
  map_url?: string | null;
};

function normalizeTags(tags?: string[] | null): string[] {
  if (!tags?.length) {
    return [];
  }

  return tags
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
}

function buildDateTime(date: string, time?: string | null): string | undefined {
  if (!date || !time) {
    return undefined;
  }

  return `${date}T${time}${EVENT_TIME_ZONE_OFFSET}`;
}

function toDateLabel(dateTime: string): string {
  return format(parseISO(dateTime), "EEEE, MMMM d, yyyy");
}

function toTimeLabel(startDateTime?: string, endDateTime?: string): string {
  if (!startDateTime) {
    return "";
  }

  const start = format(parseISO(startDateTime), "h:mm a");
  if (!endDateTime) {
    return start;
  }

  const end = format(parseISO(endDateTime), "h:mm a");
  return `${start} - ${end}`;
}

export function normalizeEvent(event: ApiEvent): ScheduleEvent {
  const startDateTime = buildDateTime(event.date, event.start_time);
  const endDateTime = buildDateTime(event.date, event.end_time);
  const tags = normalizeTags(event.tags);
  const location = event.location_short_name?.trim() || "";
  const address = event.address?.trim() || "";
  const ticketUrl = event.ticket_url ?? undefined;

  return {
    id: event.id,
    title: event.title,
    description: event.description ?? "",
    date: startDateTime ? toDateLabel(startDateTime) : event.date,
    time: toTimeLabel(startDateTime, endDateTime),
    location,
    address,
    capacity: "All attendees",
    dressCode: event.dress_code ?? "",
    type: event.type ?? undefined,
    startDateTime,
    endDateTime,
    ticketRequired: Boolean(ticketUrl),
    ticketUrl,
    mapUrl: address && address !== "TBD" && address !== "N/A"
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
      : event.map_url ?? undefined,
    isSupportEvent: event.is_support_event ?? false,
    relatedToId: event.related_to_id ?? undefined,
    tags,
  };
}

async function fetchEvents(): Promise<ScheduleEvent[]> {
  const response = await fetch(EVENTS_API_URL);
  if (!response.ok) {
    throw new Error(`Failed to load events (${response.status})`);
  }

  const data: ApiEvent[] = await response.json();
  return data.map(normalizeEvent);
}

function sortEvents(events: ScheduleEvent[]): ScheduleEvent[] {
  return [...events].sort((a, b) => {
    const left = a.startDateTime ? parseISO(a.startDateTime).getTime() : Number.POSITIVE_INFINITY;
    const right = b.startDateTime ? parseISO(b.startDateTime).getTime() : Number.POSITIVE_INFINITY;

    return left - right;
  });
}

export function useEvents() {
  const query = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000,
  });

  const events = useMemo(() => {
    return sortEvents(query.data ?? []);
  }, [query.data]);

  return {
    ...query,
    events,
  };
}
