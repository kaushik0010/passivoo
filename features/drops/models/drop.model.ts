import mongoose, { Schema, Document, Model } from "mongoose";

// Enforce strict category taxonomy for the collectibles
export enum DropCategory {
  HOST_CITY = "HOST_CITY",
  STADIUM = "STADIUM",
  COUNTRY = "COUNTRY",
  EVENT_BADGE = "EVENT_BADGE",
  SPECIAL = "SPECIAL",
}

// Enforce strict rarity tiers
export enum DropRarity {
  COMMON = "COMMON",
  RARE = "RARE",
  EPIC = "EPIC",
  LEGENDARY = "LEGENDARY",
}

// Enforce icon identifiers that the frontend can map to Lucide icons
export enum DropIcon {
  MAP_PIN = "MAP_PIN",
  LANDMARK = "LANDMARK",
  GLOBE = "GLOBE",
  TROPHY = "TROPHY",
  STAR = "STAR",
}

export interface IDrop extends Document {
  name: string;
  // slug removed
  category: DropCategory;
  rarity: DropRarity;
  points: number;
  icon: DropIcon;
  matchId: mongoose.Types.ObjectId;
  isPremium: boolean;
  premiumBundleId?: mongoose.Types.ObjectId; // Added for premium pack relationship
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const dropSchema = new Schema<IDrop>(
  {
    name: { type: String, required: true },
    // slug removed entirely
    category: { 
      type: String, 
      enum: Object.values(DropCategory), 
      required: true 
    },
    rarity: { 
      type: String, 
      enum: Object.values(DropRarity), 
      required: true 
    },
    points: { 
      type: Number, 
      required: true, 
      min: [0, "Points cannot be negative"] // Updated to allow 0 for premium drops
    },
    icon: { 
      type: String, 
      enum: Object.values(DropIcon), 
      required: true 
    },
    matchId: { 
      type: Schema.Types.ObjectId, 
      ref: "Match",
      required: true 
    },
    isPremium: { 
      type: Boolean, 
      default: false 
    },
    premiumBundleId: { 
      type: Schema.Types.ObjectId, 
      ref: "PremiumBundle", 
      required: false // Explicitly optional since free drops do not belong to bundles
    },
    isActive: { 
      type: Boolean, 
      default: true 
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// INDEXES FOR QUERY OPTIMIZATION
// ==========================================

// 1. Finding all drops belonging to a specific match
dropSchema.index({ matchId: 1 });

// 2. Finding drops by category
dropSchema.index({ category: 1 });

// 3. Finding drops by rarity
dropSchema.index({ rarity: 1 });

// 4. NEW: Finding all drops inside a specific premium pack
dropSchema.index({ premiumBundleId: 1 }, { sparse: true });

// Prevent Next.js HMR from redefining the model
export const Drop: Model<IDrop> =
  mongoose.models.Drop || mongoose.model<IDrop>("Drop", dropSchema);