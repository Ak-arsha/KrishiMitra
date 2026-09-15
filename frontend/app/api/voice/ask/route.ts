import { NextRequest, NextResponse } from "next/server";
import { generateVoiceAnswer } from "@/lib/pricingEngine";

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {}

  const query = body.query || "";
  const crop = body.crop || "";
  const market = body.market || "";

  const answer = generateVoiceAnswer(query, crop, market);

  return NextResponse.json({
    query,
    crop,
    market,
    answer,
    audio_enabled: true,
    timestamp: new Date().toISOString(),
  });
}
