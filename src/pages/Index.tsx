import { useMemo } from "react";
import { isAfter } from "date-fns";
import { Calendar, Clock3, MapPin } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Link } from "react-router-dom";
import { getEventStart, getEventStatus, getMapUrl, shouldShowDirections, typeColors } from "./eventUtils";
import { useEvents } from "../lib/events";
import { useLiveNow } from "@/lib/time";

const FALLBACK_COUNTDOWN = "2026-04-10T09:00:00-04:00";

const Index = () => {
  const now = useLiveNow(1000);
  const { events: sortedEvents, isLoading, isError } = useEvents();

  const primaryEvents = useMemo(
    () => sortedEvents.filter((event) => !event.isSupportEvent),
    [sortedEvents]
  );

  const nextEvent = useMemo(() => {
    return primaryEvents.find((event) => event.startDateTime && isAfter(getEventStart(event), now)) ?? null;
  }, [primaryEvents, now]);

  const happeningNowEvents = useMemo(() => {
    return sortedEvents.filter((event) => event.startDateTime && getEventStatus(event, now) === "live");
  }, [now, sortedEvents]);

  return (
    <Layout>
      <section className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div>
              <p className="text-[11px] md:text-xs uppercase tracking-wider text-csh-magenta font-semibold">Next Up</p>
              <p className="text-sm text-muted-foreground">
                {isLoading ? "Loading live events..." : isError ? "Unable to load live events" : nextEvent ? nextEvent.title : "No upcoming events"}
              </p>
            </div>
            <CountdownTimer targetDate={nextEvent?.startDateTime ?? FALLBACK_COUNTDOWN} currentTime={now} compact />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="container mx-auto px-4">

          <article className="glass rounded-2xl border border-border p-5 md:p-6">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold">Happening Now</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {happeningNowEvents.length > 0
                    ? `${happeningNowEvents.length} event${happeningNowEvents.length === 1 ? "" : "s"} live`
                    : ""}
                </p>
              </div>
            </div>

            {isLoading ? (
              <p className="text-muted-foreground">Loading current events...</p>
            ) : isError ? (
              <p className="text-muted-foreground">Unable to load events right now.</p>
            ) : happeningNowEvents.length > 0 ? (
              <div className="space-y-3">
                {happeningNowEvents.map((event) => (
                  <div key={event.id} className="rounded-lg border border-border bg-muted/20 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="font-semibold text-lg">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-end">
                        {(event.tags ?? []).map((tag) => (
                          <span
                            key={tag}
                            className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold lowercase ${typeColors[tag] ?? "bg-muted text-muted-foreground border-border"}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-2"><Clock3 className="w-4 h-4 text-csh-magenta" />{event.time}</span>
                      <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-csh-magenta" />{event.location}</span>
                    </div>
                    {shouldShowDirections(event) && (
                      <div className="mt-4">
                        <a href={getMapUrl(event)} target="_blank" rel="noopener noreferrer">
                          <Button variant="hero" size="sm">
                            <MapPin className="w-4 h-4" />
                            Open Directions
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No events are happening right now.</p>
            )}

            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-semibold">Next Up</h3>
                </div>
              </div>

              {nextEvent ? (
                <>
                  <h4 className="text-lg md:text-xl font-display font-semibold mb-2">{nextEvent.title}</h4>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {(nextEvent.tags ?? []).map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold lowercase ${typeColors[tag] ?? "bg-muted text-muted-foreground border-border"}`}
                      >
                        {tag}
                      </span>
                    ))}
                    {nextEvent.ticketUrl && (
                      <span className="rounded-full border border-amber-400/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
                        Ticket available
                      </span>
                    )}
                  </div>
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

                  {shouldShowDirections(nextEvent) && (
                    <div className="flex flex-wrap gap-3">
                      <a href={getMapUrl(nextEvent)} target="_blank" rel="noopener noreferrer">
                        <Button variant="hero" size="sm">
                          <MapPin className="w-4 h-4" />
                          Open Directions
                        </Button>
                      </a>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to="/schedule">
                      <Button variant="hero-outline" size="lg">Live Timeline</Button>
                    </Link>
                    <Link to="/events">
                      <Button variant="ghost" size="lg">All Events</Button>
                    </Link>
                  </div>
                </>
              ) : (
                <p className="text-muted-foreground">No future events found in the schedule data.</p>
              )}
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
