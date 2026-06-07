import { NextResponse } from "next/server";
import { headers } from "next/headers";
import mongoose from "mongoose";
import { Match } from "@/features/matches/models/match.model";
import { Drop } from "@/features/drops/models/drop.model";
import { UserDrop } from "@/features/collections/models/user-drop.model";
import { UserStats } from "@/features/leaderboard/models/user-stats.model";
import { auth } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";

// ==========================================
// RESPONSE SHAPES
// ==========================================
export interface ClaimedDropDto {
  id: string;
  name: string;
  points: number;
  icon: string;
  category: string;
  rarity: string;
}

export interface ClaimResponseDto {
  claimedCount: number;
  pointsEarned: number;
  claimedDrops: ClaimedDropDto[];
}

export async function POST(req: Request) {
  try {
    // 1. Authenticate User
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    // Extract the username safely. Better Auth's username() plugin adds .username, 
    // while the core schema provides .name. We coalesce to ensure a value exists.
    const username = (session.user as any).username || session.user.name || "Collector";
    
    await connectDB();

    // ==========================================
    // PHASE 1: READS & FILTERING (Outside Transaction)
    // ==========================================
    
    const now = new Date();
    let matchQuery: any = {
      claimStartAt: { $lte: now },
      claimEndAt: { $gte: now },
    };

    // [DEV OVERRIDE]: Force a specific match to be active
    if (process.env.NODE_ENV !== "production" && process.env.DEV_ACTIVE_MATCH) {
      const devMatchNum = parseInt(process.env.DEV_ACTIVE_MATCH, 10);
      if (!isNaN(devMatchNum)) {
        console.warn(`[DEV] Claim Engine: Forcing Match #${devMatchNum} as active.`);
        matchQuery = { matchNumber: devMatchNum };
      }
    }

    const activeMatches = await Match.find(matchQuery).select("_id").lean();

    if (!activeMatches.length) {
      return emptyClaimResponse();
    }

    const matchIds = activeMatches.map((m) => m._id);

    const availableDrops = await Drop.find({
      matchId: { $in: matchIds },
      isActive: true,
      isPremium: false, // Strict Rule: Premium drops are NOT claimable here
    })
      .select("_id name category rarity icon points")
      .lean();

    if (!availableDrops.length) {
      return emptyClaimResponse();
    }

    const dropIds = availableDrops.map((d) => d._id);

    const ownedDrops = await UserDrop.find({
      userId,
      dropId: { $in: dropIds },
    })
      .select("dropId")
      .lean();

    const ownedDropIdsSet = new Set(ownedDrops.map((ud) => ud.dropId.toString()));

    const claimableDrops = availableDrops.filter(
      (drop) => !ownedDropIdsSet.has(drop._id.toString())
    );

    // If the user already owns everything active, return standard empty success
    if (!claimableDrops.length) {
      return emptyClaimResponse();
    }

    // ==========================================
    // PHASE 2: ATOMIC WRITES (Inside Transaction)
    // ==========================================
    
    let newlyClaimedDrops: ClaimedDropDto[] = [];
    let pointsEarned = 0;

    const dbSession = await mongoose.startSession();

    try {
      await dbSession.withTransaction(async () => {
        
        // 1. Bulk Upsert Ownership
        const bulkOps = claimableDrops.map((drop) => ({
          updateOne: {
            filter: { userId, dropId: drop._id }, // The compound unique index lock
            update: {
              $setOnInsert: {
                userId,
                dropId: drop._id,
                claimedAt: new Date(),
              },
            },
            upsert: true,
          },
        }));

        const bulkResult = await UserDrop.bulkWrite(bulkOps, { session: dbSession });

        // 2. Map successfully inserted records
        Object.keys(bulkResult.upsertedIds).forEach((indexStr) => {
          const index = parseInt(indexStr, 10);
          const drop = claimableDrops[index];

          newlyClaimedDrops.push({
            id: drop._id.toString(),
            name: drop.name,
            points: drop.points,
            icon: drop.icon,
            category: drop.category,
            rarity: drop.rarity,
          });
          pointsEarned += drop.points;
        });

        // 3. Update Leaderboard Stats ATOMICALLY
        if (newlyClaimedDrops.length > 0) {
          await UserStats.findOneAndUpdate(
            { userId },
            {
              $inc: {
                totalPoints: pointsEarned,
                totalCollectibles: newlyClaimedDrops.length,
              },
              $set: {
                lastClaimedAt: new Date(),
              },
              $setOnInsert: {
                // Guarantees the username is written ONLY during document creation
                username: username,
              }
            },
            { 
              upsert: true, 
              new: true,
              session: dbSession 
            }
          );
        }
      });
    } finally {
      await dbSession.endSession();
    }

    // ==========================================
    // PHASE 3: RETURN RESPONSE
    // ==========================================

    return NextResponse.json<ClaimResponseDto>({
      claimedCount: newlyClaimedDrops.length,
      pointsEarned,
      claimedDrops: newlyClaimedDrops,
    });

  } catch (error) {
    console.error("[POST /api/drops/claim] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function emptyClaimResponse() {
  return NextResponse.json<ClaimResponseDto>({
    claimedCount: 0,
    pointsEarned: 0,
    claimedDrops: [],
  });
}