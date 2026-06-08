import mongoose, { Schema, Document, Model, Types } from "mongoose";

// ==========================================
// INTERFACES
// ==========================================

export interface IUserPremiumBundle extends Document {
  /** The Better Auth user ID string (who made the purchase) */
  userId: string;
  /** The store bundle that was purchased */
  bundleId: Types.ObjectId;
  /** The unique payment intent / transaction ID from Dodo Payments */
  transactionId: string;
  /** The exact amount settled, strictly stored in cents to prevent float math errors */
  amountPaid: number;
  /** The currency of the transaction, strictly locked to USD for Passivoo */
  currency: string;
  /** 
   * The status of the receipt. 
   * Defaults to COMPLETED because we only generate this after the webhook succeeds.
   * Can be flipped to REFUNDED manually via admin tools.
   */
  status: "COMPLETED" | "REFUNDED";
  
  // NOTE: If status flips to REFUNDED, we do NOT automatically revoke 
  // UserPremiumDrop items to prevent destructive cascade errors during manual review.
  
  /** Timestamp for when a manual refund was processed by an admin */
  refundedAt?: Date;
  /** Internal tracking notes for customer support audits */
  refundNotes?: string;

  /** Automatically managed by Mongoose */
  createdAt: Date;
  /** Automatically managed by Mongoose */
  updatedAt: Date;
}

// ==========================================
// SCHEMA DEFINITION
// ==========================================

const userPremiumBundleSchema = new Schema<IUserPremiumBundle>(
  {
    userId: {
      type: String,
      required: [true, "A receipt must be tied to a User ID"],
      index: true, // Speeds up the "Purchase History" user profile view
    },
    bundleId: {
      type: Schema.Types.ObjectId,
      ref: "PremiumBundle",
      required: [true, "A receipt must reference a Premium Bundle"],
    },
    transactionId: {
      type: String,
      required: [true, "A valid Dodo transaction ID is required"],
      trim: true,
    },
    amountPaid: {
      type: Number,
      required: [true, "The amount paid (in cents) is required"],
      min: [1, "Amount paid must be greater than 0 cents"],
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
      enum: {
        values: ["USD"],
        message: "Passivoo only accepts USD transactions",
      },
    },
    status: {
      type: String,
      enum: ["COMPLETED", "REFUNDED"],
      default: "COMPLETED",
      required: true,
    },
    refundedAt: {
      type: Date,
    },
    refundNotes: {
      type: String,
      trim: true,
      maxlength: [500, "Refund notes cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// INDEXES FOR QUERY OPTIMIZATION & SAFETY
// ==========================================

// 1. The Webhook Idempotency Lock
// Prevents Dodo Payments network retries from double-crediting a user.
userPremiumBundleSchema.index({ transactionId: 1 }, { unique: true });

// 2. The Duplicate Purchase Lock
// Hard-enforces the "1 User = 1 Bundle Purchase" rule at the database level.
userPremiumBundleSchema.index(
  { userId: 1, bundleId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: "COMPLETED",
    },
  }
);

userPremiumBundleSchema.index({ userId: 1, bundleId: 1, status: 1 });

// ==========================================
// EXPORT (HMR Safe)
// ==========================================

export const UserPremiumBundle: Model<IUserPremiumBundle> =
  mongoose.models.UserPremiumBundle ||
  mongoose.model<IUserPremiumBundle>("UserPremiumBundle", userPremiumBundleSchema);