import { Layout } from "@/components/Layout";
import { CountdownTimer } from "@/components/CountdownTimer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UserPlus, Calendar, MapPin, Users, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Remember", "Celebrate", "Reconnect"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-8">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-csh-magenta/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-csh-red/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center -mt-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-up">
              <Sparkles className="w-4 h-4 text-csh-magenta" />
              <span className="text-sm font-medium text-muted-foreground">
                April 10-12, 2026 • Rochester, NY
              </span>
            </div>

            {/* Main Headline - Logo */}
            <div className="mb-6 animate-fade-up flex justify-center" style={{ animationDelay: "0.1s" }}>
              <img 
                src="/csh-50th-logo.png" 
                alt="CSH 50th Anniversary" 
                className="w-full max-w-md h-auto"
              />
            </div>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Celebrating 50 years of Computer Science House. Join us for an unforgettable celebration.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/registration">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <UserPlus className="w-5 h-5" />
                  Register
                </Button>
              </Link>
            </div>

            {/* Countdown */}
            <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <p className="text-sm text-muted-foreground mb-4 font-medium">Countdown to the celebration</p>
              <CountdownTimer />
            </div>
          </div>
        </div>
      </section>

      {/* Event Highlights */}

      {/* This needs to change to be more appealing to alumni, a block of text explaining, why you should come, why we're hosting this */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              A Weekend to <span className="text-gradient inline-block min-w-[200px] animate-[fadeInUp_0.6s_ease-out]" key={wordIndex} style={{ animation: 'fadeInUp 0.6s ease-out' }}>{words[wordIndex]}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three days of events, reconnections, and celebrations with CSH.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Friday Card */}
            <div className="glass rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-csh flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Friday, April 10</h3>
              <p className="text-muted-foreground mb-4">
                Kick off the weekend with campus and floor tours, photo hunt, and a happy hour with fellow alumni.
              </p>
              <Link to="/schedule" className="text-csh-magenta hover:text-csh-red transition-colors font-medium inline-flex items-center gap-1">
                View Schedule <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Saturday Card */}
            <div className="glass rounded-2xl p-8 hover:scale-105 transition-transform duration-300 border-2 border-primary/30">
              <div className="w-12 h-12 rounded-xl bg-gradient-csh flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Saturday, April 11</h3>
              <p className="text-muted-foreground mb-4">
                Celebrate 5 decades of CSH with a formal dinner at The Wintergarden.
              </p>
              <Link to="/events" className="text-csh-magenta hover:text-csh-red transition-colors font-medium inline-flex items-center gap-1">
                View Events <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Sunday Card */}
            <div className="glass rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-csh flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">Sunday, April 12</h3>
              <p className="text-muted-foreground mb-4">
                Wrap up with farewell brunch, final goodbyes, and departures.
              </p>
              <Link to="/events" className="text-csh-magenta hover:text-csh-red transition-colors font-medium inline-flex items-center gap-1">
                View Events <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Event Highlight */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="glass rounded-3xl p-8 md:p-16 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-csh opacity-10 rounded-full blur-3xl" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-csh-magenta font-semibold text-sm uppercase tracking-wider">
                  Main Event
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-bold mt-2 mb-6">
                  50th Anniversary <span className="text-gradient">Gala Dinner</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  {/* PLACEHOLDER: Update venue name and details when confirmed */}
                  Join us at The Wintergarden for an elegant evening, celebrating five decades of CSH.
                  Enjoy a formal dinner, keynote speeches, and time to reconnect with friends old and new.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-csh-magenta" />
                    <span>Saturday, April 11, 2026 • Evening</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-csh-magenta" />
                    {/* PLACEHOLDER: Update venue name and address when confirmed */}
                    <span>The Wintergarden • Rochester, NY</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="w-5 h-5 text-csh-magenta" />
                    <span>500+ Alumni & Members Expected</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="bg-gradient-csh rounded-2xl p-1">
                  <div className="bg-card rounded-xl p-8 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Cocktail Semi Formal</p>
                    <p className="text-6xl font-display font-bold text-gradient mb-2">50</p>
                    <p className="text-xl font-display font-semibold">Years of CSH</p>
                    <p className="text-muted-foreground text-sm mt-4">1976 - 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground">
              Plan your trip and get all the details for the celebration weekend.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/schedule" className="group">
              <div className="glass rounded-xl p-6 h-full hover:bg-muted/30 transition-colors">
                <Calendar className="w-8 h-8 text-csh-magenta mb-4" />
                <h3 className="font-display font-semibold mb-2 group-hover:text-csh-magenta transition-colors">
                  Full Schedule
                </h3>
                <p className="text-sm text-muted-foreground">
                  See the timing for all events during the weekend
                </p>
              </div>
            </Link>

            <Link to="/events" className="group">
              <div className="glass rounded-xl p-6 h-full hover:bg-muted/30 transition-colors">
                <Sparkles className="w-8 h-8 text-csh-magenta mb-4" />
                <h3 className="font-display font-semibold mb-2 group-hover:text-csh-magenta transition-colors">
                  Events
                </h3>
                <p className="text-sm text-muted-foreground">
                  Detailed info on all activities and gatherings
                </p>
              </div>
            </Link>

            <Link to="/hotels" className="group">
              <div className="glass rounded-xl p-6 h-full hover:bg-muted/30 transition-colors">
                <MapPin className="w-8 h-8 text-csh-magenta mb-4" />
                <h3 className="font-display font-semibold mb-2 group-hover:text-csh-magenta transition-colors">
                  Hotels & Transport
                </h3>
                <p className="text-sm text-muted-foreground">
                  Accommodation deals and getting around
                </p>
              </div>
            </Link>

            <Link to="/faq" className="group">
              <div className="glass rounded-xl p-6 h-full hover:bg-muted/30 transition-colors">
                <Users className="w-8 h-8 text-csh-magenta mb-4" />
                <h3 className="font-display font-semibold mb-2 group-hover:text-csh-magenta transition-colors">
                  FAQ
                </h3>
                <p className="text-sm text-muted-foreground">
                  Common questions answered
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
