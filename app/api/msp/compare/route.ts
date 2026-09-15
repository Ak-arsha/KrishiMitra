import { NextRequest, NextResponse } from "next/server";
import { getCropCalculatedPrice } from "@/lib/pricingEngine";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const crop = searchParams.get("crop") || "Wheat";
  const market = searchParams.get("market") || "Jaipur Mandi";

  const calc = getCropCalculatedPrice(crop, market);

  return NextResponse.json({
    crop: calc.crop,
    market,
    official_msp: calc.msp,
    mandi_price: calc.current_price,
    difference: calc.current_price - calc.msp,
    percentage_above_msp: Math.round(((calc.current_price - calc.msp) / calc.msp) * 100 * 10) / 10,
    status: calc.current_price >= calc.msp ? "ABOVE_MSP" : "BELOW_MSP",
  });
}
