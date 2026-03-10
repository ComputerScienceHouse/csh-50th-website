import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { UserPlus, Sparkles, Calendar, MapPin, Clock, DollarSign, ArrowRight } from "lucide-react";

const TicketPrices = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Ticket <span className="text-gradient">Prices</span>
            </h1>
            <div className="bg-amber-500/20 border-2 border-amber-500/50 rounded-xl p-4 mb-8">
              <p className="text-amber-400 font-bold text-lg">
                ⚠️ Tickets are not yet available for purchase, but they will be in the coming weeks.
              </p>
            </div>
            <p className="text-muted-foreground text-lg mb-8">
                We will send an email to the email you provided at registration when tickets are available for purchase. If you haven't registered yet, please do so!
            </p>
            <a href="/registration" target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg">
                <UserPlus className="w-5 h-5" />
                Register For 50th
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* All Events */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">
            Event Tickets
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Open Sauce Mixer */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-display font-semibold mb-3">
                Open Sauce Mixer
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                Hang out with your friends and check out CSH projects that will be going to Open Sauce this year while enjoying a local staple: garbage plates from DogTown.".
              </p>

              <div className="space-y-2 text-sm mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-csh-magenta" />
                  Friday, April 10th
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4 text-csh-magenta" />
                  6:30 PM - 8:30 PM
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-csh-magenta" />
                  Fredericka Douglass Sprague Perry Hall, DSP 1250
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="glass rounded-lg p-6 border border-border hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-lg">Event Ticket</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Includes admission and DogTown garbage plate (buffet style)
                      </p>
                    </div>
                    <p className="text-2xl font-display font-bold text-primary">$25</p>

                  </div>
                </div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <p className="text-xs text-amber-400">
                  <span className="font-semibold">Note:</span> Funds raised go to funding CSH's trip to Open Sauce in Summer 2026!
                </p>
              </div>
            </div>

            {/* Formal Dinner - Main Event with Gold Border (Center, Larger) */}
            <div className="glass rounded-2xl p-10 border-2 border-yellow-500/60 shadow-[0_0_20px_rgba(234,179,8,0.3)] lg:scale-105">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="text-yellow-500 font-semibold text-xs uppercase tracking-wider">
                  Main Event
                </span>
              </div>
              <h3 className="text-2xl font-display font-semibold mb-3">
                Formal Dinner
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                The highlight of the weekend! Join us for an elegant formal dinner celebrating 50 years of CSH. Enjoy a delicious meal, keynote speeches from notable alumni, awards ceremony honoring CSH's legacy, and plenty of time to reconnect with friends.
              </p>

              <div className="space-y-2 text-sm mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-csh-magenta" />
                  Saturday, April 11th
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4 text-csh-magenta" />
                  5:00 PM - 10:00 PM
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-csh-magenta" />
                  The Wintergarden
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="glass rounded-lg p-4 border border-border hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">Adults (13+)</span>
                    <p className="text-2xl font-display font-bold text-primary">$100</p>
                  </div>
                </div>

                <div className="glass rounded-lg p-4 border border-border hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">RIT Students</span>
                    <p className="text-2xl font-display font-bold text-primary">$70</p>
                  </div>
                </div>

                <div className="glass rounded-lg p-4 border border-border hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">Ages 4-12</span>
                    <p className="text-2xl font-display font-bold text-primary">$50</p>
                  </div>
                </div>

                <div className="glass rounded-lg p-4 border border-border hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">Ages 3 & Under</span>
                    <p className="text-2xl font-display font-bold text-primary">FREE</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <p className="text-xs text-amber-400">
                  <span className="font-semibold text-bold">Note:</span> Ticket includes food. Cash bar available for drinks.
                </p>
              </div>
            </div>

            {/* Farewell Brunch */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-display font-semibold mb-3">
                Farewell Brunch
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4">
                End the weekend with a relaxed brunch at a local favorite. Enjoy games, good food, and final farewells with the CSH community before heading home.
              </p>

              <div className="space-y-2 text-sm mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-csh-magenta" />
                  Sunday
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4 text-csh-magenta" />
                  11:00 AM - 2:00 PM
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-csh-magenta" />
                  Swillburger / The Playhouse
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="glass rounded-lg p-4 border border-border hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">All Inclusive</p>
                      <p className="text-xs text-muted-foreground">Open Bar + Meal + 50 Tokens</p>
                    </div>
                    <p className="text-2xl font-display font-bold text-primary">$55</p>
                  </div>
                </div>

                <div className="glass rounded-lg p-4 border border-border hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">Standard</p>
                      <p className="text-xs text-muted-foreground">Meal Ticket + 50 Tokens</p>
                    </div>
                    <p className="text-2xl font-display font-bold text-primary">$30</p>
                  </div>
                </div>

                <div className="glass rounded-lg p-4 border border-border hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">Tokens Only</p>
                      <p className="text-xs text-muted-foreground">50 Tokens</p>
                    </div>
                    <p className="text-2xl font-display font-bold text-primary">$10</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <p className="text-xs text-amber-400">
                  <span className="font-semibold">Note:</span> You can attend without a ticket and pay cash, but purchasing helps CSH meet our minimum and makes the event possible!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
            Ready to Celebrate 50 Years of CSH?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Tickets will be available for purchase in the coming weeks. Please periodically check your email and our website for updates!
          </p>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Haven't registered yet?
          </p>
          <a href="/registration" target="_blank" rel="noopener noreferrer">
            <Button variant="hero" size="xl">
              <UserPlus className="w-5 h-5" />
              Register For 50th
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default TicketPrices;
