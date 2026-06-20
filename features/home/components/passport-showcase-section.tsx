import React from "react";
import { HOME_SHOWCASE_CONFIG } from "@/config/home-showcase";
import { DropStamp } from "@/features/drops/components/drop-stamp";
import { PremiumDropStamp } from "@/features/drops/components/premium-drop-stamp";

export function PassportShowcaseSection() {
  const { showcaseDrops, premiumShowcaseDrops } = HOME_SHOWCASE_CONFIG;

  return (
    <section className="relative w-full py-24 overflow-hidden bg-slate-950 border-y border-slate-900/50">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mb-16 text-center">
        <h2 className="text-sm font-mono tracking-[0.2em] text-amber-500 uppercase mb-4">
          The Vault
        </h2>
        <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
          Every Event Leaves A Mark
        </h3>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-lg">
          Stadiums, cities, historic moments, and limited collector's editions dropped in real-time.
        </p>
      </div>

      {/* INFINITE MARQUEE WRAPPER */}
      <div className="relative w-full flex flex-col gap-12 sm:gap-16">
        
        {/* CSS Keyframes for Marquee */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          /* Slowed down slightly since the total width is now larger on desktop */
          .animate-marquee-left { animation: marquee-left 45s linear infinite; }
          .animate-marquee-right { animation: marquee-right 55s linear infinite; }
          
          /* Pause on hover for interaction */
          .pause-on-hover:hover { animation-play-state: paused; }
        `}} />

        {/* TOP ROW: Free Passport Drops (Moving Left) */}
        <div className="flex w-max animate-marquee-left pause-on-hover items-center">
          {/* UPDATED: Increased gap and padding-right for md and lg screens */}
          <div className="flex gap-6 md:gap-12 lg:gap-16 pr-6 md:pr-12 lg:pr-16">
            {showcaseDrops.map((drop, idx) => (
              <div key={`t1-${idx}`} className="shrink-0 pointer-events-none">
                <DropStamp {...drop} size="md" isRevealed={true} />
              </div>
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex gap-6 md:gap-12 lg:gap-16 pr-6 md:pr-12 lg:pr-16" aria-hidden="true">
            {showcaseDrops.map((drop, idx) => (
              <div key={`t2-${idx}`} className="shrink-0 pointer-events-none">
                <DropStamp {...drop} size="md" isRevealed={true} />
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM ROW: Premium Archives (Moving Right) */}
        <div className="flex w-max animate-marquee-right pause-on-hover items-center mt-4 md:mt-8">
          {/* UPDATED: Increased gap and padding-right significantly for premium items to showcase them better */}
          <div className="flex gap-8 md:gap-16 lg:gap-24 pr-8 md:pr-16 lg:pr-24">
            {premiumShowcaseDrops.map((drop, idx) => (
              <div key={`b1-${idx}`} className="shrink-0 pointer-events-none">
                <PremiumDropStamp {...drop} size="md" />
              </div>
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex gap-8 md:gap-16 lg:gap-24 pr-8 md:pr-16 lg:pr-24" aria-hidden="true">
            {premiumShowcaseDrops.map((drop, idx) => (
              <div key={`b2-${idx}`} className="shrink-0 pointer-events-none">
                <PremiumDropStamp {...drop} size="md" />
              </div>
            ))}
          </div>
        </div>

        {/* Edge Fade Gradients (Creates the "Emerging from shadows" effect) */}
        <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-20" />

      </div>
    </section>
  );
}