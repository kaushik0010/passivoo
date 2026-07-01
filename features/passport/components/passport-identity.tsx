import React from "react";
import { PassportData } from "../types/passport";

interface PassportIdentityProps {
  data: PassportData;
}

export function PassportIdentity({ data }: PassportIdentityProps) {
  return (
    <div className="relative w-full max-w-xl flex flex-col gap-6 pl-8 pt-4">
      
      {/* Passport Holder */}
      <div className="flex flex-col gap-1 w-full">
        <span className="text-[var(--passport-gold-dark)] text-[10px] font-mono tracking-[0.25em] uppercase font-bold">
          Passport Holder
        </span>
        <span 
          className="text-[var(--passport-text-primary)] text-3xl font-serif tracking-wide truncate max-w-[450px]"
          title={data.username}
        >
          {data.username}
        </span>
      </div>

      {/* Grid for secondary details - Added EVENT and PASSION fields */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-10">
        
        {/* Passport Number */}
        <div className="flex flex-col gap-1">
          <span className="text-[var(--passport-gold-dark)] text-[9px] font-mono tracking-[0.25em] uppercase font-bold">
            Passport No.
          </span>
          <span className="text-[var(--passport-text-primary)] text-sm font-mono tracking-widest uppercase">
            {data.passportId}
          </span>
        </div>

        {/* Issued Date */}
        <div className="flex flex-col gap-1">
          <span className="text-[var(--passport-gold-dark)] text-[9px] font-mono tracking-[0.25em] uppercase font-bold">
            Issued On
          </span>
          <span className="text-[var(--passport-text-primary)] text-sm font-mono tracking-widest uppercase">
            {data.issueDate}
          </span>
        </div>

        {/* Event Name - NEW */}
        <div className="flex flex-col gap-1">
          <span className="text-[var(--passport-gold-dark)] text-[9px] font-mono tracking-[0.25em] uppercase font-bold">
            Event
          </span>
          <span className="text-[var(--passport-text-primary)] text-sm font-mono tracking-widest uppercase">
            FIFA World Cup 2026™
          </span>
        </div>

        {/* Passion Field - NEW */}
        <div className="flex flex-col gap-1">
          <span className="text-[var(--passport-gold-dark)] text-[9px] font-mono tracking-[0.25em] uppercase font-bold">
            Passion
          </span>
          <span className="text-[var(--passport-text-primary)] text-sm font-mono tracking-widest uppercase">
            Football Unites The World
          </span>
        </div>
        
      </div>
    </div>
  );
}