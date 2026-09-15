import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {}

  const email = (body.email || "farmer@krishimitra.org").toLowerCase().trim();

  // Dynamically determine role based on email keyword or requested role
  let role = "farmer";
  if (email.includes("buyer")) role = "buyer";
  else if (email.includes("investor")) role = "investor";
  else if (email.includes("trader")) role = "trader";
  else if (body.role) role = body.role;

  const fullName = body.full_name || (email.split("@")[0] ? email.split("@")[0].toUpperCase() : "Akarsha Agarwal");

  return NextResponse.json({
    access_token: `km-jwt-token-${Date.now()}`,
    token_type: "bearer",
    user: {
      id: `u-${Date.now()}`,
      email,
      full_name: fullName,
      location_name: body.location_name || "Jaipur, Rajasthan",
      role,
    },
  });
}
