import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { ScheduleEvent } from "./ScheduleEvent";

/**
 * EventPopupProp that allows onClose() to be passed in
 */
interface EventPopupProps extends ScheduleEvent {
  onClose: () => void,
  typeColors: Record<string, string>
}

export default function EventPopup(event: EventPopupProps){

  return (
    <div // gray background
        id="eventPopup"
        className={cn(
            "z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-screen h-screen bg-black bg-opacity-50",
        )}
    >  
        {/* If the user clicks anywhere, then the popup is closed */}
        <button 
            onClick={event.onClose}
            className={cn(
                "w-screen h-screen",
            )}
        >
            <div
                className={cn(
                "z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto flex flex-wrap border-2 border-csh-magenta p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] bg-black",
                event.type === "main" && "border-4 border-primary/100 glow-csh"
                )}
            >   
                <div className="flex flex-row items-start gap-4">
                    {/* Content */}
                    <div className="flex-1">
                        {/* Time */}
                        <div className="flex items-center gap-2 text-csh-magenta font-semibold py-2">
                            <Clock className="w-4 h-4" />
                            {event.time}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h3 className="text-xl font-display font-semibold text-white">
                                {event.title}
                            </h3>
                            <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium border",
                                event.typeColors[event.type]
                            )}>
                                {event.type === "main" ? "Main Event" : event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </span>
                        </div>
                        <p className="text-muted-foreground mb-3 text-left">
                            {event.description}
                        </p>
                        <div className="flex items-center gap-2 font-semibold pb-1">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            {event.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold pb-1">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            {event.location} | {event.address}
                        </div>
                        <div className="flex items-center gap-2 text-sm pb-1">
                            <Users className="w-5 h-5 mt-0.5 text-muted-foreground" />
                            <span className="text-muted-foreground">Capacity:</span>
                            <span className="font-semibold text-sm">{event.capacity}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm pb-1">
                            <Users className="w-5 h-5 mt-0.5 text-muted-foreground" />
                            <span className="text-muted-foreground">Attire:</span>
                            <span className="font-semibold text-sm">{event.dressCode}</span>
                        </div>
                    </div>
                </div>
            </div>
        </button>
    </div>
  );
};