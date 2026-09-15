import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {}

  const crop = body.crop || "Wheat";
  const quantity = body.quantity_quintal || 25;
  const basePrice = crop === "Wheat" ? 2320 : crop === "Mustard" ? 5750 : crop === "Soybean" ? 4620 : 3200;

  const matches = [
    {
      buyer_id: "b1",
      buyer_name: "Rajesh Kumar (Shree Ram Agro Traders)",
      trader_type: "Mandi Wholesaler",
      distance_km: 8.4,
      estimated_price_per_quintal: basePrice + 40,
      match_score: 0.96,
      reason: "High procurement volume for immediate dispatch",
      phone: "+91 98290 12345",
      verified: true,
    },
    {
      buyer_id: "b2",
      buyer_name: "Vikas Sharma (Kisan Flour Mills)",
      trader_type: "Bulk Processor",
      distance_km: 14.2,
      estimated_price_per_quintal: basePrice + 70,
      match_score: 0.92,
      reason: "Direct miller offer with instant RTGS payment",
      phone: "+91 94140 67890",
      verified: true,
    },
    {
      buyer_id: "b3",
      buyer_name: "Suresh Patel (Agro Export Corp)",
      trader_type: "Institutional Buyer",
      distance_km: 22.1,
      estimated_price_per_quintal: basePrice + 90,
      match_score: 0.88,
      reason: "Export grade premium buyer",
      phone: "+91 97850 54321",
      verified: true,
    },
  ];

  return NextResponse.json({
    crop,
    quantity_requested: quantity,
    matches,
    total_matches: matches.length,
  });
}
