import { NextRequest, NextResponse } from "next/server";

const COMMON_CROPS = [
  "Wheat",
  "Rice",
  "Mustard",
  "Cotton",
  "Potato",
  "Onion",
  "Tomato",
  "Maize",
  "Sugarcane",
  "Chana",
  "Soybean",
  "Turmeric",
  "Chilli",
  "Groundnut",
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = (searchParams.get("query") || "").toLowerCase();
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const filtered = query
    ? COMMON_CROPS.filter((c) => c.toLowerCase().includes(query)).slice(0, limit)
    : COMMON_CROPS.slice(0, limit);

  return NextResponse.json({
    query,
    suggestions: filtered,
    total: filtered.length,
  });
}
