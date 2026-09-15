import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const market = searchParams.get("market") || "Jaipur";
  const state = searchParams.get("state") || "Rajasthan";

  const crops = [
    { crop: "Wheat", base: 2275, stability: "stable", trend: 4.2 },
    { crop: "Mustard", base: 5650, stability: "moderate", trend: 6.8 },
    { crop: "Soybean", base: 4620, stability: "volatile", trend: -2.1 },
    { crop: "Paddy", base: 2183, stability: "stable", trend: 1.5 },
    { crop: "Tomato", base: 3400, stability: "volatile", trend: 18.4 },
    { crop: "Chana", base: 5440, stability: "stable", trend: 3.1 },
  ];

  const feed = crops.map((c) => {
    const series = Array.from({ length: 8 }).map((_, i) => ({
      date: `Day ${i * 4 + 1}`,
      predicted_price: Math.round(c.base * (1 + Math.sin(i / 2) * 0.03 + (i * 0.004))),
    }));

    return {
      crop: c.crop,
      market: `${market} Main Mandi`,
      stability: c.stability,
      current_price: c.base,
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
