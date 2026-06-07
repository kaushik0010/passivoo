import mongoose, { Schema, Document, Model } from "mongoose";

// ==========================================
// INTERFACES
// ==========================================

export interface IUserStats extends Document {
  /** The Better Auth user ID string */
  userId: string;
  /** The immutable Better Auth username denormalized for leaderboard performance */
  username: string;
  /** Total points accumulated from all successfully claimed drops */
  totalPoints: number;
  /** Total count of distinct collectibles the user has claimed */
  totalCollectibles: number;
  /** The exact timestamp of the user's most recent successful claim */
  lastClaimedAt?: Date;
  /** Automatically managed by Mongoose timestamps */
  createdAt: Date;
  /** Automatically managed by Mongoose timestamps */
  updatedAt: Date;
}

// ==========================================
// SCHEMA DEFINITION
// ==========================================

const userStatsSchema = new Schema<IUserStats>(
  {
    userId: { 
      type: String, 
      required: true,
      // We don't define 'unique: true' here to keep index definitions centralized below
    },
    username: {
      type: String,
      required: true,
      immutable: true, // Enforces the locked decision: username cannot be changed after creation
      trim: true,
      maxlength: [50, "Username cannot exceed 50 characters"], // Matches Better Auth config
    },
    totalPoints: { 
      type: Number, 
      default: 0,
      min: [0, "Total points cannot be negative"],
      required: true
    },
    totalCollectibles: { 
      type: Number, 
      default: 0,
      min: [0, "Total collectibles cannot be negative"],
      required: true
    },
    lastClaimedAt: { 
      type: Date 
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// ==========================================
// INDEXES
// ==========================================

// 1. Unique Identity Lock (O(1) Passport and Auth Lookups)
// Ensures one game state profile per authenticated user.
userStatsSchema.index({ userId: 1 }, { unique: true });

// 2. The Dynamic Leaderboard Engine Index
// Perfectly mirrors the locked leaderboard sorting rules:
// totalPoints DESC -> totalCollectibles DESC -> lastClaimedAt ASC -> _id ASC
userStatsSchema.index({ 
  totalPoints: -1, 
  totalCollectibles: -1, 
  lastClaimedAt: 1,
  _id: 1 // NEW: The ultimate mathematically unique tie-breaker
});

// Note: No index is created for `username` because we currently do not query or 
// search users by their username in the Leaderboard API (we sort by points). 
// Uniqueness is already guaranteed upstream by Better Auth.

// ==========================================
// EXPORT (HMR Safe)
// ==========================================

export const UserStats: Model<IUserStats> =
  mongoose.models.UserStats || mongoose.model<IUserStats>("UserStats", userStatsSchema);