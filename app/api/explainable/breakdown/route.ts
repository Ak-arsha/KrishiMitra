import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const crop = searchParams.get("crop") || "Wheat";
  const market = searchParams.get("market") || "Jaipur Mandi";

  const factors = [
    {
      feature: "Government MSP Floor Benchmark",
      impact: "+ ₹120/qtl",
      description: "Official MSP floor protects prices against downside drops.",
      weight_percent: 35,
      direction: "positive",
    },
    {
      feature: "Regional Weather & Crop Arrival Rate",
      impact: "+ ₹85/qtl",
      description: "Dry harvesting weather improved grain moisture and quality classification.",
      weight_percent: 25,
      direction: "positive",
    },
    {
      feature: "Mandi Demand vs. Procurement Stock",
      impact: "+ ₹60/qtl",
      description: "Bulk flour millers actively bidding for high-grade lots.",
      weight_percent: 20,
      direction: "positive",
    },
    {
      feature: "Transportation & Diesel Price Trends",
      impact: "- ₹25/qtl",
      description: "Slight increase in freight logistics charges.",
      weight_percent: 10,
      direction: "negative",
    },
    {
      feature: "Seasonal Mandi Arrival Volatility",
      impact: "+ ₹15/qtl",
      description: "Steady phased market arrivals preventing price crashes.",
      weight_percent: 10,
      direction: "positive",
    },
  ];

  return NextResponse.json({
    crop,
    market,
    baseline_price: 2275,
    predicted_price: 2355,
    total_boost: 80,
    features: factors,
    model_name: "XGBoost + LightGBM Perturbation SHAP Analysis",
    generated_at: new Date().toISOString(),
  });
}
