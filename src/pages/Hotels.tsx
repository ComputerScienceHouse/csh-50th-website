import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Globe, Car, Plane, Bus, ExternalLink, Star, DollarSign } from "lucide-react";

// PLACEHOLDER: Update all hotel and transport information as deals are confirmed
const hotels = [
  {
    id: 1,
    name: "Hampton Inn & Suites Rochester/Henrietta", 
    description: "Conveniently located near RIT campus with locked special rates for CSH 50th attendees. There are 25 spots per night reserved from April 10-12, 2026.",
    address: "280 Clay Road, Rochester, NY 14623",
    phone: "(585) 475-1300",
    website: "https://www.hilton.com/en/book/reservation/deeplink/?ctyhocn=ROCHEHX&groupCode=CHHCSC&arrivaldate=2026-04-10&departuredate=2026-04-12&cid=OM,WW,HILTONLINK,EN,DirectLink&fromId=HILTONLINKDIRECT",
    distance: "12 minutes from RIT",
    priceRange: "$$",
    amenities: ["Free WiFi", "Free Parking", "Breakfast Included 6:00-10:00AM", "Indoor Pool", "Fitness Center", "Pet-Friendly Rooms"],
    specialRate: "$159/night", 
    bookingCode: null,
    featured: true,
  },
  {
    id: 2,
    name: "Courtyard by Marriott Rochester Brighton", 
    description: "Located in a good mid-point between RIT and the venue, with a free shuttle to and from Rochester airport. There are 10 rooms per night reserved from April 10-13, 2026.",
    address: "33 Corporate Woods, Rochester, NY 14623", 
    phone: "(585) 292-1000", 
    website: "https://app.marriott.com/reslink?id=1768599322125&key=GRP&app=resvlink",
    distance: "12 minutes from RIT",
    priceRange: "$$",
    amenities: ["Free WiFi", "On-site Restaurant", "Pool", "Fitness Center", "Business Center", "EV Charging Stations", "Free Parking", "Meeting/Event Space"],
    specialRate: "$154/night", 
    bookingCode: null, // PLACEHOLDER: Replace with actual booking code if applicable
    featured: false,
  },
  {
    id: 3,
    name: "Hilton Garden Inn Rochester Downtown",
    description: "Located in downtown Rochester, it is a block away from the venue. There are 25 rooms per night reserved from April 10-12, 2026 for a single King bed.",
    address: "155 E Main St, Rochester, NY 14604", 
    phone: "(585) 232-5000", 
    website: "https://www.hilton.com/en/book/reservation/deeplink/?ctyhocn=ROCEMGI&groupCode=91I&arrivaldate=2026-04-10&departuredate=2026-04-12&cid=OM,WW,HILTONLINK,EN,DirectLink&fromId=HILTONLINKDIRECT", 
    distance: "20 minutes from RIT",
    priceRange: "$$",
    amenities: ["Free WiFi", "Non-smoking rooms", "On-site restaurant", "Indoor pool", "Fitness center", "Pet-friendly rooms"],
    specialRate: "$169/night", // PLACEHOLDER: Replace with actual negotiated rate
    bookingCode: null,
    featured: false,
  },
];

const transportOptions = [
  {
    icon: Plane,
    title: "By Air",
    description: "Fly into Greater Rochester International Airport (ROC), located about 15 minutes from RIT campus or from downtown Rochester.",
    details: [
      "Major airlines: Delta, American, United, Southwest",
      "Rental cars available at the airport",
      "Rideshare services (Uber/Lyft) readily available",
    ],
  },
  {
    icon: Car,
    title: "By Car",
    description: "Rochester is accessible via I-90 (NY Thruway) and I-390.",
    details: [
      "Free parking available at hotels",
      "Street parking available at off-campus venues",
      "RIT address: 1 Lomb Memorial Drive, Rochester, NY 14623",
    ],
  },
  {
    icon: Bus,
    title: "Local Transport",
    description: "Getting around Rochester during the event weekend.",
    details: [
      "Shuttle service between recommended hotels and gala dinner (note: not available for Hilton Garden Inn Rochester Downtown)",
      "Rideshare services recommended (Uber, Lyft)",
      "RTS public bus system available",
    ],
  },
];

const Hotels = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Hotels & <span className="text-gradient">Transport</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              We've secured special rates at nearby hotels. Book early to ensure availability!
            </p>
          </div>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">
            Recommended Hotels
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {hotels.map(hotel => (
              <div 
                key={hotel.id} 
                className="glass rounded-2xl p-6 flex flex-col"
              >
                <h3 className="text-xl font-display font-semibold mb-2">
                  {hotel.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-muted-foreground text-sm">{hotel.distance}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="flex items-center gap-1 text-muted-foreground text-sm">
                    {Array.from({ length: hotel.priceRange.length }).map((_, i) => (
                      <DollarSign key={i} className="w-3 h-3" />
                    ))}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  {hotel.description}
                </p>

                {hotel.specialRate && (
                  <div className="bg-gradient-csh-soft rounded-lg p-3 mb-4">
                    <p className="font-semibold text-sm">
                      CSH Special Rate: <span className="text-csh-magenta">{hotel.specialRate}</span>
                    </p>
                    {hotel.bookingCode && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Use code: <span className="font-mono">{hotel.bookingCode}</span>
                      </p>
                    )}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.map(amenity => (
                    <span 
                      key={amenity}
                      className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {hotel.address}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {hotel.phone}
                  </div>
                </div>
                
                {/* PLACEHOLDER: Each hotel website link needs to be updated */}
                <a 
                  href={hotel.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto"
                >
                  <Button variant="hero" className="w-full">
                    <Globe className="w-4 h-4" />
                    Book Now
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            ))}
          </div>
          
          <p className="text-center text-muted-foreground text-sm mt-8">
            {/* PLACEHOLDER: Update booking deadline when known */}
            Book by March 11th to secure the special CSH rate. Rooms are limited!
          </p>
        </div>
      </section>

      {/* Transport Section */}
      <section className="py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">
            Getting Here & Around
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transportOptions.map((option, index) => (
              <div key={index} className="glass rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-csh flex items-center justify-center mb-4">
                  <option.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">
                  {option.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {option.description}
                </p>
                <ul className="space-y-2">
                  {option.details.map((detail, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-csh-magenta mt-1.5 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="glass rounded-2xl p-8 text-center">
            <MapPin className="w-12 h-12 text-csh-magenta mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold mb-2">
              Rochester Institute of Technology
            </h2>
            <p className="text-muted-foreground mb-6">
              1 Lomb Memorial Drive, Rochester, NY 14623
            </p>
            {/* PLACEHOLDER: Add embedded Google Map or link to Google Maps */}
            <a 
              href="https://maps.google.com/?q=Rochester+Institute+of+Technology" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="hero-outline">
                <MapPin className="w-4 h-4" />
                View on Google Maps
                <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Questions Section */}
      <section className="py-12 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Questions About Travel?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Check our FAQ for more information, or reach out to the organizing team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/faq">
              <Button variant="hero-outline">
                View FAQ
              </Button>
            </a>
            <a href="mailto:50th@csh.rit.edu">
              <Button variant="glass">
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Hotels;
