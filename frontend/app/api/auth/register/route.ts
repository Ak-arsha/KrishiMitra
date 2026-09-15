import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {}

  return NextResponse.json({
    access_token: "km-jwt-token-demo-session-2026",
    token_type: "bearer",
    user: {
      id: "u102",
      email: body.email || "farmer@krishimitra.org",
      full_name: body.full_name || "New Kisan Partner",
      location_name: body.location_name || "Jaipur, Rajasthan",
      role: body.role || "farmer",
    },
  });
}
