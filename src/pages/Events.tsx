import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Sparkles, ArrowRight, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

import { events } from "./EventsData";

const Events = () => {
  return (
    <Layout>
      {/* Notice Banner */}
      <div className="bg-amber-500/20 border-2 border-amber-500/50 py-4 px-4">
        <div className="container mx-auto text-center">
          <p className="text-amber-400 font-bold text-sm md:text-base tracking-wider">
            ⚠️ This website is a work in progress. Some contents (including the schedule) are just a placeholder and are subject to change. Some links, including the RSVP and ticket links, do not work.
          </p>
        </div>
      </div>

      {/* Header */}
      <section className="pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Weekend <span className="text-gradient">Events</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              From casual meetups to the main gala dinner, here's everything happening during the 50th anniversary celebration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* PLACEHOLDER: Replace with actual ticket purchase URL */}
              <a href="PLACEHOLDER" target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="lg">
                  <Ticket className="w-5 h-5" />
                  Buy Tickets
                </Button>
              </a>
              <Link to="/schedule">
                <Button variant="hero-outline" size="lg">
                  <Calendar className="w-5 h-5" />
                  View Full Schedule
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Event Highlight */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {events.filter(e => e.type.toLowerCase() == "main").map(event => (
            <div key={event.id} className="glass rounded-3xl p-8 md:p-12 border-2 border-primary/30 glow-csh">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-csh-magenta" />
                <span className="text-csh-magenta font-semibold text-sm uppercase tracking-wider">
                  Main Event
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {event.title}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-3xl">
                {event.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-csh-magenta mt-0.5" />
                  <div>
                    <p className="font-semibold">Date</p>
                    <p className="text-muted-foreground text-sm">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-csh-magenta mt-0.5" />
                  <div>
                    <p className="font-semibold">Time</p>
                    <p className="text-muted-foreground text-sm">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-csh-magenta mt-0.5" />
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-muted-foreground text-sm">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-csh-magenta mt-0.5" />
                  <div>
                    <p className="font-semibold">Dress Code</p>
                    <p className="text-muted-foreground text-sm">{event.dressCode}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other Events Grid */}
      <section className="py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">
            All Weekend Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.filter(e => (e.type.toLowerCase() != "main")).map(event => (
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Ready to Join the Celebration?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Don't miss out on this once-in-a-lifetime anniversary celebration. Get your tickets now!
          </p>
          {/* PLACEHOLDER: Replace with actual ticket purchase URL */}
          <a href="PLACEHOLDER" target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="xl">
              <Ticket className="w-5 h-5" />
              Buy Tickets Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
