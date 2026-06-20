import mongoose from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { UserDrop } from "@/features/collections/models/user-drop.model";
import { Drop, DropCategory, DropRarity, DropIcon } from "@/features/drops/models/drop.model";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface RecentDropResult {
  id: string;          // The UserDrop entry ID (unique instance reference)
  dropId: string;      // The underlying Drop template ID
  name: string;
  category: DropCategory;
  rarity: DropRarity;
  icon: DropIcon;
  points: number;
  claimedAt: Date;
}

interface GetRecentDropsInput {
  userId: string;
  limit?: number;
}

// ==========================================
// QUERY IMPLEMENTATION
// ==========================================

/**
 * Server-side query fetching a user's most recently claimed free collectibles.
 * Optimized for performance using compound indexing and hydration-safe objects.
 */
export async function getRecentDrops({
  userId,
  limit = 5,
}: GetRecentDropsInput): Promise<RecentDropResult[]> {
  // 1. Defensive Validation Guard
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    throw new Error("[getRecentDrops] Execution aborted: A valid userId string must be provided.");
  }

  try {
    await connectDB();

    // 2. Fetch Chronicles using User Inventory Index
    const userDrops = await UserDrop.find({ userId })
      .sort({ claimedAt: -1, _id: -1 })
      // Request slightly more records if some items filter out as premium via the populate boundary
      .limit(limit * 2) 
      .populate({
        path: "dropId",
        model: Drop,
        select: "_id name category rarity icon points",
      })
      .lean();

    // 3. Filter Nulls (from mismatching match criteria) and Map to Clean DTOs
    const filteredDrops: RecentDropResult[] = [];

    for (const record of userDrops) {
      if (filteredDrops.length >= limit) break;

      // Mongoose populates un-matched documents as null
      if (record.dropId && typeof record.dropId === "object") {
        const dropTemplate = record.dropId as any;

        filteredDrops.push({
          id: record._id.toString(),
          dropId: dropTemplate._id.toString(),
          name: dropTemplate.name,
          category: dropTemplate.category as DropCategory,
          rarity: dropTemplate.rarity as DropRarity,
          icon: dropTemplate.icon as DropIcon,
          points: dropTemplate.points,
          claimedAt: record.claimedAt,
        });
      }
    }

    return filteredDrops;
  } catch (error) {
    console.error(`[QUERY ERROR] Error within getRecentDrops for user ${userId}:`, error);
    throw new Error("Failed to retrieve user recent collectibles from database.");
  }
}