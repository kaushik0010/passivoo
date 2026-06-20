import mongoose from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { UserPremiumDrop } from "@/features/premium/models/user-premium-drop.model";
import { PremiumDrop } from "@/features/premium/models/premium-drop.model";
import { PremiumBundle } from "@/features/premium/models/premium-bundle.model";
import { DropCategory, DropRarity } from "@/features/drops/models/drop.model";
import { PremiumTheme } from "@/config/premium.constants";

// ==========================================
// TYPE DEFINITIONS (DTOs)
// ==========================================

export interface PremiumVaultCollectibleDto {
  id: string;             // UserPremiumDrop _id
  name: string;           // PremiumDrop.name
  category: DropCategory; // PremiumDrop.category
  rarity: DropRarity;     // PremiumDrop.rarity
  theme: PremiumTheme;    // PremiumBundle.theme (joined via dictionary)
  ownedAt: string;        // ISO String representing acquisition time
}

interface GetPremiumVaultDataArgs {
  userId: string;
}

// ==========================================
// QUERY IMPLEMENTATION
// ==========================================

/**
 * Server-side query fetching all premium collectibles owned by a user.
 * Utilizes the Dictionary Pattern to batch-fetch bundle themes and eliminate N+1 queries.
 */
export async function getPremiumVaultData({
  userId,
}: GetPremiumVaultDataArgs): Promise<PremiumVaultCollectibleDto[]> {
  // Defensive validation guard
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    throw new Error("[getPremiumVaultData] A valid userId string is required.");
  }

  try {
    await connectDB();

    // 1. Fetch Ownership Records & Populate Item Metadata
    // Sorting by ownedAt: -1 ensures the newest purchases appear at the top of the vault.
    const userDrops = await UserPremiumDrop.find({ userId })
      .sort({ ownedAt: -1, _id: -1 })
      .populate({
        path: "premiumDropId",
        model: PremiumDrop,
        select: "name category rarity bundleId isActive",
      })
      .lean();

    // 2. Filter out orphaned ownership records (where the underlying drop was deleted)
    const validDrops = userDrops.filter((ud) => ud.premiumDropId != null);

    if (validDrops.length === 0) {
      return [];
    }

    // 3. Extract unique Bundle IDs for Batch Fetching
    const uniqueBundleIds = new Set<string>();
    validDrops.forEach((ud) => {
      const drop = ud.premiumDropId as any;
      if (drop.bundleId) {
        uniqueBundleIds.add(drop.bundleId.toString());
      }
    });

    // 4. Batch Fetch Associated Bundles (Eliminates N+1)
    const bundleIdsArray = Array.from(uniqueBundleIds).map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    const bundles = await PremiumBundle.find({ _id: { $in: bundleIdsArray } })
      .select("_id theme")
      .lean();

    // 5. Build the In-Memory Theme Dictionary [O(1) lookups]
    const themeDictionary: Record<string, PremiumTheme> = {};
    bundles.forEach((bundle) => {
      themeDictionary[bundle._id.toString()] = bundle.theme as PremiumTheme;
    });

    // 6. Map to clean, serialization-safe DTOs
    const dtos: PremiumVaultCollectibleDto[] = validDrops.map((ud) => {
      const drop = ud.premiumDropId as any;
      const bundleIdString = drop.bundleId?.toString() || "";
      
      // Resolve theme via dictionary lookup, applying a safe fallback
      const resolvedTheme = themeDictionary[bundleIdString] || PremiumTheme.GROUP_STAGE_THEME;

      // Enforce strict Enum casting for UI safety
      const cleanCategory = (drop.category?.toUpperCase() || "SPECIAL") as DropCategory;
      const cleanRarity = (drop.rarity?.toUpperCase() || "COMMON") as DropRarity;

      return {
        id: ud._id.toString(),
        name: drop.name || "Unknown Artifact",
        category: cleanCategory,
        rarity: cleanRarity,
        theme: resolvedTheme,
        ownedAt: ud.ownedAt ? ud.ownedAt.toISOString() : new Date().toISOString(),
      };
    });

    return dtos;
  } catch (error) {
    console.error(`[QUERY ERROR] Failed to retrieve Premium Vault for user ${userId}:`, error);
    // Suppress strict throwing to allow graceful UI degradation on the Collections page
    return [];
  }
}