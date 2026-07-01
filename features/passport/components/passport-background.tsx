import React from "react";

export function PassportBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[2rem]">
      {/* 1. Base Navy Leather */}
      <div className="absolute inset-0 bg-[var(--passport-bg-primary)]" />
      
      {/* 2. Vignette (Darker edges) */}
      <div 
        className="absolute inset-0" 
        style={{ boxShadow: "var(--passport-shadow-inset)" }} 
      />
      
      {/* 3. Leather Texture (CSS Noise Overlay) */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{ backgroundImage: "var(--passport-leather-noise)" }}
      />

      {/* 4. Engraved World Map (Faded SVG in background) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 mix-blend-screen px-24">
        <img 
          src="/passport/leather-bg.webp" 
          alt="World Map" 
          className="w-full h-auto object-cover opacity-50"
        />
      </div>

      {/* 5. Outer Thick Gold Border */}
      <div className="absolute inset-4 border-[3px] border-[var(--passport-border-main)] rounded-2xl opacity-75" />
      
      {/* 6. Inner Thin Accent Border */}
      <div className="absolute inset-[22px] border border-[var(--passport-border-accent)] rounded-xl opacity-40" />
    </div>
  );
}