import mongoose, { Schema, Document, Model } from "mongoose";

// Enforce strict category taxonomy for the collectibles
export enum DropCategory {
  HOST_CITY = "HOST_CITY",
  STADIUM = "STADIUM",
  COUNTRY = "COUNTRY",
  EVENT_BADGE = "EVENT_BADGE",
  SPECIAL = "SPECIAL",
  TROPHY = "TROPHY",
}

// Enforce strict rarity tiers
export enum DropRarity {
  COMMON = "COMMON",
  RARE = "RARE",
  EPIC = "EPIC",
  LEGENDARY = "LEGENDARY",
}

// Enforce behavioral rules for the claiming engine
export enum DropType {
  PERMANENT = "PERMANENT", // Claimable once globally (e.g., City, Stadium, Country)
  MATCH = "MATCH",         // Unique to a specific match (e.g., Match Badge, Special Event)
}

// Enforce icon identifiers that the frontend can map to Lucide icons
export enum DropIcon {
  MAP_PIN = "MAP_PIN",
  LANDMARK = "LANDMARK",
  GLOBE = "GLOBE",
  SHIELD = "SHIELD",
  TROPHY = "TROPHY",
  STAR = "STAR",
}

export interface IDrop extends Document {
  name: string;
  dropType: DropType; // NEW: Determines game-loop claiming rules
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
    dropType: { 
      type: String, 
      enum: Object.values(DropType), 
      required: true // Intentionally no default value to force intentional creation
    },
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

// Prevents duplicate drops with the exact same name from being generated for a single match
dropSchema.index({ matchId: 1, name: 1 }, { unique: true });

// 1. Finding drops for a specific match, optimized for claim-engine behavioral filtering
dropSchema.index({ matchId: 1, dropType: 1 });

// 2. Finding drops by category
dropSchema.index({ category: 1 });

// 3. Finding drops by rarity
dropSchema.index({ rarity: 1 });

// 4. NEW: Finding all drops inside a specific premium pack
dropSchema.index({ premiumBundleId: 1 }, { sparse: true });

// Prevent Next.js HMR from redefining the model
export const Drop: Model<IDrop> =
  mongoose.models.Drop || mongoose.model<IDrop>("Drop", dropSchema);