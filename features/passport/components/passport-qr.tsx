"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Circle, X } from "lucide-react"; // Imported Lucide icons for the design

interface PassportQRCodeProps {
  url: string;
}

/**
 * Dual-rendering QR Code.
 * Displays a beautiful, low-contrast gold aesthetic in the passport UI.
 * When tapped, opens a high-contrast modal featuring the premium geometric 
 * design language, guaranteed to scan on any device.
 */
export function PassportQRCode({ url }: PassportQRCodeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 1. The Tiny, Beautiful Gold QR Code (Clickable) */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-14 h-14 rounded-md p-1.5 flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-200"
        aria-label="Enlarge QR Code"
        style={{
          backgroundColor: "var(--passport-bg-secondary)",
          boxShadow: "inset 0 1px 6px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <QRCodeSVG
          value={url}
          size={44}
          bgColor="transparent"
          // Replace this hex with your exact dark gold token if it differs
          fgColor="#D4AF37" 
          level="L"
          includeMargin={false}
          className="opacity-85" 
        />
      </button>

      {/* 2. The Premium High-Contrast Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)} // Close when clicking the background
        >
          <div 
            className="bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full animate-in zoom-in-95 duration-200 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent clicking the card from closing the modal
          >
            {/* ==========================================
                PREMIUM CURVICAL DESIGN BACKGROUND
                Pure CSS geometric curves with Lucide icons
                ========================================== */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Large sweeping curves */}
              <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full border border-amber-500/5" />
              <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full border border-amber-500/8" />
              <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full border border-amber-500/12" />
              
              <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full border border-amber-500/5" />
              <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full border border-amber-500/8" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full border border-amber-500/12" />
              
              {/* Medium curves */}
              <div className="absolute -top-24 right-8 w-56 h-56 rounded-full border border-blue-500/5" />
              <div className="absolute -top-16 right-16 w-40 h-40 rounded-full border border-blue-500/8" />
              <div className="absolute -bottom-24 left-8 w-56 h-56 rounded-full border border-blue-500/5" />
              <div className="absolute -bottom-16 left-16 w-40 h-40 rounded-full border border-blue-500/8" />
              
              {/* Decorative circles using Lucide */}
              <div className="absolute top-12 right-16 opacity-20">
                <Circle className="h-2 w-2 text-amber-500/40" />
              </div>
              <div className="absolute bottom-12 left-16 opacity-20">
                <Circle className="h-3 w-3 text-amber-500/40" />
              </div>
              <div className="absolute top-1/4 right-1/3 opacity-15">
                <Circle className="h-1.5 w-1.5 text-amber-500/30" />
              </div>
              <div className="absolute bottom-1/4 left-1/3 opacity-15">
                <Circle className="h-1.5 w-1.5 text-amber-500/30" />
              </div>
              
              {/* Diagonal sweeping lines */}
              <div className="absolute -top-32 -right-16 w-[400px] h-[400px] rotate-45 bg-gradient-to-br from-amber-500/[0.02] to-transparent rounded-full" />
              
              {/* Subtle radial glow in center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-amber-500/5 blur-3xl rounded-full" />
            </div>

            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-amber-500/30 rounded-tl-sm pointer-events-none z-10" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-amber-500/30 rounded-tr-sm pointer-events-none z-10" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-amber-500/30 rounded-bl-sm pointer-events-none z-10" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-amber-500/30 rounded-br-sm pointer-events-none z-10" />

            {/* Close Button Header */}
            <div className="relative z-50 w-full flex justify-end mb-2">
              <button 
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors p-2 -mr-4 -mt-4 rounded-full cursor-pointer"
                aria-label="Close"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* The High-Contrast Scannable Code (Isolated in a white box) */}
            <div className="relative z-10 bg-white p-3 sm:p-4 rounded-2xl mb-6 shadow-[0_0_40px_rgba(245,158,11,0.1)]">
              <QRCodeSVG 
                value={url} 
                size={220} 
                bgColor="#FFFFFF"
                fgColor="#000000" // Pure black for maximum optical contrast
                level="M" 
                includeMargin={false} // Margin is handled by the wrapper padding
              />
            </div>

            {/* Typography updated for dark theme */}
            <div className="relative z-10 text-center space-y-2">
              <p className="text-white font-serif font-black text-2xl uppercase tracking-tight">
                Scan to View
              </p>
              <p className="text-zinc-400 font-mono text-xs uppercase tracking-wider leading-relaxed">
                Point any smartphone camera<br/>at this code to verify.
              </p>
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}