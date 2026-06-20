import mongoose from "mongoose";
import { connectDB } from "@/lib/db/connect";
import { PremiumBundle } from "@/features/premium/models/premium-bundle.model";
import { PremiumDrop } from "@/features/premium/models/premium-drop.model";
import { UserPremiumBundle } from "@/features/premium/models/user-premium-bundle.model";
import { PremiumTheme } from "@/config/premium.constants";
import { DropCategory, DropRarity } from "@/features/drops/models/drop.model";

// ==========================================
// TYPE DEFINITIONS (DTOs)
// ==========================================

export interface PremiumDropDto {
  id: string;
  name: string;
  category: DropCategory;
  rarity: DropRarity;
}

export interface ActivePremiumBundleDto {
  id: string;
  matchNumber: number;
  name: string;
  priceCents: number;
  currency: string;
  theme: PremiumTheme;
  drops: PremiumDropDto[];
}

export interface PremiumStorefrontStateDto {
  activeBundle: ActivePremiumBundleDto | null;
  nextUnlockAt: string | null;
}

interface GetActivePremiumBundleArgs {
  userId: string;
}

// ==========================================
// QUERY IMPLEMENTATION
// ==========================================

/**
 * Server-side query returning the complete Premium Storefront State.
 * Handles Active Bundles, Ownership Suppression, and Future Countdown resolution.
 */
export async function getActivePremiumBundle({ 
  userId 
}: GetActivePremiumBundleArgs): Promise<PremiumStorefrontStateDto | null> {
  try {
    await connectDB();
    const now = new Date();

    let activeBundleDto: ActivePremiumBundleDto | null = null;
    let nextUnlockAt: string | null = null;

    // 1. Determine Active Bundle Query (Production vs. Dev Override)
    let bundleQuery: any = {
      isActive: true,
      unlockAt: { $lte: now },
      expiresAt: { $gt: now },
    };

    const isDevOverride = process.env.NODE_ENV !== "production" && process.env.DEV_ACTIVE_MATCH;
    if (isDevOverride) {
      const devMatchNum = parseInt(process.env.DEV_ACTIVE_MATCH as string, 10);
      if (!isNaN(devMatchNum)) {
        bundleQuery = { isActive: true, matchNumber: devMatchNum };
      }
    }

    // 2. Fetch the globally active bundle
    const bundle = await PremiumBundle.findOne(bundleQuery)
      .select("_id matchNumber name priceCents currency theme")
      .lean();

    // 3. Evaluate Ownership & Construct Active DTO
    if (bundle) {
      const ownershipReceipt = await UserPremiumBundle.findOne({
        userId,
        bundleId: bundle._id,
        status: "COMPLETED",
      }).select("_id").lean();

      // Only populate active bundle if NOT owned
      if (!ownershipReceipt) {
        const drops = await PremiumDrop.find({ bundleId: bundle._id, isActive: true })
          .select("_id name category rarity")
          .lean();

        activeBundleDto = {
          id: bundle._id.toString(),
          matchNumber: bundle.matchNumber,
          name: bundle.name,
          priceCents: bundle.priceCents,
          currency: bundle.currency,
          theme: bundle.theme as PremiumTheme,
          drops: drops.map((drop) => ({
            id: drop._id.toString(),
            name: drop.name,
            category: drop.category as DropCategory,
            rarity: drop.rarity as DropRarity,
          })),
        };
      }
    }

    // 4. Fallback Countdown Evaluation
    // If no active bundle exists OR the user already owns it, find the NEXT chronological bundle.
    if (!activeBundleDto) {
      const nextBundle = await PremiumBundle.findOne({
        isActive: true,
        unlockAt: { $gt: now },
      })
        .sort({ unlockAt: 1 })
        .select("unlockAt")
        .lean();

      if (nextBundle) {
        nextUnlockAt = nextBundle.unlockAt.toISOString();
      }
    }

    // Return the Storefront State Envelope
    return {
      activeBundle: activeBundleDto,
      nextUnlockAt,
    };

  } catch (error) {
    console.error("[QUERY ERROR] Failed to execute getActivePremiumBundle:", error);
    return null;
  }
}