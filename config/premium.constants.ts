
// ==========================================
// BUSINESS RULES
// ==========================================

import { MatchStage } from "@/features/matches/types/match.types";

/** * The number of days a Premium Bundle remains available for purchase 
 * AFTER its associated match has concluded. 
 */
export const PREMIUM_BUNDLE_EXPIRY_DAYS = 7;

/**
 * The baseline price for a standard match Premium Bundle (in USD cents).
 * e.g., 500 = $5.00
 */
export const PREMIUM_BUNDLE_PRICE_CENTS = 500;

/**
 * The price for the prestigious Final match Premium Bundle (in USD cents).
 * e.g., 1000 = $10.00
 */
export const PREMIUM_FINAL_BUNDLE_PRICE_CENTS = 1000;

// ==========================================
// THEME ARCHITECTURE
// ==========================================

/**
 * Strict taxonomy for the frontend rendering engine. 
 * These strings dictate the exact visual asset paths and CSS classes 
 * loaded for a specific Premium Bundle.
 */
export enum PremiumTheme {
  OPENING_THEME = "Opening Theme",
  GROUP_STAGE_THEME = "Group Stage Theme",
  KNOCKOUT_THEME = "Knockout Theme",
  ELITE_THEME = "Elite Theme",
  CHAMPION_THEME = "Champion Theme",
  FINAL_THEME = "Final Theme",
}

/**
 * The single source of truth mapping the tournament timeline (MatchStage)
 * to the Premium visual ecosystem (PremiumTheme).
 */
export const PREMIUM_THEME_MAP: Record<MatchStage, PremiumTheme> = {
  [MatchStage.GROUP_STAGE]: PremiumTheme.GROUP_STAGE_THEME,
  [MatchStage.ROUND_OF_32]: PremiumTheme.KNOCKOUT_THEME,
  [MatchStage.ROUND_OF_16]: PremiumTheme.KNOCKOUT_THEME,
  [MatchStage.QUARTER_FINAL]: PremiumTheme.ELITE_THEME,
  [MatchStage.SEMI_FINAL]: PremiumTheme.CHAMPION_THEME,
  [MatchStage.THIRD_PLACE]: PremiumTheme.CHAMPION_THEME,
  [MatchStage.FINAL]: PremiumTheme.FINAL_THEME,
};
