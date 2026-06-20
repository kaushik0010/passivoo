import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/sonner";
import { PostHogProvider } from "@/providers/posthog-provider";
import { PostHogPageView } from "@/components/analytics/posthog-page-view";
import { PostHogIdentifier } from "@/components/analytics/posthog-identifier";
import { getCurrentUser } from "@/features/auth/actions/get-current-user";

// Initialize Inter font for a clean, highly legible, modern aesthetic
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

// IMPORTANT: Replace this with your actual production domain when launching
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://passivoo.com";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  
  // Title Template Strategy: 
  // Root page gets the `default`. Child pages get "%s | Passivoo"
  title: {
    default: "Passivoo | The Passport for Global Events",
    template: "%s | Passivoo",
  },
  
  description: "Collect the moments that matter. Build your permanent digital archive of the world's biggest stages, starting with the 2026 World Cup.",
  applicationName: "Passivoo",
  
  // Lean, highly targeted keywords
  keywords: [
    "digital collectibles",
    "event passport",
    "sports memorabilia",
    "World Cup 2026 collectibles",
    "digital archive",
    "premium drops"
  ],
  
  authors: [{ name: "Passivoo" }],
  creator: "Passivoo",
  publisher: "Passivoo",
  
  // Canonical URL configuration
  alternates: {
    canonical: "/",
  },

  // OpenGraph: Powers link previews on Discord, iMessage, Facebook, LinkedIn
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Passivoo | The Passport for Global Events",
    description: "Build your permanent digital archive of the world's biggest stages.",
    siteName: "Passivoo",
    // Next.js will automatically resolve this against metadataBase
    images: [
      {
        url: "/opengraph-image.png", // We will create this image asset later
        width: 1200,
        height: 630,
        alt: "Passivoo - Premium Digital Artifacts",
      },
    ],
  },

  // Twitter/X specific metadata
  twitter: {
    card: "summary_large_image",
    title: "Passivoo | The Passport for Global Events",
    description: "Build your permanent digital archive of the world's biggest stages.",
    creator: "@passivoo", // Replace with your actual Twitter handle if you have one
    images: ["/twitter-image.png"], // Falls back to opengraph-image if not provided
  },
  
  // Prevents search engines from indexing the site as a web app manifest incorrectly
  manifest: "/site.webmanifest",
};

// Next.js explicitly separates viewport configuration from standard metadata
export const viewport: Viewport = {
  themeColor: "#020617", // Tailwind slate-950 matches our deep navy background
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Prevents auto-zoom on input focus for mobile browsers, reinforcing the "native app" feel
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 1. Fetch user securely on the server
  const authSession = await getCurrentUser();
  const user = authSession?.user || null;

  return (
    // Hardcode "dark" class and colorScheme to enforce the dark-mode-only requirement
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${inter.variable} min-h-screen bg-slate-950 font-sans text-slate-50 antialiased selection:bg-amber-500/30 selection:text-amber-200`}
      >
        <PostHogProvider>
          {/* Handles Next.js route transitions */}
          <PostHogPageView />
          
          {/* Syncs Better Auth state with PostHog */}
          <PostHogIdentifier user={user} />

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
        </PostHogProvider>
      </body>
    </html>
  );
}