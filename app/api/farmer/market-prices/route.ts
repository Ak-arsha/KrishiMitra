import { NextRequest, NextResponse } from "next/server";

const BASE_CROP_PRICES = [
  { crop: "Wheat", base_price: 2275, unit: "₹/quintal" },
  { crop: "Rice", base_price: 4500, unit: "₹/quintal" },
  { crop: "Mustard", base_price: 5650, unit: "₹/quintal" },
  { crop: "Cotton", base_price: 7120, unit: "₹/quintal" },
  { crop: "Potato", base_price: 1450, unit: "₹/quintal" },
  { crop: "Onion", base_price: 1850, unit: "₹/quintal" },
  { crop: "Tomato", base_price: 2400, unit: "₹/quintal" },
  { crop: "Maize", base_price: 2090, unit: "₹/quintal" },
  { crop: "Sugarcane", base_price: 3150, unit: "₹/quintal" },
  { crop: "Chana", base_price: 5440, unit: "₹/quintal" },
  { crop: "Soybean", base_price: 4600, unit: "₹/quintal" },
  { crop: "Turmeric", base_price: 7800, unit: "₹/quintal" },
  { crop: "Chilli", base_price: 8500, unit: "₹/quintal" },
  { crop: "Groundnut", base_price: 6375, unit: "₹/quintal" },
];

const LOCATION_OFFSETS: Record<string, { mult: number; boosts: Record<string, number> }> = {
  jaipur: { mult: 1.0, boosts: { Wheat: 0, Mustard: 50, Soybean: 0 } },
  kota: { mult: 0.97, boosts: { Wheat: -30, Mustard: -40, Soybean: -20, Chana: -60 } },
  indore: { mult: 1.04, boosts: { Soybean: 380, Wheat: 60, Mustard: 130 } },
  bhopal: { mult: 1.02, boosts: { Soybean: 250, Wheat: 35, Rice: 170 } },
  ludhiana: { mult: 1.06, boosts: { Wheat: 140, Rice: 220, Maize: -40 } },
  amritsar: { mult: 1.08, boosts: { Rice: 580, Wheat: 120 } },
  lucknow: { mult: 0.96, boosts: { Wheat: -70, Rice: 80, Potato: 130 } },
  kanpur: { mult: 0.97, boosts: { Chana: 220, Wheat: -40, Mustard: 80 } },
  nashik: { mult: 1.12, boosts: { Onion: 420, Tomato: 650, Cotton: 330 } },
  pune: { mult: 1.15, boosts: { Tomato: 780, Onion: 490, Soybean: 210 } },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawLoc = searchParams.get("location") || "Jaipur, Rajasthan";
  const locLower = rawLoc.toLowerCase();

  let matchedLocKey = "jaipur";
  for (const key of Object.keys(LOCATION_OFFSETS)) {
    if (locLower.includes(key)) {
      matchedLocKey = key;
      break;
    }
  }

  const locConfig = LOCATION_OFFSETS[matchedLocKey] || LOCATION_OFFSETS.jaipur;

  const prices = BASE_CROP_PRICES.map((item) => {
    const boost = locConfig.boosts[item.crop] || 0;
    const current_price = Math.round(item.base_price * locConfig.mult + boost);
    const prev_diff = (item.crop.length % 3 === 0 ? 1 : -1) * (20 + (item.base_price % 40));
    const previous_price = current_price - prev_diff;
    const change_amount = current_price - previous_price;
    const change_percent = Math.round((change_amount / previous_price) * 100 * 10) / 10;

    return {
      crop: item.crop,
      current_price,
      previous_price,
      change_percent,
      change_amount,
      unit: item.unit,
      timestamp: new Date().toISOString(),
    };
  });

  return NextResponse.json({
    location: rawLoc,
    prices,
    last_updated: new Date().toISOString(),
  });
}
