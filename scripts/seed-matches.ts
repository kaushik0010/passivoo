import { Match } from "@/features/matches/models/match.model";
import { FIFA_FIXTURES } from "@/data/fifa-fixtures";
import { 
  CLAIM_WINDOW_BEFORE_KICKOFF_MINUTES, 
  CLAIM_WINDOW_AFTER_KICKOFF_HOURS 
} from "@/config/game.constants";
import { connectDB } from "@/lib/db/connect";
import mongoose from "mongoose";

// IMPORTANT: Adjust this import to match the exact path of your existing database utility

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
    // Utilize your existing connection utility
    await connectDB();
    console.log("✅ Database connected.");

    console.log(`🚀 Starting match seeding process for ${FIFA_FIXTURES.length} fixtures...\n`);

    let processedCount = 0;

    for (const fixture of FIFA_FIXTURES) {
      const { kickoffTime, date, claimStartAt, claimEndAt } = calculateClaimWindows(fixture.kickoffAt);

      // Idempotent upsert operation prevents duplicate key errors
      await Match.updateOne(
        { matchNumber: fixture.matchNumber },
        {
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
          },
        },
        { upsert: true }
      );

      console.log(`✓ Match ${fixture.matchNumber} seeded (${fixture.homeTeam} vs ${fixture.awayTeam})`);
      processedCount++;
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
    console.log("Database connection closed cleanly.");
  })
  .catch(async (error) => {
    console.error("\n❌ Fatal Error during match seeding:", error);
    await mongoose.disconnect();
    process.exitCode = 1; // Fails the CI/CD step but lets Node exit naturally
  });