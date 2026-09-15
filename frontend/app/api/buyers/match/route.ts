import { NextRequest, NextResponse } from "next/server";
import { getDynamicBuyerMatches } from "@/lib/pricingEngine";

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {}

  const crop = body.crop || "Wheat";
  const quantity = body.quantity_quintal || 25;
  const quality = body.quality_grade || "A";

  const matches = getDynamicBuyerMatches(crop, quantity, quality);

  return NextResponse.json({
    crop,
    quantity_requested: quantity,
    matches,
    total_matches: matches.length,
  });
}
