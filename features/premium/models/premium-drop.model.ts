import mongoose, { Schema, Document, Model, Types } from "mongoose";
// Inherit strictly defined taxonomies from the Free ecosystem to prevent Type Divergence
import { DropCategory, DropRarity } from "@/features/drops/models/drop.model";

// ==========================================
// INTERFACES
// ==========================================

export interface IPremiumDrop extends Document {
  /** The specific match this premium cosmetic is associated with */
  matchId: Types.ObjectId;
  /** The store bundle this drop belongs to (PremiumBundle) */
  bundleId: Types.ObjectId;
  /** The display name of the premium collectible */
  name: string;
  /** Shared taxonomy ensuring frontend React components can render both free/premium identically */
  category: DropCategory;
  /** Shared tier system driving the visual effects/borders in the frontend */
  rarity: DropRarity;
  /** Allows admins to soft-delete or hide a specific item if a copyright/asset issue occurs */
  isActive: boolean;

  // CRITICAL ARCHITECTURE NOTES (LOCKED DECISIONS):
  // 1. NO `points`: Premium items strictly cannot influence the leaderboard.
  // 2. NO `icon`/`imageUrl`: Asset rendering is derived dynamically by the frontend 
  //    using [PremiumBundle.theme] + [category] + [rarity].
  // 3. NO `DropType`: Premium drops do not use the game-loop claim engine rules 
  //    (PERMANENT vs MATCH). They are granted strictly via purchasing a bundle.

  /** Automatically managed by Mongoose timestamps */
  createdAt: Date;
  /** Automatically managed by Mongoose timestamps */
  updatedAt: Date;
}

// ==========================================
// SCHEMA DEFINITION
// ==========================================

const premiumDropSchema = new Schema<IPremiumDrop>(
  {
    matchId: {
      type: Schema.Types.ObjectId,
      ref: "Match",
      required: [true, "A Premium Drop must be associated with a Match"],
    },
    bundleId: {
      type: Schema.Types.ObjectId,
      ref: "PremiumBundle",
      required: [true, "A Premium Drop must belong to a PremiumBundle"],
    },
    name: {
      type: String,
      required: [true, "Premium Drop name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    category: {
      type: String,
      enum: {
        values: Object.values(DropCategory),
        message: "{VALUE} is not a valid DropCategory",
      },
      required: [true, "Category is required"],
    },
    rarity: {
      type: String,
      enum: {
        values: Object.values(DropRarity),
        message: "{VALUE} is not a valid DropRarity",
      },
      required: [true, "Rarity is required"],
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

// 1. Uniqueness Guard: Prevents the generator script from accidentally 
// creating the exact same item twice inside the same store bundle.
premiumDropSchema.index({ bundleId: 1, name: 1 }, { unique: true });

// 2. Bundle Index: Heavily used when retrieving all items to display a store bundle page.
premiumDropSchema.index({ bundleId: 1 });

// 3. Match Index: Heavily used when displaying chronological timelines or match history.
premiumDropSchema.index({ matchId: 1 });

// ==========================================
// EXPORT (HMR Safe)
// ==========================================

export const PremiumDrop: Model<IPremiumDrop> =
  mongoose.models.PremiumDrop ||
  mongoose.model<IPremiumDrop>("PremiumDrop", premiumDropSchema);