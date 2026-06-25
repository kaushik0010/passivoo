"use server";

import { Types } from "mongoose";
import { getCurrentUser } from "@/features/auth/actions/get-current-user";
import { PremiumBundle } from "@/features/premium/models/premium-bundle.model";
import { UserPremiumBundle } from "@/features/premium/models/user-premium-bundle.model";
import { DODO_CONFIG } from "@/config/dodo";
import { dodo } from "@/lib/dodo/dodo";
import { PremiumTheme } from "@/config/premium.constants";
import { connectDB } from "@/lib/db/connect";
import { ServerAnalytics } from "@/lib/analytics/server"; // <-- IMPORT ANALYTICS

// ==========================================
// RESPONSE TYPES
// ==========================================

export type CreateCheckoutErrorType =
  | "UNAUTHENTICATED"
  | "INVALID_BUNDLE_ID"
  | "BUNDLE_NOT_FOUND"
  | "BUNDLE_INACTIVE"
  | "BUNDLE_NOT_UNLOCKED"
  | "BUNDLE_EXPIRED"
  | "ALREADY_OWNED"
  | "DODO_SDK_FAILURE"
  | "INTERNAL_SERVER_ERROR";

export interface CreateCheckoutResult {
  success: boolean;
  checkoutUrl?: string;
  error?: CreateCheckoutErrorType;
  message?: string;
}

interface CreateCheckoutInput {
  bundleId: string;
}

// ==========================================
// SERVER ACTION
// ==========================================

/**
 * Creates a secure, server-validated Dodo Payments checkout session for Passivoo bundles.
 * This action implements strict server-side bounds checking to prevent double-billing,
 * client price tampering, and premature content access.
 */
export async function createCheckoutSession(
  input: CreateCheckoutInput
): Promise<CreateCheckoutResult> {
  try {
    const { bundleId } = input;

    // 1. Enforce Authentication Guard
    const authSession = await getCurrentUser();
    if (!authSession || !authSession.user || !authSession.user.id) {
      return {
        success: false,
        error: "UNAUTHENTICATED",
        message: "You must be securely authenticated to initiate a premium purchase.",
      };
    }
    const userId = authSession.user.id;
    // await connectDB();

    // 2. Validate String Structure to prevent Mongoose Casting Crashes
    if (!Types.ObjectId.isValid(bundleId)) {
      return {
        success: false,
        error: "INVALID_BUNDLE_ID",
        message: "The provided bundle identifier format is malformed.",
      };
    }

    // 3. Fetch Target Bundle from the Database Source of Truth
    const bundle = await PremiumBundle.findById(bundleId).lean();
    if (!bundle) {
      return {
        success: false,
        error: "BUNDLE_NOT_FOUND",
        message: "The requested premium bundle does not exist in our catalog.",
      };
    }

    // 4. Enforce Administrative Lockout Status
    if (!bundle.isActive) {
      return {
        success: false,
        error: "BUNDLE_INACTIVE",
        message: "This bundle has been temporarily disabled by administration.",
      };
    }

    // 5. Evaluate Temporal Access Boundaries against Server Execution Clock
    const now = new Date();

    // ==========================================
    // DEVELOPMENT TESTING OVERRIDE
    // ==========================================
    // Allows testing specific match checkouts before the tournament begins.
    // Triple-locked to guarantee it cannot execute in production environments.
    const isDevOverride =
      process.env.NODE_ENV !== "production" &&
      process.env.DEV_ACTIVE_MATCH &&
      Number(process.env.DEV_ACTIVE_MATCH) === bundle.matchNumber;

    if (!isDevOverride) {
      if (bundle.unlockAt > now) {
        return {
          success: false,
          error: "BUNDLE_NOT_UNLOCKED",
          message: "This premium match bundle is locked and not yet available for purchase.",
        };
      }

      if (bundle.expiresAt <= now) {
        return {
          success: false,
          error: "BUNDLE_EXPIRED",
          message: "This bundle has expired and can no longer be acquired.",
        };
      }
    }
    // ==========================================

    // 6. Ownership Verification Barrier (Enforcing Double-Purchase Logic)
    // We check for existing COMPLETED statuses only. REFUNDED bundles will bypass this check.
    const existingOwnership = await UserPremiumBundle.findOne({
      userId,
      bundleId: bundle._id,
      status: "COMPLETED",
    }).lean();

    if (existingOwnership) {
      return {
        success: false,
        error: "ALREADY_OWNED",
        message: "You already own this Premium Bundle. Duplicate purchases are blocked.",
      };
    }

    // 7. Deterministic Dodo Product Selection (Isolated Business Logic)
    // We infer the Product ID completely based on backend domain rules, never client values.
    const isFinalBundle =
      bundle.theme === PremiumTheme.FINAL_THEME

    const dodoProductId = isFinalBundle
      ? DODO_CONFIG.PRODUCT_IDS.FINAL
      : DODO_CONFIG.PRODUCT_IDS.STANDARD;

    // 8. Execute Secure SDK Call to Dodo Payments
    try {
      const session = await dodo.checkoutSessions.create({
        product_cart: [
          {
            product_id: dodoProductId,
            quantity: 1,
          },
        ],
        return_url: process.env.DODO_PAYMENTS_RETURN_URL,
        // Immutable metadata payload to protect verification chain down the line
        metadata: {
          userId,
          bundleId: bundle._id.toString(),
          matchId: bundle.matchId.toString(),
        },
      });

      if (!session || !session.checkout_url) {
        throw new Error("Dodo response omitted critical redirection targets.");
      }

      // ==========================================
      // ANALYTICS INTEGRATION
      // ==========================================
      // Fired strictly AFTER the SDK succeeds. This guarantees the user is 
      // actually being redirected to a valid Dodo checkout page.
      await ServerAnalytics.trackCheckoutStarted({
        userId: userId,
        bundleId: bundleId,
        // Price/Currency omitted here as it's deferred to the webhook for strict accuracy
      });

      return {
        success: true,
        checkoutUrl: session.checkout_url,
      };
    } catch (sdkError) {
      // Catch and log external payment infrastructure degradation safely
      console.error("[DODO_SDK_SESSION_ERROR]:", sdkError);
      return {
        success: false,
        error: "DODO_SDK_FAILURE",
        message: "An upstream connection error occurred with our checkout provider.",
      };
    }
  } catch (error) {
    // Top-level generic fallback guard to ensure internal stack traces are redacted
    console.error("[CHECKOUT_ACTION_CRITICAL_EXC]:", error);
    return {
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message: "A critical internal runtime anomaly occurred.",
    };
  }
}