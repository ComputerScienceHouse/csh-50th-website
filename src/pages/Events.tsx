import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, Sparkles, ArrowRight, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

// PLACEHOLDER: Update all event details as they are finalized
const events = [
  {
    id: 1,
    title: "50th Anniversary Gala Dinner",
    description: "The highlight of the weekend! Join us for an elegant formal dinner celebrating 50 years of CSH. Enjoy a delicious meal, keynote speeches from notable alumni, awards ceremony honoring CSH's legacy, and plenty of time to reconnect with friends.",
    date: "Saturday, April 11, 2026",
    time: "6:00 PM - 11:00 PM",
    location: "VENUE", // PLACEHOLDER: Replace with actual venue name
    address: "TBD, Rochester, NY", // PLACEHOLDER: Replace with actual address
    capacity: "500 guests",
    dressCode: "Formal/Black Tie Optional",
    isMain: true,
  },
  {
    id: 2,
    title: "Welcome Reception",
    description: "Kick off the anniversary weekend with a casual welcome reception. Light refreshments will be served as you reconnect with old friends and meet current CSH members.",
    date: "Friday, April 10, 2026",
    time: "6:00 PM - 8:00 PM",
    location: "TBD", // PLACEHOLDER: Confirm location
    address: "TBD", // PLACEHOLDER: Confirm address
    capacity: "Open to all attendees",
    dressCode: "Casual",
    isMain: false,
  },
  {
    id: 3,
    title: "CSH Floor Tours",
    description: "Take a trip down memory lane or see what CSH looks like today. Guided tours will show you the projects, equipment, and spaces that make CSH special.",
    date: "Friday & Saturday",
    time: "Various times",
    location: "CSH Floor, NRH", // PLACEHOLDER: Confirm building
    address: "Rochester Institute of Technology",
    capacity: "Multiple sessions",
    dressCode: "Casual",
    isMain: false,
  },
  {
    id: 4,
    title: "Alumni Panel Discussions",
    description: "Hear from successful CSH alumni about their career journeys, how CSH shaped them, and their advice for current members. Q&A session included.",
    date: "Saturday, April 11, 2026",
    time: "2:00 PM - 4:00 PM",
    location: "TBD", // PLACEHOLDER: Confirm location
    address: "Rochester Institute of Technology",
    capacity: "200 seats",
    dressCode: "Smart Casual",
    isMain: false,
  },
  {
    id: 5,
    title: "Alumni Mixer",
    description: "An informal evening gathering for alumni to catch up over drinks. Share stories, reconnect, and make new memories.",
    date: "Friday, April 10, 2026",
    time: "8:00 PM - Late",
    location: "TBD", // PLACEHOLDER: Confirm location
    address: "TBD", // PLACEHOLDER: Confirm address
    capacity: "Open to all alumni",
    dressCode: "Casual",
    isMain: false,
  },
  {
    id: 6,
    title: "Farewell Brunch",
    description: "Before you head home, join us for a farewell brunch. Last chance to exchange contact info, take group photos, and say your goodbyes.",
    date: "Sunday, April 12, 2026",
    time: "9:00 AM - 11:00 AM",
    location: "TBD", // PLACEHOLDER: Confirm location
    address: "TBD", // PLACEHOLDER: Confirm address
    capacity: "Open to all attendees",
    dressCode: "Casual",
    isMain: false,
  },
  {
    id: 7,
    title: "Campus Tours",
    description: "Explore RIT campus and see how it has changed since your time here. Visit new buildings, facilities, and learn about the university's growth.",
    date: "Saturday, April 11, 2026",
    time: "10:00 AM - 12:00 PM",
    location: "Meet at TBD", // PLACEHOLDER: Confirm meeting point
    address: "Rochester Institute of Technology",
    capacity: "Multiple groups",
    dressCode: "Casual (comfortable walking shoes)",
    isMain: false,
  },
];

const Events = () => {
  return (
    <Layout>
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
          {events.filter(e => e.isMain).map(event => (
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
            {events.filter(e => !e.isMain).map(event => (
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
