import { getCurrentUser } from "@/features/auth/actions/get-current-user";
import { HeroSection } from "@/features/home/components/hero-section";
import { PassportShowcaseSection } from "@/features/home/components/passport-showcase-section";
import { ProductLoopSection } from "@/features/home/components/product-loop-section";
import { PremiumCollectionsSection } from "@/features/home/components/premium-collections-section";
import { CollectionUniverseSection } from "@/features/home/components/collection-universe-section";
import { FinalCtaSection } from "@/features/home/components/final-cta-section";

export default async function HomePage() {
  const authData = await getCurrentUser();
  const user = authData?.user;

  return (
    <main className="relative flex w-full flex-col items-center overflow-hidden bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
      
      {/* SECTION 1: Ambient Hero - Mobile First */}
      <HeroSection user={user} />

      {/* SECTION 2: Passport Showcase (Infinite Marquee) */}
      <PassportShowcaseSection />
      
      {/* SECTION 3: Product Loop (Collector Journey) */}
      <ProductLoopSection />
      
      {/* SECTION 4: Premium Exhibition */}
      <PremiumCollectionsSection />
      
      {/* SECTION 5: Long-Term Vision */}
      <CollectionUniverseSection />
      
      {/* SECTION 6: Final CTA */}
      <FinalCtaSection user={user} />

    </main>
  );
}