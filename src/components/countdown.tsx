"use client";

import { useState, useEffect } from "react";

type CountdownProps = {
  targetDate: string;
};

function calcTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <div className="flex gap-6 justify-center">
      {[
        { label: "Tage", value: timeLeft.days },
        { label: "Std", value: timeLeft.hours },
        { label: "Min", value: timeLeft.minutes },
        { label: "Sek", value: timeLeft.seconds },
      ].map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <span className="font-display text-4xl tabular-nums" suppressHydrationWarning>{String(value).padStart(2, "0")}</span>
          <span className="text-xs uppercase tracking-widest text-charcoal/40 mt-1">{label}</span>
        </div>
      ))}
    </div>
  );
}
