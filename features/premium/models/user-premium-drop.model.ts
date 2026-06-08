import mongoose, { Schema, Document, Model, Types } from "mongoose";

// ==========================================
// INTERFACES
// ==========================================

export interface IUserPremiumDrop extends Document {
  /** The Better Auth user ID string representing the owner */
  userId: string;
  /** The specific premium cosmetic template this user now owns */
  premiumDropId: Types.ObjectId;
  /** The exact timestamp the item was granted to the user */
  ownedAt: Date;
  
  // CRITICAL ARCHITECTURE NOTE:
  // We explicitly DO NOT store matchId, bundleId, category, rarity, or theme here.
  // Ownership records are strictly normalized. Metadata is joined via premiumDropId.

  /** Automatically managed by Mongoose timestamps */
  createdAt: Date;
  /** Automatically managed by Mongoose timestamps */
  updatedAt: Date;
}

// ==========================================
// SCHEMA DEFINITION
// ==========================================

const userPremiumDropSchema = new Schema<IUserPremiumDrop>(
  {
    userId: {
      type: String,
      required: [true, "An owner (User ID) is required"],
    },
    premiumDropId: {
      type: Schema.Types.ObjectId,
      ref: "PremiumDrop",
      required: [true, "A Premium Drop ID is required"],
    },
    ownedAt: {
      type: Date,
      default: Date.now,
      required: [true, "An ownership timestamp is required"],
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// INDEXES FOR QUERY OPTIMIZATION & SAFETY
// ==========================================

// 1. Ownership Uniqueness Lock (Critical)
// Hard-enforces that a user can never own duplicate copies of the exact same premium collectible.
// This acts as the final defense against webhook retry loops or double-grant bugs.
userPremiumDropSchema.index({ userId: 1, premiumDropId: 1 }, { unique: true });

// 2. User Inventory Lookup
// Heavily utilized when building the Passport UI or "My Collection" pages to fetch all owned premium items.
userPremiumDropSchema.index({ userId: 1 });

// ==========================================
// EXPORT (HMR Safe)
// ==========================================

export const UserPremiumDrop: Model<IUserPremiumDrop> =
  mongoose.models.UserPremiumDrop ||
  mongoose.model<IUserPremiumDrop>("UserPremiumDrop", userPremiumDropSchema);