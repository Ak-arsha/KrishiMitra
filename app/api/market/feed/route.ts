import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const market = searchParams.get("market") || "Jaipur Mandi";
  const state = searchParams.get("state") || "Rajasthan";

  const feed = [
    {
      crop: "Wheat",
      market: "Jaipur Main Yard",
      arrival_tonnes: 420,
      price: 2275,
      change: "+ ₹35",
      trend: "up",
      status: "High Demand",
    },
    {
      crop: "Mustard",
      market: "Chomu Mandi",
      arrival_tonnes: 280,
      price: 5650,
      change: "+ ₹70",
      trend: "up",
      status: "Active Bidding",
    },
    {
      crop: "Potato",
      market: "Sanganer Yard",
      arrival_tonnes: 150,
      price: 1450,
      change: "+ ₹30",
      trend: "up",
      status: "Steady",
    },
    {
      crop: "Onion",
      market: "Alwar Mandi",
      arrival_tonnes: 610,
      price: 1850,
      change: "- ₹50",
      trend: "down",
      status: "High Arrivals",
    },
    {
      crop: "Chana",
      market: "Kota Yard",
      arrival_tonnes: 310,
      price: 5440,
      change: "+ ₹50",
      trend: "up",
      status: "Firm Baseline",
    },
  ];

  return NextResponse.json({
    market,
    state,
    feed,
    volatility_index: "Low (0.14)",
    last_updated: new Date().toISOString(),
  });
}
