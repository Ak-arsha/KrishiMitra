import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {}

  const crop = body.crop || "Wheat";
  const quantity = body.quantity_quintal || 10;

  const buyers = [
    {
      id: "b1",
      name: "Rajesh Kumar (Shree Ram Agro Traders)",
      trader_type: "Mandi Wholesaler",
      distance_km: 8.4,
      offered_price: 2310,
      min_quantity_quintal: 5,
      phone: "+91 98290 12345",
      verified: true,
      rating: 4.9,
      location: "Jaipur Main Mandi, Gate No. 2",
    },
    {
      id: "b2",
      name: "Vikas Sharma (Kisan Flour Mills)",
      trader_type: "Bulk Processor",
      distance_km: 14.2,
      offered_price: 2340,
      min_quantity_quintal: 10,
      phone: "+91 94140 67890",
      verified: true,
      rating: 4.8,
      location: "Vishwakarma Industrial Area, Jaipur",
    },
    {
      id: "b3",
      name: "Suresh Patel (Agro Export Corp)",
      trader_type: "Institutional Buyer",
      distance_km: 22.1,
      offered_price: 2360,
      min_quantity_quintal: 25,
      phone: "+91 97850 54321",
      verified: true,
      rating: 4.7,
      location: "Chomu Mandi Yard, Jaipur",
    },
    {
      id: "b4",
      name: "Amit Gupta (Grain Storage & Logistics)",
      trader_type: "Warehouse Agent",
      distance_km: 28.5,
      offered_price: 2295,
      min_quantity_quintal: 5,
      phone: "+91 99280 11223",
      verified: false,
      rating: 4.4,
      location: "Sanganer Grain Market",
    },
  ];

  return NextResponse.json({
    crop,
    quantity_requested: quantity,
    matched_buyers: buyers,
    total_matches: buyers.length,
    timestamp: new Date().toISOString(),
  });
}
