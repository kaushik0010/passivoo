import React from "react";
import { Globe2, Users, Ticket, Trophy } from "lucide-react";
import { PassportQRCode } from "./passport-qr";

interface PassportFooterProps {
  qrUrl: string;
}

export function PassportFooter({ qrUrl }: PassportFooterProps) {
  return (
    <footer className="w-full pt-3 pb-9">
      <div className="flex items-start justify-between gap-2 mx-6">
        
        {/* Section 1: Global Tournament */}
        <div className="flex gap-2">
          <Globe2 className="text-[var(--passport-gold-dark)] w-10 h-10 mt-0.5" strokeWidth={1.5} />
          <div className="flex flex-col">
            <span className="text-[var(--passport-text-secondary)] text-[7px] font-mono tracking-widest uppercase mb-0.5">
              Global Tournament
            </span>
            <span className="text-[var(--passport-text-primary)] text-[10px] font-serif tracking-wider uppercase">
              3 Host Nations
            </span>
            <span className="text-[var(--passport-text-primary)] text-[10px] font-serif tracking-wider uppercase opacity-75">
              16 Host Cities
            </span>
          </div>
        </div>

        {/* Section 2: The Beautiful Game */}
        <div className="flex gap-2 pl-2 border-l border-[var(--passport-gold-dark)] border-opacity-30">
          <Users className="text-[var(--passport-gold-dark)] w-10 h-10 mt-0.5" strokeWidth={1.5} />
          <div className="flex flex-col">
            <span className="text-[var(--passport-text-secondary)] text-[7px] font-mono tracking-widest uppercase mb-0.5">
              The Beautiful Game
            </span>
            <span className="text-[var(--passport-text-primary)] text-[10px] font-serif tracking-wider uppercase">
              32 Teams
            </span>
            <span className="text-[var(--passport-text-primary)] text-[10px] font-serif tracking-wider uppercase opacity-75">
              104 Matches
            </span>
          </div>
        </div>

        {/* Section 3: Collect Moments */}
        <div className="flex gap-2 pl-2 border-l border-[var(--passport-gold-dark)] border-opacity-30">
          <Ticket className="text-[var(--passport-gold-dark)] w-10 h-10 mt-0.5" strokeWidth={1.5} />
          <div className="flex flex-col">
            <span className="text-[var(--passport-text-secondary)] text-[7px] font-mono tracking-widest uppercase mb-0.5">
              Collect Moments
            </span>
            <span className="text-[var(--passport-text-primary)] text-[10px] font-serif tracking-wider uppercase">
              Rare Drops
            </span>
            <span className="text-[var(--passport-text-primary)] text-[10px] font-serif tracking-wider uppercase opacity-75 flex items-center gap-1.5">
              <span>Legendary</span>
              <span className="text-[var(--passport-gold-base)] text-[6px] font-mono tracking-wider uppercase font-bold border border-[var(--passport-gold-dark)]/30 px-1 rounded-sm">
                Memories
              </span>
            </span>
          </div>
        </div>

        {/* Section 4: Own The History */}
        <div className="flex gap-2 pl-2 border-l border-[var(--passport-gold-dark)] border-opacity-30">
          <Trophy className="text-[var(--passport-gold-dark)] w-10 h-10 mt-0.5" strokeWidth={1.5} />
          <div className="flex flex-col">
            <span className="text-[var(--passport-text-secondary)] text-[7px] font-mono tracking-widest uppercase mb-0.5">
              Own The History
            </span>
            <span className="text-[var(--passport-text-primary)] text-[10px] font-serif tracking-wider uppercase">
              Your Journey
            </span>
            <span className="text-[var(--passport-text-primary)] text-[10px] font-serif tracking-wider uppercase opacity-75">
              Your Legacy
            </span>
          </div>
        </div>

        {/* Section 5: QR Code */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-[var(--passport-gold-dark)] border-opacity-30">
          
          <PassportQRCode url={qrUrl} />
          
          <div className="flex flex-col">
            <span className="text-[var(--passport-text-secondary)] text-[7px] font-mono tracking-widest uppercase mb-0.5 leading-tight">
              Scan to start
            </span>
            <span className="text-[var(--passport-text-primary)] text-[8px] font-mono tracking-wider uppercase font-bold leading-tight">
              Your Journey
            </span>
            <span className="text-[var(--passport-gold-base)] text-[8px] font-mono font-bold tracking-widest uppercase mt-0.5">
              at Passivoo
            </span>
          </div>
        </div>

      </div>
      
      {/* YOUR JOURNEY. YOUR LEGACY. - Full width bottom tagline */}
      <div className="mt-2.5 pt-2 border-t border-[var(--passport-gold-dark)] border-opacity-20 text-center">
        <p className="text-[var(--passport-text-secondary)] text-[8px] font-mono tracking-[0.25em] uppercase font-medium">
          Your Journey. Your Collection. Your Legacy.
        </p>
      </div>
      
    </footer>
  );
}