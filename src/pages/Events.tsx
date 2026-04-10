import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Calendar, MapPin, Search, Ticket } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getEventStart, getMapUrl, shouldShowDirections, typeColors } from "./eventUtils";
import { useEvents } from "../lib/events";

const Events = () => {
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const { events, isLoading, isError } = useEvents();

  const eventTags = useMemo(() => {
    return ["all", ...new Set(events.flatMap((event) => event.tags ?? []))];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return [...events]
      .sort((a, b) => getEventStart(a).getTime() - getEventStart(b).getTime())
      .filter((event) => {
        const matchesTag = tagFilter === "all" ? true : (event.tags ?? []).includes(tagFilter);
        const q = query.trim().toLowerCase();
        const matchesQuery =
          q.length === 0 ||
          event.title.toLowerCase().includes(q) ||
          event.description.toLowerCase().includes(q) ||
          event.location.toLowerCase().includes(q);

        return matchesTag && matchesQuery;
      });
  }, [events, query, tagFilter]);

  return (
    <Layout>
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(251,191,36,0.2),transparent_40%),radial-gradient(circle_at_85%_0%,rgba(217,119,6,0.15),transparent_35%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <p className="uppercase tracking-[0.2em] text-xs text-csh-magenta font-semibold">CSH 50th</p>
          <h1 className="text-4xl md:text-6xl font-display font-black mt-2 mb-3">Everything Happening This Weekend</h1>
          <p className="text-muted-foreground max-w-3xl text-lg">
            See every event happening at 50th! Browse by type, search by name, and get directions or tickets, all in one place. 
          </p>
        </div>
      </section>

      <section className="pb-6">
        <div className="container mx-auto px-4">
          <div className="glass rounded-2xl p-4 md:p-5 border border-border">
            <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="pl-9"
                  placeholder="Search title, location, or topic"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {eventTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setTagFilter(tag)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                      tagFilter === tag
                        ? "bg-gradient-csh text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="glass rounded-2xl border border-border p-10 text-center">
              <h3 className="text-2xl font-display font-bold mb-2">Loading events</h3>
              <p className="text-muted-foreground">Fetching the latest schedule from the backend.</p>
            </div>
          ) : isError ? (
            <div className="glass rounded-2xl border border-border p-10 text-center">
              <h3 className="text-2xl font-display font-bold mb-2">Unable to load events</h3>
              <p className="text-muted-foreground">The event feed could not be loaded right now.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredEvents.map((event) => (
                  <article key={event.id} className="glass rounded-2xl border border-border p-5 flex flex-col">
                    <h2 className="text-xl font-display font-bold mb-2">{event.title}</h2>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(event.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full border px-2.5 py-1 text-xs font-semibold lowercase ${typeColors[tag] ?? "bg-muted text-muted-foreground border-border"}`}
                        >
                          {tag}
                        </span>
                      ))}
                      {event.ticketRequired && (
                        <span className="rounded-full border border-amber-400/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
                          ticket required
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-4">{event.description}</p>

                    <div className="space-y-2 text-sm mb-4">
                      <p className="inline-flex items-center gap-2 text-muted-foreground"><Calendar className="w-4 h-4 text-csh-magenta" />{event.startDateTime ? format(getEventStart(event), "EEE, MMM d") : event.date}</p>
                      <p className="inline-flex items-center gap-2 text-muted-foreground"><Calendar className="w-4 h-4 text-csh-magenta" />{event.time}</p>
                      <p className="inline-flex items-center gap-2 text-muted-foreground"><MapPin className="w-4 h-4 text-csh-magenta" />{event.location}</p>
                    </div>

                    <div className="mt-auto flex flex-wrap gap-2">
                      {shouldShowDirections(event) && (
                        <a href={getMapUrl(event)} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="hero-outline">
                            <MapPin className="w-4 h-4" />Directions
                          </Button>
                        </a>
                      )}
                      {event.ticketUrl && (
                        <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" variant="hero">
                            <Ticket className="w-4 h-4" />Buy
                          </Button>
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="glass rounded-2xl border border-border p-10 text-center mt-8">
                  <h3 className="text-2xl font-display font-bold mb-2">No matches yet</h3>
                  <p className="text-muted-foreground">Try another keyword or clear the type filter.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Events;
