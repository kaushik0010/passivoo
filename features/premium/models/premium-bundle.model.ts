import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { PremiumTheme } from "@/config/premium.constants";

// ==========================================
// INTERFACES
// ==========================================

export interface IPremiumBundle extends Document {
  /** The specific numeric identifier for the match (e.g., 1 through 104) */
  matchNumber: number;
  /** The display name of the premium bundle (e.g., "Match 12: Argentina vs Mexico Premium Bundle") */
  name: string;
  /** The price of the bundle, strictly stored in cents to prevent floating-point errors */
  priceCents: number;
  /** The currency of the transaction, strictly locked to USD */
  currency: "USD";
  /** The visual theme mapping that drives frontend rendering */
  theme: PremiumTheme;
  /** Foreign key mapping to the Match this bundle was generated for */
  matchId: Types.ObjectId;
  /** The exact timestamp when this bundle becomes available for purchase */
  unlockAt: Date;
  /** The exact timestamp when this bundle is archived and no longer purchasable */
  expiresAt: Date;
  /** Admin toggle to soft-disable a bundle without deleting it or waiting for expiry */
  isActive: boolean;
  
  /** Automatically managed by Mongoose timestamps */
  createdAt: Date;
  /** Automatically managed by Mongoose timestamps */
  updatedAt: Date;
}

// ==========================================
// SCHEMA DEFINITION
// ==========================================

const premiumBundleSchema = new Schema<IPremiumBundle>(
  {
    matchNumber: {
      type: Number,
      required: [true, "A match number is required to ensure deterministic sorting"],
    },
    name: { 
      type: String, 
      required: [true, "Premium Bundle name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    priceCents: { 
      type: Number, 
      required: [true, "Price in cents is required"], 
      min: [0, "Price cannot be negative"],
    },
    currency: { 
      type: String, 
      required: true,
      default: "USD",
      enum: {
        values: ["USD"],
        message: "{VALUE} is not a supported currency. Passivoo is locked to USD.",
      },
    },
    theme: {
      type: String,
      required: [true, "Premium Theme is required"],
      enum: {
        values: Object.values(PremiumTheme),
        message: "{VALUE} is not a valid PremiumTheme",
      },
    },
    matchId: { 
      type: Schema.Types.ObjectId, 
      ref: "Match", 
      required: [true, "A Premium Bundle must be associated with a Match"], 
    },
    unlockAt: { 
      type: Date, 
      required: [true, "Unlock timestamp is required"], 
    },
    expiresAt: { 
      type: Date, 
      required: [true, "Expiry timestamp is required"], 
    },
    isActive: { 
      type: Boolean, 
      default: true, 
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// INDEXES FOR QUERY OPTIMIZATION & SAFETY
// ==========================================

// Note: Mongoose automatically creates a unique index for `matchNumber` because of `unique: true`.
// This satisfies the 1 Match = 1 Bundle rule and replaces the need for a separate `{ matchId: 1 }, { unique: true }` index.

// 1. Deterministic Sorting Index (Admin/Support tools)
premiumBundleSchema.index({ matchNumber: 1 });

// 2. Relational Lookup & Uniqueness Constraint (1 Match = 1 Bundle)
premiumBundleSchema.index({ matchId: 1 }, { unique: true });

// 3. The Active Store Index
// Optimizes fetching currently purchasable bundles
premiumBundleSchema.index({ isActive: 1, unlockAt: 1, expiresAt: 1 });


// ==========================================
// EXPORT (HMR Safe)
// ==========================================

export const PremiumBundle: Model<IPremiumBundle> =
  mongoose.models.PremiumBundle || 
  mongoose.model<IPremiumBundle>("PremiumBundle", premiumBundleSchema);