import { Layout } from "@/components/Layout";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Clock, MapPin, Users } from "lucide-react";

type Day = "friday" | "saturday" | "sunday";

interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  location: string;
  type: "social" | "main" | "food" | "activity";
}

// PLACEHOLDER: Update all event times, descriptions, and locations as they are finalized
const scheduleData: Record<Day, ScheduleEvent[]> = {
  friday: [
    {
      time: "2:00 PM - 6:00 PM",
      title: "Registration & Check-in",
      description: "Pick up your badge, swag bag, and event materials.",
      location: "CSH Floor, NRH", // PLACEHOLDER: Confirm location
      type: "activity",
    },
    {
      time: "4:00 PM - 6:00 PM",
      title: "CSH Floor Tours",
      description: "See how CSH has evolved over the years with guided tours of the floor.",
      location: "CSH Floor, NRH", // PLACEHOLDER: Confirm location
      type: "activity",
    },
    {
      time: "6:00 PM - 8:00 PM",
      title: "Welcome Reception",
      description: "Casual meet and greet with light refreshments. Reconnect with old friends!",
      location: "TBD", // PLACEHOLDER: Confirm location
      type: "social",
    },
    {
      time: "8:00 PM - Late",
      title: "Alumni Mixer",
      description: "Informal gathering for alumni to catch up over drinks.",
      location: "TBD", // PLACEHOLDER: Confirm location
      type: "social",
    },
  ],
  saturday: [
    {
      time: "8:00 AM - 10:00 AM",
      title: "Breakfast",
      description: "Start your day with a hearty breakfast and coffee.",
      location: "TBD", // PLACEHOLDER: Confirm location
      type: "food",
    },
    {
      time: "10:00 AM - 12:00 PM",
      title: "Campus Tours",
      description: "Explore RIT campus and see what's new since your time here.",
      location: "RIT Campus", // PLACEHOLDER: Confirm meeting point
      type: "activity",
    },
    {
      time: "10:00 AM - 4:00 PM",
      title: "Open House",
      description: "Drop by CSH throughout the day for demos, projects, and socializing.",
      location: "CSH Floor, NRH", // PLACEHOLDER: Confirm location
      type: "activity",
    },
    {
      time: "12:00 PM - 2:00 PM",
      title: "Lunch",
      description: "Grab lunch and continue catching up with fellow CSHers.",
      location: "TBD", // PLACEHOLDER: Confirm location
      type: "food",
    },
    {
      time: "2:00 PM - 4:00 PM",
      title: "Panel Discussions",
      description: "Hear from notable alumni about their journeys and CSH's impact.",
      location: "TBD", // PLACEHOLDER: Confirm location
      type: "activity",
    },
    {
      time: "6:00 PM - 11:00 PM",
      title: "50th Anniversary Gala Dinner",
      description: "The main event! Formal dinner, keynotes, awards, and celebration.",
      location: "VENUE", // PLACEHOLDER: Replace with actual venue name
      type: "main",
    },
  ],
  sunday: [
    {
      time: "9:00 AM - 11:00 AM",
      title: "Farewell Brunch",
      description: "Last chance to connect before departures. Share memories and contact info!",
      location: "TBD", // PLACEHOLDER: Confirm location
      type: "food",
    },
    {
      time: "11:00 AM - 1:00 PM",
      title: "Final Goodbyes",
      description: "Wrap up the weekend, grab your things, and head out.",
      location: "CSH Floor, NRH", // PLACEHOLDER: Confirm location
      type: "social",
    },
  ],
};

const dayLabels: Record<Day, { name: string; date: string }> = {
  friday: { name: "Friday", date: "April 10" },
  saturday: { name: "Saturday", date: "April 11" },
  sunday: { name: "Sunday", date: "April 12" },
};

const typeColors: Record<string, string> = {
  social: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  main: "bg-gradient-csh text-primary-foreground",
  food: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  activity: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState<Day>("friday");

  return (
    <Layout>
      {/* Header */}
      <section className="pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Event <span className="text-gradient">Schedule</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Three days of events, activities, and celebrations. Click on a day to see what's happening.
            </p>
          </div>
        </div>
      </section>

      {/* Day Selector */}
      <section className="sticky top-16 md:top-20 z-40 py-4 glass">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 md:gap-4">
            {(Object.keys(scheduleData) as Day[]).map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={cn(
                  "px-4 md:px-8 py-3 rounded-xl font-medium transition-all duration-300",
                  selectedDay === day
                    ? "bg-gradient-csh text-primary-foreground shadow-lg glow-csh"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                )}
              >
                <span className="hidden md:inline">{dayLabels[day].name}, </span>
                {dayLabels[day].date}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TODO: Change the Event to look more like Google Calendar and get the events to open a Expanded Dialog to show the Venue, where it is, and an expanded description*/}
      {/* Schedule Timeline */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Day Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold">
                {dayLabels[selectedDay].name}
              </h2>
              <p className="text-muted-foreground">
                {dayLabels[selectedDay].date}, 2026
              </p>
            </div>

            {/* Events */}
            <div className="space-y-6">
              {scheduleData[selectedDay].map((event, index) => (
                <div
                  key={index}
                  className={cn(
                    "glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]",
                    event.type === "main" && "border-2 border-primary/50 glow-csh"
                  )}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Time */}
                    <div className="md:w-48 flex-shrink-0">
                      <div className="flex items-center gap-2 text-csh-magenta font-semibold">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-display font-semibold">
                          {event.title}
                        </h3>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium border",
                          typeColors[event.type]
                        )}>
                          {event.type === "main" ? "Main Event" : event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Remove this portion */}
      {/* Legend */}
      <section className="py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-display font-semibold mb-4 text-center">Event Types</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2">
                <span className={cn("w-4 h-4 rounded", typeColors.main.split(" ")[0])} />
                <span className="text-sm text-muted-foreground">Main Event</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-blue-500/30" />
                <span className="text-sm text-muted-foreground">Social</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-emerald-500/30" />
                <span className="text-sm text-muted-foreground">Activity</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-amber-500/30" />
                <span className="text-sm text-muted-foreground">Food</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Schedule;
