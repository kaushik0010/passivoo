import React from "react";
import { getCurrentUser } from "@/features/auth/actions/get-current-user";
import { getPassportData } from "@/features/collections/queries/get-passport-data";
import { getPremiumVaultData } from "@/features/collections/queries/get-premium-vault-data";

// Existing Components
import { CollectionHeader } from "@/features/collections/components/collection-header";
import { EmptyVaultState } from "@/features/collections/components/empty-vault-state";
import { InfiniteScrollGrid } from "@/features/collections/components/infinite-scroll-grid";
import { DropStamp } from "@/features/drops/components/drop-stamp";
import { PremiumDropStamp } from "@/features/drops/components/premium-drop-stamp";

// NEW: Artifact Viewer
import { ArtifactViewerModal } from "@/features/collections/components/artifact-viewer-modal";

import { DropCategory, DropRarity } from "@/features/drops/types/drop.types";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Collection",
  description: "View your personal vault of digital artifacts, event stamps, and collector history.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CollectionsPage() {
  const authSession = await getCurrentUser();
  const userId = authSession?.user?.id;

  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-zinc-500 font-mono text-sm">
        Authentication routing context missing.
      </div>
    );
  }

  const [passportData, premiumVaultData] = await Promise.all([
    getPassportData({ userId, cursor: null }),
    getPremiumVaultData({ userId }),
  ]);

  const isAbsoluteEmpty = 
    passportData.collectibles.length === 0 && 
    premiumVaultData.length === 0;

  return (
    <main className="relative flex w-full flex-col items-center overflow-hidden bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 min-h-screen">
      
      {/* Vault Ambient Lighting - Matching Home & Drops Pages */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[120px] md:h-[800px] md:w-[800px]" />
      <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-900/5 blur-[120px] md:h-[800px] md:w-[800px]" />
      
      {/* Subtle Noise Texture Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Content Container - Removed max-w-md constraint */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 lg:py-12 space-y-10 sm:space-y-12 md:space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-amber-500 uppercase">
            My Collection
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
            Passport Vault
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Your permanent archive of global event artifacts.
          </p>
        </div>

        <CollectionHeader stats={passportData.stats} />

        {isAbsoluteEmpty ? (
          <div className="pt-4">
            <EmptyVaultState />
          </div>
        ) : (
          <div className="space-y-16 sm:space-y-20 md:space-y-24">
            
            {/* SECTION 1: PREMIUM ARCHIVES */}
            <section className="relative">
              {/* Section ambient glow */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-amber-500/5 blur-3xl pointer-events-none" />
              
              <div className="relative bg-black/40 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-2xl border border-white/5 shadow-xl overflow-hidden">
                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-amber-500/30 rounded-tl-sm pointer-events-none" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-amber-500/30 rounded-tr-sm pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-amber-500/30 rounded-bl-sm pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-amber-500/30 rounded-br-sm pointer-events-none" />
                
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-amber-500 uppercase backdrop-blur-sm mb-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                      </span>
                      Premium Collection
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase flex items-center gap-2">
                      Premium Archives
                    </h2>
                    <p className="text-xs text-zinc-400 font-mono uppercase tracking-widest mt-1">
                      Collector's Edition Artifacts
                    </p>
                  </div>
                  <div className="text-xs font-mono text-zinc-500 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-800/50 backdrop-blur-sm">
                    {premiumVaultData.length} Item{premiumVaultData.length !== 1 ? 's' : ''}
                  </div>
                </header>

                {premiumVaultData.length === 0 ? (
                  <div className="w-full py-10 sm:py-12 px-6 rounded-xl border border-dashed border-amber-500/20 bg-amber-500/5 text-center flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                      <span className="text-2xl">💎</span>
                    </div>
                    <p className="text-sm text-zinc-400 font-medium mb-2">No premium artifacts in your vault.</p>
                    <p className="text-xs text-zinc-500 font-mono mb-5">Unlock exclusive collector's editions from the storefront.</p>
                    <a href="/drops" className="text-xs font-bold uppercase tracking-wider text-amber-500 hover:text-amber-400 transition-colors bg-amber-500/10 hover:bg-amber-500/20 px-6 py-2.5 rounded-lg border border-amber-500/20 cursor-pointer">
                      Explore Storefront
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center sm:justify-start">
                    {premiumVaultData.map((premiumDrop) => (
                      <ArtifactViewerModal key={premiumDrop.id} item={premiumDrop}>
                        <div className="shrink-0 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                          <PremiumDropStamp
                            name={premiumDrop.name}
                            category={premiumDrop.category}
                            rarity={premiumDrop.rarity}
                            theme={premiumDrop.theme}
                          />
                        </div>
                      </ArtifactViewerModal>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 2: TOURNAMENT PASSPORT (Free) */}
            <section className="relative">
              <div className="relative bg-black/40 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-2xl border border-white/5 shadow-xl overflow-hidden">
                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-amber-500/30 rounded-tl-sm pointer-events-none" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-amber-500/30 rounded-tr-sm pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-amber-500/30 rounded-bl-sm pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-amber-500/30 rounded-br-sm pointer-events-none" />
                
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-amber-500 uppercase backdrop-blur-sm mb-2">
                      <span className="text-sm">🎫</span>
                      Live Collection
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase flex items-center gap-2">
                      Tournament Passport
                    </h2>
                    <p className="text-xs text-zinc-400 font-mono uppercase tracking-widest mt-1">
                      Live Match Souvenirs & Event Badges
                    </p>
                  </div>
                  <div className="text-xs font-mono text-zinc-500 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-800/50 backdrop-blur-sm">
                    {passportData.collectibles.length} Item{passportData.collectibles.length !== 1 ? 's' : ''}
                  </div>
                </header>

                {passportData.collectibles.length === 0 ? (
                  <div className="w-full py-12 sm:py-16 text-center border border-dashed border-white/5 rounded-xl bg-black/20 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-amber-500/5 border border-amber-500/10 flex items-center justify-center mb-4">
                      <span className="text-3xl">🏛️</span>
                    </div>
                    <p className="text-slate-300 font-medium text-base">Your passport is empty</p>
                    <p className="text-sm text-zinc-500 mt-1 max-w-sm">
                      Claim your first souvenir stamp from today's live drops.
                    </p>
                    <a href="/drops" className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-200 shadow-[0_0_30px_rgba(245,158,11,0.15)] active:scale-[0.98] cursor-pointer">
                      View Today's Drops
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 md:gap-6 justify-items-center w-full">
                      
                      {passportData.collectibles.map((drop) => (
                        <ArtifactViewerModal key={drop.id} item={drop}>
                          <div className="transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                            <DropStamp
                              name={drop.name}
                              category={drop.category as DropCategory}
                              rarity={drop.rarity as DropRarity}
                              points={drop.points}
                              isRevealed={true}
                            />
                          </div>
                        </ArtifactViewerModal>
                      ))}

                      {/* FIXED: Removed the wrapping div completely. The component handles its own grid spanning now. */}
                      <InfiniteScrollGrid 
                        initialNextCursor={passportData.nextCursor} 
                        initialHasMore={passportData.hasMore} 
                      />
                      
                    </div>
                  </>
                )}
              </div>
            </section>

          </div>
        )}
      </div>
    </main>
  );
}