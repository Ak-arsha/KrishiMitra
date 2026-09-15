import { NextRequest, NextResponse } from "next/server";

// Registered user emails in memory store for session
const EXISTING_EMAILS = new Set([
  "farmer@example.com",
  "akarshaagarwal25@gmail.com",
  "farmer.krishimitra@gmail.com",
  "demo@example.com",
  "farmer.google@gmail.com",
]);

export async function POST(req: NextRequest) {
  let body: any = {};
  try {
    body = await req.json();
  } catch (e) {}

  const email = (body.email || "").toLowerCase().trim();

  // Check if account already exists
  if (EXISTING_EMAILS.has(email)) {
    return NextResponse.json(
      { detail: "Account already exists with this email address. Please sign in instead." },
      { status: 400 }
    );
  }

  // Add new email to set
  if (email) {
    EXISTING_EMAILS.add(email);
  }

  return NextResponse.json({
    access_token: `km-jwt-${Date.now()}`,
    token_type: "bearer",
    user: {
      id: `u-${Date.now()}`,
      email: body.email || "partner@krishimitra.org",
      full_name: body.full_name || "New Agri Partner",
      location_name: body.location_name || "Jaipur, Rajasthan",
      role: body.role || "farmer",
      latitude: body.latitude || 26.9124,
      longitude: body.longitude || 75.7873,
    },
  });
}
