"use client";

import React from "react";
import { Star, Gem, Crown, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCategoryIcon, getCategoryLabel } from "../utils/drop-theme";
import { DropCategory, DropRarity } from "../types/drop.types";
import { PremiumTheme } from "@/config/premium.constants";

// ==========================================
// PREMIUM TIER VISUAL CONFIGURATION
// ==========================================

const premiumTierConfig: Record<DropRarity, {
  material: string;
  innerRecess: string;
  innerShadow: string;
  bevelTop: string;
  bevelBottom: string;
  artworkFrame: string;
  artworkBevel: string;
  artworkInner: string;
  glow: string;
  rimLight: string;
  textAccent: string;
  pill: string;
  iconColor: string;
  foilBadge: string;
  bottomIcon: React.ElementType;
}> = {
  [DropRarity.COMMON]: {
    material: "bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600",
    innerRecess: "bg-gradient-to-br from-[#0a0a0f] via-[#050508] to-black",
    innerShadow: "shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]",
    bevelTop: "shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
    bevelBottom: "shadow-[0_6px_16px_rgba(0,0,0,0.5)]",
    artworkFrame: "bg-gradient-to-br from-slate-200 via-slate-300 to-slate-500",
    artworkBevel: "shadow-[inset_0_1px_3px_rgba(255,255,255,0.4),0_3px_8px_rgba(0,0,0,0.5)]",
    artworkInner: "bg-gradient-to-br from-[#1a1a24] to-[#0a0a10]",
    glow: "shadow-[0_0_20px_rgba(148,163,184,0.2)]",
    rimLight: "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]",
    textAccent: "text-slate-300",
    pill: "bg-slate-800/80 text-slate-300 border-slate-500/50 backdrop-blur-sm",
    iconColor: "text-slate-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]",
    foilBadge: "SILVER",
    bottomIcon: Star,
  },
  [DropRarity.RARE]: {
    material: "bg-gradient-to-br from-rose-400 via-red-500 to-red-800",
    innerRecess: "bg-gradient-to-br from-[#1a0508] via-[#0f0305] to-black",
    innerShadow: "shadow-[inset_0_2px_12px_rgba(0,0,0,0.9)]",
    bevelTop: "shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]",
    bevelBottom: "shadow-[0_6px_20px_rgba(225,29,72,0.3)]",
    artworkFrame: "bg-gradient-to-br from-rose-300 via-red-400 to-red-700",
    artworkBevel: "shadow-[inset_0_1px_4px_rgba(255,255,255,0.5),0_3px_10px_rgba(0,0,0,0.6)]",
    artworkInner: "bg-gradient-to-br from-[#2a0a10] to-[#150508]",
    glow: "shadow-[0_0_25px_rgba(225,29,72,0.25)]",
    rimLight: "shadow-[inset_0_0_0_1px_rgba(251,113,133,0.2)]",
    textAccent: "text-rose-300",
    pill: "bg-red-950/80 text-rose-200 border-rose-400/40 backdrop-blur-sm",
    iconColor: "text-rose-100 drop-shadow-[0_0_10px_rgba(251,113,133,0.5)]",
    foilBadge: "RUBY",
    bottomIcon: Gem,
  },
  [DropRarity.EPIC]: {
    // EMERALD FOIL - Rich green, luxurious, distinct from free epic (purple)
    material: "bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-800",
    innerRecess: "bg-gradient-to-br from-[#0a1a0a] via-[#051005] to-black",
    innerShadow: "shadow-[inset_0_2px_16px_rgba(0,0,0,0.95)]",
    bevelTop: "shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]",
    bevelBottom: "shadow-[0_6px_24px_rgba(16,185,129,0.35)]",
    artworkFrame: "bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-700",
    artworkBevel: "shadow-[inset_0_1px_5px_rgba(255,255,255,0.6),0_3px_12px_rgba(0,0,0,0.7)]",
    artworkInner: "bg-gradient-to-br from-[#0a1a10] to-[#051008]",
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.35)]",
    rimLight: "shadow-[inset_0_0_0_1px_rgba(52,211,153,0.25)]",
    textAccent: "text-emerald-300",
    pill: "bg-emerald-950/80 text-emerald-200 border-emerald-400/40 backdrop-blur-sm",
    iconColor: "text-emerald-50 drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]",
    foilBadge: "EMERALD",
    bottomIcon: Crown,
  },
  [DropRarity.LEGENDARY]: {
    // Bright gold material - luxurious, trophy-like, premium
    material: "bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600",
    // Minimal dark recess - just enough for contrast
    innerRecess: "bg-gradient-to-br from-[#1a0f00] via-[#0f0800] to-black",
    innerShadow: "shadow-[inset_0_2px_16px_rgba(0,0,0,0.6)]",
    // Bright gold highlight - premium and celebratory
    bevelTop: "shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]",
    // Strong gold glow - visible and warm
    bevelBottom: "shadow-[0_6px_32px_rgba(245,158,11,0.6)]",
    // Rich gold artwork frame - looks like a gold coin
    artworkFrame: "bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600",
    // Strong gold bevel - makes it look like a gold medallion
    artworkBevel: "shadow-[inset_0_1px_6px_rgba(255,255,255,0.8),0_4px_16px_rgba(245,158,11,0.5)]",
    // Warm dark inner - minimal darkness
    artworkInner: "bg-gradient-to-br from-[#2a1a00] to-[#150d00]",
    // Multi-layer gold glow - radiates warmth
    glow: "shadow-[0_0_40px_rgba(245,158,11,0.5),0_0_20px_rgba(251,191,36,0.3)]",
    // Bright gold rim - thick and visible
    rimLight: "shadow-[inset_0_0_0_2px_rgba(252,211,77,0.5)]",
    textAccent: "text-amber-200",
    pill: "bg-black/80 text-amber-200 border-amber-500/60 backdrop-blur-sm",
    iconColor: "text-amber-50 drop-shadow-[0_0_20px_rgba(252,211,77,0.9)]",
    foilBadge: "GOLD",
    bottomIcon: Trophy,
  },
};

// ==========================================
// RESPONSIVE SIZING CONFIGURATION
// ==========================================

const responsiveSizeConfig = {
  wrapper: "w-35 h-[196px] xs:w-40 xs:h-[224px] sm:w-48 sm:h-[240px] md:w-56 md:h-[280px] lg:w-64 lg:h-[320px] xl:w-72 xl:h-[360px]",
  contentPadding: "p-2 xs:p-2.5 sm:p-3 md:p-3.5 lg:p-4 xl:p-4.5",
  artworkFrame: "w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32",
  title: "text-[11px] xs:text-[12px] sm:text-[13px] md:text-sm lg:text-base xl:text-lg",
  category: "text-[9px] xs:text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] xl:text-[13px]",
  foilBadge: "text-[9px] xs:text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px]",
  pillText: "text-[8px] xs:text-[8px] sm:text-[9px] md:text-[9px] lg:text-[10px] xl:text-[11px]",
  pillPadding: "px-2 py-0.5 xs:px-2.5 sm:px-3 md:px-3 lg:px-3.5 xl:px-4",
  marginTop: "mt-2 xs:mt-2.5 sm:mt-3 md:mt-3.5 lg:mt-4 xl:mt-4.5",
  marginBottom: "mb-1.5 xs:mb-2 sm:mb-2.5 md:mb-3 lg:mb-3.5 xl:mb-4",
  dividerMargin: "mt-2 mb-1.5 xs:mt-2.5 xs:mb-2 sm:mt-3 sm:mb-2 md:mt-3.5 md:mb-2.5",
  borderRadius: "rounded-md xs:rounded-md sm:rounded-lg md:rounded-lg lg:rounded-xl xl:rounded-xl",
  bottomIconSize: { base: 12, xs: 13, sm: 14, md: 16, lg: 18, xl: 20 },
  artworkIcon: { base: 26, xs: 28, sm: 30, md: 36, lg: 42, xl: 48 },
};

const fixedSizeConfig = {
  sm: {
    wrapper: "w-35 h-[196px]",
    contentPadding: "p-2",
    artworkFrame: "w-16 h-16",
    artworkIcon: 26,
    title: "text-[11px] leading-tight",
    category: "text-[9px]",
    foilBadge: "text-[9px]",
    pillText: "text-[8px]",
    pillPadding: "px-2 py-0.5",
    marginTop: "mt-2",
    marginBottom: "mb-1.5",
    dividerMargin: "mt-2 mb-1.5",
    borderRadius: "rounded-md",
    bottomIconSize: 12,
  },
  md: {
    wrapper: "w-56 h-[280px]",
    contentPadding: "p-3",
    artworkFrame: "w-24 h-24",
    artworkIcon: 36,
    title: "text-sm leading-tight",
    category: "text-[11px]",
    foilBadge: "text-[12px]",
    pillText: "text-[9px]",
    pillPadding: "px-3 py-1",
    marginTop: "mt-3",
    marginBottom: "mb-2.5",
    dividerMargin: "mt-3 mb-2",
    borderRadius: "rounded-lg",
    bottomIconSize: 16,
  },
  lg: {
    wrapper: "w-80 h-[392px]",
    contentPadding: "p-4",
    artworkFrame: "w-32 h-32",
    artworkIcon: 48,
    title: "text-base leading-tight",
    category: "text-[13px]",
    foilBadge: "text-[14px]",
    pillText: "text-[10px]",
    pillPadding: "px-3.5 py-1.5",
    marginTop: "mt-4",
    marginBottom: "mb-3.5",
    dividerMargin: "mt-4 mb-3",
    borderRadius: "rounded-xl",
    bottomIconSize: 20,
  },
};

const useResponsiveArtworkIconSize = (): number => {
  const [iconSize, setIconSize] = React.useState<number>(26);
  React.useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width >= 1280) setIconSize(48);
      else if (width >= 1024) setIconSize(42);
      else if (width >= 768) setIconSize(36);
      else if (width >= 640) setIconSize(30);
      else if (width >= 480) setIconSize(28);
      else setIconSize(26);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return iconSize;
};

const useResponsiveBottomIconSize = (): number => {
  const [iconSize, setIconSize] = React.useState<number>(12);
  React.useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width >= 1280) setIconSize(20);
      else if (width >= 1024) setIconSize(18);
      else if (width >= 768) setIconSize(16);
      else if (width >= 640) setIconSize(14);
      else if (width >= 480) setIconSize(13);
      else setIconSize(12);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return iconSize;
};

// ==========================================
// INTERFACES
// ==========================================

export interface PremiumDropStampProps {
  name: string;
  category: DropCategory;
  rarity: DropRarity;
  theme: PremiumTheme;
  matchInfo?: { homeTeam: string; awayTeam: string; date: string; venue: string; };
  size?: "sm" | "md" | "lg";
  isExportMode?: boolean;
  className?: string;
}

// ==========================================
// COMPONENT
// ==========================================

export function PremiumDropStamp({
  name,
  category,
  rarity,
  theme,
  matchInfo,
  size,
  isExportMode = false,
  className,
}: PremiumDropStampProps) {
  const Icon = getCategoryIcon(category);
  const tierStyles = premiumTierConfig[rarity];
  const BottomIcon = tierStyles.bottomIcon;
  
  const useResponsive = !size;
  const dims = useResponsive ? responsiveSizeConfig : fixedSizeConfig[size as keyof typeof fixedSizeConfig];
  
  const artworkIconSize = useResponsive ? useResponsiveArtworkIconSize() : dims.artworkIcon;
  const bottomIconSize = useResponsive ? useResponsiveBottomIconSize() : dims.bottomIconSize;

  return (
    <div 
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
        useResponsive && "w-full max-w-full",
        className
      )}
    >
      {/* Hide the dynamic animation completely during export snapshot to prevent invisible/blank frames */}
      {!isExportMode && (
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes foilReflection {
            0% { transform: translateX(-150%) skewX(-35deg); opacity: 0; }
            15% { opacity: 0.2; }
            50% { transform: translateX(250%) skewX(-35deg); opacity: 0; }
            100% { transform: translateX(250%) skewX(-35deg); opacity: 0; }
          }
          .animate-foil-sweep {
            animation: foilReflection 6s ease-in-out infinite;
          }
        `}} />
      )}

      <div
        className={cn(
          "relative flex flex-col mx-auto transition-all duration-500",
          dims.wrapper,
          dims.borderRadius,
          tierStyles.material,
          tierStyles.bevelBottom,
          tierStyles.glow,
          "overflow-hidden"
        )}
      >
        
        {/* FOIL REFLECTION: Animation for web, frozen beautiful state for export */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 rounded-inherit">
          <div 
            className={cn(
              "w-[200%] h-full",
              !isExportMode && "animate-foil-sweep"
            )}
            style={
              isExportMode 
              ? { 
                  backgroundImage: `linear-gradient(90deg, transparent, white/15, transparent)`,
                  transform: "translateX(20%) skewX(-35deg)",
                  opacity: 0.2
                }
              : { backgroundImage: `linear-gradient(90deg, transparent, white/15, transparent)` }
            }
          />
        </div>

        <div className={cn(
          "absolute inset-0 pointer-events-none rounded-inherit transition-all duration-500",
          tierStyles.bevelTop,
          tierStyles.rimLight
        )} />
        
        <div className={cn(
          "flex flex-col h-full w-full relative",
          dims.contentPadding
        )}>
          
          <div className={cn(
            "flex flex-col h-full w-full relative overflow-hidden",
            "rounded-sm",
            tierStyles.innerRecess,
            tierStyles.innerShadow
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

            <div className={cn(
              "relative z-20 flex justify-center",
              dims.marginTop,
              "mb-auto"
            )}>
              <span className={cn(
                "rounded-sm border font-bold tracking-[0.2em] uppercase shadow-sm backdrop-blur-sm",
                tierStyles.pill,
                dims.pillPadding,
                dims.pillText
              )}>
                {rarity}
              </span>
            </div>

            <div className="relative z-10 flex items-center justify-center w-full py-3">
              <div className={cn(
                "relative flex items-center justify-center rounded-full transition-all duration-500 ease-out",
                dims.artworkFrame,
                tierStyles.artworkFrame,
                tierStyles.artworkBevel
              )}>
                <div className={cn(
                  "absolute inset-[3px] rounded-full flex items-center justify-center",
                  tierStyles.artworkInner
                )}>
                  <div className="absolute inset-[3px] rounded-full border border-white/8" />
                  <Icon 
                    size={typeof artworkIconSize === 'number' ? artworkIconSize : artworkIconSize.base} 
                    strokeWidth={1.2} 
                    className={cn(tierStyles.iconColor, "drop-shadow-lg transition-all duration-300")} 
                  />
                </div>
              </div>
            </div>

            <div className={cn(
              "relative z-20 flex flex-col items-center text-center mt-auto",
              dims.marginBottom
            )}>
              <h3 className={cn(
                "font-extrabold uppercase tracking-wider text-white",
                "drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]",
                dims.title,
                "line-clamp-2 px-1"
              )}>
                {name}
              </h3>
              
              <p className={cn(
                "font-mono uppercase tracking-[0.15em] font-medium",
                tierStyles.textAccent,
                dims.category
              )}>
                {getCategoryLabel(category)}
              </p>

              <div className={cn(
                "w-12 border-t",
                tierStyles.rimLight,
                dims.dividerMargin
              )} />

              <div className={cn(
                "flex items-center justify-center gap-2 font-bold font-mono tracking-[0.2em] uppercase",
                tierStyles.textAccent,
                dims.foilBadge
              )}>
                <BottomIcon size={typeof bottomIconSize === 'number' ? bottomIconSize : bottomIconSize.base} className="opacity-70" />
                <span>{tierStyles.foilBadge} FOIL</span>
                <BottomIcon size={typeof bottomIconSize === 'number' ? bottomIconSize : bottomIconSize.base} className="opacity-70" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}