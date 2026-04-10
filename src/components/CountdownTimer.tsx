import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date | string;
  currentTime?: Date;
  compact?: boolean;
}

export function CountdownTimer({ targetDate, currentTime, compact = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const eventDate = typeof targetDate === "string" ? new Date(targetDate) : targetDate;

    const calculateTimeLeft = (nowDate: Date) => {
      const difference = eventDate.getTime() - nowDate.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    if (currentTime) {
      calculateTimeLeft(currentTime);
      return;
    }

    calculateTimeLeft(new Date());
    const timer = setInterval(() => calculateTimeLeft(new Date()), 1000);

    return () => clearInterval(timer);
  }, [targetDate, currentTime]);

  const timeBlocks = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className={`flex ${compact ? "gap-2 md:gap-3" : "gap-3 md:gap-6"} justify-center`}>
      {timeBlocks.map((block, index) => (
        <div key={block.label} className="flex flex-col items-center">
          <div className={`glass rounded-xl flex items-center justify-center text-center ${compact ? "px-2 py-2 md:px-3 md:py-2 min-w-[52px] md:min-w-[68px]" : "p-3 md:p-6 min-w-[60px] md:min-w-[100px]"}`}>
            <span className={`${compact ? "text-lg md:text-2xl" : "text-2xl md:text-5xl"} block w-full text-center font-display font-bold text-gradient`}>
              {block.value.toString().padStart(2, "0")}
            </span>
          </div>
          <span className={`${compact ? "mt-1 text-[10px] md:text-xs" : "mt-2 text-xs md:text-sm"} text-muted-foreground font-medium`}>
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}
