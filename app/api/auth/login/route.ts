import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {}

  const email = body.email || "farmer@krishimitra.org";

  return NextResponse.json({
    access_token: "km-jwt-token-demo-session-2026",
    token_type: "bearer",
    user: {
      id: "u101",
      email,
      full_name: body.full_name || "Akarsha Agarwal",
      location_name: "Jaipur, Rajasthan",
      role: "farmer",
    },
  });
}
