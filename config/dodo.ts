export const DODO_CONFIG = {
  // Map our business tiers to static Dodo Product IDs
  PRODUCT_IDS: {
    STANDARD: process.env.DODO_STANDARD_PRODUCT_ID || "pdt_standard_placeholder",
    FINAL: process.env.DODO_FINAL_PRODUCT_ID || "pdt_final_placeholder",
  },
  // Business logic values mapped to cents for programmatic DB validation
  PRICE_TIERS: {
    STANDARD_CENTS: 500,  // $5.00
    FINAL_CENTS: 1000,    // $10.00
  },
  TIMEOUT_MS: 15 * 1000, // 15-second cutoff for checkout initialization
  MAX_RETRIES: 0,        // Resilience against transient server drops
} as const;