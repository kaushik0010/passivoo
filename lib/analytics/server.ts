import { PostHog } from 'posthog-node';

// ==========================================
// SINGLETON INITIALIZATION
// ==========================================

// Prevent multiple instances during Next.js Hot Module Replacement (HMR)
const globalForPostHog = globalThis as unknown as {
  posthogClient: PostHog | undefined;
};

function instantiatePostHogClient(): PostHog | undefined {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

  if (!apiKey) {
    console.warn('[Analytics] NEXT_PUBLIC_POSTHOG_KEY is missing. Server analytics disabled.');
    return undefined; // Changed from null to undefined
  }

  return new PostHog(apiKey, {
    host: host,
    // We flush manually to guarantee delivery in serverless environments
    flushAt: 1,
    flushInterval: 0,
  });
}

const client = globalForPostHog.posthogClient ?? instantiatePostHogClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPostHog.posthogClient = client;
}

// ==========================================
// TYPE DEFINITIONS (Data Contracts)
// ==========================================

export interface UserRegisteredPayload {
  userId: string;
  email: string;
  username: string;
  provider?: string;
}

export interface DropClaimedPayload {
  userId: string;
  dropId: string;
  dropName: string;
  category: string;
  rarity: string;
  isPremium: boolean;
}

export interface CheckoutStartedPayload {
  userId: string;
  bundleId: string;
  price?: number;
  currency?: string;
}

export interface PurchaseCompletedPayload {
  userId: string;
  transactionId: string;
  bundleId: string;
  revenue: number; // PostHog strictly looks for $revenue
  currency: string;
}

// ==========================================
// WRAPPER FUNCTIONS
// ==========================================

/**
 * Safely executes a PostHog capture synchronously.
 * Using captureImmediate() guarantees the event reaches PostHog 
 * before Vercel kills the lambda in a serverless environment.
 */
async function captureAndFlush(
  eventName: string,
  distinctId: string,
  properties: Record<string, any>
) {
  if (!client) return;

  try {
    // Replaced .capture() + .flush() with .captureImmediate()
    await client.captureImmediate({
      distinctId,
      event: eventName,
      properties,
    });
  } catch (error) {
    // Analytics should never crash the main application thread
    console.error(`[Analytics Error] Failed to track ${eventName}:`, error);
  }
}

export const ServerAnalytics = {
  /**
   * Track when a new user successfully registers via Better Auth.
   */
  trackUserRegistered: async (payload: UserRegisteredPayload) => {
    await captureAndFlush('User Registered', payload.userId, {
      email: payload.email,
      username: payload.username,
      provider: payload.provider || 'email',
    });
  },

  /**
   * Track when a user successfully claims a digital artifact.
   */
  trackDropClaimed: async (payload: DropClaimedPayload) => {
    await captureAndFlush('Drop Claimed', payload.userId, {
      drop_id: payload.dropId,
      drop_name: payload.dropName,
      category: payload.category,
      rarity: payload.rarity,
      is_premium: payload.isPremium,
    });
  },

  /**
   * Track when a user initiates the Dodo Payments checkout flow.
   */
  trackCheckoutStarted: async (payload: CheckoutStartedPayload) => {
    await captureAndFlush('Checkout Started', payload.userId, {
      bundle_id: payload.bundleId,
      price: payload.price,
      currency: payload.currency,
    });
  },

  /**
   * Track successful revenue generation. 
   * STRICT RULE: Only call this from the verified Dodo Webhook.
   */
  trackPurchaseCompleted: async (payload: PurchaseCompletedPayload) => {
    await captureAndFlush('Purchase Completed', payload.userId, {
      transaction_id: payload.transactionId,
      bundle_id: payload.bundleId,
      $revenue: payload.revenue, // Reserved PostHog property for LTV tracking
      currency: payload.currency,
    });
  },
};