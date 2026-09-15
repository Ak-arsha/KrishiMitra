import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const crop = searchParams.get("crop") || "Wheat";

  const headlines = [
    `${crop} market arrivals steady across major northern mandis.`,
    `Government procurement centres report strong quality grading for ${crop}.`,
    `Export demand for ${crop} products remains robust in Asian markets.`,
  ];

  return NextResponse.json({
    crop,
    summary: `Market intelligence indicates strong buying interest for ${crop}. Sowing reports and weather conditions remain favorable across key producing belts. Traders expect prices to stay resilient above official support floors.`,
    headlines,
    timestamp: new Date().toISOString(),
  });
}
