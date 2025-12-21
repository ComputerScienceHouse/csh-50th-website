import { cn } from "@/lib/utils";
import { Clock, MapPin } from "lucide-react";
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
            event.type === "main" && "border-8 border-primary/100 glow-csh"
        )}
    >  
        {/* If the user clicks anywhere, then the popup is closed */}
        <button 
            onClick={event.onClose}
            className={cn(
                "w-screen h-screen",
                event.type === "main" && "border-8 border-primary/100 glow-csh"
            )}
        >
            <div
                className={cn(
                "z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto flex flex-wrap border-4 border-csh-magenta p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] bg-pink-300",
                event.type === "main" && "border-8 border-primary/100 glow-csh"
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
                    <h3 className="text-xl font-display font-semibold">
                        {event.title}
                    </h3>
                    <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium border",
                        event.typeColors[event.type]
                    )}>
                        {event.type === "main" ? "Main Event" : event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                    </div>
                    <p className="text-csh-foreground mb-3 text-csh-magenta">
                    {event.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-csh-magenta font-semibold">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                    </div>
                </div>
                </div>
            </div>
        </button>
    </div>
  );
};