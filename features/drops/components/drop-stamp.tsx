"use client"

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCategoryIcon, getCategoryLabel } from "../utils/drop-theme";
import { DropRarity } from "../types/drop.types";

// ==========================================
// RARITY VISUAL CONFIGURATION (Unified Material System)
// ==========================================

const rarityTheme = {
  [DropRarity.COMMON]: {
    material: "bg-gradient-to-br from-slate-400 via-slate-600 to-slate-800",
    materialHover: "hover:from-slate-300 hover:via-slate-500 hover:to-slate-700",
    innerRecess: "bg-gradient-to-br from-slate-950 via-slate-900 to-black",
    innerShadow: "shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]",
    bevelTop: "shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",
    bevelBottom: "shadow-[0_4px_12px_rgba(0,0,0,0.5)]",
    artworkFrame: "bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600",
    artworkBevel: "shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),0_2px_6px_rgba(0,0,0,0.5)]",
    artworkInner: "bg-gradient-to-br from-slate-800 to-slate-950",
    glow: "",
    rimLight: "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
    textAccent: "text-slate-400",
    pill: "bg-slate-800/80 text-slate-300 border-slate-500/50 backdrop-blur-sm",
    iconColor: "text-slate-200",
    pointsIcon: "text-slate-500",
    glassOverlay: "bg-white/5 backdrop-blur-md",
  },
  [DropRarity.RARE]: {
    material: "bg-gradient-to-br from-blue-400 via-blue-600 to-blue-900",
    materialHover: "hover:from-blue-300 hover:via-blue-500 hover:to-blue-800",
    innerRecess: "bg-gradient-to-br from-[#0a0f2a] via-[#060a1a] to-[#020408]",
    innerShadow: "shadow-[inset_0_2px_12px_rgba(0,0,0,0.9)]",
    bevelTop: "shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
    bevelBottom: "shadow-[0_4px_16px_rgba(37,99,235,0.3)]",
    artworkFrame: "bg-gradient-to-br from-blue-300 via-blue-500 to-blue-800",
    artworkBevel: "shadow-[inset_0_1px_3px_rgba(255,255,255,0.4),0_2px_8px_rgba(0,0,0,0.6)]",
    artworkInner: "bg-gradient-to-br from-[#0d1428] to-[#04071a]",
    glow: "shadow-[0_0_16px_rgba(59,130,246,0.3)]",
    rimLight: "shadow-[inset_0_0_0_1px_rgba(96,165,250,0.25)]",
    textAccent: "text-blue-300",
    pill: "bg-blue-900/80 text-blue-200 border-blue-400/40 backdrop-blur-sm",
    iconColor: "text-blue-100 drop-shadow-[0_0_6px_rgba(59,130,246,0.4)]",
    pointsIcon: "text-blue-500",
    glassOverlay: "bg-blue-500/10 backdrop-blur-md",
  },
  [DropRarity.EPIC]: {
    material: "bg-gradient-to-br from-fuchsia-400 via-purple-600 to-purple-950",
    materialHover: "hover:from-fuchsia-300 hover:via-purple-500 hover:to-purple-800",
    innerRecess: "bg-gradient-to-br from-[#1a0b2e] via-[#0f051e] to-[#06020a]",
    innerShadow: "shadow-[inset_0_2px_16px_rgba(0,0,0,1)]",
    bevelTop: "shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]",
    bevelBottom: "shadow-[0_4px_20px_rgba(168,85,247,0.4)]",
    artworkFrame: "bg-gradient-to-br from-fuchsia-300 via-purple-500 to-purple-900",
    artworkBevel: "shadow-[inset_0_1px_4px_rgba(255,255,255,0.5),0_2px_10px_rgba(0,0,0,0.7)]",
    artworkInner: "bg-gradient-to-br from-[#1f0e38] to-[#0a0418]",
    glow: "shadow-[0_0_24px_rgba(168,85,247,0.4),0_0_8px_rgba(232,121,249,0.3)]",
    rimLight: "shadow-[inset_0_0_0_1px_rgba(232,121,249,0.3)]",
    textAccent: "text-fuchsia-300",
    pill: "bg-purple-900/80 text-fuchsia-200 border-fuchsia-400/40 backdrop-blur-sm",
    iconColor: "text-fuchsia-100 drop-shadow-[0_0_8px_rgba(232,121,249,0.6)]",
    pointsIcon: "text-fuchsia-500",
    glassOverlay: "bg-fuchsia-500/10 backdrop-blur-md",
  },
  [DropRarity.LEGENDARY]: {
    // Dark obsidian base - mysterious, rare, earned
    material: "bg-gradient-to-br from-stone-800 via-zinc-900 to-black",
    materialHover: "hover:from-stone-700 hover:via-zinc-800 hover:to-black",
    // Deep darkness with subtle warmth
    innerRecess: "bg-gradient-to-br from-[#0a0806] via-[#050302] to-black",
    innerShadow: "shadow-[inset_0_2px_20px_rgba(0,0,0,1)]",
    // Bright gold highlight - visible and celebratory
    bevelTop: "shadow-[inset_0_1px_0_rgba(252,211,77,0.3)]",
    // Strong gold glow - warm and rewarding
    bevelBottom: "shadow-[0_4px_24px_rgba(245,158,11,0.5)]",
    // Bright gold artwork frame - pops against dark
    artworkFrame: "bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600",
    // Strong gold bevel with bright highlights
    artworkBevel: "shadow-[inset_0_1px_4px_rgba(255,255,255,0.6),0_2px_12px_rgba(245,158,11,0.5)]",
    // Warm dark inner
    artworkInner: "bg-gradient-to-br from-[#1a0f00] to-[#0d0800]",
    // Gold glow - visible but refined
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.3)]",
    // Bright gold rim - thick enough to see
    rimLight: "shadow-[inset_0_0_0_2px_rgba(252,211,77,0.5)]",
    textAccent: "text-amber-300",
    pill: "bg-black/80 text-amber-300 border-amber-500/50 backdrop-blur-sm",
    iconColor: "text-amber-100 drop-shadow-[0_0_12px_rgba(252,211,77,0.6)]",
    pointsIcon: "text-amber-400",
    glassOverlay: "bg-amber-500/10 backdrop-blur-md",
  },
};

// ==========================================
// RESPONSIVE SIZING CONFIGURATION (Mobile First)
// ==========================================

const responsiveSizeConfig = {
  wrapper: "w-32 h-[180px] xs:w-36 xs:h-[202px] sm:w-40 sm:h-[224px] md:w-44 md:h-[248px] lg:w-48 lg:h-[270px] xl:w-52 xl:h-[292px]",
  contentPadding: "p-1.5 xs:p-2 sm:p-2 md:p-2.5 lg:p-2.5 xl:p-3",
  artworkFrame: "w-14 h-14 xs:w-16 sm:w-16 md:w-20 lg:w-24 xl:w-28",
  title: "text-[10px] xs:text-[10px] sm:text-[11px] md:text-xs lg:text-sm xl:text-base",
  category: "text-[8px] xs:text-[8px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px]",
  points: "text-[9px] xs:text-[9px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-xs",
  pillText: "text-[7px] xs:text-[7px] sm:text-[7px] md:text-[8px] lg:text-[8px] xl:text-[9px]",
  pillPadding: "px-1.5 py-0.5 xs:px-2 sm:px-2 md:px-2.5 lg:px-2.5 xl:px-3",
  marginTop: "mt-1.5 xs:mt-2 sm:mt-2 md:mt-2.5 lg:mt-2.5 xl:mt-3",
  marginBottom: "mb-1 xs:mb-1.5 sm:mb-1.5 md:mb-2 lg:mb-2 xl:mb-2.5",
  dividerMargin: "mt-1 mb-0.5 xs:mt-1.5 xs:mb-0.5 sm:mt-1.5 sm:mb-0.5 md:mt-2 md:mb-1 lg:mt-2 lg:mb-1 xl:mt-2.5 xl:mb-1.5",
  borderRadius: "rounded-md xs:rounded-md sm:rounded-lg md:rounded-lg lg:rounded-xl xl:rounded-xl",
};

const fixedSizeConfig = {
  sm: {
    wrapper: "w-28 h-[156px]",
    contentPadding: "p-2",
    artworkFrame: "w-12 h-12",
    artworkIcon: 20,
    title: "text-[9px] leading-tight",
    category: "text-[7px]",
    points: "text-[8px]",
    pillText: "text-[6px]",
    pillPadding: "px-2 py-0.5",
    marginTop: "mt-2",
    marginBottom: "mb-1.5",
    dividerMargin: "mt-1.5 mb-1",
    borderRadius: "rounded-md",
    starIconSize: 8,
  },
  md: {
    wrapper: "w-40 h-[224px]",
    contentPadding: "p-2.5",
    artworkFrame: "w-20 h-20",
    artworkIcon: 32,
    title: "text-xs leading-tight",
    category: "text-[9px]",
    points: "text-[10px]",
    pillText: "text-[8px]",
    pillPadding: "px-2.5 py-0.5",
    marginTop: "mt-2.5",
    marginBottom: "mb-2",
    dividerMargin: "mt-2 mb-1",
    borderRadius: "rounded-lg",
    starIconSize: 10,
  },
  lg: {
    wrapper: "w-56 h-[313px]",
    contentPadding: "p-3",
    artworkFrame: "w-28 h-28",
    artworkIcon: 48,
    title: "text-base leading-tight",
    category: "text-[11px]",
    points: "text-xs",
    pillText: "text-[9px]",
    pillPadding: "px-3 py-1",
    marginTop: "mt-3",
    marginBottom: "mb-2.5",
    dividerMargin: "mt-2.5 mb-1.5",
    borderRadius: "rounded-xl",
    starIconSize: 12,
  },
};

const useResponsiveIconSize = (): number => {
  const [iconSize, setIconSize] = React.useState<number>(22);
  
  React.useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width >= 1280) setIconSize(44);
      else if (width >= 1024) setIconSize(38);
      else if (width >= 768) setIconSize(32);
      else if (width >= 640) setIconSize(26);
      else if (width >= 480) setIconSize(24);
      else setIconSize(22);
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  return iconSize;
};

const useResponsiveStarSize = (): number => {
  const [starSize, setStarSize] = React.useState<number>(9);
  
  React.useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width >= 1280) setStarSize(12);
      else if (width >= 1024) setStarSize(11);
      else if (width >= 768) setStarSize(10);
      else if (width >= 640) setStarSize(9);
      else setStarSize(8);
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  return starSize;
};

// ==========================================
// INTERFACES
// ==========================================

export interface DropStampProps {
  name: string;
  category: string;
  rarity: DropRarity;
  points: number;
  size?: "sm" | "md" | "lg";
  isRevealed?: boolean;
  isExportMode?: boolean;
  className?: string;
}

// ==========================================
// COMPONENT
// ==========================================

export function DropStamp({
  name,
  category,
  rarity,
  points,
  size,
  isRevealed = true,
  isExportMode = false,
  className,
}: DropStampProps) {
  const Icon = getCategoryIcon(category);
  const theme = rarityTheme[rarity] || rarityTheme[DropRarity.COMMON];
  
  const useResponsive = !size;
  const dims = useResponsive ? responsiveSizeConfig : fixedSizeConfig[size as keyof typeof fixedSizeConfig];
  
  const responsiveIconSize = useResponsiveIconSize();
  const responsiveStarSize = useResponsiveStarSize();
  
  let finalIconSize: number;
  let finalStarSize: number;
  
  if (useResponsive) {
    finalIconSize = responsiveIconSize;
    finalStarSize = responsiveStarSize;
  } else {
    const fixedDims = fixedSizeConfig[size as keyof typeof fixedSizeConfig];
    finalIconSize = fixedDims.artworkIcon;
    finalStarSize = fixedDims.starIconSize;
  }

  return (
    <div 
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
        useResponsive && "w-full max-w-full",
        className
      )}
    >
      <div
        className={cn(
          "relative flex flex-col mx-auto transition-all duration-500",
          dims.wrapper,
          dims.borderRadius,
          theme.material,
          theme.materialHover,
          theme.bevelBottom,
          theme.glow,
          "overflow-hidden"
        )}
      >
        <div className={cn(
          "absolute inset-0 pointer-events-none rounded-inherit transition-all duration-500",
          theme.bevelTop,
          theme.rimLight
        )} />
        
        <div className={cn(
          "flex flex-col h-full w-full relative",
          dims.contentPadding
        )}>
          
          <div className={cn(
            "flex flex-col h-full w-full relative overflow-hidden",
            "rounded-sm",
            theme.innerRecess,
            theme.innerShadow
          )}>
            
            {/* NOISE TEXTURE GUARD: Hidden during export to prevent Canvas black-box corruption */}
            {!isExportMode && (
              <div 
                className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" 
                style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "repeat",
                }}
              />
            )}

            {!isRevealed && !isExportMode && (
              <div className={cn(
                "absolute inset-0 pointer-events-none z-30",
                "transition-all duration-500",
                theme.glassOverlay,
                "bg-gradient-to-br from-white/20 via-transparent to-black/20"
              )} />
            )}

            <div className={cn(
              "relative z-20 flex justify-center",
              dims.marginTop,
              "mb-auto"
            )}>
              <span className={cn(
                "rounded-sm border font-bold tracking-[0.2em] uppercase shadow-sm backdrop-blur-sm transition-all duration-500",
                theme.pill,
                dims.pillPadding,
                dims.pillText,
                !isRevealed && "opacity-80"
              )}>
                {rarity}
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-center w-full py-2">
              <div className={cn(
                "relative flex items-center justify-center rounded-full transition-all duration-500 ease-out",
                dims.artworkFrame,
                theme.artworkFrame,
                theme.artworkBevel
              )}>
                <div className={cn(
                  "absolute inset-[2px] rounded-full flex items-center justify-center",
                  theme.artworkInner
                )}>
                  <div className="absolute inset-[3px] rounded-full border border-white/5" />
                  <Icon 
                    size={finalIconSize} 
                    strokeWidth={1.2} 
                    className={cn(
                      theme.iconColor,
                      "drop-shadow-md transition-all duration-500"
                    )} 
                  />
                </div>
              </div>
            </div>

            <div className={cn(
              "relative z-20 flex flex-col items-center text-center transition-all duration-500 mt-auto",
              dims.marginBottom
            )}>
              <h3 className={cn(
                "font-bold uppercase tracking-wider text-white transition-all duration-500",
                "drop-shadow-[0_1px_0_rgba(0,0,0,0.5)]",
                dims.title,
                "line-clamp-2 px-1"
              )}>
                {name}
              </h3>
              
              <p className={cn(
                "font-mono uppercase tracking-[0.15em] font-medium transition-all duration-500",
                theme.textAccent,
                dims.category
              )}>
                {getCategoryLabel(category)}
              </p>

              <div className={cn(
                "w-10 border-t transition-all duration-500",
                theme.rimLight,
                dims.dividerMargin
              )} />

              <div className={cn(
                "flex items-center gap-1.5 font-mono font-medium transition-all duration-500",
                theme.textAccent,
                dims.points,
                points === 0 && "invisible"
              )}>
                <Star 
                  size={finalStarSize} 
                  fill="currentColor" 
                  className={cn("opacity-60 transition-all duration-500", theme.pointsIcon)} 
                />
                <span>+{points}</span>
                <span className="text-[0.7em] opacity-50">PTS</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}