import mongoose, { Schema, Document, Model } from "mongoose";

// Enforce strict stage values across the application
export enum MatchStage {
  GROUP_STAGE = "GROUP_STAGE",
  ROUND_OF_32 = "ROUND_OF_32",
  ROUND_OF_16 = "ROUND_OF_16",
  QUARTER_FINAL = "QUARTER_FINAL",
  SEMI_FINAL = "SEMI_FINAL",
  THIRD_PLACE = "THIRD_PLACE",
  FINAL = "FINAL",
}

export interface IMatch extends Document {
  matchNumber: number;
  stage: MatchStage;
  homeTeam: string;
  awayTeam: string;
  date: Date;
  kickoffTime: Date;
  stadium: string;
  city: string;
  country: string;
  claimStartAt: Date;
  claimEndAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const matchSchema = new Schema<IMatch>(
  {
    matchNumber: { 
      type: Number, 
      required: true, 
      unique: true 
    },
    stage: { 
      type: String, 
      enum: Object.values(MatchStage), 
      required: true 
    },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    date: { type: Date, required: true },
    kickoffTime: { type: Date, required: true },
    stadium: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    
    // Denormalized claim window fields for high-performance querying
    claimStartAt: { type: Date, required: true },
    claimEndAt: { type: Date, required: true },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// ==========================================
// INDEXES FOR QUERY OPTIMIZATION
// ==========================================

// 1. Finding upcoming matches chronologically
matchSchema.index({ kickoffTime: 1 });

// 2. Finding active/live claim windows rapidly during traffic spikes
matchSchema.index({ claimStartAt: 1, claimEndAt: 1 });

// Note: matchNumber is automatically indexed by Mongoose because `unique: true` is set.

// Prevent Next.js HMR (Hot Module Replacement) from redefining the model
export const Match: Model<IMatch> =
  mongoose.models.Match || mongoose.model<IMatch>("Match", matchSchema);