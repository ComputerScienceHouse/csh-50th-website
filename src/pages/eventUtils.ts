import { parseISO } from "date-fns";
import { ScheduleEvent } from "./ScheduleEvent";

export const typeColors: Record<string, string> = {
  social: "bg-sky-500/70 text-sky-100 border-sky-400/40",
  main: "bg-gradient-csh text-primary-foreground border-primary/30",
  food: "bg-amber-500/70 text-amber-100 border-amber-400/40",
  activity: "bg-emerald-500/70 text-emerald-100 border-emerald-400/40",
  seminar: "bg-fuchsia-500/70 text-fuchsia-100 border-fuchsia-400/40",
  external: "bg-orange-500/70 text-orange-100 border-orange-400/40",
  tour: "bg-cyan-500/70 text-cyan-100 border-cyan-400/40",
};

export function getMapUrl(event: ScheduleEvent): string {
  if (event.mapUrl) {
    return event.mapUrl;
  }

  const query = event.address && event.address !== "TBD" && event.address !== "N/A"
    ? event.address
    : event.location;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function getEventStart(event: ScheduleEvent): Date {
  if (event.startDateTime) {
    return parseISO(event.startDateTime);
  }

  return new Date("2999-01-01T00:00:00Z");
}

export function getEventEnd(event: ScheduleEvent): Date {
  if (event.endDateTime) {
    return parseISO(event.endDateTime);
  }

  return new Date("2999-01-01T00:00:00Z");
}

export function getEventStatus(event: ScheduleEvent, now: Date): "live" | "upcoming" | "past" {
  const start = getEventStart(event);
  const end = getEventEnd(event);

  if (now >= start && now <= end) {
    return "live";
  }

  if (start > now) {
    return "upcoming";
  }

  return "past";
}
