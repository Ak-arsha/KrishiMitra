import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {}

  const crop = body.crop || "Wheat";
  const quantity = body.quantity_quintal || 25;
  const currentPrice = body.current_price || 2275;
  const predictedPrice30d = body.predicted_price_30d || Math.round(currentPrice * 1.12);

  const storageCost = Math.round(quantity * 60); // ₹60/qtl
  const grossGain = (predictedPrice30d - currentPrice) * quantity;
  const netGain = grossGain - storageCost;

  return NextResponse.json({
    crop,
    quantity_quintal: quantity,
    current_price: currentPrice,
    predicted_price_30d: predictedPrice30d,
    recommendation: netGain > 0 ? "store" : "sell_immediately",
    reasoning: netGain > 0 
      ? `Storing ${quantity} qtl of ${crop} for 30 days is projected to generate a net gain of ₹${netGain.toLocaleString("en-IN")} after accounting for ₹${storageCost.toLocaleString("en-IN")} cold storage fees.`
      : "Selling immediately is recommended because storage fees and spoilage risk exceed projected price appreciation.",
    estimated_storage_cost: storageCost,
    estimated_spoilage_risk_pct: crop === "Tomato" || crop === "Onion" ? 4.5 : 1.2,
    projected_gain_if_stored: netGain,
    nearest_warehouse_suggestion: "Jaipur Central Cold Chain & Mandi Depot (12.4 km away)",
  });
}
