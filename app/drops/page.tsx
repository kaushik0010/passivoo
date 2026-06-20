import { getCurrentUser } from "@/features/auth/actions/get-current-user";
import { getActiveDropsData } from "@/features/drops/queries/get-active-drops-data";
import { getRecentDrops } from "@/features/collections/queries/get-recent-drops";
import { getActivePremiumBundle } from "@/features/premium/queries/get-active-premium-bundle";

// Components
import { DropsClientManager } from "@/features/drops/components/drops-client-manager";
import { PremiumBundleSection } from "@/features/premium/components/premium-bundle-section";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Drops & Storefront",
  description: "Claim live event artifacts, limited-edition collector's items, and premium foil stamps before the timer runs out.",
  alternates: {
    canonical: "/drops",
  },
};

export default async function DropsPage() {
  const authSession = await getCurrentUser();
  const userId = authSession?.user?.id;

  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground font-mono">Authentication context missing.</p>
      </div>
    );
  }

  const [activeDropsData, recentDrops, premiumStorefrontState] = await Promise.all([
    getActiveDropsData({ userId }),
    getRecentDrops({ userId, limit: 5 }),
    getActivePremiumBundle({ userId }),
  ]);

  return (
    <main className="relative flex w-full flex-col items-center overflow-hidden bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 min-h-screen">
      
      {/* Vault Ambient Lighting - Matching Home Page */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-[120px] md:h-[800px] md:w-[800px]" />
      <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-900/5 blur-[120px] md:h-[800px] md:w-[800px]" />
      
      {/* Subtle Noise Texture Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Content Container - Removed max-w-md constraint */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 lg:py-12 space-y-8 sm:space-y-10 md:space-y-12">
        
        {/* Page Header */}
        <div className="text-center space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-amber-500 uppercase">
            Live Collection
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white uppercase">
            Available Drops
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Claim your artifacts before they're sealed in the archive.
          </p>
        </div>

        {/* Sections */}
        <DropsClientManager 
          initialActiveData={activeDropsData} 
          initialRecentDrops={recentDrops} 
        />

        <PremiumBundleSection state={premiumStorefrontState} />

      </div>
    </main>
  );
}