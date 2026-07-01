"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define the routes where the footer should NOT render
const HIDDEN_ROUTES = ["/drops", "/collections", "/passport", "/leaderboard", "/store"];

export function GlobalFooter() {
  const pathname = usePathname();

  // If the current path exactly matches or starts with a hidden route, do not render the footer.
  // (Using .startsWith allows us to hide it on nested routes like /drops/[id] in the future)
  const shouldHideFooter = HIDDEN_ROUTES.some((route) => pathname?.startsWith(route));

  if (shouldHideFooter) {
    return null;
  }

  // Shared accessible link class
  const linkClass = "text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded-sm px-1 py-0.5 -mx-1";

  return (
    <footer className="w-full border-t border-slate-800/30 bg-slate-950 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-12">
        
        {/* Top Section: Branding & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          {/* Left: Branding */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link 
              href="/" 
              className="text-2xl font-serif font-black text-white uppercase tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 rounded-sm"
              aria-label="Passivoo Homepage"
            >
              Passivoo
            </Link>
            <p className="text-zinc-500 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-center md:text-left">
              Collect the Moments.<br />
              Own the History.
            </p>
          </div>

          {/* Right: Navigation */}
          <nav aria-label="Footer Navigation" className="w-full md:w-auto">
            <ul className="flex flex-wrap justify-center md:justify-end items-center gap-x-8 gap-y-4 text-sm font-medium">
              <li>
                <Link href="/" className={linkClass}>Home</Link>
              </li>
              <li>
                <Link href="/about" className={linkClass}>About</Link>
              </li>
              <li>
                <Link href="/privacy" className={linkClass}>Privacy</Link>
              </li>
              <li>
                <Link href="/terms" className={linkClass}>Terms</Link>
              </li>
              <li>
                <Link href="/disclaimer" className={linkClass}>Disclaimer</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Section: Copyright & Legal */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-zinc-500 text-xs">
            &copy; {new Date().getFullYear()} Passivoo. All rights reserved.
          </p>
          <p className="text-zinc-600 font-mono text-[10px] tracking-wider uppercase">
            Independent fan-made project.
          </p>
        </div>

      </div>
    </footer>
  );
}