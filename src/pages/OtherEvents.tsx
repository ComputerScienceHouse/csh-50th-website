import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Sparkles, ArrowRight, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

import { typeColors } from "./eventUtils";
import { cn } from "@/lib/utils";
import { useEvents } from "../lib/events";

const OtherEvents = () => {
  const { events, isLoading, isError } = useEvents();
  const externalEvents = events.filter((event) => event.tags?.includes("external"));

  return (
    <Layout>
      {/* Notice Banner */}
      {/* <div className="bg-blue-500/20 border-2 border-blue-500/50 py-4 px-4">
        <div className="container mx-auto text-center">
          <p className="text-blue-400 font-bold text-sm md:text-base tracking-wider pl-64 pr-64">
            These events are <b>not organized or affiliated with Computer Science House.</b> 
            They are provided as supplemental recommendations for attendees during the weekend.
          </p>
        </div>
      </div> */}

      {/* Header */}
      <section className="pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Other <span className="text-gradient">Events</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              These events are <b>not organized or affiliated with Computer Science House.</b> 
              They are provided as supplemental recommendations for attendees during the weekend.
            </p>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="pb-24 bg-card/50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="glass rounded-2xl border border-border p-10 text-center">
              <h3 className="text-2xl font-display font-bold mb-2">Loading other events</h3>
              <p className="text-muted-foreground">Fetching the event feed from the backend.</p>
            </div>
          ) : isError ? (
            <div className="glass rounded-2xl border border-border p-10 text-center">
              <h3 className="text-2xl font-display font-bold mb-2">Unable to load other events</h3>
              <p className="text-muted-foreground">The event feed could not be loaded right now.</p>
            </div>
          ) : externalEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {externalEvents.map((event) => (
              <div 
                key={event.id} 
                className="glass rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300"
              >
                <h3 className="text-xl font-display font-semibold mb-3">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-csh-magenta" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4 text-csh-magenta" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-csh-magenta" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium border",
                      typeColors[event.type]
                    )}>{event.type}</span>
                  </div>

                </div>
              </div>
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl border border-border p-10 text-center">
              <h3 className="text-2xl font-display font-bold mb-2">No other events yet</h3>
              <p className="text-muted-foreground">Nothing external has been published in the backend feed.</p>
            </div>
          )}
        </div>
      </section>

    </Layout>
  );
};

export default OtherEvents;
