import React from "react";

interface TextDocumentLayoutProps {
  children: React.ReactNode;
}

/**
 * A highly readable, text-optimized layout for long-form content.
 * Perfect for About, Privacy Policy, Terms of Service, etc.
 */
export function TextDocumentLayout({ children }: TextDocumentLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-950 py-16 px-6 sm:px-8 lg:px-12 selection:bg-amber-500/30">
      <article className="max-w-2xl mx-auto w-full">
        {children}
      </article>
    </main>
  );
}