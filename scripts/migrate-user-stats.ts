import mongoose from "mongoose";
import { UserDrop } from "@/features/collections/models/user-drop.model";
import { UserStats } from "@/features/leaderboard/models/user-stats.model";
import { connectDB } from "@/lib/db/connect";

async function migrateUserStats() {
  console.log("⏳ Initializing database connection...");
  
  try {
    await connectDB();
    console.log("✅ Database connected.\n");

    console.log("🔍 Checking for existing UserDrop records...");
    const dropCount = await UserDrop.countDocuments();
    
    if (dropCount === 0) {
      console.log("⚠️ No UserDrop records found. The collection is empty.");
      console.log("🎉 Migration skipped gracefully. No action needed.");
      process.exitCode = 0;
      return;
    }

    console.log(`📊 Found ${dropCount} UserDrop records. Starting aggregation...`);

    // 1. Single Aggregation Pipeline to calculate all stats AND fetch auth details
    const userAggregations = await UserDrop.aggregate([
      // Stage A: Join with Drops to get points
      {
        $lookup: {
          from: "drops", // Native MongoDB collection name for the Drop model
          localField: "dropId",
          foreignField: "_id",
          as: "dropDetails",
        },
      },
      { $unwind: "$dropDetails" },
      
      // Stage B: Group by User to calculate aggregate stats
      {
        $group: {
          _id: "$userId", // Group by the user ID (This is a String)
          totalCollectibles: { $sum: 1 },
          totalPoints: { $sum: "$dropDetails.points" },
          lastClaimedAt: { $max: "$claimedAt" }, 
        },
      },

      // Stage C: Safe Type Conversion (String -> ObjectId)
      // Using $convert instead of $toObjectId to prevent crashes on invalid hex strings
      {
        $addFields: {
          userObjectId: {
            $convert: {
              input: "$_id",
              to: "objectId",
              onError: null, // Fails safely if userId is not a valid 24-char hex string
              onNull: null,
            }
          }
        }
      },

      // Stage D: Join with Better Auth to fetch immutable username
      {
        $lookup: {
          from: "user", // Better Auth's default MongoDB collection name
          localField: "userObjectId", // Use the newly converted ObjectId field
          foreignField: "_id", // Better Auth primary key
          as: "authDetails"
        }
      },
      // Unwind auth details, but keep the user even if auth was deleted or lookup failed
      { 
        $unwind: { 
          path: "$authDetails", 
          preserveNullAndEmptyArrays: true 
        } 
      }
    ]);

    if (!userAggregations.length) {
      console.log("⚠️ Aggregation returned no results. Exiting.");
      process.exitCode = 0;
      return;
    }

    console.log(`✅ Aggregation complete. Found ${userAggregations.length} unique users.`);
    console.log("💾 Preparing bulk write operation for UserStats...");

    // 2. Map the aggregation results into idempotent upsert operations
    const bulkOps = userAggregations.map((userStat) => {
      // Safely extract username. 
      // Using || instead of ?? to ensure empty strings ("") are caught and fallback to "Collector".
      const username = userStat.authDetails?.username ?? userStat.authDetails?.name ?? "Collector";

      return {
        updateOne: {
          // Find the UserStats document by the unique user ID
          filter: { userId: userStat._id },
          update: {
            // Update mutable metrics
            $set: {
              userId: userStat._id,
              totalCollectibles: userStat.totalCollectibles,
              totalPoints: userStat.totalPoints,
              lastClaimedAt: userStat.lastClaimedAt,
            },
            // Apply locked immutable username ONLY during creation
            $setOnInsert: {
              username: username,
            }
          },
          upsert: true, // Create the document if it doesn't exist
        },
      };
    });

    // 3. Execute all writes in a single network request
    const bulkResult = await UserStats.bulkWrite(bulkOps);

    console.log("\n🎉 Migration completed successfully!");
    console.log("=== BULK WRITE SUMMARY ===");
    console.log(`Matched: ${bulkResult.matchedCount}`);
    console.log(`Modified: ${bulkResult.modifiedCount}`);
    console.log(`Upserted: ${bulkResult.upsertedCount}`);

  } catch (error) {
    console.error("\n❌ Fatal Error during UserStats migration:");
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  } finally {
    // Ensure the Mongoose connection pool drains cleanly
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("\n🔌 Database connection closed cleanly.");
    }
  }
}

migrateUserStats();