import { Layout } from "@/components/Layout";

const Parking = () => {
  return (
    <Layout>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl glass rounded-2xl border border-border p-8 md:p-10">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-center">Parking</h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground text-center">
              General parking can be found below. Precise directions to each event can be found by clicking the "Directions" button on the event.
            </p>

            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-display font-semibold">Parking at On-Campus Events</h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                On-campus parking is free after 5PM on Friday. For those arriving before 5PM Friday, go to the RIT Visitor Center to get a visitor parking pass. Some paid spots via ParkMobile are also available around campus. For the check-in table, you will want to park in lots K, L, or C.
              </p>
            </div>

            <div className="mt-10">
              <h2 className="text-xl md:text-2xl font-display font-semibold">Parking at Off-Campus Events</h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground">
                Street parking is available for all off-campus events. For the main formal dinner, there are parking garages within walking distance, such as the Court Street Garage and Tower 280 Parking, and bus rounds will be running from RIT and a few hotels so you can avoid parking altogether. 
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Parking;