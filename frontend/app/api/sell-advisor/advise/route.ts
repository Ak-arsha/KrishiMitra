import { NextRequest, NextResponse } from "next/server";
import { getDynamicSellAdvice } from "@/lib/pricingEngine";

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {}

  const crop = body.crop || "Wheat";
  const quantity = body.quantity_quintal || 25;
  const quality = body.quality_grade || "A";
  const market = body.market || "Jaipur";
  const state = body.state || "Rajasthan";

  const advice = getDynamicSellAdvice(crop, quantity, quality, market, state);
  return NextResponse.json(advice);
}
