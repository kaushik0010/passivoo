import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/sonner";

// Initialize Inter font for a clean, highly legible, modern aesthetic
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

export const metadata: Metadata = {
  title: "Passivoo — Collect the World Cup",
  description: "Collect limited World Cup drops, earn points, and build your passport before moments disappear forever.",
  applicationName: "Passivoo",
  openGraph: {
    title: "Passivoo — Collect the World Cup",
    description: "Collect limited World Cup drops, earn points, and build your passport before moments disappear forever.",
    siteName: "Passivoo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Passivoo — Collect the World Cup",
    description: "Collect limited World Cup drops, earn points, and build your passport before moments disappear forever.",
  },
};

// Next.js explicitly separates viewport configuration from standard metadata
export const viewport: Viewport = {
  themeColor: "#020617", // Tailwind slate-950 matches our deep navy background
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents auto-zoom on input focus for mobile browsers, reinforcing the "native app" feel
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Hardcode "dark" class and colorScheme to enforce the dark-mode-only requirement
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${inter.variable} min-h-screen bg-slate-950 font-sans text-slate-50 antialiased selection:bg-amber-500/30 selection:text-amber-200`}
      >
        {/* Global Application Shell Wrapper */}
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          
          {/* Main Content Area */}
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </div>

        {/* Global Toast Provider */}
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}