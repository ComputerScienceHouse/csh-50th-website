import { Layout } from "@/components/Layout";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Clock, MapPin } from "lucide-react";
import { ScheduleEvent } from "./ScheduleEvent";
import EventPopup from "./EventPopup";
import { events } from "./EventsData";

type Day = "friday" | "saturday" | "sunday";

//----- Constants & Arrays for Event Data-----//
/**
 * The time frame for events for the day in hours. 
 * (id) is only used for keys and does not matter the order, just don't repeat them.
 */
const times = [
    { id: 1, hour: '05', timeOfDay: "am"},
    { id: 2, hour: '06', timeOfDay: "am"},
    { id: 3, hour: '07', timeOfDay: "am"},
    { id: 4, hour: '08', timeOfDay: "am"},
    { id: 5, hour: '09', timeOfDay: "am"},
    { id: 6, hour: '10', timeOfDay: "am"},
    { id: 7, hour: '11', timeOfDay: "am"},
    { id: 8, hour: '12', timeOfDay: "pm"},
    { id: 9, hour: '01', timeOfDay: "pm"},
    { id: 10, hour: '02', timeOfDay: "pm"},
    { id: 11, hour: '03', timeOfDay: "pm"},
    { id: 12, hour: '04', timeOfDay: "pm"},
    { id: 13, hour: '05', timeOfDay: "pm"},
    { id: 14, hour: '06', timeOfDay: "pm"},
    { id: 15, hour: '07', timeOfDay: "pm"},
    { id: 16, hour: '08', timeOfDay: "pm"},
    { id: 17, hour: '09', timeOfDay: "pm"},
    { id: 18, hour: '10', timeOfDay: "pm"},
    { id: 19, hour: '11', timeOfDay: "pm"},
    { id: 20, hour: '12', timeOfDay: "am"},
  ]

/**
 * Holds the data for events shown on the Schedule Page sourced from EventsData.ts
 */
const scheduleData: Record<Day, ScheduleEvent[]> = {
  friday: events.filter(event =>
    event.date.toLowerCase().includes("friday")
  ),
  saturday: events.filter(event =>
    event.date.toLowerCase().includes("saturday")
  ),
  sunday: events.filter(event =>
    event.date.toLowerCase().includes("sunday")
  )
}

const dayLabels: Record<Day, { name: string; date: string }> = {
  friday: { name: "Friday", date: "April 10" },
  saturday: { name: "Saturday", date: "April 11" },
  sunday: { name: "Sunday", date: "April 12" },
};

const typeColors: Record<string, string> = {
  social: "bg-blue-500/70 text-blue-200 border-blue-500/30",
  main: "bg-gradient-csh text-primary-foreground",
  food: "bg-amber-500/70 text-amber-200 border-amber-500/30",
  activity: "bg-emerald-500/70 text-emerald-200 border-emerald-500/30",
};

/**
 * The number of sections in the grid
 */
var SectionCount = 0;

//----- Helper Functions -----//
/**
 *  // calculate the row index an event should start at given its start time (in military time)
 * @param time accepts the following input format: "11:00 AM - 1:00 PM"
 * @returns index of the row
 */
const baseHour = 5; // the first viable hour (currently 5am)
function timeToRowStart(time: string): number {

  const startWithTimeOfDay = time.split(" - ")[0];

  var hhmm = startWithTimeOfDay.split(" "); // process the time into something usable by the function
  
  if(hhmm[1] == "PM"){ // convert to military time if needed
    const startTime = hhmm[0].split(":");

    if(parseInt(startTime[0], 10) != 12){ // ignore 12pm
      hhmm[0] = (parseInt(startTime[0], 10) + 12).toString() + ":" + startTime[1];
    }
  }

  const [hString, mString] = hhmm[0].split(":");
  const h = parseInt(hString, 10);
  const m = parseInt(mString, 10);
  const hourOffset = (h - baseHour) * 4; // calculate the hour
  const quarterOffset = Math.floor(m / 15); // calculate the quarter in the hour
  return hourOffset + quarterOffset + 1; // return the row index
}

/**
 * Duration in rows based on 15-minute slots.
 * @param time accepts the following input format: "11:00 AM - 1:00 PM"
 * @returns the number of rows that the given time frame spans 
 */
function durationToRowSpan(time: string): number {
  
  const [startWithTimeOfDay, endWithTimeOfDay] = time.split(" - ");

  var start = startWithTimeOfDay.split(" "); // process the time into something usable by the function
  var end = endWithTimeOfDay.split(" ");

  if(start[1] == "PM"){ // convert to military time if needed
    const startTime = start[0].split(":");
    
    if(parseInt(startTime[0], 10) != 12){ // ignore 12pm
      start[0] = (parseInt(startTime[0], 10) + 12).toString() + ":" + startTime[1];
    }
  }
  if(end[1] == "PM"){ // convert to military time if needed
    const endTime = end[0].split(":");

    if(parseInt(endTime[0], 10) != 12){ // ignore 12pm
      end[0] = (parseInt(endTime[0], 10) + 12).toString() + ":" + endTime[1];
    }
  }
  else if(end[1] == "AM"){ // convert to military time if needed
    const endTime = end[0].split(":");
    if(endTime[0] == "12"){ // can end at 12AM
      end[0] = (parseInt(endTime[0], 10) + 12).toString() + ":" + endTime[1];
    }
  }
  else if(end[0].toLowerCase() == "late"){ // treat late as if it was 1am
      end[0] = "25:00";
  }

  const toMinutes = (t: string) => { // helper function for 
    const [hStr, mStr] = t.split(":");
    return parseInt(hStr, 10) * 60 + parseInt(mStr, 10);
  };

  const minutes = toMinutes(end[0]) - toMinutes(start[0]);
  return Math.max(1, Math.ceil(minutes / 15));
}

/**
 * Calculate the next column to place events in. (iterates between columns 2, 3, and 4)
 */
var currentCol = 2;
function nextColumn(): number {
  if(currentCol > 4){
    currentCol = 2;
  }
  return currentCol++;
}

/**
 * Reset the currentCol to 2
 */
function resetCurrentCol(): void {
  currentCol = 2;
}

/**
 * Increments the SectionCount by 1
 */
function incrementSectionCount(): void{
  SectionCount++;
}

/**
 * Increments the SectionCount by (i)
 */
function incrementSectionCountBy(i: number): void{
  SectionCount += i;
}

/**
 * Resets the SectionCount to 0
 */
function resetSectionCount(){
  SectionCount = 0;
}

/**
 * Returns the number of unused cells in the grid
 * @returns number
 */
function getEmptySpacesCount(): number{
  return (240);// - SectionCount;
}

/**
 * Given an index, returns the spacer's column
 * @param index index of the spacer
 * @returns number
 */
function setSpacerColumn(index: number): number {
  if(index % 3 == 0){
    return 2;
  }
  else if((index - 1) % 3 == 0){
    return 3;
  }
  else if((index - 2) % 3 == 0){
    return 4;
  }
}

/**
 * Given an index, returns the spacer's row
 * @param index index of the spacer
 * @returns number
 */
function setSpacerRow(index: number): number {
  if(index % 3 == 0){
    return (index / 3) + 1;
  }
  else if((index - 1) % 3 == 0){
    return ((index - 1) / 3) + 1;
  }
  else if((index - 2) % 3 == 0){
    return ((index - 2) / 3) + 1;
  }
}

/* | Check screen size if mobile or desktop | */
/**
 * Returns a boolean for true if the screen is under 800px wide, and false otherwise
 * @returns true/false
 */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 649px)").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 649px)");
    const listener = () => setIsMobile(media.matches);

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
}

//----- Webpage HTML -----//
const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState<Day>("friday");
  const [openEvent, setOpenEvent] = useState<ScheduleEvent | null>(null);
  
  const isMobile = useIsMobile();

  resetSectionCount(); // reset the section count on the page reloading
  resetCurrentCol(); // reset the currentCol on page refresh

  /**
   * Given an event, returns an EventPopup element
   * @param event an event
   * @returns EventPopup
   */
  function openEventPopup(event: ScheduleEvent) {
    setOpenEvent(event);
  }


  if(!isMobile){
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
                Event <span className="text-gradient">Schedule</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Three days of events, activities, and celebrations.
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
                  onClick={() => {resetSectionCount(), setSelectedDay(day)}}
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

        {/* Schedule Timeline */}
        <section className="py-12 border-collapse">
          <div className={cn(
                      "container max-w-dvw mx-auto px-4 rounded-2xl p-6 w-full transition-all duration-300",
                      "border-8 border-primary/50"
                    )}>
            <div className="w-full">

              {/* Day Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold">
                  {dayLabels[selectedDay].name}
                </h2>
                <p className="text-muted-foreground">
                  {dayLabels[selectedDay].date}, 2026
                </p>
              </div>

              {/* Events */} {/* Adding grid rows*/}
              <div className={cn(
                      "grid grid-rows-[repeat(76, minmax(0, 1rem))] grid-cols-[repeat(4, minmax(0, 1fr))] grid-flow-row-dense glass rounded-2xl p-6 transition-all duration-300",
                      "border-2 border-primary/50"
                    )}
              >
                {/* Create Timeline on the left */}
                {times.map(time => ( // source of Warning:(react_jsx-dev-runtime.js?v=7f273f88:64 Warning: Each child in a list should have a unique "key" prop.), because of <></>
                  <> 
                      <div className={cn("col-start-1 col-span-1 row-span-1 border-b-2 border-t-4 border-solid pr-6 sm:text-sm md:text-xl")}>
                        {time.hour} {time.timeOfDay} -
                      </div>
                      <div className={cn("col-start-1 col-span-1 row-span-1 border-b-2 border-dotted sm:text-xs md:text-sm")}>
                      - {time.hour}:15 -
                      </div>
                      <div className={cn("col-start-1 col-span-1 row-span-1 border-b-2 border-dotted sm:text-xs md:text-sm")}>
                      - {time.hour}:30 -
                      </div>
                      <div className={cn("col-start-1 col-span-1 row-span-1 border-b-2 border-dotted sm:text-xs md:text-sm")}>
                      - {time.hour}:45 -
                      </div>
                  </>
                ))}

                {/* Fill in empty spaces */}
                {Array.from({ length: getEmptySpacesCount() }, (_, index) => (
                  <div key={index} className={cn("col-span-1 row-span-1 border-b-2 border-dotted text-center text-sm",
                    (index % 12 == 0) && "border-t-4 border-solid",
                    ((index - 1) % 12 == 0) && "border-t-4 border-solid",
                    ((index - 2) % 12 == 0) && "border-t-4 border-solid",
                  )}
                  style={{
                    gridColumnStart: setSpacerColumn(index),
                    gridColumnEnd: setSpacerColumn(index),
                    gridRowStart: setSpacerRow(index),
                    gridRowEnd: setSpacerRow(index),
                  }}></div>
                ))}

                {/* Display events on the right of timeline */}
                {scheduleData[selectedDay].map((event, index) => (
                  incrementSectionCountBy(durationToRowSpan(event.time)), // increment the section count to have how many events are on the page
                  <button
                    key={index}
                    onClick={() => {openEventPopup(event)}}

                    className={cn(
                      "col-start-2 col-span-1 row-span-1 overflow-y-auto flex flex-wrap border-4 border-csh-magenta p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] bg-pink-300",
                      event.type === "main" && "border-8 border-primary/100 glow-csh"
                    )}
                    style={{
                      gridRowStart: timeToRowStart(event.time),
                      gridRowEnd: `span ${durationToRowSpan(event.time)}`,
                      gridColumnStart: nextColumn(),
                    }}
                  >
                    {/* Content */}
                    <div className="flex-1">
                      {/* Time */}
                      <div className="flex items-center gap-2 text-csh-magenta font-semibold py-2">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
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
                      <p className="text-csh-foreground mb-3 text-csh-magenta text-left">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-csh-magenta font-semibold">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>
                  </button>
                ))}

              </div>
            </div>
          </div>  

          {openEvent && (
            <EventPopup
              id={openEvent.id}
              title={openEvent.title}
              description={openEvent.description}
              date={openEvent.date}
              time={openEvent.time}
              location={openEvent.location}
              address={openEvent.address}
              capacity={openEvent.capacity}
              dressCode={openEvent.dressCode}
              type={openEvent.type}
              onClose={() => setOpenEvent(null)}
              typeColors = {typeColors}
            />
          )}

        </section>

        {/* Remove this portion
        {/* Legend }
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
        </section> */}
      </Layout>
    );
  }
  else{
    return (
      <div>I'm a mobile device!!!</div>
    );
  }
}; 

export default Schedule;
