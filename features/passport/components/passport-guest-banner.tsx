import React from "react";
import { Sparkles } from "lucide-react";

export function PassportGuestBanner() {
  return (
    <div 
      className="w-full max-w-7xl mx-auto mb-6 px-4"
      role="alert"
      aria-live="polite"
    >
      <div 
        className="w-full rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border shadow-lg"
        style={{
          background: "linear-gradient(to right, var(--passport-bg-primary), var(--passport-bg-secondary))",
          borderColor: "color-mix(in srgb, var(--passport-border-main) 30%, transparent)"
        }}
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(to bottom right, var(--passport-gold-base), var(--passport-gold-dark))"
            }}
          >
            <Sparkles 
              className="w-5 h-5" 
              style={{ color: "var(--passport-bg-primary)" }}
            />
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-[var(--passport-text-primary)] font-serif text-sm md:text-base font-bold tracking-wide">
              Reserve your unique username
            </h3>
            <p className="text-[var(--passport-text-secondary)] text-xs md:text-sm font-mono mt-0.5">
              Create an account to permanently own this FIFA Fan Passport.
            </p>
          </div>
        </div>

        <button 
          className="shrink-0 w-full sm:w-auto font-bold py-2.5 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 uppercase tracking-wider text-xs cursor-pointer"
          aria-label="Create your Passport account"
          style={{
            background: "linear-gradient(to right, var(--passport-gold-base), var(--passport-gold-highlight))",
            color: "var(--passport-bg-primary)",
            boxShadow: "0 0 15px color-mix(in srgb, var(--passport-gold-base) 20%, transparent)"
          }}
        >
          Create Passport
        </button>
      </div>
    </div>
  );
}