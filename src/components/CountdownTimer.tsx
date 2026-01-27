import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const EVENT_DATE = new Date("2026-04-10T09:00:00");

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = EVENT_DATE.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="flex gap-3 md:gap-6 justify-center">
      {timeBlocks.map((block, index) => (
        <div key={block.label} className="flex flex-col items-center">
          <div className="glass rounded-xl p-3 md:p-6 min-w-[60px] md:min-w-[100px]">
            <span className="text-2xl md:text-5xl font-display font-bold text-gradient">
              {block.value.toString().padStart(2, "0")}
            </span>
          </div>
          <span className="mt-2 text-xs md:text-sm text-muted-foreground font-medium">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}
