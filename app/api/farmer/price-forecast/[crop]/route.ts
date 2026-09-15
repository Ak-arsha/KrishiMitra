import { NextRequest, NextResponse } from "next/server";
import { getDynamicForecast } from "@/lib/pricingEngine";

export async function GET(
  req: NextRequest,
  { params }: { params: { crop: string } }
) {
  const crop = params.crop || "Wheat";
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location") || "Jaipur Mandi";

  const forecastData = getDynamicForecast(crop, location);
  return NextResponse.json(forecastData);
}
