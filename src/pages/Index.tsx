import { useMemo } from "react";
import { format, isAfter, isSameDay } from "date-fns";
import { Calendar, Clock3, ExternalLink, MapPin, Ticket } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Link } from "react-router-dom";
import { events } from "./EventsData";
import { getEventEnd, getEventStart, getEventStatus, getMapUrl, typeColors } from "./eventUtils";
import { useLiveNow } from "@/lib/time";

const FALLBACK_COUNTDOWN = "2026-04-10T09:00:00-04:00";

const Index = () => {
  const now = useLiveNow(1000);

  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => getEventStart(a).getTime() - getEventStart(b).getTime());
  }, []);

  const primaryEvents = useMemo(
    () => sortedEvents.filter((event) => !event.isSupportEvent),
    [sortedEvents]
  );

  const nextEvent = useMemo(() => {
    return primaryEvents.find((event) => event.startDateTime && isAfter(getEventStart(event), now)) ?? null;
  }, [primaryEvents, now]);

  const activeSupportForNextEvent = useMemo(() => {
    if (!nextEvent) {
      return null;
    }

    return sortedEvents.find((event) => {
      if (!event.isSupportEvent || event.relatedToId !== nextEvent.id || !event.startDateTime || !event.endDateTime) {
        return false;
      }

      const start = getEventStart(event);
      const end = getEventEnd(event);
      return now >= start && now <= end;
    }) ?? null;
  }, [nextEvent, now, sortedEvents]);

  const todaysEvents = useMemo(() => {
    return primaryEvents.filter((event) => event.startDateTime && isSameDay(getEventStart(event), now));
  }, [primaryEvents, now]);

  const groupedByDay = useMemo(() => {
    const groups: Record<string, typeof sortedEvents> = {};

    sortedEvents.forEach((event) => {
      if (!event.startDateTime) {
        return;
      }

      const key = format(getEventStart(event), "yyyy-MM-dd");
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(event);
    });

    return groups;
  }, [sortedEvents]);

  const dayKeys = useMemo(() => Object.keys(groupedByDay).sort(), [groupedByDay]);

  return (
    <Layout>
      <section className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div>
              <p className="text-[11px] md:text-xs uppercase tracking-wider text-csh-magenta font-semibold">Countdown To Next Event</p>
              <p className="text-sm text-muted-foreground">{nextEvent ? nextEvent.title : "No upcoming events"}</p>
            </div>
            <CountdownTimer targetDate={nextEvent?.startDateTime ?? FALLBACK_COUNTDOWN} currentTime={now} compact />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/40">
        <div className="container mx-auto px-4 py-5 md:py-7">
          <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-5 items-start">
            <div className="space-y-4">
              <p className="uppercase tracking-[0.2em] text-xs text-csh-magenta font-semibold">Live Information Hub</p>
              <h1 className="text-3xl md:text-5xl font-display font-black leading-tight">
                CSH 50th Weekend
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
                Welcome to 50th! Here you can find live updates on what's happening, how to get there, and what needs tickets.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/schedule">
                  <Button variant="hero" size="lg">Live Timeline</Button>
                </Link>
                <Link to="/events">
                  <Button variant="hero-outline" size="lg">Event Directory</Button>
                </Link>
                <Link to="/ticket-prices">
                  <Button variant="hero-outline" size="lg">
                    <Ticket className="w-4 h-4" />
                    Tickets
                  </Button>
                </Link>
              </div>
            </div>

            <aside className="glass rounded-2xl border border-border p-5">
              <p className="text-xs uppercase tracking-wider text-csh-magenta font-semibold mb-2">Status Snapshot</p>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Now: <span className="text-foreground font-semibold">{format(now, "EEE, MMM d • h:mm:ss a")}</span></p>
                <p className="text-muted-foreground">Primary events today: <span className="text-foreground font-semibold">{todaysEvents.length}</span></p>
                {activeSupportForNextEvent && (
                  <p className="text-amber-300 font-semibold">Shuttle window is active for the upcoming dinner.</p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_1fr] gap-5">
            <article className="glass rounded-2xl border border-border p-5 md:p-6">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h2 className="text-2xl md:text-3xl font-display font-bold">Next Event</h2>
                {nextEvent?.ticketRequired && (
                  <span className="rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">
                    Ticket required
                  </span>
                )}
              </div>

              {nextEvent ? (
                <>
                  <h3 className="text-xl md:text-2xl font-display font-semibold mb-2">{nextEvent.title}</h3>
                  <p className="text-muted-foreground mb-4">{nextEvent.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-sm">
                    <div className="rounded-lg border border-border bg-muted/20 p-3">
                      <p className="text-muted-foreground mb-1">Date</p>
                      <p className="font-semibold inline-flex gap-2 items-center"><Calendar className="w-4 h-4 text-csh-magenta" />{nextEvent.date}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/20 p-3">
                      <p className="text-muted-foreground mb-1">Time</p>
                      <p className="font-semibold inline-flex gap-2 items-center"><Clock3 className="w-4 h-4 text-csh-magenta" />{nextEvent.time}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/20 p-3">
                      <p className="text-muted-foreground mb-1">Location</p>
                      <p className="font-semibold inline-flex gap-2 items-center"><MapPin className="w-4 h-4 text-csh-magenta" />{nextEvent.location}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a href={getMapUrl(nextEvent)} target="_blank" rel="noopener noreferrer">
                      <Button variant="hero" size="sm">
                        <MapPin className="w-4 h-4" />
                        Open Directions
                      </Button>
                    </a>
                    {nextEvent.ticketRequired && nextEvent.ticketUrl && (
                      <a href={nextEvent.ticketUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="hero-outline" size="sm">
                          <Ticket className="w-4 h-4" />
                          Buy Ticket
                        </Button>
                      </a>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">No future events found in the schedule data.</p>
              )}
            </article>

            <article className="glass rounded-2xl border border-border p-5 md:p-6">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Today</h2>
              {todaysEvents.length > 0 ? (
                <div className="space-y-3">
                  {todaysEvents.map((event) => {
                    const status = getEventStatus(event, now);
                    return (
                      <div key={event.id} className="rounded-lg border border-border bg-muted/20 p-3">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-semibold">{event.title}</p>
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold uppercase ${
                            status === "live"
                              ? "bg-emerald-500/15 text-emerald-200"
                              : status === "upcoming"
                                ? "bg-sky-500/15 text-sky-200"
                                : "bg-muted text-muted-foreground"
                          }`}>
                            {status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{event.time}</p>
                        <p className="text-xs text-muted-foreground">{event.location}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-muted-foreground">No events scheduled today.</p>
              )}
            </article>
          </div>

          {activeSupportForNextEvent && (
            <article className="mt-5 rounded-2xl border border-amber-400/40 bg-amber-500/10 p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-amber-300 font-semibold mb-2">Dinner Logistics</p>
              <h3 className="text-xl md:text-2xl font-display font-bold mb-2">{activeSupportForNextEvent.title}</h3>
              <p className="text-muted-foreground mb-3">{activeSupportForNextEvent.description}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-2 text-muted-foreground"><Clock3 className="w-4 h-4 text-amber-300" />{activeSupportForNextEvent.time}</span>
                <span className="inline-flex items-center gap-2 text-muted-foreground"><MapPin className="w-4 h-4 text-amber-300" />{activeSupportForNextEvent.location}</span>
              </div>
            </article>
          )}
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Weekend Itinerary</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {dayKeys.map((dayKey) => (
              <div key={dayKey} className="glass rounded-2xl border border-border p-4">
                <h3 className="text-xl font-display font-semibold mb-1">{format(new Date(`${dayKey}T00:00:00-04:00`), "EEEE")}</h3>
                <p className="text-sm text-muted-foreground mb-3">{format(new Date(`${dayKey}T00:00:00-04:00`), "MMMM d, yyyy")}</p>
                <div className="space-y-2">
                  {groupedByDay[dayKey].map((event) => (
                    <div key={event.id} className="rounded-lg border border-border bg-muted/20 p-3">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-semibold text-sm">{event.title}</p>
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${typeColors[event.type]}`}>
                          {event.type}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <a href={getMapUrl(event)} target="_blank" rel="noopener noreferrer" className="text-csh-magenta hover:text-csh-red text-xs font-semibold inline-flex items-center gap-1">
                          Directions <ExternalLink className="w-3 h-3" />
                        </a>
                        {event.ticketRequired && event.ticketUrl && (
                          <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="text-csh-magenta hover:text-csh-red text-xs font-semibold inline-flex items-center gap-1">
                            Purchase <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
