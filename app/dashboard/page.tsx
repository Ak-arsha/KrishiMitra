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
  Thermometer,
  ShoppingBag,
  PieChart,
  PlusCircle,
  Truck,
  PhoneCall,
  CheckCircle2,
  Calculator,
  ArrowUpRight,
  BarChart3,
  Layers,
  Send,
  Loader2,
  Bot,
  User,
  Volume2,
} from "lucide-react";
import CropInput from "@/components/CropInput";
import MarketPrices from "@/components/MarketPrices";
import PriceForecast from "@/components/PriceForecast";
import SellRecommendation from "@/components/SellRecommendation";
import { useAuth } from "@/app/context/AuthContext";
import { askVoiceAssistant } from "@/lib/api";

export default function RoleIsolatedDashboard() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [selectedCrop, setSelectedCrop] = useState<string>("Wheat");
  const [loading, setLoading] = useState(true);

  // Embedded Voice Chatbot State for All Roles
  const [chatQuery, setChatQuery] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    {
      role: "assistant",
      text: "Namaste! I am your AI KrishiMitra Assistant. How can I help you with prices, procurement, or market intelligence today?",
    },
  ]);

  // Buyer State
  const [buyerCropFilter, setBuyerCropFilter] = useState("All");
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [rfqForm, setRfqForm] = useState({
    crop: "Wheat",
    quantityTons: 50,
    maxPricePerQtl: 2500,
    deliveryLocation: "Jaipur Mandi Hub",
  });

  // Investor & Trader State
  const [investmentAmount, setInvestmentAmount] = useState(500000);
  const [investorCrop, setInvestorCrop] = useState("Mustard");
  const [holdingMonths, setHoldingMonths] = useState(3);

  const FARMER_INVENTORY = [
    {
      id: "INV-101",
      farmerName: "Rajeshwar Singh",
      location: "Bharatpur, Rajasthan",
      distanceKm: 42,
      crop: "Wheat",
      variety: "Sharbati Premium",
      grade: "Grade A+",
      quantityQuintals: 240,
      askingPrice: 2480,
      harvestDate: "Sep 2026",
      moistureContent: "11.5%",
      certifiedOrganic: true,
      phone: "+91 98290 12345",
    },
    {
      id: "INV-102",
      farmerName: "Vikram Patel",
      location: "Kota, Rajasthan",
      distanceKm: 110,
      crop: "Soybean",
      variety: "JS 335",
      grade: "Standard",
      quantityQuintals: 450,
      askingPrice: 4620,
      harvestDate: "Aug 2026",
      moistureContent: "10.2%",
      certifiedOrganic: false,
      phone: "+91 94140 67890",
    },
    {
      id: "INV-103",
      farmerName: "Gurpreet Dhillon",
      location: "Hanumangarh, Rajasthan",
      distanceKm: 185,
      crop: "Mustard",
      variety: "Pusa Bold",
      grade: "Grade A+",
      quantityQuintals: 320,
      askingPrice: 5750,
      harvestDate: "Sep 2026",
      moistureContent: "8.0%",
      certifiedOrganic: true,
      phone: "+91 98765 43210",
    },
  ];

  const CROP_MODELS: Record<string, { expectedRoiPct: number; riskLevel: string }> = {
    Mustard: { expectedRoiPct: 14.8, riskLevel: "Moderate Risk" },
    Wheat: { expectedRoiPct: 8.5, riskLevel: "Low / Stable" },
    Soybean: { expectedRoiPct: 18.2, riskLevel: "High Volatility" },
    Paddy: { expectedRoiPct: 7.2, riskLevel: "MSP Protected" },
    Tomato: { expectedRoiPct: 24.5, riskLevel: "High Return / Risk" },
  };

  const selectedModel = CROP_MODELS[investorCrop] || CROP_MODELS["Mustard"];
  const projectedReturn = Math.round(investmentAmount * (1 + (selectedModel.expectedRoiPct / 100) * (holdingMonths / 12)));
  const projectedProfit = projectedReturn - investmentAmount;

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      setLoading(false);
    }
  }, [user, authLoading, router]);

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSubmitted(true);
    setTimeout(() => setRfqSubmitted(false), 4000);
  };

  const handleSendChat = async (text?: string) => {
    const queryToSend = text || chatQuery;
    if (!queryToSend.trim()) return;

    setChatMessages((prev) => [...prev, { role: "user", text: queryToSend }]);
    setChatQuery("");
    setChatLoading(true);

    try {
      const res = await askVoiceAssistant({
        query: `${user?.role || "user"} inquiry: ${queryToSend}`,
        crop: selectedCrop,
        market: user?.location_name || "Jaipur",
        state: "Rajasthan",
      });
      setChatMessages((prev) => [...prev, { role: "assistant", text: res.data.answer }]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", text: "I'm having trouble processing that right now. Please try again." },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="text-slate-900 font-bold text-sm">Loading Your Customized Dashboard...</p>
        </div>
      </div>
    );
  }

  const userRole = (user?.role || "farmer").toLowerCase();

  return (
    <div className="space-y-8 animate-fade-in pb-12 font-sans">
      {/* Role-Specific Hero Header */}
      <div className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-10 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-emerald-950/80 z-0 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 border border-emerald-400/30 text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Dedicated Workspace: {userRole.toUpperCase()} PORTAL</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
            Welcome back, {user?.full_name || "Partner"}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed font-medium">
            {userRole === "farmer" && "Your personalized farm advisory workspace — get real-time price recommendations, 5-day market forecasts, and storage timing."}
            {userRole === "buyer" && "Your grain procurement portal — source verified crops directly from local growers and post bulk procurement orders."}
            {userRole === "investor" && "Your agricultural investment dashboard — analyze commodity yield ROI, price volatility, and seasonal growth curves."}
            {userRole === "trader" && "Your Mandi trading desk — track inter-mandi price arbitrage spreads, logistics freight, and real-time market rates."}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Location: {user?.location_name || "Rajasthan, India"}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Stipulated Role: {userRole.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* STRICT ROLE ISOLATION DISPLAY */}

      {/* 1. FARMER ROLE DASHBOARD */}
      {userRole === "farmer" && (
        <div className="space-y-8 animate-fade-in">
          {/* Quick Weather & Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border border-gray-200 shadow-sm bg-white rounded-2xl p-4 flex items-center gap-3">
              <div className="p-3 bg-amber-500 text-white rounded-xl shadow">
                <Sun className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase text-gray-500">Weather Forecast</p>
                <p className="text-base font-black text-gray-900">32°C (Sunny)</p>
                <p className="text-[10px] text-gray-500 font-semibold">Favorable harvest weather</p>
              </div>
            </Card>

            <Card className="border border-gray-200 shadow-sm bg-white rounded-2xl p-4 flex items-center gap-3">
              <div className="p-3 bg-blue-600 text-white rounded-xl shadow">
                <Thermometer className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase text-gray-500">Soil Moisture</p>
                <p className="text-base font-black text-gray-900">14% Optimal</p>
                <p className="text-[10px] text-gray-500 font-semibold">Optimal for storage</p>
              </div>
            </Card>

            <Card className="border border-gray-200 shadow-sm bg-white rounded-2xl p-4 flex items-center gap-3">
              <div className="p-3 bg-emerald-600 text-white rounded-xl shadow">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase text-gray-500">Wheat MSP Rate</p>
                <p className="text-base font-black text-gray-900">₹2,275 / qtl</p>
                <p className="text-[10px] text-emerald-700 font-semibold">Government Minimum Price</p>
              </div>
            </Card>

            <Card className="border border-gray-200 shadow-sm bg-white rounded-2xl p-4 flex items-center gap-3">
              <div className="p-3 bg-purple-600 text-white rounded-xl shadow">
                <Mic className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase text-gray-500">Voice Assistant</p>
                <Link href="/voice-assistant" className="text-xs font-black text-purple-700 underline">
                  Launch Assistant →
                </Link>
                <p className="text-[10px] text-gray-500 font-semibold">Speech in Hindi & English</p>
              </div>
            </Card>
          </div>

          {/* Farmer Advisory Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card className="border border-gray-200 shadow-lg rounded-2xl overflow-hidden bg-white">
                <CardHeader className="bg-slate-900 text-white p-5">
                  <CardTitle className="flex items-center gap-2 text-base font-bold">
                    <Leaf className="h-5 w-5 text-emerald-400" />
                    Select Your Crop
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <CropInput onCropSelected={(c) => setSelectedCrop(c)} />
                </CardContent>
              </Card>

              {selectedCrop && (
                <Card className="border border-amber-200 shadow-lg rounded-2xl overflow-hidden bg-white">
                  <CardHeader className="bg-amber-50 p-4 border-b border-amber-100">
                    <CardTitle className="flex items-center gap-2 text-amber-900 text-base font-bold">
                      <TrendingUp className="h-5 w-5 text-amber-600" />
                      {selectedCrop} Sell Recommendation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5">
                    <SellRecommendation crop={selectedCrop} />
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Card className="border border-gray-200 shadow-lg rounded-2xl overflow-hidden bg-white">
                <CardHeader className="bg-slate-900 text-white p-5">
                  <CardTitle className="text-base font-bold">Regional Mandi Prices</CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <MarketPrices location={user?.location_name} />
                </CardContent>
              </Card>

              {selectedCrop && (
                <Card className="border border-gray-200 shadow-lg rounded-2xl overflow-hidden bg-white">
                  <CardHeader className="bg-slate-900 text-white p-5">
                    <CardTitle className="flex items-center gap-2 text-base font-bold">
                      <Calendar className="h-5 w-5 text-purple-400" />
                      5-Day Price Forecast: {selectedCrop}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5">
                    <PriceForecast crop={selectedCrop} location={user?.location_name} />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. BUYER ROLE DASHBOARD */}
      {userRole === "buyer" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-gray-900">Farmer Harvest Inventory</h2>
                  <p className="text-xs text-gray-500 font-medium">Browse verified grower stock for procurement</p>
                </div>
                <div className="flex gap-2">
                  {["All", "Wheat", "Mustard", "Soybean"].map((crop) => (
                    <button
                      key={crop}
                      onClick={() => setBuyerCropFilter(crop)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                        buyerCropFilter === crop ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {FARMER_INVENTORY.filter(
                  (item) => buyerCropFilter === "All" || item.crop === buyerCropFilter
                ).map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-2xl p-5 border border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-md">
                          {item.crop} — {item.variety}
                        </span>
                        <span className="text-xs font-bold bg-gray-200 text-gray-800 px-2.5 py-0.5 rounded-md">
                          {item.grade}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-gray-900">{item.farmerName}</h3>
                      <p className="text-xs text-gray-500 font-medium">{item.location} ({item.distanceKm} km away)</p>
                      <div className="flex gap-4 text-xs text-gray-600">
                        <span>Quantity: <strong>{item.quantityQuintals} qtl</strong></span>
                        <span>Moisture: <strong>{item.moistureContent}</strong></span>
                      </div>
                    </div>

                    <div className="sm:text-right flex sm:flex-col justify-between items-end gap-2">
                      <div>
                        <span className="text-xs text-gray-500 block">Asking Price</span>
                        <span className="text-xl font-black text-emerald-700">₹{item.askingPrice} / qtl</span>
                      </div>
                      <a
                        href={`tel:${item.phone}`}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5"
                      >
                        <PhoneCall size={14} /> Contact Farmer
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                <PlusCircle size={16} /> Instant Bulk RFQ
              </div>
              <h2 className="text-xl font-black">Broadcast Procurement Order</h2>

              {rfqSubmitted && (
                <div className="bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2">
                  <CheckCircle2 size={16} /> Broadcasted to local farmers!
                </div>
              )}

              <form onSubmit={handleRfqSubmit} className="space-y-3 text-xs font-semibold">
                <div>
                  <label className="block text-slate-300 mb-1">Target Crop</label>
                  <select
                    value={rfqForm.crop}
                    onChange={(e) => setRfqForm({ ...rfqForm, crop: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5"
                  >
                    <option value="Wheat">Wheat</option>
                    <option value="Mustard">Mustard</option>
                    <option value="Soybean">Soybean</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Quantity (Tons)</label>
                  <input
                    type="number"
                    value={rfqForm.quantityTons}
                    onChange={(e) => setRfqForm({ ...rfqForm, quantityTons: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Max Buying Price (₹/qtl)</label>
                  <input
                    type="number"
                    value={rfqForm.maxPricePerQtl}
                    onChange={(e) => setRfqForm({ ...rfqForm, maxPricePerQtl: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black py-3 rounded-xl transition text-xs"
                >
                  Broadcast Order
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 3. INVESTOR ROLE DASHBOARD */}
      {userRole === "investor" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
              <Calculator size={16} /> Yield ROI Simulator
            </div>
            <h2 className="text-xl font-black">Commodity ROI Calculator</h2>

            <div className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-300 mb-1">Commodity</label>
                <select
                  value={investorCrop}
                  onChange={(e) => setInvestorCrop(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5"
                >
                  <option value="Mustard">Mustard</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Soybean">Soybean</option>
                  <option value="Tomato">Tomato</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Capital Deployment (₹)</label>
                <input
                  type="number"
                  step="50000"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Holding Duration: {holdingMonths} Month(s)</label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={holdingMonths}
                  onChange={(e) => setHoldingMonths(parseInt(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div className="p-4 bg-slate-800 rounded-2xl space-y-2 border border-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-400">Annual ROI:</span>
                  <span className="text-emerald-400 font-bold">+{selectedModel.expectedRoiPct}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Risk Level:</span>
                  <span className="text-amber-300 font-bold">{selectedModel.riskLevel}</span>
                </div>
                <div className="border-t border-slate-700 pt-2">
                  <span className="text-slate-400 block text-[10px]">Projected Total Value</span>
                  <span className="text-2xl font-black text-emerald-400">₹{projectedReturn.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <h2 className="text-xl font-black text-gray-900">Inter-Mandi Arbitrage Radar</h2>
              <div className="space-y-3">
                {[
                  { crop: "Mustard", buy: "Bharatpur Mandi (₹5,620)", sell: "Jaipur Mandi (₹5,780)", spread: "+₹160/qtl" },
                  { crop: "Wheat", buy: "Kota Mandi (₹2,390)", sell: "Delhi Grain Hub (₹2,560)", spread: "+₹170/qtl" },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-gray-900 text-sm">{item.crop}</span>
                      <p className="text-xs text-gray-500">Buy: {item.buy} → Sell: {item.sell}</p>
                    </div>
                    <span className="text-sm font-black text-emerald-700">{item.spread}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. TRADER ROLE DASHBOARD */}
      {userRole === "trader" && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-black text-gray-900">Real-Time Mandi Arbitrage Radar</h2>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">Live Feed</span>
              </div>

              <div className="space-y-3">
                {[
                  { crop: "Mustard", origin: "Bharatpur Mandi", price1: 5620, dest: "Jaipur Mandi", price2: 5780, spread: 160 },
                  { crop: "Wheat Sharbati", origin: "Kota Mandi", price1: 2390, dest: "Delhi Depot", price2: 2560, spread: 170 },
                  { crop: "Soybean", origin: "Ujjain Mandi", price1: 4550, dest: "Indore Depot", price2: 4720, spread: 170 },
                ].map((arb, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900 text-sm">{arb.crop}</span>
                      <span className="text-xs font-black bg-emerald-600 text-white px-2.5 py-0.5 rounded-md">
                        Spread: +₹{arb.spread}/qtl
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 font-medium">
                      <span>Origin: {arb.origin} (₹{arb.price1})</span>
                      <span>Target: {arb.dest} (₹{arb.price2})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trader Logistics & Rates */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                <Truck size={16} /> Freight Freight Logistics Estimator
              </div>
              <h2 className="text-xl font-black">Logistics Route Costs</h2>
              <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Jaipur to Bharatpur (180 km):</span>
                  <span className="font-bold text-emerald-400">₹65 / qtl</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kota to Delhi Hub (450 km):</span>
                  <span className="font-bold text-emerald-400">₹120 / qtl</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Est. Transport Time:</span>
                  <span className="font-bold text-white">12 - 24 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EMBEDDED VOICE CHATBOT FOR ALL ROLES */}
      <Card className="border border-purple-200 shadow-xl bg-white rounded-3xl overflow-hidden mt-8">
        <CardHeader className="bg-slate-900 text-white p-5 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="text-purple-400" size={20} />
            <CardTitle className="text-base font-bold">
              AI Voice & Text Assistant ({userRole.toUpperCase()} Assistant)
            </CardTitle>
          </div>
          <span className="text-xs font-bold bg-purple-900 text-purple-300 px-3 py-1 rounded-full border border-purple-700">
            Voice AI Enabled
          </span>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          <div className="max-h-60 overflow-y-auto space-y-3 p-2">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-purple-900 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0">
                    <Bot size={16} />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl text-xs max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-purple-600 text-white font-medium"
                      : "bg-gray-100 text-gray-900 font-medium"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}

            {chatLoading && (
              <div className="flex items-center gap-2 text-xs font-bold text-purple-700">
                <Loader2 size={16} className="animate-spin text-purple-600" />
                AI is generating response...
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
            <input
              type="text"
              value={chatQuery}
              onChange={(e) => setChatQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
              placeholder={`Ask a question as a ${userRole}...`}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <button
              onClick={() => handleSendChat()}
              disabled={chatLoading || !chatQuery.trim()}
              className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <Send size={14} /> Send
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
