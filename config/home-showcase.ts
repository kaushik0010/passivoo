/**
 * Global Home Page Configuration
 */
import { DropCategory, DropRarity } from "@/features/drops/types/drop.types";
import { PremiumTheme } from "@/config/premium.constants";

export const HOME_SHOWCASE_CONFIG = {
  hero: {
    activeEvent: {
      label: "Active Collection: World Cup 2026",
      icon: "Ticket", 
    },
    headline: {
      base: "The Passport For",
      highlight: "Global Events.",
    },
    subheadline: "Collect the moments that matter. Build your permanent archive of the world's biggest stages, starting with the 2026 World Cup.",
  },
  
  // Showcase Data: Used by the infinite marquee to display the free tier
  showcaseDrops: [
    { id: "s1", name: "Opening Match Badge", category: DropCategory.EVENT_BADGE, rarity: DropRarity.COMMON, points: 10 },
    { id: "s2", name: "Estadio Azteca", category: DropCategory.STADIUM, rarity: DropRarity.RARE, points: 25 },
    { id: "s3", name: "Golden Boot Prediction", category: DropCategory.SPECIAL, rarity: DropRarity.EPIC, points: 50 },
    { id: "s4", name: "Toronto Host City", category: DropCategory.HOST_CITY, rarity: DropRarity.COMMON, points: 10 },
    { id: "s5", name: "MetLife Stadium", category: DropCategory.STADIUM, rarity: DropRarity.RARE, points: 25 },
    { id: "s6", name: "World Cup Final Badge", category: DropCategory.EVENT_BADGE, rarity: DropRarity.LEGENDARY, points: 100 },
  ],

  // Premium Showcase Data: Used by the marquee to display the high-end foil tier
  premiumShowcaseDrops: [
    { id: "p1", name: "Maracanã Heritage", category: DropCategory.STADIUM, rarity: DropRarity.COMMON, theme: PremiumTheme.GROUP_STAGE_THEME },
    { id: "p2", name: "Champion's Aura", category: DropCategory.SPECIAL, rarity: DropRarity.EPIC, theme: PremiumTheme.KNOCKOUT_THEME },
    { id: "p3", name: "Wembley Foundation", category: DropCategory.STADIUM, rarity: DropRarity.RARE, theme: PremiumTheme.FINAL_THEME },
    { id: "p4", name: "Founder's Coin", category: DropCategory.SPECIAL, rarity: DropRarity.LEGENDARY, theme: PremiumTheme.FINAL_THEME },
  ],

  futureUniverseEvents: [
    { name: "Olympics 2028", status: "Coming Soon" },
    { name: "Champions League", status: "Coming Soon" },
    { name: "Formula 1", status: "Coming Soon" },
  ],
};