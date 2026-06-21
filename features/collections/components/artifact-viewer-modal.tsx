"use client";

import React, { useRef, useState, useEffect } from "react";
import { Download, Share, Loader2, Circle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropStamp } from "@/features/drops/components/drop-stamp";
import { PremiumDropStamp } from "@/features/drops/components/premium-drop-stamp";
import { DropCategory, DropRarity } from "@/features/drops/types/drop.types";
import { PremiumTheme } from "@/config/premium.constants";
import { exportStampClient } from "../utils/export-stamp";

// A union type supporting both Free and Premium Drops
export type ArtifactViewerItem = {
  id: string;
  name: string;
  category: string;
  rarity: string;
  points?: number;      // Specific to Free Drops
  theme?: PremiumTheme; // Specific to Premium Drops
};

interface ArtifactViewerModalProps {
  children: React.ReactNode;
  item: ArtifactViewerItem;
}

export function ArtifactViewerModal({ children, item }: ArtifactViewerModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [canShareNative, setCanShareNative] = useState(false);
  const stampRef = useRef<HTMLDivElement>(null);

  const isPremium = !!item.theme;

  // Detect native share capability on mount
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.canShare) {
      const dummyFile = new File([""], "test.png", { type: "image/png" });
      setCanShareNative(navigator.canShare({ files: [dummyFile] }));
    }
  }, []);

  const handleExport = async (action: "share" | "download") => {
    if (!stampRef.current || isExporting) return;

    try {
      setIsExporting(true);
      await new Promise((resolve) => setTimeout(resolve, 150));

      const safeFilename = `passivoo-${item.rarity.toLowerCase()}-${item.name.toLowerCase().replace(/\s+/g, "-")}.png`;
      
      // Pass the background color and the specific action requested
      await exportStampClient(stampRef.current, { 
        filename: safeFilename,
        backgroundColor: "#09090b",
        action: action
      });

    } catch (error) {
      console.error(error);
      alert("Failed to export artifact. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      
      {/* FIXED: Removed DialogTrigger to prevent 'Invalid HTML tag nesting' (button > div).
          Instead, we use a simple accessible div to trigger the controlled state. */}
      <div 
        className="cursor-pointer" 
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        {children}
      </div>

      {/* FIXED: Added [&>button]:z-50 to ensure the close button sits above the curves */}
      <DialogContent className="sm:max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center focus:outline-none overflow-hidden [&>button]:z-50 [&>button]:text-zinc-400 hover:[&>button]:text-white">
        
        {/* ==========================================
            PREMIUM CURVICAL DESIGN BACKGROUND
            Pure CSS geometric curves with Lucide icons
            ========================================== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large sweeping curves */}
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full border border-amber-500/5" />
          <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full border border-amber-500/8" />
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full border border-amber-500/12" />
          
          <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full border border-amber-500/5" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full border border-amber-500/8" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full border border-amber-500/12" />
          
          {/* Medium curves */}
          <div className="absolute -top-24 right-8 w-56 h-56 rounded-full border border-blue-500/5" />
          <div className="absolute -top-16 right-16 w-40 h-40 rounded-full border border-blue-500/8" />
          <div className="absolute -bottom-24 left-8 w-56 h-56 rounded-full border border-blue-500/5" />
          <div className="absolute -bottom-16 left-16 w-40 h-40 rounded-full border border-blue-500/8" />
          
          {/* Decorative circles using Lucide */}
          <div className="absolute top-12 right-16 opacity-20">
            <Circle className="h-2 w-2 text-amber-500/40" />
          </div>
          <div className="absolute bottom-12 left-16 opacity-20">
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full border border-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] rounded-full border border-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full border border-white/5" />
          
          {/* Subtle radial glow in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-amber-500/5 blur-3xl rounded-full" />
        </div>
        
        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-amber-500/30 rounded-tl-sm pointer-events-none z-10" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-amber-500/30 rounded-tr-sm pointer-events-none z-10" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-amber-500/30 rounded-bl-sm pointer-events-none z-10" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-amber-500/30 rounded-br-sm pointer-events-none z-10" />

        {/* Hidden Title for Screen Readers */}
        <DialogTitle className="sr-only">Artifact Viewer: {item.name}</DialogTitle>

        {/* Header */}
        <div className="relative z-10 w-full text-center space-y-1 mb-4 pr-6">
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            {isPremium ? "Collector's Edition" : "Tournament Passport"}
          </p>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">
            {item.name}
          </h2>
        </div>

        {/* The Large Artifact Container */}
        <div 
          ref={stampRef} 
          className="relative z-10 p-6 bg-transparent flex items-center justify-center w-full overflow-visible"
        >
          {isPremium ? (
            <PremiumDropStamp
              name={item.name}
              category={item.category as DropCategory}
              rarity={item.rarity as DropRarity}
              theme={item.theme!}
              size="lg"
              isExportMode={isExporting}
            />
          ) : (
            <DropStamp
              name={item.name}
              category={item.category as DropCategory}
              rarity={item.rarity as DropRarity}
              points={item.points || 0}
              size="lg"
              isRevealed={true}
              isExportMode={isExporting}
            />
          )}
        </div>

        {/* Export / Share Controls */}
        <div className="relative z-10 w-full mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 px-2 sm:px-8">
          
          {/* Render the Share button ONLY if the device supports native sharing */}
          {canShareNative && (
            <button
              onClick={() => handleExport("share")}
              disabled={isExporting}
              className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 font-bold py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-[0_0_30px_rgba(245,158,11,0.15)] uppercase tracking-wider text-sm cursor-pointer"
            >
              {isExporting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Wait...</span>
                </>
              ) : (
                <>
                  <Share size={18} strokeWidth={2} />
                  <span>Share</span>
                </>
              )}
            </button>
          )}

          {/* Render the Download button. 
              If sharing is supported, this becomes a secondary dark button. 
              If sharing is NOT supported (desktop), this stays as the primary gold button. */}
          <button
            onClick={() => handleExport("download")}
            disabled={isExporting}
            className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] uppercase tracking-wider text-sm cursor-pointer disabled:bg-zinc-800 disabled:text-zinc-500 disabled:shadow-none
              ${canShareNative 
                ? 'sm:flex-1 bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700' 
                : 'sm:w-3/4 bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.15)]'
              }`}
          >
            {isExporting && !canShareNative ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download size={18} strokeWidth={2} />
                <span>Download</span>
              </>
            )}
          </button>
        </div>

      </DialogContent>
    </Dialog>
  );
}