import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Match } from "@/features/matches/models/match.model";
import { Drop } from "@/features/drops/models/drop.model";
import { UserDrop } from "@/features/collections/models/user-drop.model";
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
    await connectDB();

    // 2. Determine Active Matches
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

    // 3. Fetch All Drops for Active Matches
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

    // 4. Pre-filter Existing Ownership (Read)
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

    // 5. Bulk Upsert Ownership (Write)
    // We use upsert with $setOnInsert to natively handle race conditions / double-clicks
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

    const bulkResult = await UserDrop.bulkWrite(bulkOps);

    console.log("=== BULK RESULT ===");
    console.log("upsertedCount:", bulkResult.upsertedCount);
    console.log("upsertedIds:", bulkResult.upsertedIds);
    console.log("bulkResult:", bulkResult);

    // 6. Map the actually inserted results
    // If a double-click race condition occurred, upsertedCount might be less than bulkOps.length
    const newlyClaimedDrops: ClaimedDropDto[] = [];
    let pointsEarned = 0;

    // bulkResult.upsertedIds is a map of { index: ObjectId }. 
    // We iterate over the keys (indices) to find out exactly which drops were successfully inserted.
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

/**
 * Helper function to return a clean empty state as defined by the business rules.
 */
function emptyClaimResponse() {
  return NextResponse.json<ClaimResponseDto>({
    claimedCount: 0,
    pointsEarned: 0,
    claimedDrops: [],
  });
}