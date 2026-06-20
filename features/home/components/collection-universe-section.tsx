import React from "react";
import { Ticket, Lock, Globe } from "lucide-react";
import { HOME_SHOWCASE_CONFIG } from "@/config/home-showcase";

export function CollectionUniverseSection() {
  const { activeEvent } = HOME_SHOWCASE_CONFIG.hero;
  const { futureUniverseEvents } = HOME_SHOWCASE_CONFIG;

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-slate-950 border-t border-slate-900/50 overflow-hidden">
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase flex items-center gap-3 sm:gap-4">
              <Globe className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-slate-700" />
              The Universe
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-400">
              Passivoo is the singular digital passport for the world's most prestigious events. 
              The archive is continually expanding.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          
          {/* Active Collection Card */}
          <div className="relative group p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-amber-500/30 bg-amber-500/5 overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.05)]">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-50" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-4 sm:mb-6 shadow-[0_0_15px_rgba(245,158,11,0.2)] text-amber-500">
                  <Ticket size={18} className="sm:w-5 sm:h-5" strokeWidth={2} />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-2">
                  World Cup 2026
                </h3>
                <p className="text-sm sm:text-base text-slate-400 font-medium">
                  The inaugural collection. Live drops happening now across host cities.
                </p>
              </div>
              <div className="mt-6 sm:mt-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold tracking-widest text-amber-500 uppercase">
                  <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-amber-500"></span>
                  </span>
                  Active Now
                </span>
              </div>
            </div>
          </div>

          {/* Future Collections Cards */}
          {futureUniverseEvents.map((event, idx) => (
            <div 
              key={idx}
              className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/30 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-30" />
              
              <div className="relative z-10 flex flex-col h-full justify-between opacity-60 hover:opacity-100 transition-opacity duration-300">
                <div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 sm:mb-6 text-slate-500 shadow-inner">
                    <Lock size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-300 uppercase tracking-tight mb-2">
                    {event.name}
                  </h3>
                </div>
                <div className="mt-6 sm:mt-8">
                  <span className="inline-flex rounded-full border border-slate-700 bg-slate-800/50 px-2.5 py-1 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold tracking-widest text-slate-400 uppercase">
                    {event.status}
                  </span>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}