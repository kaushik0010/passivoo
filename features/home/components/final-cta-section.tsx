import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FinalCtaSectionProps {
  user: any | null;
}

export function FinalCtaSection({ user }: FinalCtaSectionProps) {
  return (
    <section className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-slate-950 overflow-hidden border-t border-slate-900">
      
      {/* Base glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] sm:h-[400px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-500/15 via-slate-950/50 to-slate-950 pointer-events-none blur-2xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 md:px-8 text-center">
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase mb-4 sm:mb-6 leading-tight">
          Your Archive Awaits
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl text-slate-400 font-medium mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
          Join the definitive collector platform for global events. 
          Your passport starts with a single stamp.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {user ? (
            <Link
              href="/collections"
              className="group flex h-12 sm:h-14 w-full sm:w-auto cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 sm:px-10 text-sm sm:text-base font-bold text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] uppercase tracking-wider active:scale-[0.98]"
            >
              Open My Passport
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <Link
              href="/register"
              className="group flex h-12 sm:h-14 w-full sm:w-auto cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 sm:px-10 text-sm sm:text-base font-bold text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] uppercase tracking-wider active:scale-[0.98]"
            >
              Initialize Passport
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

      </div>
    </section>
  );
}