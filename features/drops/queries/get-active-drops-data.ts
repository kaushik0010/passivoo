import mongoose from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { Match } from "@/features/matches/models/match.model";
import { Drop } from "@/features/drops/models/drop.model";
import { UserDrop } from "@/features/collections/models/user-drop.model";

// ==========================================
// TYPE DEFINITIONS (DTOs)
// ==========================================

export interface ClaimableDropDto {
  id: string;
  name: string;
  category: string;
  rarity: string;
  icon: string;
  points: number;
  dropType: string;
}

export interface ActiveMatchDto {
  id: string;
  matchNumber: number;
  stage: string;
  homeTeam: string;
  awayTeam: string;
  kickoffTime: string;
  claimEndAt: string;
  claimableDrops: ClaimableDropDto[];
}

export interface ActiveDropsDataDto {
  activeMatches: ActiveMatchDto[];
  /** 
   * The ISO timestamp of the next upcoming match window.
   * Populated ONLY when activeMatches is empty, serving as the target for the frontend Countdown Timer.
   */
  nextClaimAt: string | null; 
}

interface GetActiveDropsDataInput {
  userId: string;
}

// ==========================================
// QUERY IMPLEMENTATION
// ==========================================

/**
 * Server-side query fetching currently claimable drops for a user.
 * If no drops are available (or all are already claimed), it calculates the 
 * next upcoming match time to power the frontend countdown state.
 */
export async function getActiveDropsData({
  userId,
}: GetActiveDropsDataInput): Promise<ActiveDropsDataDto> {
  // 1. Defensive Validation Guard
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    throw new Error("[getActiveDropsData] Execution aborted: A valid userId string must be provided.");
  }

  try {
    await connectDB();
    const now = new Date();

    // 2. Determine Active Matches Window
    let matchQuery: any = {
      claimStartAt: { $lte: now },
      claimEndAt: { $gte: now },
    };

    // [DEV OVERRIDE]: Mirrored from API route & Checkout flow
    if (process.env.NODE_ENV !== "production" && process.env.DEV_ACTIVE_MATCH) {
      const devMatchNum = parseInt(process.env.DEV_ACTIVE_MATCH, 10);
      if (!isNaN(devMatchNum)) {
        matchQuery = { matchNumber: devMatchNum };
        console.warn(`[DEV QUERY OVERRIDE]: Forcing Match #${devMatchNum} as active for Claim Engine.`);
      }
    }

    const activeMatches = await Match.find(matchQuery)
      .select("_id matchNumber stage homeTeam awayTeam kickoffTime claimEndAt")
      .lean();

    let responseMatches: ActiveMatchDto[] = [];

    // 3. Process Drops if Matches are Active
    if (activeMatches.length > 0) {
      const matchIds = activeMatches.map((m) => m._id);

      const availableDrops = await Drop.find({
        matchId: { $in: matchIds },
        isActive: true,
        isPremium: false, // Strict Rule: Premium drops are purchased, not claimed
      })
        .select("_id name category rarity icon points dropType matchId")
        .lean();

      if (availableDrops.length > 0) {
        const dropIds = availableDrops.map((d) => d._id);

        // Fetch User Ownership to filter out already claimed drops
        const ownedDrops = await UserDrop.find({
          userId,
          dropId: { $in: dropIds },
        })
          .select("dropId")
          .lean();

        const ownedDropIdsSet = new Set(ownedDrops.map((ud) => ud.dropId.toString()));

        // Assemble Frontend DTOs
        responseMatches = activeMatches
          .map((match) => {
            const claimableDrops = availableDrops
              .filter((drop) => drop.matchId.toString() === match._id.toString())
              .filter((drop) => !ownedDropIdsSet.has(drop._id.toString()))
              .map((drop) => ({
                id: drop._id.toString(),
                name: drop.name,
                category: drop.category,
                rarity: drop.rarity,
                icon: drop.icon,
                points: drop.points,
                dropType: drop.dropType,
              }));

            return {
              id: match._id.toString(),
              matchNumber: match.matchNumber,
              stage: match.stage,
              homeTeam: match.homeTeam,
              awayTeam: match.awayTeam,
              kickoffTime: match.kickoffTime.toISOString(),
              claimEndAt: match.claimEndAt.toISOString(),
              claimableDrops,
            };
          })
          // EMPTY MATCH RULE: Drop matches entirely if the user has claimed all drops inside them
          .filter((match) => match.claimableDrops.length > 0);
      }
    }

    // 4. Calculate the Countdown Timer Target (Next Claim)
    let nextClaimAt: string | null = null;

    // If the user has 0 claimable drops right now, we MUST find the next upcoming match
    if (responseMatches.length === 0) {
      const nextMatch = await Match.findOne({ claimStartAt: { $gt: now } })
        .sort({ claimStartAt: 1 }) // Closest future match first
        .select("claimStartAt")
        .lean();

      if (nextMatch && nextMatch.claimStartAt) {
        nextClaimAt = nextMatch.claimStartAt.toISOString();
      }
    }

    // 5. Return strictly serialized payload for Next.js Server Components
    return {
      activeMatches: responseMatches,
      nextClaimAt,
    };
  } catch (error) {
    console.error("[QUERY ERROR] Failed to execute getActiveDropsData:", error);
    throw new Error("Failed to retrieve active drops data from database.");
  }
}