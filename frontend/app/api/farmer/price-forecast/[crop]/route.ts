import { NextRequest, NextResponse } from "next/server";

const BASE_PRICES: Record<string, number> = {
  Wheat: 2275,
  Rice: 4500,
  Mustard: 5650,
  Cotton: 7120,
  Potato: 1450,
  Onion: 1850,
  Tomato: 2400,
  Maize: 2090,
  Sugarcane: 3150,
  Chana: 5440,
  Soybean: 4600,
  Turmeric: 7800,
  Chilli: 8500,
  Groundnut: 6375,
};

export async function GET(
  req: NextRequest,
  { params }: { params: { crop: string } }
) {
  const crop = params.crop || "Wheat";
  const basePrice = BASE_PRICES[crop] || 2200;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const today = new Date();

  const forecast = days.map((day, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);

    const delta = Math.sin(i * 0.8) * (basePrice * 0.02) + (i * basePrice * 0.006);
    const predicted = Math.round((basePrice + delta) * 100) / 100;
    const diff = Math.round(delta * 10) / 10;

    return {
      day,
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      predicted_price: predicted,
      confidence: 0.88,
      trend: diff > 10 ? "up" : diff < -10 ? "down" : "stable",
      price_change: diff,
    };
  });

  const avgPrice =
    Math.round(
      (forecast.reduce((acc, f) => acc + f.predicted_price, 0) / forecast.length) * 100
    ) / 100;

  return NextResponse.json({
    crop,
    forecast,
    average_price: avgPrice,
    forecast_period: "5 days",
    model_confidence: 0.88,
    generated_at: new Date().toISOString(),
  });
}
