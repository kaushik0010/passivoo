import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { getPassportData } from "@/features/collections/queries/get-passport-data";

export interface PassportStatsDto {
  totalStamps: number;
  totalPoints: number;
  countriesCompleted: number;
  totalCountries: number;
  tournamentProgress: number;
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
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");

    const data = await getPassportData({ userId: session.user.id, cursor });

    return NextResponse.json<PassportResponseDto>(data);
  } catch (error) {
    console.error("[GET /api/passport] Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}