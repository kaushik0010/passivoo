import mongoose from "mongoose";
import { Match, MatchStage } from "@/features/matches/models/match.model";
import { Drop, DropCategory, DropIcon, DropType, DropRarity } from "@/features/drops/models/drop.model";
import { FREE_DROP_RULES, RARITY_POINTS, DropGenerationRule } from "@/data/drop-generation-rules";
import { connectDB } from "@/lib/db/connect";

/**
 * Validates that every configured match stage adheres to the core product rule:
 * "No user should leave empty-handed."
 * Every stage MUST have at least one MATCH type drop.
 */
function validateDropRules() {
  const stages = Object.keys(FREE_DROP_RULES) as MatchStage[];
  
  for (const stage of stages) {
    const rules = FREE_DROP_RULES[stage];
    const hasMatchDrop = rules.some((rule) => rule.dropType === DropType.MATCH);
    
    if (!hasMatchDrop) {
      throw new Error(`CRITICAL PRODUCT VIOLATION: Stage '${stage}' contains ZERO drops of type MATCH. Users would leave empty-handed.`);
    }
  }
}

/**
 * Deterministically maps DropCategory to DropIcon based on locked product rules.
 */
function getIconForCategory(category: DropCategory): DropIcon {
  const mapping: Record<DropCategory, DropIcon> = {
    [DropCategory.HOST_CITY]: DropIcon.MAP_PIN,
    [DropCategory.STADIUM]: DropIcon.LANDMARK,
    [DropCategory.COUNTRY]: DropIcon.GLOBE,
    [DropCategory.EVENT_BADGE]: DropIcon.SHIELD,
    [DropCategory.SPECIAL]: DropIcon.STAR,
    [DropCategory.TROPHY]: DropIcon.TROPHY,
  };
  
  const icon = mapping[category];
  if (!icon) throw new Error(`Missing icon mapping for category: ${category}`);
  return icon;
}

/**
 * Deterministically generates the exact string name for a collectible based on locked product naming rules.
 */
function generateDropName(match: any, rule: DropGenerationRule): string {
  switch (rule.category) {
    case DropCategory.HOST_CITY:
      return `${match.city} Stamp`;
    
    case DropCategory.STADIUM:
      return `${match.stadium} Stamp`;
    
    case DropCategory.TROPHY:
      return `World Cup Trophy`;

    case DropCategory.COUNTRY:
      return `${match.country} Country Badge`;

    case DropCategory.EVENT_BADGE: {
      const eventNames: Record<string, string> = {
        [MatchStage.GROUP_STAGE]: "Matchday Badge",
        [MatchStage.ROUND_OF_32]: "Knockout Badge",
        [MatchStage.ROUND_OF_16]: "Round of 16 Badge",
        [MatchStage.QUARTER_FINAL]: "Quarter Final Badge",
        [MatchStage.SEMI_FINAL]: "Semi Final Badge",
        [MatchStage.THIRD_PLACE]: "Third Place Badge",
        [MatchStage.FINAL]: "Final Match Badge",
      };
      const name = eventNames[match.stage];
      if (!name) throw new Error(`Missing Event Badge name mapping for stage: ${match.stage}`);
      return name;
    }

    case DropCategory.SPECIAL: {
      const specialNames: Record<string, string> = {
        [MatchStage.ROUND_OF_32]: "Knockout Stage Badge",
        [MatchStage.ROUND_OF_16]: "Road to Glory Badge",
        [MatchStage.QUARTER_FINAL]: "Elite Eight Badge",
        [MatchStage.SEMI_FINAL]: "Final Four Badge",
        [MatchStage.THIRD_PLACE]: "Bronze Battle Badge",
        [MatchStage.FINAL]: "Championship Night Badge",
      };
      const name = specialNames[match.stage];
      if (!name) throw new Error(`Missing Special Badge name mapping for stage: ${match.stage}`);
      return name;
    }

    default:
      throw new Error(`Unhandled drop category for naming: ${rule.category}`);
  }
}

async function seedDrops() {
  try {
    console.log("⏳ Validating core product rules...");
    validateDropRules();
    console.log("✅ Core rules validated.");

    console.log("⏳ Connecting to database...");
    await connectDB();
    console.log("✅ Database connected.\n");

    // Fetch all seeded matches. Use .lean() to return raw JSON instead of heavy Mongoose documents for speed.
    const matches = await Match.find({}).lean();
    if (matches.length === 0) {
      throw new Error("No matches found in MongoDB. Please run the Match Seeder first.");
    }

    console.log(`🚀 Starting drop generation for ${matches.length} matches...\n`);

    // Prepare BulkWrite Operations array
    const bulkOperations: any[] = [];
    let dropsProcessed = 0;

    for (const match of matches) {
      const stageRules = FREE_DROP_RULES[match.stage as MatchStage];
      
      if (!stageRules || stageRules.length === 0) {
        throw new Error(`Missing generation rules for Match Stage: ${match.stage}`);
      }

      // Track names generated for this specific match to prevent internal duplicates
      const generatedNamesForMatch = new Set<string>();

      for (const rule of stageRules) {
        // Gracefully ignore achievement-based drops so the seeder doesn't crash
        if (rule.category === DropCategory.COUNTRY) {
          console.warn(`⚠️ Skipping COUNTRY drop for Match ${match.matchNumber}. Handled by achievement system.`);
          continue;
        }
        
        // 1. Generate Name
        const dropName = generateDropName(match, rule);
        
        if (generatedNamesForMatch.has(dropName)) {
          throw new Error(`Duplicate drop name generated for Match ${match.matchNumber}: '${dropName}'. Check your rules.`);
        }
        generatedNamesForMatch.add(dropName);

        // 2. Fetch Icon & Points
        const icon = getIconForCategory(rule.category);
        const points = RARITY_POINTS[rule.rarity];
        
        if (points === undefined) {
          throw new Error(`Missing points mapping for rarity: ${rule.rarity}`);
        }

        // 3. Queue Upsert Operation
        bulkOperations.push({
          updateOne: {
            filter: { matchId: match._id, name: dropName },
            update: {
              $set: {
                matchId: match._id, // EXPLICIT: Ensures schema validation passes natively
                name: dropName,     // EXPLICIT: Ensures schema validation passes natively
                category: rule.category,
                rarity: rule.rarity,
                dropType: rule.dropType,
                points: points,
                icon: icon,
                isPremium: false,
                isActive: true,
              }
            },
            upsert: true
          }
        });

        dropsProcessed++;
      }

      console.log(`✓ Match ${match.matchNumber} → ${stageRules.length} drops generated`);
    }

    // Execute all database operations in a single fast network request
    if (bulkOperations.length > 0) {
      console.log("\n💾 Writing to database...");
      await Drop.bulkWrite(bulkOperations);
    }

    console.log("\n🎉 Drop seeding completed successfully.");
    console.log(`📊 Total matches processed: ${matches.length}`);
    console.log(`📊 Total drops processed/upserted: ${dropsProcessed}`);

  } catch (error) {
    console.error("\n❌ Fatal Error during drop seeding:");
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  } finally {
    // Gracefully shutdown the Mongoose connection pool
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("🔌 Database connection closed cleanly.");
    }
  }
}

seedDrops();