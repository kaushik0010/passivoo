"use client";

import { useState, useEffect } from "react";
import { Clock, RefreshCw } from "lucide-react";

interface CountdownTimerProps {
  targetIsoString: string | null;
  title?: string;
  readyTitle?: string;
  readySubtitle?: string;
}

export function CountdownTimer({ 
  targetIsoString,
  title = "Next Drops Available In",
  readyTitle = "Drops Available Now!",
  readySubtitle = "The next match window has opened."
}: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ hours: string; minutes: string; seconds: string } | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!targetIsoString) return;

    const targetDate = new Date(targetIsoString).getTime();

    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsReady(true);
        setTimeLeft(null);
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetIsoString]);

  if (!mounted) {
    return <div className="h-32 flex items-center justify-center opacity-0">Loading timer...</div>;
  }

  if (!targetIsoString) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 border border-white/5 rounded-xl bg-black/20 text-center">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Tournament Complete</h3>
        <p className="text-zinc-500 text-sm">No future drops are currently scheduled.</p>
      </div>
    );
  }

  if (isReady) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 border border-amber-500/20 rounded-xl bg-amber-500/5 text-center">
        <div className="w-14 h-14 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 border border-amber-500/30">
          <Clock className="text-amber-400" size={28} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{readyTitle}</h3>
        <p className="text-zinc-400 text-sm mb-6">{readySubtitle}</p>
        <button 
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 bg-amber-500 text-black font-bold py-2.5 px-6 rounded-lg text-sm hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.15)]"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 border border-white/5 rounded-2xl bg-black/20 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-amber-500/5 blur-2xl pointer-events-none" />
      
      <p className="text-zinc-500 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-5 sm:mb-6 text-center">
        {title}
      </p>
      
      <div className="flex items-center gap-3 sm:gap-4 md:gap-5 font-mono">
        {/* Hours */}
        <div className="flex flex-col items-center gap-2">
          <div className="bg-slate-950 border border-white/10 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center shadow-inner shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tighter">
              {timeLeft?.hours || "00"}
            </span>
          </div>
          <span className="text-[8px] sm:text-[10px] uppercase text-zinc-600 tracking-wider">Hours</span>
        </div>

        <span className="text-xl sm:text-2xl text-zinc-700 pb-6">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center gap-2">
          <div className="bg-slate-950 border border-white/10 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center shadow-inner shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tighter">
              {timeLeft?.minutes || "00"}
            </span>
          </div>
          <span className="text-[8px] sm:text-[10px] uppercase text-zinc-600 tracking-wider">Mins</span>
        </div>

        <span className="text-xl sm:text-2xl text-zinc-700 pb-6">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center gap-2">
          <div className="bg-slate-950 border border-white/10 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center shadow-inner shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tighter">
              {timeLeft?.seconds || "00"}
            </span>
          </div>
          <span className="text-[8px] sm:text-[10px] uppercase text-zinc-600 tracking-wider">Secs</span>
        </div>
      </div>
    </div>
  );
}