import { NextRequest, NextResponse } from "next/server";

const MSP_DATA: Record<string, number> = {
  Wheat: 2275,
  Rice: 2183,
  Mustard: 5650,
  Cotton: 7020,
  Maize: 2090,
  Soybean: 4600,
  Chana: 5440,
  Groundnut: 6375,
};

const MARKET_PRICES: Record<string, number> = {
  Wheat: 2275,
  Rice: 4500,
  Mustard: 5650,
  Cotton: 7120,
  Maize: 2090,
  Soybean: 4600,
  Chana: 5440,
  Groundnut: 6375,
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const crop = searchParams.get("crop") || "Wheat";
  const market = searchParams.get("market") || "Jaipur Mandi";

  const msp = MSP_DATA[crop] || 2200;
  const mandiPrice = MARKET_PRICES[crop] || msp;

  return NextResponse.json({
    crop,
    market,
    official_msp: msp,
    mandi_price: mandiPrice,
    difference: mandiPrice - msp,
    percentage_above_msp: Math.round(((mandiPrice - msp) / msp) * 100 * 10) / 10,
    status: mandiPrice >= msp ? "ABOVE_MSP" : "BELOW_MSP",
  });
}
