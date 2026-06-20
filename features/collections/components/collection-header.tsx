import React from "react";
import { PassportStatsDto } from "@/app/api/passport/route";
import { Shield, Award, Trophy, Diamond } from "lucide-react";

export function CollectionHeader({ stats }: { stats: PassportStatsDto }) {
  // Map collector title to appropriate icon/color
  const getTitleBadge = () => {
    const title = stats.collectorTitle?.toLowerCase() || "";
    if (title.includes("legendary")) return { color: "text-amber-400", icon: "👑" };
    if (title.includes("gold") || title.includes("epic")) return { color: "text-amber-500", icon: "⭐" };
    if (title.includes("silver") || title.includes("rare")) return { color: "text-slate-300", icon: "◆" };
    if (title.includes("bronze") || title.includes("common")) return { color: "text-amber-700", icon: "●" };
    return { color: "text-slate-400", icon: "◇" };
  };

  const titleBadge = getTitleBadge();

  return (
    <header className="space-y-6 sm:space-y-8 w-full max-w-4xl mx-auto">
      <div className="text-center md:text-left space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[10px] font-bold tracking-widest text-amber-500 uppercase backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
          </span>
          {stats.collectorTitle || "Collector"}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
          Your Collection Vault
        </h1>
        <p className="text-sm text-slate-400 font-medium">
          {stats.totalStamps} artifacts secured • {stats.totalPoints} total points
        </p>
      </div>

      {/* Premium Dashboard Metrics */}
      <div className="grid grid-cols-3 gap-3 md:gap-6 w-full">
        <div className="relative bg-zinc-900/60 border border-white/5 rounded-xl p-3 md:p-5 flex flex-col items-center justify-center text-center overflow-hidden group hover:border-amber-500/20 transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-amber-500/20 rounded-tl-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-amber-500/20 rounded-tr-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-amber-500/20 rounded-bl-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-amber-500/20 rounded-br-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <Shield className="text-zinc-500 mb-1.5 md:mb-2 opacity-40 group-hover:opacity-60 group-hover:text-amber-500/60 transition-all duration-300" size={20} />
          <span className="text-xl md:text-3xl font-black text-white tracking-tight">{stats.totalStamps}</span>
          <span className="text-[9px] md:text-xs text-zinc-500 font-mono uppercase tracking-wider mt-1">Stamps Owned</span>
        </div>

        <div className="relative bg-zinc-900/60 border border-white/5 rounded-xl p-3 md:p-5 flex flex-col items-center justify-center text-center overflow-hidden group hover:border-amber-500/20 transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-amber-500/20 rounded-tl-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-amber-500/20 rounded-tr-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-amber-500/20 rounded-bl-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-amber-500/20 rounded-br-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <Award className="text-amber-500/60 mb-1.5 md:mb-2 opacity-50 group-hover:opacity-80 group-hover:text-amber-400 transition-all duration-300" size={20} />
          <span className="text-xl md:text-3xl font-black text-amber-400 tracking-tight">{stats.totalPoints}</span>
          <span className="text-[9px] md:text-xs text-zinc-500 font-mono uppercase tracking-wider mt-1">Total Score</span>
        </div>

        <div className="relative bg-zinc-900/60 border border-white/5 rounded-xl p-3 md:p-5 flex flex-col items-center justify-center text-center overflow-hidden group hover:border-amber-500/20 transition-colors duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-amber-500/20 rounded-tl-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-amber-500/20 rounded-tr-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-amber-500/20 rounded-bl-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-amber-500/20 rounded-br-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <Trophy className="text-zinc-500 mb-1.5 md:mb-2 opacity-40 group-hover:opacity-60 group-hover:text-amber-500/60 transition-all duration-300" size={20} />
          <span className="text-xl md:text-3xl font-black text-white tracking-tight">{stats.tournamentProgress}%</span>
          <span className="text-[9px] md:text-xs text-zinc-500 font-mono uppercase tracking-wider mt-1">Completion</span>
        </div>
      </div>

      {/* Global Progress Track bar */}
      <div className="space-y-2 px-1">
        <div className="flex justify-between text-[10px] font-mono uppercase text-zinc-500 tracking-wider">
          <span className="flex items-center gap-2">
            <Diamond className="h-2.5 w-2.5 text-amber-500/60" />
            Global Progress Archive
          </span>
          <span>{stats.totalStamps} / 48 Cities & Badges</span>
        </div>
        <div className="relative w-full bg-zinc-900/60 border border-white/5 h-2.5 rounded-full overflow-hidden p-[1px]">
          <div 
            className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 h-full rounded-full transition-all duration-700 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
            style={{ width: `${stats.tournamentProgress}%` }}
          />
          {/* Glow effect on progress bar */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent blur-sm"
            style={{ width: `${Math.min(stats.tournamentProgress + 10, 100)}%` }}
          />
        </div>
      </div>
    </header>
  );
}