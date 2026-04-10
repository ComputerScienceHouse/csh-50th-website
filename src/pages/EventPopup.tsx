import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, Users, Ticket, ExternalLink } from "lucide-react";
import { ScheduleEvent } from "./ScheduleEvent";

/**
 * EventPopupProp that allows onClose() to be passed in
 */
interface EventPopupProps extends ScheduleEvent {
  onClose: () => void,
  typeColors: Record<string, string>
}

export default function EventPopup({ onClose, typeColors, ...event }: EventPopupProps) {
    const eventTypeClass = event.type ? (typeColors[event.type] ?? "bg-muted text-muted-foreground border-border") : "bg-muted text-muted-foreground border-border";

  return (
        <div
            id="eventPopup"
            className="fixed inset-0 z-50 bg-black/60 p-4 md:p-8"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                className={cn(
                    "mx-auto mt-[8vh] max-h-[84vh] w-full max-w-3xl overflow-y-auto rounded-2xl border-2 border-csh-magenta bg-black p-6 transition-all duration-300",
                    event.type === "main" && "border-4 border-primary/100 glow-csh"
                )}
                onClick={(popupEvent) => popupEvent.stopPropagation()}
            >
                <div className="flex flex-row items-start gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 py-2 font-semibold text-csh-magenta">
                            <Clock className="h-4 w-4" />
                            {event.time}
                        </div>
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                            <h3 className="text-xl font-display font-semibold text-white">
                                {event.title}
                            </h3>
                            <span className={cn("rounded-full border px-3 py-1 text-xs font-medium", eventTypeClass)}>
                                {event.type === "main" ? "Main Event" : event.type ?? "event"}
                            </span>
                        </div>
                        <p className="mb-3 text-left text-muted-foreground">
                            {event.description}
                        </p>
                        <div className="flex items-center gap-2 pb-1 font-semibold">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {event.date}
                        </div>
                        <div className="flex items-center gap-2 pb-1 text-sm font-semibold">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {event.location} | {event.address}
                        </div>
                        <div className="flex items-center gap-2 pb-1 text-sm">
                            <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
                            <span className="text-muted-foreground">Capacity:</span>
                            <span className="text-sm font-semibold">{event.capacity}</span>
                        </div>
                        <div className="flex items-center gap-2 pb-1 text-sm">
                            <Users className="mt-0.5 h-5 w-5 text-muted-foreground" />
                            <span className="text-muted-foreground">Attire:</span>
                            <span className="text-sm font-semibold">{event.dressCode}</span>
                        </div>
                        {event.ticketRequired && (
                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
                                    <Ticket className="mr-1 h-3 w-3" />
                                    Ticket required
                                </span>
                                {event.ticketUrl && (
                                    <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold text-csh-magenta hover:text-csh-red">
                                        Purchase ticket
                                        <ExternalLink className="h-3 w-3" />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
    </div>
  );
};