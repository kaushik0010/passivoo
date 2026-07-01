import React, { forwardRef } from "react";
import { PassportBackground } from "./passport-background";
import { PassportSidebar } from "./passport-sidebar";
import { PassportHeader } from "./passport-header";
import { PassportIdentity } from "./passport-identity";
import { PassportWorldMap } from "./passport-world-map";
import { PassportSecuritySeal } from "./passport-security-seal";
import { PassportFooter } from "./passport-footer";
import { FIFA_2026_CONFIG } from "../constants/tournament";
import { PassportData } from "../types/passport";
import "../styles/passport-theme.css";

interface PassportCardProps {
  data: PassportData;
}

export const PassportCard = forwardRef<HTMLDivElement, PassportCardProps>(
  ({ data }, ref) => {
    return (
      <div 
        ref={ref}
        className="passport-canvas relative w-[1200px] h-[750px] rounded-[2rem] flex flex-col select-none overflow-hidden shrink-0 bg-[var(--passport-bg-primary)]"
        style={{ boxShadow: "var(--passport-shadow-drop)" }}
      >
        <PassportBackground />
        
        {/* Top Row: Sidebar + Main Content */}
        <div className="flex flex-1 min-h-0">
          <PassportSidebar />
          
          {/* Vertical divider border */}
          <div className="w-px bg-gradient-to-b from-transparent via-[var(--passport-gold-dark)] to-transparent opacity-40" />
          
          <div className="flex-1 relative z-10 flex flex-col pr-12">
            <PassportHeader config={FIFA_2026_CONFIG} />
            
            <div className="relative flex-1 w-full flex items-center justify-between">
              <PassportWorldMap />
              <PassportIdentity data={data} />
              <PassportSecuritySeal />
            </div>
          </div>
        </div>
        
        {/* Bottom Row: Full Width Footer - Border now contained within card */}
        <div className="relative z-10 w-full px-8">
          <div className="border-t border-[var(--passport-gold-dark)] border-opacity-30" />
          <PassportFooter qrUrl={data.qrUrl} />
        </div>
      </div>
    );
  }
);

PassportCard.displayName = "PassportCard";