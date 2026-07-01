import React from "react";

export function PassportSidebar() {
  return (
    <aside className="relative z-10 w-[300px] h-full flex flex-col items-center justify-start pt-8">
      
      {/* Top Branding - Moved Upwards */}
      <div className="text-center space-y-2.5 mt-14">
        
        {/* PASSIVOO - Smaller, positioned properly, less than main title */}
        <h2 
          className="font-serif text-3xl tracking-[0.2em] uppercase font-black leading-tight"
          style={{
            background: "linear-gradient(to right, var(--passport-gold-dark), var(--passport-gold-highlight), var(--passport-gold-base))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0px 1px 3px rgba(0,0,0,0.4))"
          }}
        >
          Passivoo
        </h2>
        
        {/* OFFICIAL FAN PASSPORT - Badge style */}
        <div className="relative inline-block">
          <div 
            className="px-4 py-1 border-2 border-[var(--passport-gold-base)] rounded-sm"
            style={{
              background: "linear-gradient(to right, rgba(212,175,55,0.05), rgba(212,175,55,0.12), rgba(212,175,55,0.05))",
              boxShadow: "inset 0 0 20px rgba(212,175,55,0.05)"
            }}
          >
            <span className="text-[var(--passport-text-primary)] font-mono text-[9px] tracking-[0.25em] uppercase font-bold">
              Digital Fan Passport
            </span>
          </div>
        </div>
        
        {/* Decorative divider */}
        <div className="flex items-center gap-2.5 w-full max-w-[160px] mx-auto">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[var(--passport-gold-dark)] opacity-40" />
          <div className="w-1 h-1 rotate-45 bg-[var(--passport-gold-base)] opacity-50" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[var(--passport-gold-dark)] opacity-40" />
        </div>
        
        {/* COLLECT THE MOMENTS. OWN THE HISTORY. - Brand statement */}
        <div className="space-y-0.5">
          <p className="text-[var(--passport-text-primary)] font-serif text-[11px] tracking-[0.12em] uppercase font-bold leading-tight">
            Collect the moments.
          </p>
          <p className="text-[var(--passport-text-primary)] font-serif text-[11px] tracking-[0.12em] uppercase font-bold leading-tight">
            Own the history.
          </p>
        </div>
      </div>

      {/* Center Trophy/Logo Graphic - Adjusted spacing */}
      <div className="w-28 h-40 flex items-center justify-center mt-20">
        <img 
          src="/passport/logo.webp" 
          alt="Official Logo" 
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]" 
        />
      </div>

      {/* Bottom Legal/Official Text */}
      <div className="text-center flex flex-col items-center gap-2 mt-16 mb-6">
        <p className="text-[var(--passport-gold-dark)] text-[9px] font-mono tracking-[0.2em] uppercase font-semibold leading-relaxed">
          Digital Football<br />Fan Passport
        </p>
        {/* Small decorative emblem */}
        <div className="w-5 h-3 border border-[var(--passport-gold-dark)] rounded-sm flex items-center justify-center opacity-40">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--passport-gold-dark)]" />
        </div>
      </div>
      
    </aside>
  );
}