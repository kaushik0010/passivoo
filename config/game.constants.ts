/**
 * Core game configuration for the Passivoo application.
 * These constants act as the single source of truth for match claim windows,
 * leaderboard logic, and application-wide game rules.
 */

/**
 * How early a collectible drop becomes available for claiming before a match starts.
 * Current Rule: 10 minutes before kickoff.
 */
export const CLAIM_WINDOW_BEFORE_KICKOFF_MINUTES = 10;

/**
 * How long a collectible drop remains available for claiming after the match starts.
 * Current Rule: 3 hours total (covering 90 mins + halftime + stoppage + extra time + 60 min buffer).
 */
export const CLAIM_WINDOW_AFTER_KICKOFF_HOURS = 4;