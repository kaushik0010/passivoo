import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Match } from "@/features/matches/models/match.model";
import { Drop } from "@/features/drops/models/drop.model";
import { UserDrop } from "@/features/collections/models/user-drop.model";
import { auth } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";

// ==========================================
// RESPONSE SHAPES (Frontend Friendly)
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

export async function GET(req: Request) {
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
        console.warn(`[DEV] Forcing Match #${devMatchNum} as active.`);
        matchQuery = { matchNumber: devMatchNum };
      }
    }

    const activeMatches = await Match.find(matchQuery)
      .select("_id matchNumber stage homeTeam awayTeam kickoffTime claimEndAt")
      .lean();

    if (!activeMatches.length) {
      return NextResponse.json({ activeMatches: [] });
    }

    const matchIds = activeMatches.map((m) => m._id);

    // 3. Fetch All Drops for Active Matches
    const availableDrops = await Drop.find({
      matchId: { $in: matchIds },
      isActive: true,
      isPremium: false, // Premium drops are purchased via bundles, not claimed here
    })
      .select("_id name category rarity icon points dropType matchId")
      .lean();

    if (!availableDrops.length) {
      return NextResponse.json({ activeMatches: [] });
    }

    const dropIds = availableDrops.map((d) => d._id);

    // 4. Fetch User Ownership
    const ownedDrops = await UserDrop.find({
      userId,
      dropId: { $in: dropIds },
    })
      .select("dropId")
      .lean();

    const ownedDropIdsSet = new Set(ownedDrops.map((ud) => ud.dropId.toString()));

    // 5. Filter & Assemble Frontend Response
    const responseMatches: ActiveMatchDto[] = activeMatches
      .map((match) => {
        // Filter out drops the user already owns or don't belong to this match
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
      // EMPTY MATCH RULE: Omit match entirely if 0 claimable drops remain
      .filter((match) => match.claimableDrops.length > 0);

    return NextResponse.json({ activeMatches: responseMatches });

  } catch (error) {
    console.error("[GET /api/drops/active] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}