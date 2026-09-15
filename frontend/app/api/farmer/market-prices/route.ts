import { NextRequest, NextResponse } from "next/server";
import { BASE_CROP_CATALOG, getCropCalculatedPrice } from "@/lib/pricingEngine";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawLoc = searchParams.get("location") || "Jaipur, Rajasthan";

  const prices = Object.keys(BASE_CROP_CATALOG).map((cropName) => {
    const calc = getCropCalculatedPrice(cropName, rawLoc);
    return {
      crop: calc.crop,
      current_price: calc.current_price,
      previous_price: calc.previous_price,
      change_percent: calc.change_percent,
      change_amount: calc.change_amount,
      unit: calc.unit,
      timestamp: new Date().toISOString(),
    };
  });

  return NextResponse.json({
    location: rawLoc,
    prices,
    last_updated: new Date().toISOString(),
  });
}
