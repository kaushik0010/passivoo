import React from "react";
import { Shield, Star, Hexagon } from "lucide-react";

export function PassportSecuritySeal() {
  return (
    <div className="relative w-48 h-56 flex flex-col items-center justify-center -mt-8">
      
      {/* Outer Shield / Glow Layer */}
      <div 
        className="absolute inset-0 opacity-20 blur-xl"
        style={{ background: "var(--passport-gold-base)" }}
      />
      
      {/* The Physical Seal Base */}
      <div 
        className="relative z-10 w-40 h-48 flex flex-col items-center justify-center rounded-t-full rounded-b-xl border-[3px] border-[var(--passport-border-main)] overflow-hidden"
        style={{ 
          background: "linear-gradient(135deg, var(--passport-bg-primary), var(--passport-bg-secondary))",
          boxShadow: "var(--passport-shadow-drop), inset 0 0 20px rgba(0,0,0,0.8)"
        }}
      >
        {/* Inner Foil Accent Ring */}
        <div className="absolute inset-2 border border-[var(--passport-border-accent)] opacity-40 rounded-t-full rounded-b-lg" />
        
        {/* Top Stars */}
        <div className="flex gap-1.5 mb-3 text-[var(--passport-gold-highlight)]">
          <Star size={10} fill="currentColor" opacity={0.6} />
          <Star size={14} fill="currentColor" className="-mt-1" />
          <Star size={10} fill="currentColor" opacity={0.6} />
        </div>

        {/* Central Icon (Placeholder for the Football, using Hexagon as a generic geometry for now) */}
        <div className="relative mb-3 flex items-center justify-center w-14 h-14">
          <div 
            className="w-12 h-12 rounded-full border-2 border-[var(--passport-gold-base)] opacity-80 relative overflow-hidden"
            style={{
              background: "conic-gradient(from 0deg, transparent 0deg, var(--passport-gold-base) 10deg, transparent 20deg, var(--passport-gold-base) 30deg, transparent 40deg, var(--passport-gold-base) 50deg, transparent 60deg, var(--passport-gold-base) 70deg, transparent 80deg, var(--passport-gold-base) 90deg, transparent 100deg, var(--passport-gold-base) 110deg, transparent 120deg, var(--passport-gold-base) 130deg, transparent 140deg, var(--passport-gold-base) 150deg, transparent 160deg, var(--passport-gold-base) 170deg, transparent 180deg, var(--passport-gold-base) 190deg, transparent 200deg, var(--passport-gold-base) 210deg, transparent 220deg, var(--passport-gold-base) 230deg, transparent 240deg, var(--passport-gold-base) 250deg, transparent 260deg, var(--passport-gold-base) 270deg, transparent 280deg, var(--passport-gold-base) 290deg, transparent 300deg, var(--passport-gold-base) 310deg, transparent 320deg, var(--passport-gold-base) 330deg, transparent 340deg, var(--passport-gold-base) 350deg, transparent 360deg)"
            }}
          >
            {/* Pentagon pattern overlay */}
            <div className="absolute inset-[15%] border-2 border-[var(--passport-gold-base)] rounded-full opacity-60" />
            <div className="absolute inset-[30%] border border-[var(--passport-gold-base)] rounded-full opacity-40" />
          </div>
          <div className="absolute inset-0 border border-[var(--passport-gold-light)] rounded-full opacity-30 scale-110" />
        </div>

        {/* Text Ribbon */}
        <div className="flex flex-col items-center w-full px-4 text-center">
          <span className="text-[var(--passport-text-primary)] text-sm font-serif tracking-[0.15em] leading-tight font-black uppercase">
            Official
          </span>
          <span className="text-[var(--passport-text-primary)] text-sm font-serif tracking-[0.15em] leading-tight font-black uppercase">
            Edition
          </span>
          
          <div className="flex items-center gap-2 mt-2 w-full">
            <div className="h-px flex-1 bg-[var(--passport-gold-dark)] opacity-60" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[var(--passport-gold-base)]" />
            <div className="h-px flex-1 bg-[var(--passport-gold-dark)] opacity-60" />
          </div>
        </div>

      </div>
    </div>
  );
}