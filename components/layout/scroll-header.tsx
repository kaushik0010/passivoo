"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ScrollHeaderProps {
  children: React.ReactNode;
}

export function ScrollHeader({ children }: ScrollHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger glassmorphism when scrolled down 20px
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to check initial position
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500 ease-in-out",
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 shadow-xl"
          : "bg-transparent border-b-transparent"
      )}
    >
      {children}
    </header>
  );
}