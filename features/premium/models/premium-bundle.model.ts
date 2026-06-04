import mongoose, { Schema, Document, Model } from "mongoose";

// Enforce strictly supported currencies for global scaling
export enum Currency {
  USD = "USD",
  EUR = "EUR",
  INR = "INR",
}

export interface IPremiumBundle extends Document {
  name: string;
  price: number;
  currency: Currency;
  matchId: mongoose.Types.ObjectId; // Foreign key mapping to IMatch
  unlockAt: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const premiumBundleSchema = new Schema<IPremiumBundle>(
  {
    name: { type: String, required: true },
    price: { 
      type: Number, 
      required: true, 
      min: [0, "Price cannot be negative"] 
    },
    currency: { 
      type: String, 
      enum: Object.values(Currency), 
      required: true 
    },
    matchId: { 
      type: Schema.Types.ObjectId, 
      ref: "Match", 
      required: true 
    },
    unlockAt: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// INDEXES FOR QUERY OPTIMIZATION
// ==========================================

// 1. Finding bundles belonging to a specific match (e.g., viewing Match #1's store)
premiumBundleSchema.index({ matchId: 1 });

// 2. Finding currently available bundles globally or per query
// Optimizes: { isActive: true, unlockAt: { $lte: new Date() } }
premiumBundleSchema.index({ isActive: 1, unlockAt: 1 });

// Prevent Next.js HMR from redefining the model during development
export const PremiumBundle: Model<IPremiumBundle> =
  mongoose.models.PremiumBundle || mongoose.model<IPremiumBundle>("PremiumBundle", premiumBundleSchema);