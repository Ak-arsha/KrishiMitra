import { NextRequest, NextResponse } from "next/server";
import { getDynamicMarketFeed } from "@/lib/pricingEngine";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const market = searchParams.get("market") || "Jaipur";
  const state = searchParams.get("state") || "Rajasthan";
  const rawCrops = searchParams.get("crops");

  const requestedCrops = rawCrops ? rawCrops.split(",").map((c) => c.trim()) : undefined;

  const feedData = getDynamicMarketFeed(market, state, requestedCrops);
  return NextResponse.json(feedData);
}
