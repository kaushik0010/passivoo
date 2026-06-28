import mongoose from "mongoose";
import { Match, MatchStage } from "@/features/matches/models/match.model";
import { Drop, DropCategory, DropIcon, DropType, DropRarity } from "@/features/drops/models/drop.model";
import { FREE_DROP_RULES, RARITY_POINTS, DropGenerationRule } from "@/data/drop-generation-rules";
import { connectDB } from "@/lib/db/connect";

// NEW IMPORTS FOR PREMIUM PHASE 2
import { PremiumBundle } from "@/features/premium/models/premium-bundle.model";
import { PremiumDrop } from "@/features/premium/models/premium-drop.model";
import {
  PREMIUM_THEME_MAP,
  PREMIUM_BUNDLE_PRICE_CENTS,
  PREMIUM_FINAL_BUNDLE_PRICE_CENTS,
  PREMIUM_BUNDLE_EXPIRY_DAYS,
} from "@/config/premium.constants";

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
      // Dynamic ticket-stub naming for early knockout rounds to ensure scarcity
      if (
        match.stage === MatchStage.ROUND_OF_32 ||
        match.stage === MatchStage.ROUND_OF_16
      ) {
        return `Match ${match.matchNumber} Commemorative`;
      }

      // Prestigious static naming for late-stage matches
      const specialNames: Record<string, string> = {
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

    // ==========================================
    // GLOBAL EXPIRY CALCULATION
    // ==========================================
    // Find the latest match currently seeded in the database
    const latestMatch = matches.reduce((latest, current) => {
      return new Date(current.claimEndAt) > new Date(latest.claimEndAt) ? current : latest;
    });

    // The known date of the FIFA 2026 Final. 
    // This acts as a safeguard if the Final match hasn't been seeded into the database yet.
    const TOURNAMENT_END_DATE = new Date("2026-07-20T00:00:00Z");
    
    // Use the latest seeded match, OR the known final date (whichever is later)
    const absoluteLastMatchDate = new Date(latestMatch.claimEndAt) > TOURNAMENT_END_DATE 
      ? new Date(latestMatch.claimEndAt) 
      : TOURNAMENT_END_DATE;

    // Unified Expiry: 7 days after the tournament concludes.
    const globalExpiresAt = new Date(
      absoluteLastMatchDate.getTime() + PREMIUM_BUNDLE_EXPIRY_DAYS * 24 * 60 * 60 * 1000
    );
    
    console.log(`🔒 Unified Storefront Expiry set to: ${globalExpiresAt.toISOString()}`);

    // ==========================================
    // ID RESOLUTION MAP FOR RELATIONAL IDEMPOTENCY
    // ==========================================
    console.log("⏳ Resolving existing Premium Bundles for relational safety...");
    const existingBundles = await PremiumBundle.find({}, { matchId: 1, _id: 1 }).lean();
    const bundleMap = new Map<string, mongoose.Types.ObjectId>();
    for (const b of existingBundles) {
      bundleMap.set(String(b.matchId), b._id as mongoose.Types.ObjectId);
    }
    console.log(`✅ Pre-fetched ${existingBundles.length} existing bundles.\n`);

    console.log(`🚀 Starting dual-generation for ${matches.length} matches...\n`);

    // Prepare BulkWrite Operations arrays
    const bulkOperations: any[] = [];
    const premiumBundleOps: any[] = [];
    const premiumDropOps: any[] = [];
    
    let dropsProcessed = 0;
    let premiumBundlesProcessed = 0;
    let premiumDropsProcessed = 0;

    for (const match of matches) {
      const stageRules = FREE_DROP_RULES[match.stage as MatchStage];
      
      if (!stageRules || stageRules.length === 0) {
        throw new Error(`Missing generation rules for Match Stage: ${match.stage}`);
      }

      // ==========================================
      // PREMIUM BUNDLE GENERATION
      // ==========================================
      const matchIdStr = String(match._id);
      let bundleId = bundleMap.get(matchIdStr);
      
      if (!bundleId) {
        bundleId = new mongoose.Types.ObjectId();
        bundleMap.set(matchIdStr, bundleId);
      }

      const isFinal = match.stage === MatchStage.FINAL;
      const priceCents = isFinal ? PREMIUM_FINAL_BUNDLE_PRICE_CENTS : PREMIUM_BUNDLE_PRICE_CENTS;
      const theme = PREMIUM_THEME_MAP[match.stage as MatchStage];

      premiumBundleOps.push({
        updateOne: {
          filter: { matchId: match._id },
          update: {
            $setOnInsert: { 
              _id: bundleId,
              matchId: match._id, // EXPLICIT: Immutable relational anchor
              isActive: true 
            },
            $set: {
              matchNumber: match.matchNumber,
              name: `${match.homeTeam} vs ${match.awayTeam} Premium Bundle`,
              priceCents,
              currency: "USD",
              theme,
              unlockAt: match.claimStartAt, // Opens relative to its specific match
              expiresAt: globalExpiresAt,   // Closes uniformly across the tournament
            }
          },
          upsert: true
        }
      });
      premiumBundlesProcessed++;

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

        // ==========================================
        // FREE DROP GENERATION
        // ==========================================
        bulkOperations.push({
          updateOne: {
            filter: { matchId: match._id, name: dropName },
            update: {
              $setOnInsert: {
                matchId: match._id, // EXPLICIT: Immutable relationship
                name: dropName,     // EXPLICIT: Immutable identity
                isPremium: false,   // EXPLICIT: Core structural flag
                isActive: true 
              },
              $set: {
                category: rule.category,
                rarity: rule.rarity,
                dropType: rule.dropType,
                points: points,
                icon: icon,
              }
            },
            upsert: true
          }
        });
        dropsProcessed++;

        // ==========================================
        // PREMIUM DROP GENERATION
        // ==========================================
        const premiumDropName = `${dropName}`;

        premiumDropOps.push({
          updateOne: {
            filter: { bundleId: bundleId, name: premiumDropName },
            update: {
              $setOnInsert: {
                bundleId: bundleId,       // EXPLICIT: Immutable relationship
                name: premiumDropName,    // EXPLICIT: Immutable identity
                matchId: match._id,       // EXPLICIT: Immutable relationship
                isActive: true
              },
              $set: {
                category: rule.category,
                rarity: rule.rarity,
              }
            },
            upsert: true
          }
        });
        premiumDropsProcessed++;
      }

      console.log(`✓ Match ${match.matchNumber} → ${stageRules.length} Free & Premium pairs queued`);
    }

    // Execute all database operations concurrently
    console.log("\n💾 Executing Mass Bulk Writes...");
    
    const writePromises = [];
    if (bulkOperations.length > 0) writePromises.push(Drop.bulkWrite(bulkOperations));
    if (premiumBundleOps.length > 0) writePromises.push(PremiumBundle.bulkWrite(premiumBundleOps));
    if (premiumDropOps.length > 0) writePromises.push(PremiumDrop.bulkWrite(premiumDropOps));
    
    await Promise.all(writePromises);

    console.log("\n🎉 Drop seeding completed successfully.");
    console.log(`📊 Total Matches Processed: ${matches.length}`);
    console.log(`📊 Total Free Drops Upserted: ${dropsProcessed}`);
    console.log(`📊 Total Premium Bundles Upserted: ${premiumBundlesProcessed}`);
    console.log(`📊 Total Premium Drops Upserted: ${premiumDropsProcessed}`);

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