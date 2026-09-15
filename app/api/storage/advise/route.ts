import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {}

  const crop = body.crop || "Wheat";
  const quantity = body.quantity_quintal || 10;
  const currentPrice = body.current_price || 2275;
  const predictedPrice30d = Math.round(currentPrice * 1.08);

  const immediateRevenue = currentPrice * quantity;
  const storageCostPerQuintalMonth = 60; // ₹60/quintal/month
  const totalStorageCost = storageCostPerQuintalMonth * quantity;

  const futureRevenue = predictedPrice30d * quantity;
  const netGain = futureRevenue - totalStorageCost - immediateRevenue;

  const recommendStorage = netGain > 0;

  return NextResponse.json({
    crop,
    quantity_quintal: quantity,
    current_price: currentPrice,
    predicted_price_30d: predictedPrice30d,
    storage_cost_per_quintal_month: storageCostPerQuintalMonth,
    immediate_revenue: immediateRevenue,
    future_gross_revenue: futureRevenue,
    total_storage_cost: totalStorageCost,
    net_gain: Math.round(netGain),
    recommendation: recommendStorage ? "STORE" : "SELL_NOW",
    roi_percent: Math.round((netGain / immediateRevenue) * 100 * 10) / 10,
    summary: recommendStorage
      ? `Storing ${crop} for 30 days yields an estimated net gain of ₹${Math.round(netGain)} after accounting for ₹${totalStorageCost} cold storage costs.`
      : `Selling now is recommended. Cold storage costs exceed projected 30-day price gains.`,
  });
}
