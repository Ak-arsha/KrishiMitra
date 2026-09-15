import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    farmer: {
      id: "u101",
      full_name: "Akarsha Agarwal",
      email: "akarshaagarwal25@gmail.com",
      location_name: "Jaipur, Rajasthan",
      latitude: 26.9124,
      longitude: 75.7873,
      role: "FARMER",
    },
    timestamp: new Date().toISOString(),
  });
}
