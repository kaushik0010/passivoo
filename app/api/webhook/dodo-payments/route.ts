import mongoose from "mongoose";
import { Webhooks } from "@dodopayments/nextjs";
import { connectDB } from "@/lib/db/connect"; 
import { PremiumBundle } from "@/features/premium/models/premium-bundle.model";
import { PremiumDrop } from "@/features/premium/models/premium-drop.model";
import { UserPremiumBundle } from "@/features/premium/models/user-premium-bundle.model";
import { UserPremiumDrop } from "@/features/premium/models/user-premium-drop.model";
import { ServerAnalytics } from "@/lib/analytics/server"; // <-- IMPORT ANALYTICS

export const POST = Webhooks({
  // The Adaptor securely handles cryptographic signature verification using this key
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY!,

  // Exactly matching the Dodo callback name for one-time checkout successes
  onPaymentSucceeded: async (payload: any) => {
    // Rule 3: Ensure database connection is established in this serverless execution context
    await connectDB();

    // Rule 4: Safely extract exact payload paths defined by Dodo Docs
    const paymentId = payload?.data?.payment_id;
    // Map to settlement values to preserve a unified USD ledger under adaptive pricing
    const amountPaid = payload?.data?.settlement_amount;
    const currency = payload?.data?.settlement_currency;
    const metadata = payload?.data?.metadata;

    // Rule 5: Metadata Validation (Only require userId and bundleId)
    if (!metadata || !metadata.userId || !metadata.bundleId) {
      console.error("[WEBHOOK_ABORT]: Missing required metadata (userId or bundleId).", { paymentId, metadata });
      return; // Return safely, do not retry
    }

    const { userId, bundleId } = metadata;

    // Rule 6: Validate ObjectId before querying MongoDB
    if (!mongoose.Types.ObjectId.isValid(bundleId)) {
      console.error("[WEBHOOK_ABORT]: Invalid bundleId format in metadata.", { bundleId });
      return; // Return safely, do not retry
    }

    // Rule 7: Early Idempotency Optimization
    // Check if we've already successfully processed this payment ID
    const existingReceipt = await UserPremiumBundle.findOne({
      transactionId: paymentId,
    }).lean();

    if (existingReceipt) {
      console.log(`[WEBHOOK_DUPLICATE]: Webhook already processed safely. Optimization caught duplicate payload. (Payment ID: ${paymentId})`);
      return; // Return safely, do not process further
    }

    // Rule 8: Fetch the Bundle
    const bundle = await PremiumBundle.findById(bundleId).lean();
    if (!bundle) {
      console.error("[WEBHOOK_ABORT]: Premium Bundle not found in database.", { bundleId });
      return; // Return safely, do not retry
    }

    // Rule 9: Fetch Premium Drops mapping to this bundle
    const premiumDrops = await PremiumDrop.find({ bundleId: bundle._id })
      .select("_id")
      .lean();

    if (!premiumDrops || premiumDrops.length === 0) {
      console.error("[WEBHOOK_CRITICAL]: Paid bundle contains zero drops. Throwing to force Dodo retry.", { bundleId });
      // Throw error to trigger Dodo network retries, allowing admins to fix the data
      throw new Error("Corrupted bundle state: Zero drops found.");
    }

    // Rule 10: Atomic MongoDB Transaction
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      // Rule 11: Create the Purchase Receipt
      await UserPremiumBundle.create(
        [
          {
            userId: userId,
            bundleId: bundle._id,
            transactionId: paymentId,
            amountPaid: amountPaid,
            currency: currency,
            status: "COMPLETED",
          },
        ],
        { session }
      );

      // Rule 12: Create Ownership Grants
      const ownedAt = new Date(); // Explicit timestamp for absolute synchronization across all granted rows
      const ownershipRecords = premiumDrops.map((drop) => ({
        userId: userId,
        premiumDropId: drop._id,
        ownedAt: ownedAt,
      }));

      await UserPremiumDrop.insertMany(ownershipRecords, { session });

      // Commit the transaction
      await session.commitTransaction();
      console.log(`[WEBHOOK_SUCCESS]: Granted ${ownershipRecords.length} drops for Bundle ${bundle._id} to User ${userId}`);

      // ==========================================
      // ANALYTICS INTEGRATION
      // ==========================================
      // Fired strictly AFTER commit. A failure here is caught by the internal
      // try/catch in ServerAnalytics, preventing the webhook from throwing
      // and causing an infinite Dodo retry loop.
      await ServerAnalytics.trackPurchaseCompleted({
        userId: userId,
        transactionId: paymentId,
        bundleId: bundleId,
        revenue: amountPaid,
        currency: currency || "USD",
      });

    } catch (error: any) {
      // Cleanly abort partial database state
      await session.abortTransaction();

      // Rule 13: E11000 Handling (Database-level Idempotency Guard)
      if (error.code === 11000) {
        console.log(`[WEBHOOK_IDEMPOTENT]: Database blocked duplicate payload processing. (Payment ID: ${paymentId})`);
        console.log(`[WEBHOOK_IDEMPOTENT_KEY]: Triggered by index pattern:`, error.keyPattern);
        return; // Safe return so Dodo stops retrying
      }

      console.error("[WEBHOOK_TRANSACTION_ERROR]: Transaction failed.", error);
      
      // Rule 14: All other failures must bubble up to force Dodo retries
      throw error;

    } finally {
      // Release the session back to the MongoDB connection pool
      await session.endSession();
    }
  },
});