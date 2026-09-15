import { NextRequest, NextResponse } from "next/server";

const CROP_PRICES = [
  { crop: "Wheat", current_price: 2275, previous_price: 2240, change_percent: 1.6, change_amount: 35, unit: "₹/quintal" },
  { crop: "Rice", current_price: 4500, previous_price: 4420, change_percent: 1.8, change_amount: 80, unit: "₹/quintal" },
  { crop: "Mustard", current_price: 5650, previous_price: 5580, change_percent: 1.3, change_amount: 70, unit: "₹/quintal" },
  { crop: "Cotton", current_price: 7120, previous_price: 7050, change_percent: 1.0, change_amount: 70, unit: "₹/quintal" },
  { crop: "Potato", current_price: 1450, previous_price: 1420, change_percent: 2.1, change_amount: 30, unit: "₹/quintal" },
  { crop: "Onion", current_price: 1850, previous_price: 1900, change_percent: -2.6, change_amount: -50, unit: "₹/quintal" },
  { crop: "Tomato", current_price: 2400, previous_price: 2480, change_percent: -3.2, change_amount: -80, unit: "₹/quintal" },
  { crop: "Maize", current_price: 2090, previous_price: 2060, change_percent: 1.5, change_amount: 30, unit: "₹/quintal" },
  { crop: "Sugarcane", current_price: 3150, previous_price: 3100, change_percent: 1.6, change_amount: 50, unit: "₹/quintal" },
  { crop: "Chana", current_price: 5440, previous_price: 5390, change_percent: 0.9, change_amount: 50, unit: "₹/quintal" },
  { crop: "Soybean", current_price: 4600, previous_price: 4520, change_percent: 1.8, change_amount: 80, unit: "₹/quintal" },
  { crop: "Turmeric", current_price: 7800, previous_price: 7650, change_percent: 2.0, change_amount: 150, unit: "₹/quintal" },
  { crop: "Chilli", current_price: 8500, previous_price: 8350, change_percent: 1.8, change_amount: 150, unit: "₹/quintal" },
  { crop: "Groundnut", current_price: 6375, previous_price: 6250, change_percent: 2.0, change_amount: 125, unit: "₹/quintal" },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location") || "Jaipur, Rajasthan";

  return NextResponse.json({
    location,
    prices: CROP_PRICES.map((p) => ({
      ...p,
      timestamp: new Date().toISOString(),
    })),
    last_updated: new Date().toISOString(),
  });
}
