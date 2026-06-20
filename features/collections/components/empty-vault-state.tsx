import React from "react";
import Link from "next/link";
import { Compass, Sparkles } from "lucide-react";

export function EmptyVaultState() {
  return (
    <div className="relative w-full max-w-md mx-auto text-center py-16 sm:py-20 px-6 border border-dashed border-amber-500/20 rounded-2xl bg-amber-500/5 backdrop-blur-sm flex flex-col items-center justify-center shadow-xl overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-amber-500/5 blur-3xl pointer-events-none" />
      
      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-amber-500/20 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-amber-500/20 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-amber-500/20 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-amber-500/20 rounded-br-sm pointer-events-none" />
      
      <div className="relative z-10">
        <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mb-5 mx-auto shadow-[0_0_30px_rgba(245,158,11,0.05)]">
          <Compass size={28} strokeWidth={1.5} className="text-amber-500/60" />
        </div>
        
        <h3 className="text-2xl font-black text-white uppercase tracking-wide">Your Vault Awaits</h3>
        <p className="text-sm text-zinc-400 font-medium mt-2 max-w-xs mx-auto leading-relaxed">
          Begin your collection journey with live match souvenirs and exclusive artifacts.
        </p>
        <p className="text-xs text-zinc-500 font-mono mt-1">
          Every event leaves a mark.
        </p>
        
        <Link 
          href="/drops" 
          className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-200 shadow-[0_0_30px_rgba(245,158,11,0.15)] active:scale-[0.98] cursor-pointer"
        >
          <Sparkles className="h-4 w-4" />
          View Today's Drops
        </Link>
      </div>
    </div>
  );
}