import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock3, ExternalLink, MapPin, Ticket } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { events } from "./EventsData";
import { getEventStart, getEventStatus, getMapUrl, typeColors } from "./eventUtils";
import { useLiveNow } from "@/lib/time";

const statusStyles = {
  live: "border-emerald-400/40 bg-emerald-500/15 text-emerald-200",
  upcoming: "border-sky-400/40 bg-sky-500/15 text-sky-200",
  past: "border-muted bg-muted/30 text-muted-foreground",
};

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const now = useLiveNow(1000);

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => getEventStart(a).getTime() - getEventStart(b).getTime());
  }, []);

  const grouped = useMemo(() => {
    const byDay: Record<string, typeof sortedEvents> = {};

    sortedEvents.forEach((event) => {
      if (!event.startDateTime) {
        return;
      }

      const key = format(getEventStart(event), "yyyy-MM-dd");
      if (!byDay[key]) {
        byDay[key] = [];
      }
      byDay[key].push(event);
    });

    return byDay;
  }, [sortedEvents]);

  const days = useMemo(() => Object.keys(grouped).sort(), [grouped]);
  const activeDay = selectedDay ?? days[0] ?? null;
  const activeEvents = activeDay ? grouped[activeDay] : [];

  return (
    <Layout>
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(234,179,8,0.15),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(251,191,36,0.18),transparent_35%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <p className="uppercase tracking-[0.2em] text-xs text-csh-magenta font-semibold">CSH 50th</p>
          <h1 className="text-4xl md:text-6xl font-display font-black mt-2 mb-4">Weekend Timeline</h1>
          <p className="text-muted-foreground max-w-3xl text-lg">
            One dashboard for the whole reunion weekend. See live status, upcoming events, and direct actions for directions and tickets.
          </p>
        </div>
      </section>

      <section className="sticky top-16 md:top-20 z-40 bg-background/90 backdrop-blur border-y border-border">
        <div className="container mx-auto px-4 py-3 flex flex-wrap gap-2">
          {days.map((dayKey) => (
            <button
              key={dayKey}
              type="button"
              onClick={() => setSelectedDay(dayKey)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeDay === dayKey
                  ? "bg-gradient-csh text-primary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {format(new Date(`${dayKey}T00:00:00-04:00`), "EEE, MMM d")}
            </button>
          ))}
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">
            <aside className="glass rounded-2xl p-5 h-fit xl:sticky xl:top-40">
              <h2 className="font-display text-2xl font-bold mb-3">Status Board</h2>
              <div className="space-y-3 text-sm">
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-3">
                  <p className="text-emerald-200 font-semibold">Live now</p>
                  <p className="text-muted-foreground mt-1">{sortedEvents.filter((e) => getEventStatus(e, now) === "live").length} event(s)</p>
                </div>
                <div className="rounded-xl border border-sky-400/30 bg-sky-500/10 p-3">
                  <p className="text-sky-200 font-semibold">Upcoming</p>
                  <p className="text-muted-foreground mt-1">{sortedEvents.filter((e) => getEventStatus(e, now) === "upcoming").length} event(s)</p>
                </div>
                <div className="rounded-xl border border-border bg-muted/20 p-3">
                  <p className="text-muted-foreground font-semibold">Completed</p>
                  <p className="text-muted-foreground mt-1">{sortedEvents.filter((e) => getEventStatus(e, now) === "past").length} event(s)</p>
                </div>
              </div>
            </aside>

            <div className="space-y-4">
              {activeEvents.map((event) => {
                const status = getEventStatus(event, now);

                return (
                  <article key={event.id} className="glass rounded-2xl border border-border p-5 md:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${statusStyles[status]}`}>
                          {status}
                        </span>
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${typeColors[event.type]}`}>
                          {event.type}
                        </span>
                        {event.ticketRequired && (
                          <span className="rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">
                            Ticket required
                          </span>
                        )}
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {event.startDateTime ? format(getEventStart(event), "EEEE, MMM d") : event.date}
                      </p>
                    </div>

                    <h3 className="text-2xl font-display font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground mb-4">{event.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm mb-4">
                      <div className="rounded-lg bg-muted/25 p-3 border border-border">
                        <p className="text-muted-foreground mb-1">Time</p>
                        <p className="font-semibold inline-flex items-center gap-2"><Clock3 className="w-4 h-4 text-csh-magenta" />{event.time}</p>
                      </div>
                      <div className="rounded-lg bg-muted/25 p-3 border border-border">
                        <p className="text-muted-foreground mb-1">Date</p>
                        <p className="font-semibold inline-flex items-center gap-2"><Calendar className="w-4 h-4 text-csh-magenta" />{event.date}</p>
                      </div>
                      <div className="rounded-lg bg-muted/25 p-3 border border-border">
                        <p className="text-muted-foreground mb-1">Location</p>
                        <p className="font-semibold inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-csh-magenta" />{event.location}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a href={getMapUrl(event)} target="_blank" rel="noopener noreferrer">
                        <Button variant="hero-outline" size="sm">
                          <MapPin className="w-4 h-4" />Directions
                        </Button>
                      </a>
                      {event.ticketRequired && event.ticketUrl && (
                        <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="hero" size="sm">
                            <Ticket className="w-4 h-4" />Purchase
                          </Button>
                        </a>
                      )}
                      {!event.ticketRequired && (
                        <a href="/registration" target="_blank" rel="noopener noreferrer" className="text-csh-magenta hover:text-csh-red text-sm font-semibold inline-flex items-center gap-1 self-center">
                          RSVP or registration <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Schedule;
