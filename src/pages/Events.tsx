import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Calendar, ExternalLink, MapPin, Search, Ticket } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { events } from "./EventsData";
import { getEventStart, getMapUrl, typeColors } from "./eventUtils";

const eventTypes = ["all", "main", "activity", "social", "food", "seminar", "external"] as const;
type EventTypeFilter = (typeof eventTypes)[number];

const Events = () => {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<EventTypeFilter>("all");

  const filteredEvents = useMemo(() => {
    return [...events]
      .sort((a, b) => getEventStart(a).getTime() - getEventStart(b).getTime())
      .filter((event) => {
        const matchesType = typeFilter === "all" ? true : event.type === typeFilter;
        const q = query.trim().toLowerCase();
        const matchesQuery =
          q.length === 0 ||
          event.title.toLowerCase().includes(q) ||
          event.description.toLowerCase().includes(q) ||
          event.location.toLowerCase().includes(q);

        return matchesType && matchesQuery;
      });
  }, [query, typeFilter]);

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
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTypeFilter(type)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                      typeFilter === type
                        ? "bg-gradient-csh text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredEvents.map((event) => (
              <article key={event.id} className="glass rounded-2xl border border-border p-5 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${typeColors[event.type]}`}>
                    {event.type}
                  </span>
                  {event.ticketRequired && (
                    <span className="rounded-full border border-amber-400/40 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-200">
                      Ticket required
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-display font-bold mb-2">{event.title}</h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-4">{event.description}</p>

                <div className="space-y-2 text-sm mb-4">
                  <p className="inline-flex items-center gap-2 text-muted-foreground"><Calendar className="w-4 h-4 text-csh-magenta" />{event.startDateTime ? format(getEventStart(event), "EEE, MMM d") : event.date}</p>
                  <p className="inline-flex items-center gap-2 text-muted-foreground"><Calendar className="w-4 h-4 text-csh-magenta" />{event.time}</p>
                  <p className="inline-flex items-center gap-2 text-muted-foreground"><MapPin className="w-4 h-4 text-csh-magenta" />{event.location}</p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  <a href={getMapUrl(event)} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="hero-outline">
                      <MapPin className="w-4 h-4" />Directions
                    </Button>
                  </a>
                  {event.ticketRequired && event.ticketUrl ? (
                    <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="hero">
                        <Ticket className="w-4 h-4" />Buy
                      </Button>
                    </a>
                  ) : (
                    <a href="/registration" target="_blank" rel="noopener noreferrer" className="text-csh-magenta hover:text-csh-red text-xs font-semibold inline-flex items-center gap-1 self-center">
                      RSVP <ExternalLink className="w-3 h-3" />
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
        </div>
      </section>
    </Layout>
  );
};

export default Events;
