import { DropCategory, DropRarity, DropType } from "@/features/drops/models/drop.model";
import { MatchStage } from "@/features/matches/models/match.model";

/**
 * Single source of truth for leaderboard scoring.
 * Every collectible derives its points from rarity.
 */
export const RARITY_POINTS: Record<DropRarity, number> = {
  [DropRarity.COMMON]: 10,
  [DropRarity.RARE]: 25,
  [DropRarity.EPIC]: 50,
  [DropRarity.LEGENDARY]: 100,
};

export interface DropGenerationRule {
  category: DropCategory;
  rarity: DropRarity;
  dropType: DropType;
}

/**
 * Rules used by the seed script to automatically generate
 * free collectibles for every FIFA match.
 */
export const FREE_DROP_RULES: Record<MatchStage, DropGenerationRule[]> = {
  [MatchStage.GROUP_STAGE]: [
    {
      category: DropCategory.HOST_CITY,
      rarity: DropRarity.COMMON,
      dropType: DropType.PERMANENT,
    },
    {
      category: DropCategory.STADIUM,
      rarity: DropRarity.RARE,
      dropType: DropType.PERMANENT,
    },
    {
      category: DropCategory.EVENT_BADGE,
      rarity: DropRarity.COMMON,
      dropType: DropType.MATCH,
    },
  ],

  [MatchStage.ROUND_OF_32]: [
    {
      category: DropCategory.HOST_CITY,
      rarity: DropRarity.COMMON,
      dropType: DropType.PERMANENT,
    },
    {
      category: DropCategory.STADIUM,
      rarity: DropRarity.RARE,
      dropType: DropType.PERMANENT,
    },
    {
      category: DropCategory.EVENT_BADGE,
      rarity: DropRarity.RARE,
      dropType: DropType.MATCH,
    },
    {
      category: DropCategory.SPECIAL,
      rarity: DropRarity.EPIC,
      dropType: DropType.MATCH,
    },
  ],

  [MatchStage.ROUND_OF_16]: [
    {
      category: DropCategory.HOST_CITY,
      rarity: DropRarity.COMMON,
      dropType: DropType.PERMANENT,
    },
    {
      category: DropCategory.STADIUM,
      rarity: DropRarity.RARE,
      dropType: DropType.PERMANENT,
    },
    {
      category: DropCategory.EVENT_BADGE,
      rarity: DropRarity.EPIC,
      dropType: DropType.MATCH,
    },
    {
      category: DropCategory.SPECIAL,
      rarity: DropRarity.EPIC,
      dropType: DropType.MATCH,
    },
  ],

  [MatchStage.QUARTER_FINAL]: [
    {
      category: DropCategory.HOST_CITY,
      rarity: DropRarity.RARE,
      dropType: DropType.PERMANENT,
    },
    {
      category: DropCategory.STADIUM,
      rarity: DropRarity.EPIC,
      dropType: DropType.PERMANENT,
    },
    {
      category: DropCategory.EVENT_BADGE,
      rarity: DropRarity.EPIC,
      dropType: DropType.MATCH,
    },
    {
      category: DropCategory.SPECIAL,
      rarity: DropRarity.LEGENDARY,
      dropType: DropType.MATCH,
    },
  ],

  [MatchStage.SEMI_FINAL]: [
    {
      category: DropCategory.HOST_CITY,
      rarity: DropRarity.RARE,
      dropType: DropType.PERMANENT,
    },
    {
      category: DropCategory.STADIUM,
      rarity: DropRarity.EPIC,
      dropType: DropType.PERMANENT,
    },
    {
      category: DropCategory.EVENT_BADGE,
      rarity: DropRarity.LEGENDARY,
      dropType: DropType.MATCH,
    },
    {
      category: DropCategory.SPECIAL,
      rarity: DropRarity.LEGENDARY,
      dropType: DropType.MATCH,
    },
  ],

  [MatchStage.THIRD_PLACE]: [
    {
      category: DropCategory.HOST_CITY,
      rarity: DropRarity.RARE,
      dropType: DropType.PERMANENT,
    },
    {
      category: DropCategory.STADIUM,
      rarity: DropRarity.EPIC,
      dropType: DropType.PERMANENT,
    },
    {
      category: DropCategory.EVENT_BADGE,
      rarity: DropRarity.LEGENDARY,
      dropType: DropType.MATCH,
    },
    {
      category: DropCategory.SPECIAL,
      rarity: DropRarity.LEGENDARY,
      dropType: DropType.MATCH,
    },
  ],

  [MatchStage.FINAL]: [
    {
        category: DropCategory.HOST_CITY,
        rarity: DropRarity.RARE,
        dropType: DropType.PERMANENT,
    },
    {
        category: DropCategory.STADIUM,
        rarity: DropRarity.EPIC,
        dropType: DropType.PERMANENT,
    },
    {
        category: DropCategory.EVENT_BADGE,
        rarity: DropRarity.LEGENDARY,
        dropType: DropType.MATCH,
    },
    {
        category: DropCategory.TROPHY,
        rarity: DropRarity.LEGENDARY,
        dropType: DropType.MATCH,
    },
    {
        category: DropCategory.SPECIAL,
        rarity: DropRarity.LEGENDARY,
        dropType: DropType.MATCH,
    },
  ],
};

/**
 * Every premium bundle contains exactly:
 * 1 Common
 * 1 Rare
 * 1 Epic
 *
 * Premium collectibles are cosmetic only.
 */
export const PREMIUM_BUNDLE_RULE = {
  common: 1,
  rare: 1,
  epic: 1,
} as const;

/**
 * Welcome pack rules.
 */
export const WELCOME_PACK_RULE = {
  common: 1,
  rare: 1,
  epic: 1,
} as const;

/**
 * Premium collectibles never affect progression.
 */
export const PREMIUM_DROP_POINTS = 0;

/**
 * Premium bundles remain available
 * after the tournament finishes.
 */
export const PREMIUM_BUNDLE_EXPIRY_DAYS = 7;