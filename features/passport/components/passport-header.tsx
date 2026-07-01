import React from "react";
import { TournamentConfig } from "../types/passport";

interface PassportHeaderProps {
  config: TournamentConfig;
}

export function PassportHeader({ config }: PassportHeaderProps) {
  return (
    <header className="w-full text-center flex flex-col items-center justify-center pt-12 pb-8">
      
      {/* Subtitle */}
      <p className="text-[var(--passport-text-secondary)] font-mono text-sm tracking-[0.3em] uppercase mb-3">
        {config.subtitle}
      </p>
      
      {/* Main Title with Gold Foil Gradient Effect */}
      <h1 
        className="text-5xl font-serif font-black tracking-widest uppercase mb-4"
        style={{
          background: "linear-gradient(to right, var(--passport-gold-dark), var(--passport-gold-highlight), var(--passport-gold-base))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.5))"
        }}
      >
        {config.title}
      </h1>
      
      {/* Host Nations (Flanked by decorative lines) */}
      <div className="flex items-center gap-4 w-3/4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--passport-gold-dark)] opacity-50" />
        <p className="text-[var(--passport-text-primary)] font-mono text-xs tracking-[0.3em] uppercase whitespace-nowrap">
          {config.hosts}
        </p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--passport-gold-dark)] opacity-50" />
      </div>
      
    </header>
  );
}