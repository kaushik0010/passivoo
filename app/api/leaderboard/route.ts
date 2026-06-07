import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { UserStats } from "@/features/leaderboard/models/user-stats.model";
import { auth } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";
import { getCollectorTitle, LEADERBOARD_PAGE_LIMIT } from "@/config/leaderboard.constants";

// ==========================================
// RESPONSE SHAPES
// ==========================================
export interface LeaderboardUser {
  rank: number;
  userId: string;
  username: string;
  totalPoints: number;
  totalCollectibles: number;
  collectorTitle: string;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardUser[];
  currentUser: LeaderboardUser | null;
  neighbors: LeaderboardUser[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalUsers: number;
  };
}

export async function GET(req: Request) {
  try {
    // 1. Authenticate User
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const currentUserId = session.user.id;

    // 2. Parse Pagination
    const { searchParams } = new URL(req.url);
    const pageParam = searchParams.get("page");
    const page = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;
    const limit = LEADERBOARD_PAGE_LIMIT;
    const skip = (page - 1) * limit;

    await connectDB();

    // ==========================================
    // PHASE 1: GLOBAL PAGE & BASE DATA
    // ==========================================
    
    const [totalUsers, leaderboardDocs, myStats] = await Promise.all([
      UserStats.countDocuments(),
      UserStats.find()
        .sort({ totalPoints: -1, totalCollectibles: -1, lastClaimedAt: 1, _id: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      UserStats.findOne({ userId: currentUserId }).lean()
    ]);

    const totalPages = Math.ceil(totalUsers / limit);

    // Format the paginated leaderboard array
    const startRank = skip + 1;
    const leaderboard: LeaderboardUser[] = leaderboardDocs.map((doc, index) => ({
      rank: startRank + index,
      userId: doc.userId,
      username: doc.username,
      totalPoints: doc.totalPoints,
      totalCollectibles: doc.totalCollectibles,
      collectorTitle: getCollectorTitle(doc.totalPoints)
    }));

    // ==========================================
    // PHASE 2: CURRENT USER TRUE RANK & NEIGHBORS
    // ==========================================
    
    let currentUser: LeaderboardUser | null = null;
    let neighbors: LeaderboardUser[] = [];

    if (myStats) {
      // Fallback date in case of edge-case missing data to prevent query crashes
      const myDate = myStats.lastClaimedAt || new Date(0);
      const myId = myStats._id; // Extracted for the ultimate tie-breaker

      // Condition: Users strictly BETTER than current user
      const betterThanMeQuery = {
        $or: [
          { totalPoints: { $gt: myStats.totalPoints } },
          { totalPoints: myStats.totalPoints, totalCollectibles: { $gt: myStats.totalCollectibles } },
          { totalPoints: myStats.totalPoints, totalCollectibles: myStats.totalCollectibles, lastClaimedAt: { $lt: myDate } },
          // The Ultimate Tie-Breaker: Exact identical stats, but their _id was generated earlier
          { totalPoints: myStats.totalPoints, totalCollectibles: myStats.totalCollectibles, lastClaimedAt: myDate, _id: { $lt: myId } }
        ]
      };

      // Condition: Users strictly WORSE than current user
      const worseThanMeQuery = {
        $or: [
          { totalPoints: { $lt: myStats.totalPoints } },
          { totalPoints: myStats.totalPoints, totalCollectibles: { $lt: myStats.totalCollectibles } },
          { totalPoints: myStats.totalPoints, totalCollectibles: myStats.totalCollectibles, lastClaimedAt: { $gt: myDate } },
          // The Ultimate Tie-Breaker: Exact identical stats, but their _id was generated later
          { totalPoints: myStats.totalPoints, totalCollectibles: myStats.totalCollectibles, lastClaimedAt: myDate, _id: { $gt: myId } }
        ]
      };

      // Execute Rank + Neighbors queries in parallel
      const [usersBetterCount, usersWorseCount, aboveDoc, belowDoc] = await Promise.all([
        UserStats.countDocuments(betterThanMeQuery),
        UserStats.countDocuments(worseThanMeQuery),
        // To find the neighbor directly above, we sort REVERSE and take the worst of the better players
        UserStats.findOne(betterThanMeQuery)
          .sort({ totalPoints: 1, totalCollectibles: 1, lastClaimedAt: -1, _id: -1 }) // Added reverse _id
          .lean(),
        // To find the neighbor directly below, we sort NORMAL and take the best of the worse players
        UserStats.findOne(worseThanMeQuery)
          .sort({ totalPoints: -1, totalCollectibles: -1, lastClaimedAt: 1, _id: 1 }) // Added normal _id
          .lean()
      ]);

      const myRank = usersBetterCount + 1;

      currentUser = {
        rank: myRank,
        userId: myStats.userId,
        username: myStats.username,
        totalPoints: myStats.totalPoints,
        totalCollectibles: myStats.totalCollectibles,
        collectorTitle: getCollectorTitle(myStats.totalPoints)
      };

      if (aboveDoc) {
        neighbors.push({
          rank: usersBetterCount, // Mathematically guaranteed equivalent to myRank - 1
          userId: aboveDoc.userId,
          username: aboveDoc.username,
          totalPoints: aboveDoc.totalPoints,
          totalCollectibles: aboveDoc.totalCollectibles,
          collectorTitle: getCollectorTitle(aboveDoc.totalPoints)
        });
      }

      if (belowDoc) {
        // Mathematically guarantees the correct rank even if exact ties exist
        const belowTrueRank = totalUsers - usersWorseCount + 1;

        neighbors.push({
          rank: belowTrueRank,
          userId: belowDoc.userId,
          username: belowDoc.username,
          totalPoints: belowDoc.totalPoints,
          totalCollectibles: belowDoc.totalCollectibles,
          collectorTitle: getCollectorTitle(belowDoc.totalPoints)
        });
      }
    }

    // ==========================================
    // PHASE 3: RESPONSE FORMATION
    // ==========================================

    return NextResponse.json<LeaderboardResponse>({
      leaderboard,
      currentUser,
      neighbors,
      pagination: {
        page,
        limit,
        totalPages,
        totalUsers
      }
    });

  } catch (error) {
    console.error("[GET /api/leaderboard] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}