import { NextRequest, NextResponse } from "next/server";

const BASE_CROPS = [
  { crop: "Wheat", base: 2275, stability: "stable", trend: 4.2 },
  { crop: "Mustard", base: 5650, stability: "moderate", trend: 6.8 },
  { crop: "Soybean", base: 4620, stability: "volatile", trend: -2.1 },
  { crop: "Paddy", base: 2183, stability: "stable", trend: 1.5 },
  { crop: "Tomato", base: 3400, stability: "volatile", trend: 18.4 },
  { crop: "Chana", base: 5440, stability: "stable", trend: 3.1 },
];

const MANDI_LOCATION_PRICES: Record<string, { mult: number; boosts: Record<string, number>; stabilityOverride?: Record<string, string> }> = {
  jaipur: { mult: 1.0, boosts: { Wheat: 0, Mustard: 50, Soybean: 0 } },
  kota: { mult: 0.97, boosts: { Wheat: -30, Mustard: -40, Soybean: -20, Chana: -60 } },
  indore: { mult: 1.04, boosts: { Soybean: 380, Wheat: 60, Mustard: 130 } },
  bhopal: { mult: 1.02, boosts: { Soybean: 250, Wheat: 35, Paddy: 70 } },
  ludhiana: { mult: 1.06, boosts: { Wheat: 140, Paddy: 220, Chana: -40 } },
  amritsar: { mult: 1.08, boosts: { Paddy: 580, Wheat: 120 } },
  lucknow: { mult: 0.96, boosts: { Wheat: -70, Paddy: 80, Tomato: -120 } },
  kanpur: { mult: 0.97, boosts: { Chana: 220, Wheat: -40, Mustard: 80 } },
  nashik: { mult: 1.12, boosts: { Tomato: 650, Wheat: 40 } },
  pune: { mult: 1.15, boosts: { Tomato: 780, Soybean: 210 } },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const market = searchParams.get("market") || "Jaipur";
  const state = searchParams.get("state") || "Rajasthan";

  const marketLower = market.toLowerCase();
  let matchedKey = "jaipur";
  for (const k of Object.keys(MANDI_LOCATION_PRICES)) {
    if (marketLower.includes(k)) {
      matchedKey = k;
      break;
    }
  }

  const locConf = MANDI_LOCATION_PRICES[matchedKey] || MANDI_LOCATION_PRICES.jaipur;

  const feed = BASE_CROPS.map((c) => {
    const boost = locConf.boosts[c.crop] || 0;
    const price = Math.round(c.base * locConf.mult + boost);

    const series = Array.from({ length: 8 }).map((_, i) => ({
      date: `Day ${i * 4 + 1}`,
      predicted_price: Math.round(price * (1 + Math.sin(i / 2) * 0.03 + (i * 0.004))),
    }));

    return {
      crop: c.crop,
      market: `${market} Main Mandi`,
      stability: c.stability,
      current_price: price,
      trend_pct_30d: c.trend,
      series,
    };
  });

  return NextResponse.json({
    market,
    state,
    feed,
    volatility_index: "Low / Stable (0.14)",
    last_updated: new Date().toISOString(),
  });
}
