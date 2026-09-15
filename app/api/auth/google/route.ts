import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {}

  return NextResponse.json({
    access_token: "km-google-oauth-token-2026",
    token_type: "bearer",
    user: {
      id: "u103",
      email: body.email || "akarshaagarwal25@gmail.com",
      full_name: body.full_name || "Akarsha Agarwal",
      location_name: "Jaipur, Rajasthan",
      role: "farmer",
    },
  });
}
