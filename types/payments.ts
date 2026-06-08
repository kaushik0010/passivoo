export type DodoEnvironment = "test_mode" | "live_mode";

/**
 * Strict structure embedded directly into the Dodo Checkout Session metadata object.
 * Essential for stateless webhook consumption.
 */
export interface CheckoutMetadata {
  userId: string;
  bundleId: string;
//   matchId: string;
//   tier: "STANDARD" | "FINAL";
}

/**
 * Server-side validated payload definition required to initialize checkout safely.
 */
export interface CheckoutInitializationPayload {
  bundleId: string;
}

/**
 * Standard backend response payload container returned to the App Router client.
 */
export interface CheckoutSessionResponse {
  success: boolean;
  checkoutUrl?: string;
  error?: string;
}