import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserDrop extends Document {
  userId: string;
  dropId: mongoose.Types.ObjectId;
  claimedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userDropSchema = new Schema<IUserDrop>(
  {
    userId: { 
      type: String, 
      required: true 
    },
    dropId: { 
      type: Schema.Types.ObjectId, 
      ref: "Drop", 
      required: true 
    },
    claimedAt: { 
      type: Date, 
      default: Date.now, 
      required: true 
    },
  },
  {
    timestamps: true,
  }
);

// ==========================================
// INDEXES FOR QUERY OPTIMIZATION & INTEGRITY
// ==========================================

// 1. Duplicate Prevention & Fast Lookup
// Ensures a user can NEVER claim the exact same drop twice.
userDropSchema.index({ userId: 1, dropId: 1 }, { unique: true });

// 2. Passport Rendering & Chronological Sorting
// Optimizes fetching a user's passport, sorted by most recently claimed.
userDropSchema.index({ userId: 1, claimedAt: -1 });

// 3. Global Rarity & Analytics
// Optimizes queries like "How many users own the Opening Match Badge?"
userDropSchema.index({ dropId: 1 });

// Prevent Next.js HMR from redefining the model during development
export const UserDrop: Model<IUserDrop> =
  mongoose.models.UserDrop || mongoose.model<IUserDrop>("UserDrop", userDropSchema);