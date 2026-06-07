import { NextResponse } from "next/server";
import { headers } from "next/headers";
import mongoose from "mongoose";
import { UserDrop } from "@/features/collections/models/user-drop.model";
import { Drop } from "@/features/drops/models/drop.model"; // Ensure model is registered for populate
import { UserStats } from "@/features/leaderboard/models/user-stats.model";
import { auth } from "@/lib/auth/auth";
import { connectDB } from "@/lib/db/connect";
import { ESTIMATED_TOTAL_DROPS } from "@/config/leaderboard.constants";

const PAGE_LIMIT = 20; // Reverted to standard production limit (adjust if testing deeper pagination)

// ==========================================
// RESPONSE SHAPES
// ==========================================
export interface PassportStatsDto {
  totalStamps: number;
  totalPoints: number;
  countriesCompleted: number;
  totalCountries: number;
  tournamentProgress: number; // Percentage 0-100
  collectorTitle: string;
}

export interface CollectibleDto {
  id: string;
  name: string;
  category: string;
  rarity: string;
  icon: string;
  points: number;
  claimedAt: string;
}

export interface PassportResponseDto {
  stats: PassportStatsDto;
  collectibles: CollectibleDto[];
  nextCursor: string | null;
  hasMore: boolean;
}

export async function GET(req: Request) {
  try {
    // 1. Authenticate User
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");

    await connectDB();

    // ==========================================
    // PARALLEL EXECUTION: STATS & PAGINATION
    // ==========================================
    
    // Promise 1: Fetch O(1) Denormalized Stats
    // Replaces the heavy $lookup and $group aggregation pipeline
    const statsPromise = UserStats.findOne({ userId }).lean();

    // Promise 2: Fetch paginated collectibles using composite cursor
    let query: any = { userId };
    
    if (cursor) {
      // Cursor format: Base64( timestamp_id )
      const decoded = Buffer.from(cursor, "base64").toString("utf-8");
      const [timestampStr, _idStr] = decoded.split("_");
      
      if (timestampStr && _idStr) {
        const cursorDate = new Date(parseInt(timestampStr, 10));
        query = {
          userId,
          $or: [
            { claimedAt: { $lt: cursorDate } },
            // Tie-breaker for bulk claims occurring at the exact same millisecond
            { claimedAt: cursorDate, _id: { $lt: new mongoose.Types.ObjectId(_idStr) } },
          ],
        };
      }
    }

    // Fetch Limit + 1 to determine if there is a next page
    const dropsPromise = UserDrop.find(query)
      .sort({ claimedAt: -1, _id: -1 })
      .limit(PAGE_LIMIT + 1)
      // Explicitly inject the Drop model to prevent Next.js from tree-shaking the import
      .populate({
        path: "dropId",
        model: Drop, 
        select: "name category rarity icon points"
      })
      .lean();

    // Execute both database operations simultaneously for max performance
    const [userStats, userDrops] = await Promise.all([statsPromise, dropsPromise]);

    // ==========================================
    // FORMAT RESPONSE
    // ==========================================
    
    // Parse Stats (Gracefully handle missing UserStats for brand new users)
    const totalStamps = userStats?.totalCollectibles || 0;
    const totalPoints = userStats?.totalPoints || 0;
    const progressPercent = Math.min(Math.round((totalStamps / ESTIMATED_TOTAL_DROPS) * 100), 100);

    const stats: PassportStatsDto = {
      totalStamps,
      totalPoints,
      countriesCompleted: 0,       // TEMPORARY: 0 prevents UI math errors
      totalCountries: 48,          // Known 2026 World Cup constant
      tournamentProgress: progressPercent,
      collectorTitle: "Rookie Collector", // TEMPORARY: Safe, premium-looking default string
    };

    // Parse Pagination
    const hasMore = userDrops.length > PAGE_LIMIT;
    const returnDrops = hasMore ? userDrops.slice(0, PAGE_LIMIT) : userDrops;

    let nextCursor: string | null = null;
    if (hasMore && returnDrops.length > 0) {
      const lastItem = returnDrops[returnDrops.length - 1];
      // Create new composite cursor
      const cursorPayload = `${lastItem.claimedAt.getTime()}_${lastItem._id.toString()}`;
      nextCursor = Buffer.from(cursorPayload).toString("base64");
    }

    // Format Collectibles
    const collectibles: CollectibleDto[] = returnDrops.map((ud) => {
      const drop = ud.dropId as any; // Cast populated subdocument
      return {
        id: ud._id.toString(), // The UserDrop ID serves as the unique collection item ID
        name: drop.name,
        category: drop.category,
        rarity: drop.rarity,
        icon: drop.icon,
        points: drop.points,
        claimedAt: ud.claimedAt.toISOString(),
      };
    });

    return NextResponse.json<PassportResponseDto>({
      stats,
      collectibles,
      nextCursor,
      hasMore,
    });

  } catch (error) {
    console.error("[GET /api/passport] Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}