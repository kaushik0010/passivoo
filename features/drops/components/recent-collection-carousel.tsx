"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Link from "next/link";
import { RecentDropResult } from "@/features/collections/queries/get-recent-drops";
import { DropStamp } from "@/features/drops/components/drop-stamp";
import { DropCategory, DropRarity } from "../types/drop.types";
import { ArtifactViewerModal } from "@/features/collections/components/artifact-viewer-modal";
import { Archive, Sparkles, ArrowRight } from "lucide-react";

interface RecentCollectionCarouselProps {
  drops: RecentDropResult[];
  pulseTrigger?: number;
}

export function RecentCollectionCarousel({ drops, pulseTrigger = 0 }: RecentCollectionCarouselProps) {
  const controls = useAnimation();

  useEffect(() => {
    if (pulseTrigger > 0) {
      controls.start({
        boxShadow: ["0px 0px 0px rgba(34,197,94,0)", "0px 0px 40px rgba(34,197,94,0.15)", "0px 0px 0px rgba(34,197,94,0)"],
        borderColor: ["rgba(255,255,255,0.05)", "rgba(34,197,94,0.4)", "rgba(255,255,255,0.05)"],
        backgroundColor: ["rgba(0,0,0,0.2)", "rgba(34,197,94,0.08)", "rgba(0,0,0,0.2)"],
        transition: { duration: 0.8, ease: "easeInOut" }
      });
    }
  }, [pulseTrigger, controls]);

  return (
    <motion.section
      animate={controls}
      initial={{ borderColor: "rgba(255,255,255,0.05)", backgroundColor: "rgba(0,0,0,0.2)" }}
      className="relative p-4 sm:p-6 border border-white/5 rounded-2xl bg-black/20 space-y-4 overflow-hidden"
    >
      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-amber-500/20 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-amber-500/20 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-amber-500/20 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-amber-500/20 rounded-br-sm pointer-events-none" />

      <header className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Archive className="h-4 w-4 text-amber-500/60" />
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-white">
            Recent Collection
          </h2>
          {drops.length > 0 && (
            <span className="text-xs text-slate-500 font-mono">
              ({drops.length})
            </span>
          )}
        </div>
        {drops.length > 0 && (
          <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">
            Tap to view
          </span>
        )}
      </header>

      {!drops || drops.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 border border-dashed border-white/5 rounded-xl text-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/5 border border-amber-500/10 flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-amber-500/40" />
          </div>
          <p className="text-slate-300 font-medium text-base">
            Your vault awaits
          </p>
          <p className="text-slate-500 text-sm mt-1 max-w-xs">
            Claim your first artifact above and watch your collection grow.
          </p>
        </div>
      ) : (
        <div className="relative w-full">
          <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-1">
            
            <AnimatePresence mode="sync">
              {drops.map((drop, index) => (
                <motion.div
                  layout 
                  key={drop.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, width: 0, padding: 0, margin: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                    delay: index * 0.08,
                    layout: { type: "spring", bounce: 0.1, duration: 0.6 }
                  }}
                  className="snap-start shrink-0"
                >
                  <ArtifactViewerModal item={drop}>
                    <div className="transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                      <DropStamp
                        name={drop.name}
                        category={drop.category as DropCategory}
                        rarity={drop.rarity as DropRarity}
                        points={drop.points}
                        size="md"
                        isRevealed={true}
                      />
                    </div>
                  </ArtifactViewerModal>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* VIEW ALL COLLECTIONS BUTTON */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: drops.length * 0.08,
              }}
              className="snap-start shrink-0 flex items-center justify-center min-w-[160px] sm:min-w-[180px] md:min-w-[200px]"
            >
              <Link
                href="/collections"
                className="group flex flex-col items-center justify-center gap-3 w-full h-[180px] sm:h-[202px] md:h-[224px] rounded-xl border border-dashed border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/50 transition-all duration-300 p-4 text-center cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-300">
                  <ArrowRight className="h-5 w-5 text-amber-500 group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-wider">
                    View All
                  </p>
                  <p className="text-xs text-slate-400 font-mono tracking-wider">
                    Collections
                  </p>
                </div>
              </Link>
            </motion.div>

          </div>
          
          {/* Scroll hint - subtle gradient on edges */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
        </div>
      )}
    </motion.section>
  );
}