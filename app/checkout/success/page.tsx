"use client";

import React, { useEffect } from "react";
import { finalizeCheckout } from "@/features/premium/actions/finalize-checkout";
import { Loader2, PackageCheck } from "lucide-react";

export default function CheckoutSuccessPage() {
  useEffect(() => {
    // Wait exactly 3 seconds to ensure the webhook transaction has committed,
    // then trigger the server-side cache bust and redirect.
    const timer = setTimeout(() => {
      finalizeCheckout();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <section className="w-full max-w-md relative group">
        
        <div className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
          
          {/* Subtle noise texture */}
          <div 
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Inner Prestige Framing */}
          <div className="absolute inset-3 border border-white/5 rounded-2xl pointer-events-none z-0" />
          
          {/* Corner Foil Ornaments */}
          <div className="absolute top-5 left-5 w-4 h-4 border-t border-l border-amber-500/40 rounded-tl-sm pointer-events-none z-0" />
          <div className="absolute top-5 right-5 w-4 h-4 border-t border-r border-amber-500/40 rounded-tr-sm pointer-events-none z-0" />
          <div className="absolute bottom-5 left-5 w-4 h-4 border-b border-l border-amber-500/40 rounded-bl-sm pointer-events-none z-0" />
          <div className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-amber-500/40 rounded-br-sm pointer-events-none z-0" />

          {/* Radial Spotlight Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] md:w-3/4 h-48 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-zinc-900/0 to-transparent pointer-events-none" />
          
          {/* Icon Centerpiece */}
          <div className="relative z-10 mb-8 mt-2">
            <div className="w-20 h-20 bg-gradient-to-b from-zinc-800 to-zinc-950 border border-zinc-700 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.15)] ring-4 ring-zinc-950">
              <div className="absolute inset-1 border border-amber-500/20 rounded-full" />
              <PackageCheck className="text-amber-500 drop-shadow-md" size={32} strokeWidth={1.5} />
            </div>
          </div>

          <div className="space-y-4 relative z-10 mb-8">
            <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-amber-500/90 uppercase font-bold">
              Payment Successful
            </span>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase drop-shadow-sm px-2">
              Securing Your Collector's Artifacts
            </h2>
            
            <div className="flex items-center justify-center gap-3 pt-4 text-zinc-400 font-mono text-xs uppercase tracking-widest">
              <Loader2 size={16} className="animate-spin text-amber-500" />
              <span>Updating Vault...</span>
            </div>
          </div>
          
        </div>
      </section>
    </main>
  );
}