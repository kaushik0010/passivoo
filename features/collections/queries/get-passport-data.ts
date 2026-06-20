import mongoose from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { UserDrop } from "@/features/collections/models/user-drop.model";
import { Drop } from "@/features/drops/models/drop.model";
import { UserStats } from "@/features/leaderboard/models/user-stats.model";
import { ESTIMATED_TOTAL_DROPS } from "@/config/leaderboard.constants";
import { PassportResponseDto, CollectibleDto } from "@/app/api/passport/route";

const PAGE_LIMIT = 20;

interface GetPassportDataArgs {
  userId: string;
  cursor?: string | null;
}

export async function getPassportData({ userId, cursor }: GetPassportDataArgs): Promise<PassportResponseDto> {
  await connectDB();

  // 1. Fetch Stats
  const userStats = await UserStats.findOne({ userId }).lean();

  // 2. Build Cursor-Based Query
  let query: any = { userId };
  
  if (cursor) {
    const decoded = Buffer.from(cursor, "base64").toString("utf-8");
    const [timestampStr, _idStr] = decoded.split("_");
    
    if (timestampStr && _idStr) {
      const cursorDate = new Date(parseInt(timestampStr, 10));
      query = {
        userId,
        $or: [
          { claimedAt: { $lt: cursorDate } },
          { claimedAt: cursorDate, _id: { $lt: new mongoose.Types.ObjectId(_idStr) } },
        ],
      };
    }
  }

  // Fetch Limit + 1 to accurately evaluate hasMore boundaries
  const userDrops = await UserDrop.find(query)
    .sort({ claimedAt: -1, _id: -1 })
    .limit(PAGE_LIMIT + 1)
    .populate({
      path: "dropId",
      model: Drop, 
      select: "name category rarity icon points"
    })
    .lean();

  // 3. Format Global Passport Statistics
  const totalStamps = userStats?.totalCollectibles || 0;
  const totalPoints = userStats?.totalPoints || 0;
  const progressPercent = Math.min(Math.round((totalStamps / ESTIMATED_TOTAL_DROPS) * 100), 100);

  const stats = {
    totalStamps,
    totalPoints,
    countriesCompleted: 0, 
    totalCountries: 48, 
    tournamentProgress: progressPercent,
    collectorTitle: totalStamps >= 15 ? "Elite Voyager" : totalStamps >= 5 ? "Active Collector" : "Rookie Collector",
  };

  // 4. Parse Pagination Cursors
  const hasMore = userDrops.length > PAGE_LIMIT;
  const returnDrops = hasMore ? userDrops.slice(0, PAGE_LIMIT) : userDrops;

  let nextCursor: string | null = null;
  if (hasMore && returnDrops.length > 0) {
    const lastItem = returnDrops[returnDrops.length - 1];
    const cursorPayload = `${lastItem.claimedAt.getTime()}_${lastItem._id.toString()}`;
    nextCursor = Buffer.from(cursorPayload).toString("base64");
  }

  // 5. Map Population DTOs cleanly
  const collectibles: CollectibleDto[] = returnDrops.map((ud) => {
    const drop = ud.dropId as any;
    return {
      id: ud._id.toString(),
      name: drop.name,
      category: drop.category,
      rarity: drop.rarity,
      icon: drop.icon,
      points: drop.points,
      claimedAt: ud.claimedAt.toISOString(),
    };
  });

  return {
    stats,
    collectibles,
    nextCursor,
    hasMore,
  };
}