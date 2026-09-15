import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CROPS = [
  "Wheat", "Rice", "Cotton", "Soybean", "Maize",
  "Mustard", "Sugarcane", "Onion", "Potato", "Tomato",
];

export const MARKETS: Record<string, string> = {
  Jaipur: "Rajasthan", Kota: "Rajasthan", Indore: "Madhya Pradesh",
  Bhopal: "Madhya Pradesh", Ludhiana: "Punjab", Amritsar: "Punjab",
  Lucknow: "Uttar Pradesh", Kanpur: "Uttar Pradesh", Nashik: "Maharashtra",
  Pune: "Maharashtra",
};
