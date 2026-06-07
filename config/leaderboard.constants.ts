/**
 * Core leaderboard and game progression constants for Passivoo.
 * This file is the single source of truth for rankings, titles, and economy ceilings.
 * * ==========================================
 * LOCKED LEADERBOARD RANKING RULES:
 * 1. totalPoints DESC
 * 2. totalCollectibles DESC 
 * 3. lastClaimedAt ASC (Earlier achiever wins)
 * ==========================================
 * * POINT ECONOMY CEILING: 8180 Max Free-Track Points
 */

export interface CollectorTier {
  /** The thematic display name for the user's current progression */
  title: string;
  /** The minimum totalPoints required to achieve this title */
  minPoints: number;
}

/**
 * Data-driven array of Collector Titles based on the locked 8180 point economy.
 * * IMPORTANT: This array MUST remain sorted in DESCENDING order of minPoints.
 * This ensures that a simple `.find()` operation correctly matches the highest eligible tier.
 */
export const COLLECTOR_TIERS: CollectorTier[] = [
  {
    title: "World Cup Archivist",
    minPoints: 7000, // ~85.5% Completion
  },
  {
    title: "Legendary Collector",
    minPoints: 5000,
  },
  {
    title: "Epic Collector",
    minPoints: 2500,
  },
  {
    title: "Rare Collector",
    minPoints: 1000,
  },
  {
    title: "Collector",
    minPoints: 250, // Achievable after ~6 Group Stage matches
  },
  {
    title: "Rookie Collector",
    minPoints: 0, // Fallback for brand new users
  },
];

/**
 * Pagination limit for the Global Leaderboard pages.
 * 50 provides a substantial view of competitors without causing heavy database 
 * serialization or slow frontend DOM rendering.
 */
export const LEADERBOARD_PAGE_LIMIT = 50;

/**
 * The estimated total number of free-track drops available during the tournament.
 * Used exclusively for calculating the "Tournament Progress" percentage.
 * * Derivation based on locked economy: 
 * 345 Match Drops + ~48 Future Country Badges = 393 
 * Rounded to 400 for a clean progression denominator.
 */
export const ESTIMATED_TOTAL_DROPS = 400;

/**
 * Utility helper to derive a collector title based on points.
 * Ensures the logic remains centralized and error-free.
 * * @param totalPoints The user's current point total.
 * @returns The string title corresponding to their tier.
 */
export function getCollectorTitle(totalPoints: number): string {
  // Finds the first tier where points exceed the minimum (requires DESC sort)
  const tier = COLLECTOR_TIERS.find((t) => totalPoints >= t.minPoints);
  
  // Fallback to lowest tier if something goes wrong or points are negative
  return tier ? tier.title : COLLECTOR_TIERS[COLLECTOR_TIERS.length - 1].title;
}