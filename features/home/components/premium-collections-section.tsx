import React from "react";
import { HOME_SHOWCASE_CONFIG } from "@/config/home-showcase";
import { PremiumDropStamp } from "@/features/drops/components/premium-drop-stamp";

export function PremiumCollectionsSection() {
  const { premiumShowcaseDrops } = HOME_SHOWCASE_CONFIG;

  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-slate-950 border-t border-slate-900/50">
      
      {/* Museum Spotlight Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] md:w-[80%] h-[400px] md:h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-900/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] md:w-[40%] h-[200px] md:h-[300px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <p className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-amber-500 uppercase mb-3 sm:mb-4">
            The Highest Tier
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white uppercase drop-shadow-sm leading-tight">
            Collector's Editions
          </h2>
          <p className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto px-2 font-medium">
            Exclusive, ultra-limited artifacts minted for the most historic moments.
            Once the window closes, they are sealed in the archive forever.
          </p>
        </div>

        {/* Premium Exhibition Grid - Responsive */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
          {premiumShowcaseDrops.map((drop, idx) => (
            <div 
              key={drop.id} 
              className="relative group"
            >
              {/* Individual Spotlight Glow */}
              <div className="absolute -inset-6 sm:-inset-8 md:-inset-10 bg-amber-500/0 group-hover:bg-amber-500/5 rounded-full blur-2xl transition-colors duration-700 pointer-events-none" />
              
              {/* The Artifact */}
              <div className="relative z-10 pointer-events-none">
                <PremiumDropStamp 
                  name={drop.name}
                  category={drop.category}
                  rarity={drop.rarity}
                  theme={drop.theme}
                  size={idx === 1 && premiumShowcaseDrops.length >= 3 ? "lg" : "md"}
                />
              </div>

              {/* Physical Shelf Reflection */}
              <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-[60%] sm:w-[80%] h-1.5 sm:h-2 bg-amber-500/20 blur-md rounded-[100%] pointer-events-none" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}