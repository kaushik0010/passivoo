import Link from "next/link";
import { Compass, Ticket, ArrowRight, Crown } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 p-4 sm:p-6 md:p-8 relative overflow-hidden">
      
      {/* Ambient lighting */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle noise texture */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
      
      <div className="z-10 w-full max-w-2xl mx-auto">
        
        {/* Card Container */}
        <div className="relative p-8 sm:p-10 md:p-12 rounded-2xl bg-slate-900/50 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden">
          
          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-500/30 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-500/30 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-500/30 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-500/30 rounded-br-sm pointer-events-none" />
          
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            
            {/* 404 Icon */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Compass className="h-10 w-10 text-amber-500/60" />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-1 rounded-full border border-amber-500/10 animate-pulse" />
            </div>
            
            {/* Error Code */}
            <div className="space-y-1">
              <p className="text-sm font-mono tracking-[0.3em] text-amber-500/60 uppercase">
                Error 404
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
                Page Not Found
              </h1>
            </div>
            
            {/* Divider with crown */}
            <div className="flex items-center gap-4 w-full max-w-[200px]">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-amber-500/30" />
              <Crown className="h-4 w-4 text-amber-500/40" />
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-amber-500/30" />
            </div>
            
            {/* Message */}
            <p className="text-slate-400 max-w-md text-sm sm:text-base">
              The artifact you're looking for has been sealed in the archive 
              or never existed in this collection.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-4 w-full max-w-sm">
              <Link
                href="/"
                className="group w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold py-3 px-6 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-200 shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] active:scale-[0.98] cursor-pointer"
              >
                <Ticket className="h-4 w-4" />
                Return to Vault
              </Link>
              <Link
                href="/drops"
                className="group w-full sm:flex-1 inline-flex items-center justify-center gap-2 border border-slate-700 text-slate-300 font-medium py-3 px-6 rounded-xl hover:border-amber-500/50 hover:text-amber-400 transition-all duration-200 active:scale-[0.98] cursor-pointer"
              >
                <span>Browse Drops</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            
            {/* Brand Tagline */}
            <div className="pt-6 mt-2 border-t border-slate-800/50 w-full max-w-xs">
              <p className="text-[10px] font-mono tracking-[0.15em] text-slate-500 italic">
                Your journey. Your collection. Your legacy.
              </p>
            </div>
            
          </div>
          
        </div>
        
        {/* Decorative footer */}
        <div className="mt-6 text-center opacity-30">
          <p className="text-[8px] font-mono tracking-[0.4em] text-slate-500 uppercase">
            Distributed by Passion • Glory
          </p>
        </div>
        
      </div>
    </main>
  );
}