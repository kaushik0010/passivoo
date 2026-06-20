"use client";

import { useState } from "react";
import { ActiveDropsDataDto } from "@/features/drops/queries/get-active-drops-data";
import { RecentDropResult } from "@/features/collections/queries/get-recent-drops";
import { DropStamp } from "@/features/drops/components/drop-stamp";
import { DropCategory, DropRarity, DropIcon } from "../types/drop.types";
import { ClaimResponseDto, ClaimedDropDto } from "@/app/api/drops/claim/route";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { RecentCollectionCarousel } from "./recent-collection-carousel";
import { CountdownTimer } from "./countdown-timer";
import { Ticket, Sparkles, Circle } from "lucide-react";

export interface DropsClientManagerProps {
  initialActiveData: ActiveDropsDataDto;
  initialRecentDrops: RecentDropResult[];
}

export function DropsClientManager({
  initialActiveData,
  initialRecentDrops,
}: DropsClientManagerProps) {
  const [activeData, setActiveData] = useState<ActiveDropsDataDto>(initialActiveData);
  const [recentDrops, setRecentDrops] = useState<RecentDropResult[]>(initialRecentDrops);

  const [newlyClaimedDrops, setNewlyClaimedDrops] = useState<ClaimedDropDto[]>([]);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [vaultPulse, setVaultPulse] = useState<number>(0);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 640px)");

  const allClaimableDrops = activeData.activeMatches.flatMap(
    (match) => match.claimableDrops
  );

  const handleClaimDrops = async () => {
    if (allClaimableDrops.length === 0 || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/drops/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error(`Claim request failed with status: ${response.status}`);

      const data: ClaimResponseDto = await response.json();

      if (data.claimedCount > 0) {
        setNewlyClaimedDrops(data.claimedDrops);
        setIsRewardModalOpen(true);

        setActiveData((prev) => ({
          ...prev,
          activeMatches: prev.activeMatches.map((match) => ({
            ...match,
            claimableDrops: [],
          })),
        }));
      } else {
        setError("No new drops were available to claim.");
      }
    } catch (err: any) {
      console.error("[CLAIM_FLOW_ERROR]:", err);
      setError(err.message || "An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsRewardModalOpen(false);

    const mappedNewDrops: RecentDropResult[] = newlyClaimedDrops.map((drop) => ({
      id: `${drop.id}_${Date.now()}`,
      dropId: drop.id,
      name: drop.name,
      category: drop.category as DropCategory,
      rarity: drop.rarity as DropRarity,
      icon: drop.icon as DropIcon,
      points: drop.points,
      claimedAt: new Date(),
    }));

    setRecentDrops((prev) => {
      const combined = [...mappedNewDrops, ...prev];
      return combined.slice(0, 5);
    });
    
    setVaultPulse(Date.now());

    setTimeout(() => {
      setNewlyClaimedDrops([]);
    }, 300);
  };

  const renderRewardContent = () => (
    <div className="relative flex flex-col items-center w-full overflow-hidden">
      
      {/* ==========================================
          CURVICAL DESIGN BACKGROUND FOR REWARD MODAL
          ========================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large sweeping curves */}
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full border border-amber-500/5" />
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full border border-amber-500/8" />
        <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full border border-amber-500/12" />
        
        <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full border border-amber-500/5" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full border border-amber-500/8" />
        <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full border border-amber-500/12" />
        
        {/* Medium curves */}
        <div className="absolute -top-20 right-8 w-40 h-40 rounded-full border border-blue-500/5" />
        <div className="absolute -top-12 right-16 w-24 h-24 rounded-full border border-blue-500/8" />
        <div className="absolute -bottom-20 left-8 w-40 h-40 rounded-full border border-blue-500/5" />
        <div className="absolute -bottom-12 left-16 w-24 h-24 rounded-full border border-blue-500/8" />
        
        {/* Decorative circles using Lucide */}
        <div className="absolute top-8 right-12 opacity-20">
          <Circle className="h-2 w-2 text-amber-500/40" />
        </div>
        <div className="absolute bottom-8 left-12 opacity-20">
          <Circle className="h-3 w-3 text-amber-500/40" />
        </div>
        <div className="absolute top-1/3 left-4 opacity-10">
          <Circle className="h-4 w-4 text-amber-500/30" />
        </div>
        <div className="absolute top-1/3 right-4 opacity-10">
          <Circle className="h-4 w-4 text-amber-500/30" />
        </div>
        <div className="absolute top-1/4 right-1/3 opacity-15">
          <Circle className="h-1.5 w-1.5 text-amber-500/30" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 opacity-15">
          <Circle className="h-1.5 w-1.5 text-amber-500/30" />
        </div>
        
        {/* Diagonal sweeping lines */}
        <div className="absolute -top-32 -right-16 w-[400px] h-[400px] rotate-45 bg-gradient-to-br from-amber-500/[0.02] to-transparent rounded-full" />
        <div className="absolute -bottom-32 -left-16 w-[400px] h-[400px] rotate-45 bg-gradient-to-tl from-blue-500/[0.02] to-transparent rounded-full" />
        
        {/* Concentric arc details */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full border border-white/5" />
        
        {/* Subtle radial glow in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-amber-500/5 blur-3xl rounded-full" />
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-amber-500/30 rounded-tl-sm pointer-events-none z-10" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-amber-500/30 rounded-tr-sm pointer-events-none z-10" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-amber-500/30 rounded-bl-sm pointer-events-none z-10" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-amber-500/30 rounded-br-sm pointer-events-none z-10" />

      <div className="relative z-10 text-center space-y-2 mb-6">
        <span className="text-xs font-bold tracking-[0.25em] text-amber-400 uppercase font-mono block">
          Unlocks Complete
        </span>
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase">
          Items Secured!
        </h3>
        <p className="text-xs md:text-sm text-zinc-400 max-w-sm mx-auto">
          Your items have been safely minted and added directly to your digital vault profile.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto py-4 px-2 overflow-y-auto max-h-[50vh] scrollbar-thin">
        {newlyClaimedDrops.map((drop) => (
          <DropStamp
            key={drop.id}
            name={drop.name}
            category={drop.category as DropCategory}
            rarity={drop.rarity as DropRarity}
            points={drop.points}
            size="md"
            isRevealed={true}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-xs mt-8 pb-4 md:pb-0">
        <button
          onClick={handleCloseModal}
          className="w-full bg-amber-500 text-black hover:bg-amber-400 font-bold py-3.5 px-6 rounded-xl transition-all duration-200 active:scale-[0.98] text-center uppercase tracking-wider text-sm shadow-[0_0_20px_rgba(245,158,11,0.15)] cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Determine drop size based on screen
  const getDropSize = () => {
    if (isDesktop) return "lg";
    return "md"; // tablet and mobile use md
  };

  return (
    <div className="space-y-10 sm:space-y-12 md:space-y-16 pb-8 sm:pb-12">
      
      {/* SECTION 1: CLAIM / COUNTDOWN AREA */}
      <section className="relative">
        {/* Ambient glow behind the section */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-amber-500/5 blur-3xl pointer-events-none" />
        
        <div className="relative bg-black/40 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-2xl border border-white/5 shadow-xl overflow-hidden">
          
          {/* ==========================================
              CURVICAL DESIGN BACKGROUND
              Pure CSS geometric curves with Lucide icons
              ========================================== */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Large sweeping curve - top left */}
            <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full border border-amber-500/5" />
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full border border-amber-500/8" />
            <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full border border-amber-500/12" />
            
            {/* Large sweeping curve - bottom right */}
            <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full border border-amber-500/5" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full border border-amber-500/8" />
            <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full border border-amber-500/12" />
            
            {/* Medium curves - top right */}
            <div className="absolute -top-20 right-20 w-40 h-40 rounded-full border border-blue-500/5" />
            <div className="absolute -top-12 right-28 w-24 h-24 rounded-full border border-blue-500/8" />
            
            {/* Medium curves - bottom left */}
            <div className="absolute -bottom-20 left-20 w-40 h-40 rounded-full border border-blue-500/5" />
            <div className="absolute -bottom-12 left-28 w-24 h-24 rounded-full border border-blue-500/8" />
            
            {/* Decorative circles using Lucide */}
            <div className="absolute top-8 right-12 opacity-20">
              <Circle className="h-2 w-2 text-amber-500/40" />
            </div>
            <div className="absolute bottom-8 left-12 opacity-20">
              <Circle className="h-3 w-3 text-amber-500/40" />
            </div>
            <div className="absolute top-1/2 left-6 opacity-10">
              <Circle className="h-4 w-4 text-amber-500/30" />
            </div>
            <div className="absolute top-1/2 right-6 opacity-10">
              <Circle className="h-4 w-4 text-amber-500/30" />
            </div>
            
            {/* Diagonal sweeping lines */}
            <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rotate-45 bg-gradient-to-br from-amber-500/[0.02] to-transparent rounded-full" />
            <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rotate-45 bg-gradient-to-tl from-blue-500/[0.02] to-transparent rounded-full" />
            
            {/* Concentric arc details */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full border border-white/5" />
          </div>
          
          {/* Corner accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-amber-500/30 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-amber-500/30 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-amber-500/30 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-amber-500/30 rounded-br-sm pointer-events-none" />
          
          <header className="relative z-10 mb-6 sm:mb-8 text-center space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-amber-500 uppercase backdrop-blur-sm">
              <Ticket className="h-3 w-3" />
              Live Drops
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Today's Drops
            </h2>
            <p className="text-sm text-slate-400">
              {allClaimableDrops.length > 0 
                ? `${allClaimableDrops.length} artifact${allClaimableDrops.length > 1 ? 's' : ''} available to claim`
                : "Waiting for the next match window."}
            </p>
          </header>

          {allClaimableDrops.length > 0 ? (
            <div className="relative z-10 space-y-6 sm:space-y-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 place-items-center">
                {allClaimableDrops.map((drop) => (
                  <DropStamp
                    key={drop.id}
                    name={drop.name}
                    category={drop.category as DropCategory}
                    rarity={drop.rarity as DropRarity}
                    points={drop.points}
                    size={getDropSize()}
                    isRevealed={false}
                  />
                ))}
              </div>

              {error && (
                <p className="text-sm font-mono text-center text-rose-400 bg-rose-950/30 border border-rose-900/50 py-2.5 rounded-lg max-w-md mx-auto px-4">
                  ⚠️ {error}
                </p>
              )}

              <div className="flex justify-center pt-2">
                <button
                  onClick={handleClaimDrops}
                  disabled={isLoading}
                  className="group w-full max-w-xs bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 font-bold py-3.5 px-6 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-[0_0_30px_rgba(245,158,11,0.15)] focus:outline-none text-center cursor-pointer"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Claiming...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Claim Today's Drops
                    </span>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="relative z-10 max-w-2xl mx-auto">
              <CountdownTimer targetIsoString={activeData.nextClaimAt} />
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: RECENT COLLECTION */}
      <RecentCollectionCarousel drops={recentDrops} pulseTrigger={vaultPulse} />

      {/* REWARD MODAL LAYER */}
      {isDesktop ? (
        <Dialog open={isRewardModalOpen} onOpenChange={(open) => !open && handleCloseModal()}>
          <DialogContent className="sm:max-w-xl bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 shadow-2xl focus:outline-none">
            <DialogTitle className="sr-only">Items Claimed Successfully</DialogTitle>
            {renderRewardContent()}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isRewardModalOpen} onOpenChange={(open) => !open && handleCloseModal()}>
          <DrawerContent className="bg-zinc-950 border-t border-zinc-800/80 p-6 rounded-t-2xl focus:outline-none">
            <DrawerTitle className="sr-only">Items Claimed Successfully</DrawerTitle>
            {renderRewardContent()}
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}