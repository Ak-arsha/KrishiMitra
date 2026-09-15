import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const crop = searchParams.get("crop") || "Wheat";
  const market = searchParams.get("market") || "Jaipur";

  const explanation = [
    {
      feature: "Regional Procurement Demand",
      impact: 140,
      explanation: "Strong buying demand from local processing mills and bulk buyers drives price upward (+₹140/qtl).",
    },
    {
      feature: "Mandi Arrival Volume",
      impact: -60,
      explanation: "Higher arrival volume in neighboring market yards creates slight supply pressure (-₹60/qtl).",
    },
    {
      feature: "Export Benchmark Parity",
      impact: 85,
      explanation: "Favorable international export parity increases trader willingness to pay premium (+₹85/qtl).",
    },
    {
      feature: "Moisture Content Quality",
      impact: 50,
      explanation: "Optimal 11% moisture content yields quality grade bonus (+₹50/qtl).",
    },
  ];

  return NextResponse.json({
    crop,
    market,
    explanation,
    model_name: "XGBoost + LightGBM Perturbation SHAP Analysis",
    generated_at: new Date().toISOString(),
  });
}
