import { Match } from "@/features/matches/models/match.model";
import { FIFA_FIXTURES } from "@/data/fifa-fixtures";
import { 
  CLAIM_WINDOW_BEFORE_KICKOFF_MINUTES, 
  CLAIM_WINDOW_AFTER_KICKOFF_HOURS 
} from "@/config/game.constants";
import { connectDB } from "@/lib/db/connect";
import mongoose from "mongoose";

/**
 * Helper function to calculate the exact claim window boundaries
 * based on our centralized game rules.
 */
function calculateClaimWindows(kickoffAt: string) {
  const kickoffTime = new Date(kickoffAt);
  
  // Subtract minutes (converted to milliseconds)
  const claimStartAt = new Date(
    kickoffTime.getTime() - CLAIM_WINDOW_BEFORE_KICKOFF_MINUTES * 60 * 1000
  );

  // Add hours (converted to milliseconds)
  const claimEndAt = new Date(
    kickoffTime.getTime() + CLAIM_WINDOW_AFTER_KICKOFF_HOURS * 60 * 60 * 1000
  );

  // Derive a pure calendar date (stripping time to midnight UTC) for UI grouping
  const date = new Date(kickoffTime);
  date.setUTCHours(0, 0, 0, 0);

  return {
    kickoffTime,
    date,
    claimStartAt,
    claimEndAt,
  };
}

async function seedMatches() {
  console.log("⏳ Connecting to database...");
  
  try {
    await connectDB();
    console.log("✅ Database connected.");

    console.log(`🚀 Starting match seeding process for ${FIFA_FIXTURES.length} fixtures...\n`);

    const bulkOperations = [];
    let processedCount = 0;

    for (const fixture of FIFA_FIXTURES) {
      const { kickoffTime, date, claimStartAt, claimEndAt } = calculateClaimWindows(fixture.kickoffAt);

      // Queue the Idempotent upsert operation
      bulkOperations.push({
        updateOne: {
          filter: { matchNumber: fixture.matchNumber },
          update: {
            $set: {
              stage: fixture.stage,
              homeTeam: fixture.homeTeam,
              awayTeam: fixture.awayTeam,
              stadium: fixture.stadium,
              city: fixture.city,
              country: fixture.country,
              date: date,
              kickoffTime: kickoffTime,
              claimStartAt: claimStartAt,
              claimEndAt: claimEndAt,
            }
          },
          upsert: true
        }
      });

      processedCount++;
    }

    // Execute all operations in a single, lightning-fast network request
    if (bulkOperations.length > 0) {
      console.log("💾 Writing to database...");
      await Match.bulkWrite(bulkOperations);
    }

    console.log("\n🎉 Match seeding completed successfully.");
    console.log(`📊 Total matches processed: ${processedCount}`);
    
  } catch (error) {
    console.error("\n❌ Fatal Error during match seeding:");
    console.error(error);
    process.exit(1);
  }
}

seedMatches()
  .then(async () => {
    // Gracefully close the MongoDB connection pool
    await mongoose.disconnect(); 
    console.log("🔌 Database connection closed cleanly.");
  })
  .catch(async (error) => {
    console.error("\n❌ Fatal Error during match seeding:", error);
    await mongoose.disconnect();
    process.exitCode = 1; // Fails the CI/CD step but lets Node exit naturally
  });