"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  TrendingUp,
  MapPin,
  Leaf,
  AlertCircle,
  Calendar,
  Users,
  Newspaper,
  Brain,
  Mic,
  Warehouse,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import CropInput from "@/components/CropInput";
import MarketPrices from "@/components/MarketPrices";
import PriceForecast from "@/components/PriceForecast";
import SellRecommendation from "@/components/SellRecommendation";
import { getFarmerDashboard } from "@/lib/api";
import { useAuth } from "@/app/context/AuthContext";

const AI_MODULES = [
  {
    href: "/sell-advisor",
    title: "AI Sell Advisor",
    description: "Real-time price prediction & sell/hold recommendation powered by XGBoost.",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-600",
    badge: "ML Powered",
  },
  {
    href: "/buyer-recommendations",
    title: "Buyer Matches",
    description: "Geo-spatial buyer matching ranked by distance & pricing fit.",
    icon: Users,
    color: "from-blue-500 to-cyan-600",
    badge: "Haversine Geo",
  },
  {
    href: "/market-intelligence",
    title: "Market Feed",
    description: "Live volatility index, price trends, and regional mandi news.",
    icon: Newspaper,
    color: "from-indigo-500 to-purple-600",
    badge: "Live Feed",
  },
  {
    href: "/explainable-ai",
    title: "Explainable AI",
    description: "Transparent breakdown of top factors influencing market prices.",
    icon: Brain,
    color: "from-purple-500 to-pink-600",
    badge: "XAI Transparency",
  },
  {
    href: "/voice-assistant",
    title: "Voice Assistant",
    description: "Ask advisory questions out loud in regional languages using Gemini.",
    icon: Mic,
    color: "from-amber-500 to-orange-600",
    badge: "Gemini AI",
  },
  {
    href: "/storage-advisor",
    title: "Storage Advisor",
    description: "Calculate optimal storage period vs. immediate harvest sale.",
    icon: Warehouse,
    color: "from-teal-500 to-emerald-600",
    badge: "ROI Engine",
  },
];

export default function FarmerDashboard() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      setLoading(false);
    }
  }, [user, authLoading, router]);

  const handleCropSelected = (crop: string) => {
    setSelectedCrop(crop);
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="text-gray-600 font-medium text-sm">Loading your advisory dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-green-600 to-teal-700 rounded-3xl p-8 text-white shadow-xl shadow-green-900/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-end pr-8 pointer-events-none">
          <Leaf className="w-64 h-64" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Advisory Active & Connected</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Namaste, {user?.full_name || "Farmer"}! 🌾
          </h1>

          <p className="text-emerald-100 text-base sm:text-lg mb-6 leading-relaxed">
            Welcome to your intelligent agricultural control center. Predict crop market trends, find verified buyers, and optimize your harvest revenue.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold">
            <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/10">
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>Location: {user?.location_name || "India"}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Role: {user?.role ? user.role.toUpperCase() : "FARMER"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Modules Quick Action Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-green-600" />
            <span>AI Decision Engines</span>
          </h2>
          <span className="text-xs text-gray-500 font-medium">Select a tool to begin</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AI_MODULES.map((m) => {
            const IconComponent = m.icon;
            return (
              <Link key={m.href} href={m.href} className="group">
                <Card className="h-full border border-gray-200/80 hover:border-green-500/50 hover:shadow-lg transition duration-200 cursor-pointer overflow-hidden rounded-2xl bg-white">
                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-3 rounded-xl bg-gradient-to-tr ${m.color} text-white shadow-md group-hover:scale-105 transition`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 group-hover:bg-green-100 group-hover:text-green-800 transition">
                        {m.badge}
                      </span>
                    </div>
                    <CardTitle className="text-base font-bold text-gray-900 group-hover:text-green-700 transition flex items-center justify-between">
                      <span>{m.title}</span>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 group-hover:text-green-600 transition" />
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {m.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Crop Selector & Sell Advice */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-5">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Leaf className="h-5 w-5" />
                Select Your Crop
              </CardTitle>
              <CardDescription className="text-green-100 text-xs">
                Type or select a crop to unlock live forecasts & recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <CropInput onCropSelected={handleCropSelected} />
            </CardContent>
          </Card>

          {selectedCrop && (
            <Card className="border-0 shadow-lg border-l-4 border-l-amber-500 rounded-2xl overflow-hidden">
              <CardHeader className="bg-amber-50/80 p-4 border-b border-amber-100">
                <CardTitle className="flex items-center gap-2 text-amber-900 text-base">
                  <TrendingUp className="h-5 w-5 text-amber-600" />
                  Sell Recommendation for {selectedCrop}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <SellRecommendation crop={selectedCrop} />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Market Prices & Forecast */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-5">
              <CardTitle className="text-lg flex items-center gap-2">
                <span>📊 Live Regional Market Prices</span>
              </CardTitle>
              <CardDescription className="text-blue-100 text-xs">
                Real-time Agmarknet mandi rates updated daily for {user?.location_name || "your region"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <MarketPrices location={user?.location_name} />
            </CardContent>
          </Card>

          {selectedCrop && (
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-5">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  5-Day Price Forecast: {selectedCrop}
                </CardTitle>
                <CardDescription className="text-purple-100 text-xs">
                  Predicted market price trajectory for the next 5 days
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <PriceForecast crop={selectedCrop} location={user?.location_name} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
