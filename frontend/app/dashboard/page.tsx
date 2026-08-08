"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  TrendingUp,
  MapPin,
  Leaf,
  Calendar,
  Users,
  Newspaper,
  Brain,
  Mic,
  Warehouse,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Sun,
  CloudRain,
  Thermometer,
  Wind,
  CheckCircle2,
} from "lucide-react";
import CropInput from "@/components/CropInput";
import MarketPrices from "@/components/MarketPrices";
import PriceForecast from "@/components/PriceForecast";
import SellRecommendation from "@/components/SellRecommendation";
import { useAuth } from "@/app/context/AuthContext";

const AI_MODULES = [
  {
    href: "/sell-advisor",
    title: "कब बेचें? (AI Sell Advisor)",
    description: "XGBoost एआई द्वारा फसल बेचने की सही सलाह व भाव भविष्यवाणी।",
    icon: TrendingUp,
    color: "from-emerald-500 via-green-600 to-teal-700",
    badge: "🟢 Recommended Action",
  },
  {
    href: "/buyer-recommendations",
    title: "खरीदार खोजें (Buyer Matches)",
    description: "पास के सत्यापित मंडी व्यापारियों व खरीदारों से सीधे संपर्क करें।",
    icon: Users,
    color: "from-blue-500 via-indigo-600 to-slate-700",
    badge: "🤝 Direct Mandi Traders",
  },
  {
    href: "/market-intelligence",
    title: "मंडी भाव (Market Feed)",
    description: "ताजा मंडी रेट, उतार-चढ़ाव सूचकांक व समाचार सार।",
    icon: Newspaper,
    color: "from-amber-500 via-orange-600 to-red-600",
    badge: "📈 Real-Time Rates",
  },
  {
    href: "/explainable-ai",
    title: "कारण जानें (AI Transparency)",
    description: "जानें कि मौसम, MSP और मांग का भाव पर क्या असर पड़ रहा है।",
    icon: Brain,
    color: "from-purple-500 via-indigo-600 to-pink-600",
    badge: "🧠 XAI Insights",
  },
  {
    href: "/voice-assistant",
    title: "आवाज़ से पूछें (Voice Assistant)",
    description: "हिंदी या अंग्रेजी में बोलकर मंडी भाव व खेती की जानकारी पाएं।",
    icon: Mic,
    color: "from-purple-600 via-violet-700 to-indigo-800",
    badge: "🎙️ Gemini Voice",
  },
  {
    href: "/storage-advisor",
    title: "फसल भंडारण (Storage ROI)",
    description: "फसल तुरंत बेचें या स्टोर करें — कोल्ड स्टोरेज का लाभ मापें।",
    icon: Warehouse,
    color: "from-teal-600 via-emerald-700 to-green-800",
    badge: "🏬 Net Gain Calculator",
  },
];

export default function FarmerDashboard() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [selectedCrop, setSelectedCrop] = useState<string>("Wheat");
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="text-emerald-800 font-bold text-sm">नमस्ते! आपका किसान डैशबोर्ड लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-green-900 to-teal-950 rounded-3xl p-8 text-white shadow-2xl shadow-emerald-950/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 flex items-center justify-end pr-8 pointer-events-none">
          <Leaf className="w-80 h-80 text-emerald-400" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-400/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 border border-emerald-400/30 text-emerald-300">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>एआई किसान मित्र सक्रिय है / AI Advisory Active</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
            नमस्ते, {user?.full_name || "Kisan Brother"}! 🌾
          </h1>

          <p className="text-emerald-100 text-base sm:text-lg mb-6 leading-relaxed">
            आपका एआई कृषि सलाहकार मंच — अपनी फसल का सही मंडी भाव जानें, सीधे व्यापारियों से जुड़ें, और अपनी उपज का अधिकतम मूल्य पाएं।
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-bold">
            <div className="flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/15 text-emerald-200">
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>स्थान / Location: {user?.location_name || "Rajasthan, India"}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm border border-white/15 text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>भूमिका / Role: {user?.role ? user.role.toUpperCase() : "FARMER"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weather & Mandi Quick Info Bar */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-emerald-100 shadow-md bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-3 bg-amber-500 text-white rounded-xl shadow">
            <Sun className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800">आज का मौसम / Weather</p>
            <p className="text-base font-black text-gray-900">32°C (धूप / Sunny)</p>
            <p className="text-[10px] text-gray-600 font-semibold">कटाई के लिए अनुकूल समय</p>
          </div>
        </Card>

        <Card className="border border-emerald-100 shadow-md bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow">
            <Thermometer className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-800">नमी / Soil Moisture</p>
            <p className="text-base font-black text-gray-900">14% Optimal</p>
            <p className="text-[10px] text-gray-600 font-semibold">भंडारण योग्य गुणवत्ता</p>
          </div>
        </Card>

        <Card className="border border-emerald-100 shadow-md bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-3 bg-emerald-600 text-white rounded-xl shadow">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">गेहूँ MSP (Wheat MSP)</p>
            <p className="text-base font-black text-gray-900">₹2,275 / क्विंटल</p>
            <p className="text-[10px] text-emerald-700 font-semibold">सरकारी समर्थन मूल्य</p>
          </div>
        </Card>

        <Card className="border border-emerald-100 shadow-md bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-3 bg-purple-600 text-white rounded-xl shadow">
            <Mic className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-purple-800">आवाज़ से पूछें / Voice AI</p>
            <Link href="/voice-assistant" className="text-xs font-black text-purple-900 underline">
              यहाँ क्लिक करें →
            </Link>
            <p className="text-[10px] text-gray-600 font-semibold">हिंदी / English</p>
          </div>
        </Card>
      </div>

      {/* Feature Modules Quick Action Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>एआई सलाह मॉड्यूल / AI Decision Engines</span>
          </h2>
          <span className="text-xs text-gray-500 font-bold">आगे बढ़ने के लिए चुनें</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AI_MODULES.map((m) => {
            const IconComponent = m.icon;
            return (
              <Link key={m.href} href={m.href} className="group">
                <Card className="h-full border border-emerald-100/80 hover:border-emerald-500/80 hover:shadow-xl transition duration-200 cursor-pointer overflow-hidden rounded-2xl bg-white flex flex-col justify-between">
                  <CardHeader className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-2xl bg-gradient-to-tr ${m.color} text-white shadow-md group-hover:scale-105 transition`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {m.badge}
                      </span>
                    </div>
                    <CardTitle className="text-base font-black text-gray-900 group-hover:text-emerald-700 transition flex items-center justify-between">
                      <span>{m.title}</span>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 group-hover:text-emerald-600 transition" />
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-600 font-medium mt-1.5 leading-relaxed">
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
          <Card className="border border-emerald-100 shadow-xl rounded-2xl overflow-hidden bg-white">
            <CardHeader className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5">
              <CardTitle className="flex items-center gap-2 text-lg font-bold">
                <Leaf className="h-5 w-5 text-emerald-300" />
                अपनी फसल चुनें (Select Crop)
              </CardTitle>
              <CardDescription className="text-emerald-100 text-xs font-medium">
                लाइव मंडी भाव व भविष्यवाणी देखने के लिए फसल चुनें
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <CropInput onCropSelected={handleCropSelected} />
            </CardContent>
          </Card>

          {selectedCrop && (
            <Card className="border border-amber-200 shadow-xl border-l-4 border-l-amber-500 rounded-2xl overflow-hidden bg-white">
              <CardHeader className="bg-amber-50/80 p-4 border-b border-amber-100">
                <CardTitle className="flex items-center gap-2 text-amber-900 text-base font-bold">
                  <TrendingUp className="h-5 w-5 text-amber-600" />
                  {selectedCrop} बेचने की सलाह (Recommendation)
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
          <Card className="border border-blue-100 shadow-xl rounded-2xl overflow-hidden bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <span>📊 क्षेत्रीय मंडी भाव (Live Regional Mandi Prices)</span>
              </CardTitle>
              <CardDescription className="text-blue-100 text-xs font-medium">
                {user?.location_name || "आपकी मंडी"} की ताजा दैनिक दरें
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <MarketPrices location={user?.location_name} />
            </CardContent>
          </Card>

          {selectedCrop && (
            <Card className="border border-purple-100 shadow-xl rounded-2xl overflow-hidden bg-white">
              <CardHeader className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white p-5">
                <CardTitle className="flex items-center gap-2 text-lg font-bold">
                  <Calendar className="h-5 w-5 text-purple-300" />
                  5-दिवसीय भाव भविष्यवाणी: {selectedCrop}
                </CardTitle>
                <CardDescription className="text-purple-100 text-xs font-medium">
                  आगामी 5 दिनों में मंडी भाव का संभावित रुझान
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
