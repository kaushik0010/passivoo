import Link from "next/link";
import { ArrowRight, Ticket, Trophy } from "lucide-react";
import { HOME_SHOWCASE_CONFIG } from "@/config/home-showcase";

interface HeroSectionProps {
  user: any | null;
}

export function HeroSection({ user }: HeroSectionProps) {
  const { activeEvent, headline, subheadline } = HOME_SHOWCASE_CONFIG.hero;

  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-8 sm:py-12">
      
      {/* Background Ambience: Vault Lighting */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[100px] md:h-[800px] md:w-[800px] md:blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[300px] w-[300px] rounded-full bg-blue-900/10 blur-[80px] md:h-[800px] md:w-[800px] md:blur-[120px]" />

      {/* Background Texture: Subtle Noise */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      <div className="z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center mt-8 md:mt-16">
        
        {/* Active Collection Badge */}
        <div className="mb-6 md:mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-bold tracking-widest text-amber-500 uppercase backdrop-blur-sm shadow-[0_0_20px_rgba(245,158,11,0.1)]">
          <Ticket className="h-3 w-3 md:h-4 md:w-4" />
          <span className="hidden xs:inline">{activeEvent.label}</span>
          <span className="xs:hidden">World Cup 2026</span>
        </div>

        {/* Unified Headline - Mobile-first typography */}
        <h1 className="mb-4 md:mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-slate-100 leading-[1.1]">
          {headline.base} <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700">
            {headline.highlight}
          </span>
        </h1>

        {/* Collector Subheadline */}
        <p className="mb-8 md:mb-12 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-slate-400 font-medium px-2">
          {subheadline}
        </p>

        {/* Interactive CTAs - Mobile first touch targets */}
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4 sm:w-auto">
          {user ? (
            <>
              <Link
                href="/collections"
                className="group flex h-12 sm:h-14 w-full sm:w-auto cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 sm:px-8 text-sm sm:text-base font-bold text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] active:scale-[0.98]"
              >
                Open Passport
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/drops"
                className="flex h-12 sm:h-14 w-full sm:w-auto cursor-pointer items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 px-6 sm:px-8 text-sm sm:text-base font-medium text-slate-300 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:text-amber-500 active:scale-[0.98]"
              >
                <Trophy className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Live Drops
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="group flex h-12 sm:h-14 w-full sm:w-auto cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 sm:px-8 text-sm sm:text-base font-bold text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] active:scale-[0.98]"
              >
                Create Passport
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/login"
                className="flex h-12 sm:h-14 w-full sm:w-auto cursor-pointer items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 px-6 sm:px-8 text-sm sm:text-base font-medium text-slate-300 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:text-amber-500 active:scale-[0.98]"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Scroll indicator - subtle */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <span className="text-[10px] tracking-[0.2em] text-slate-500 uppercase font-mono">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-amber-500/50 to-transparent" />
        </div>

      </div>
    </section>
  );
}