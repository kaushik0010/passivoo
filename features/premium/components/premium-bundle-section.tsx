"use client";

import React from "react";
import { PremiumStorefrontStateDto } from "@/features/premium/queries/get-active-premium-bundle";
import { PremiumDropStamp } from "@/features/drops/components/premium-drop-stamp";
import { CountdownTimer } from "@/features/drops/components/countdown-timer";
import { CheckoutCTA } from "./checkout-cta";
import { DropCategory, DropRarity } from "@/features/drops/types/drop.types";
import { PremiumTheme } from "@/config/premium.constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Lock, Sparkles, PackageOpen, Crown, Diamond } from "lucide-react";

export interface PremiumBundleSectionProps {
  state: PremiumStorefrontStateDto | null;
}

export function PremiumBundleSection({ state }: PremiumBundleSectionProps) {
  if (!state || (!state.activeBundle && !state.nextUnlockAt)) {
    return null; 
  }

  if (state.activeBundle) {
    const bundle = state.activeBundle;
    const safeTheme = bundle.theme || PremiumTheme.GROUP_STAGE_THEME;
    const priceFormatted = (bundle.priceCents / 100).toFixed(2);

    return (
      <Dialog>
        {/* THE TEASER CARD */}
        <section className="w-full relative group">
          <div className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
            
            {/* ==========================================
                PREMIUM PRESTIGE BACKGROUND
                Diamond/Geometric pattern for premium vibe
                ========================================== */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Large diamond shapes */}
              <div className="absolute -top-32 -left-32 w-64 h-64 rotate-45 border border-amber-500/5" />
              <div className="absolute -top-24 -left-24 w-48 h-48 rotate-45 border border-amber-500/8" />
              <div className="absolute -top-16 -left-16 w-32 h-32 rotate-45 border border-amber-500/12" />
              
              <div className="absolute -bottom-32 -right-32 w-64 h-64 rotate-45 border border-amber-500/5" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 rotate-45 border border-amber-500/8" />
              <div className="absolute -bottom-16 -right-16 w-32 h-32 rotate-45 border border-amber-500/12" />
              
              {/* Medium diamonds */}
              <div className="absolute -top-20 right-12 w-40 h-40 rotate-45 border border-gold-500/5" />
              <div className="absolute -top-12 right-20 w-24 h-24 rotate-45 border border-gold-500/8" />
              <div className="absolute -bottom-20 left-12 w-40 h-40 rotate-45 border border-gold-500/5" />
              <div className="absolute -bottom-12 left-20 w-24 h-24 rotate-45 border border-gold-500/8" />
              
              {/* Decorative diamonds using Lucide */}
              <div className="absolute top-8 right-16 opacity-20">
                <Diamond className="h-3 w-3 text-amber-500/40" />
              </div>
              <div className="absolute bottom-8 left-16 opacity-20">
                <Diamond className="h-3 w-3 text-amber-500/40" />
              </div>
              <div className="absolute top-1/3 left-6 opacity-10">
                <Diamond className="h-4 w-4 text-amber-500/30" />
              </div>
              <div className="absolute top-1/3 right-6 opacity-10">
                <Diamond className="h-4 w-4 text-amber-500/30" />
              </div>
              <div className="absolute top-1/4 right-1/4 opacity-15">
                <Diamond className="h-2 w-2 text-amber-500/30" />
              </div>
              <div className="absolute bottom-1/4 left-1/4 opacity-15">
                <Diamond className="h-2 w-2 text-amber-500/30" />
              </div>
              
              {/* Concentric diamonds */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rotate-45 border border-white/5" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rotate-45 border border-white/5" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rotate-45 border border-white/5" />
              
              {/* Gold shimmer lines */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
              
              {/* Diagonal shimmer streaks */}
              <div className="absolute -top-40 -right-20 w-[400px] h-[400px] rotate-45 bg-gradient-to-br from-amber-500/[0.03] via-transparent to-transparent" />
              <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rotate-45 bg-gradient-to-tl from-amber-500/[0.03] via-transparent to-transparent" />
              
              {/* Subtle gold radial glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-amber-500/10 blur-3xl rounded-full" />
            </div>
            
            {/* Noise texture */}
            <div 
              className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
            
            {/* Inner border frame */}
            <div className="absolute inset-2 sm:inset-3 border border-white/5 rounded-2xl pointer-events-none z-0" />
            
            {/* Corner accents - diamond style */}
            <div className="absolute top-4 sm:top-5 left-4 sm:left-5 w-4 h-4 border-t border-l border-amber-500/40 rounded-tl-sm pointer-events-none z-0 rotate-45" />
            <div className="absolute top-4 sm:top-5 right-4 sm:right-5 w-4 h-4 border-t border-r border-amber-500/40 rounded-tr-sm pointer-events-none z-0 -rotate-45" />
            <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 w-4 h-4 border-b border-l border-amber-500/40 rounded-bl-sm pointer-events-none z-0 -rotate-45" />
            <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5 w-4 h-4 border-b border-r border-amber-500/40 rounded-br-sm pointer-events-none z-0 rotate-45" />

            {/* Top gold glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] md:w-3/4 h-48 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-zinc-900/0 to-transparent pointer-events-none" />
            
            {/* Premium icon with crown */}
            <div className="relative z-10 mb-6 sm:mb-8 mt-2">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-b from-zinc-800 to-zinc-950 border border-zinc-700 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.15)] ring-4 ring-zinc-950">
                <div className="absolute inset-1 border border-amber-500/20 rounded-full" />
                <Crown className="text-amber-500 drop-shadow-md" size={22} strokeWidth={1.5} />
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3 relative z-10 mb-6 sm:mb-8">
              <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-amber-500/90 uppercase font-bold">
                Limited Edition
              </span>
              <h2 className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight text-white uppercase drop-shadow-sm px-4">
                {bundle.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono uppercase tracking-wider">
                {bundle.drops.length} Exclusive Artifacts
              </p>
            </div>

            <div className="flex items-center gap-3 mb-8 sm:mb-10 relative z-10 opacity-60">
              <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-amber-500/50" />
              <Diamond className="w-3 h-3 text-amber-500/80" />
              <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-amber-500/50" />
            </div>

            <DialogTrigger className="relative z-10 group bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 font-bold py-3 sm:py-3.5 px-6 sm:px-10 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-[0_0_30px_rgba(245,158,11,0.2)] flex items-center gap-2.5 text-sm sm:text-base cursor-pointer">
              <PackageOpen size={18} strokeWidth={2} className="opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="uppercase tracking-[0.15em]">View Bundle</span>
            </DialogTrigger>
          </div>
        </section>

        {/* THE VAULT MODAL - Added [&>button]:z-50 to pull the "X" button to the front */}
        <DialogContent className="sm:max-w-4xl lg:max-w-6xl bg-zinc-950 border border-zinc-800/80 rounded-2xl p-0 shadow-2xl focus:outline-none overflow-hidden max-h-[90vh] sm:max-h-[95vh] md:min-h-[75vh] flex flex-col [&>button]:z-50 [&>button]:text-zinc-400 hover:[&>button]:text-white">
          
          {/* ==========================================
              MODAL PREMIUM PRESTIGE BACKGROUND
              ========================================== */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Diamond patterns */}
            <div className="absolute -top-40 -left-40 w-80 h-80 rotate-45 border border-amber-500/5" />
            <div className="absolute -top-32 -left-32 w-64 h-64 rotate-45 border border-amber-500/8" />
            <div className="absolute -bottom-40 -right-40 w-80 h-80 rotate-45 border border-amber-500/5" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 rotate-45 border border-amber-500/8" />
            
            {/* Medium diamonds */}
            <div className="absolute -top-24 right-8 w-56 h-56 rotate-45 border border-gold-500/5" />
            <div className="absolute -bottom-24 left-8 w-56 h-56 rotate-45 border border-gold-500/5" />
            
            {/* Decorative diamonds */}
            <div className="absolute top-12 right-16 opacity-20">
              <Diamond className="h-3 w-3 text-amber-500/40" />
            </div>
            <div className="absolute bottom-12 left-16 opacity-20">
              <Diamond className="h-3 w-3 text-amber-500/40" />
            </div>
            <div className="absolute top-1/3 left-6 opacity-10">
              <Diamond className="h-4 w-4 text-amber-500/30" />
            </div>
            <div className="absolute top-1/3 right-6 opacity-10">
              <Diamond className="h-4 w-4 text-amber-500/30" />
            </div>
            
            {/* Concentric diamonds */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rotate-45 border border-white/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rotate-45 border border-white/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rotate-45 border border-white/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rotate-45 border border-white/5" />
            
            {/* Gold shimmer lines */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            
            {/* Subtle gold radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/8 blur-3xl rounded-full" />
          </div>
          
          {/* Corner accents - diamond style */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-amber-500/30 rounded-tl-sm pointer-events-none z-10 rotate-45" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-amber-500/30 rounded-tr-sm pointer-events-none z-10 -rotate-45" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-amber-500/30 rounded-bl-sm pointer-events-none z-10 -rotate-45" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-amber-500/30 rounded-br-sm pointer-events-none z-10 rotate-45" />
          
          {/* Added pr-12 md:pr-16 so the text doesn't clash with the new clickable X button */}
          <DialogHeader className="relative z-10 p-4 sm:p-5 md:p-8 pr-12 sm:pr-14 md:pr-16 bg-zinc-900/50 border-b border-zinc-800/80 flex flex-col md:flex-row md:items-center md:justify-between text-left space-y-3 md:space-y-0">
            <div>
              <DialogTitle className="text-base sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-white uppercase flex items-center gap-2">
                <Sparkles className="text-amber-500 h-4 w-4 sm:h-5 sm:w-5" size={20} />
                {bundle.name}
              </DialogTitle>
              <p className="text-[10px] sm:text-xs md:text-sm text-zinc-400 font-mono mt-1 uppercase tracking-widest">
                {bundle.theme} Collection • {bundle.drops.length} Items
              </p>
            </div>
            <div className="bg-black/50 border border-white/10 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 sm:gap-3 w-fit">
              <span className="text-[10px] sm:text-xs text-zinc-500 font-mono uppercase tracking-wider">Price</span>
              <span className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">${priceFormatted} <span className="text-xs sm:text-sm text-zinc-500">{bundle.currency.toUpperCase()}</span></span>
            </div>
          </DialogHeader>

          {/* Drops Container - Desktop max-height increased and flex-1 added */}
          <div className="relative z-10 p-3 sm:p-4 md:p-10 overflow-y-auto max-h-[40vh] sm:max-h-[50vh] md:max-h-[75vh] flex-1">
            {/* Museum lighting effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-amber-500/5 blur-3xl pointer-events-none" />
            
            {/* Mobile: Horizontal scroll | Desktop: Centered flex wrap */}
            <div className="flex md:flex-wrap gap-4 sm:gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1 md:justify-center">
              {bundle.drops.map((drop) => {
                const cleanCategory = (drop.category?.toUpperCase() || "SPECIAL") as DropCategory;
                const cleanRarity = (drop.rarity?.toUpperCase() || "COMMON") as DropRarity;

                return (
                  <div key={drop.id} className="snap-start shrink-0 md:shrink flex justify-center">
                    <PremiumDropStamp
                      name={drop.name || "Unknown Artifact"}
                      category={cleanCategory}
                      rarity={cleanRarity}
                      theme={safeTheme}
                      size="md"
                    />
                  </div>
                );
              })}
            </div>
            
            {/* Scroll hint gradients - only on mobile */}
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none md:hidden" />
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none md:hidden" />
          </div>

          <DialogFooter className="relative z-10 p-3 sm:p-4 md:p-6 bg-zinc-900/50 border-t border-zinc-800/80 flex flex-col-reverse sm:flex-row items-center sm:justify-between gap-3 sm:gap-4 mt-auto">
            <DialogClose asChild>
              <button className="w-full sm:w-auto bg-zinc-800 text-white hover:bg-zinc-700 font-bold py-2.5 sm:py-3 sm:py-3.5 px-4 sm:px-6 md:px-10 rounded-xl transition-colors text-xs sm:text-sm uppercase tracking-wider cursor-pointer">
                Close Preview
              </button>
            </DialogClose>
            <div className="w-full sm:w-auto">
              <CheckoutCTA bundleId={bundle.id} />
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  // Waiting Room State
  if (state.nextUnlockAt) {
    return (
      <section className="w-full relative">
        <div className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center">
          
          {/* ==========================================
              WAITING ROOM PRESTIGE BACKGROUND
              ========================================== */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Diamond patterns */}
            <div className="absolute -top-32 -left-32 w-64 h-64 rotate-45 border border-amber-500/5" />
            <div className="absolute -top-24 -left-24 w-48 h-48 rotate-45 border border-amber-500/8" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 rotate-45 border border-amber-500/5" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rotate-45 border border-amber-500/8" />
            
            {/* Decorative diamonds */}
            <div className="absolute top-8 right-16 opacity-20">
              <Diamond className="h-3 w-3 text-amber-500/40" />
            </div>
            <div className="absolute bottom-8 left-16 opacity-20">
              <Diamond className="h-3 w-3 text-amber-500/40" />
            </div>
            
            {/* Concentric diamonds */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rotate-45 border border-white/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] rotate-45 border border-white/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rotate-45 border border-white/5" />
            
            {/* Subtle gold radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-amber-500/8 blur-3xl rounded-full" />
          </div>
          
          {/* Inner border frame */}
          <div className="absolute inset-2 sm:inset-3 border border-white/5 rounded-2xl pointer-events-none z-0" />
          
          {/* Corner accents - diamond style */}
          <div className="absolute top-4 sm:top-5 left-4 sm:left-5 w-4 h-4 border-t border-l border-amber-500/30 rounded-tl-sm pointer-events-none z-0 rotate-45" />
          <div className="absolute top-4 sm:top-5 right-4 sm:right-5 w-4 h-4 border-t border-r border-amber-500/30 rounded-tr-sm pointer-events-none z-0 -rotate-45" />
          <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 w-4 h-4 border-b border-l border-amber-500/30 rounded-bl-sm pointer-events-none z-0 -rotate-45" />
          <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5 w-4 h-4 border-b border-r border-amber-500/30 rounded-br-sm pointer-events-none z-0 rotate-45" />
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-zinc-900/0 to-transparent pointer-events-none" />
          
          <div className="relative z-10 w-full max-w-lg mx-auto">
            <div className="mb-4 sm:mb-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-amber-500 uppercase backdrop-blur-sm mb-3">
                <Lock className="h-3 w-3" />
                Premium Collection
              </div>
            </div>
            <CountdownTimer 
              targetIsoString={state.nextUnlockAt} 
              title="Next Collector's Bundle Unlocks In"
              readyTitle="Bundle Available Now!"
              readySubtitle="The next premium collection has unlocked."
            />
          </div>
          
        </div>
      </section>
    );
  }

  return null;
}