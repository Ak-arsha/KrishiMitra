"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import {
  Leaf,
  TrendingUp,
  ShoppingBag,
  PieChart,
  Newspaper,
  Brain,
  Mic,
  Warehouse,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Building2,
  ChevronRight,
  LineChart,
} from "lucide-react";

export default function Home() {
  const { user, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"farmers" | "buyers" | "investors" | "traders">("farmers");
  const [selectedCrop, setSelectedCrop] = useState("Wheat");

  const LIVE_CROPS = [
    { crop: "Wheat", price: 2450, change: "+₹45", trend: "up", msp: 2275, advice: "HOLD (Price rising)" },
    { crop: "Paddy", price: 2183, change: "MSP", trend: "stable", msp: 2183, advice: "SELL AT MSP" },
    { crop: "Mustard", price: 5720, change: "+₹80", trend: "up", msp: 5650, advice: "SELL NOW (Peak)" },
    { crop: "Soybean", price: 4650, change: "-₹30", trend: "down", msp: 4600, advice: "HOLD FOR 3 DAYS" },
    { crop: "Tomato", price: 3400, change: "+₹150", trend: "up", msp: 2800, advice: "SELL IMMEDIATELY" },
  ];

  const currentCropData = LIVE_CROPS.find((c) => c.crop === selectedCrop) || LIVE_CROPS[0];

  const handleGuestDemoAccess = async () => {
    try {
      await loginWithGoogle("demo.kisan@krishimitra.org", "Demo Kisan User");
      router.push("/dashboard");
    } catch {
      router.push("/login");
    }
  };

  if (user) {
    return (
      <div className="space-y-8 py-4 font-sans">
        <div className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-12 overflow-hidden border border-slate-800 shadow-2xl">
          <div className="absolute inset-0 z-0 opacity-25 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-emerald-950/80 z-0 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 rounded-full text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Welcome to KrishiMitra
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Welcome back, {user.full_name}
            </h1>
            <p className="mt-2 text-slate-300 text-sm sm:text-base font-medium">
              Access your personalized workspace tailored for your role as {user.role ? user.role.toUpperCase() : "PARTNER"}.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs px-5 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <span>Go to Role Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 py-4 font-sans">
      {/* Agriculture Photo Background Hero */}
      <section className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-14 overflow-hidden border border-slate-800 shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-emerald-950/80 z-0 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 rounded-full text-emerald-300 text-xs font-black uppercase tracking-wider mb-6 border border-emerald-400/30">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Agricultural Intelligence Platform
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Agricultural Intelligence for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Farmers, Buyers, Traders & Investors</span>
          </h1>

          {/* Clean Production Copywriting (No technical ML jargon) */}
          <p className="mt-4 text-slate-300 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
            Empowering farmers, buyers, traders, and investors with real-time market prices, AI price recommendations, direct grain procurement, and instant voice assistance across India.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <Link
              href="/signup"
              className="bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 text-slate-950 font-black text-sm px-7 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 font-bold text-sm px-6 py-4 rounded-2xl transition hover:scale-105 active:scale-95 backdrop-blur-md"
            >
              <span>Sign In</span>
            </Link>

            <button
              type="button"
              onClick={handleGuestDemoAccess}
              className="text-xs text-emerald-400 hover:text-white underline underline-offset-4 font-bold px-2 py-2 transition"
            >
              Instant 1-Click Guest Demo
            </button>
          </div>
        </div>
      </section>

      {/* Role Switcher Overview Tabs */}
      <section className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <span className="text-xs font-black uppercase text-emerald-700 tracking-wider">Customized Workspaces</span>
            <h2 className="text-2xl font-black text-gray-900">Dedicated Tools for Every Role</h2>
          </div>

          <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200 overflow-x-auto">
            {[
              { key: "farmers", label: "Farmers", icon: Leaf },
              { key: "buyers", label: "Buyers", icon: ShoppingBag },
              { key: "investors", label: "Investors", icon: PieChart },
              { key: "traders", label: "Traders", icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-slate-900 text-white shadow"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon size={14} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTab === "farmers" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="p-6 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
              <div className="p-3 bg-emerald-600 text-white rounded-xl w-fit">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">AI Sell Advisor</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Predict crop price trends for the next 5 days to decide whether to sell immediately or hold.
              </p>
            </div>

            <div className="p-6 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
              <div className="p-3 bg-emerald-600 text-white rounded-xl w-fit">
                <Warehouse size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Storage Calculator</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Compare warehousing costs against expected market price gains to maximize net harvest profit.
              </p>
            </div>

            <div className="p-6 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
              <div className="p-3 bg-emerald-600 text-white rounded-xl w-fit">
                <Mic size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Voice Assistant</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Ask farming and mandi questions using voice in Hindi, English, and regional languages.
              </p>
            </div>
          </div>
        )}

        {activeTab === "buyers" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="p-3 bg-slate-900 text-white rounded-xl w-fit">
                <ShoppingBag size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Bulk RFQ Broadcast</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Post procurement orders directly to local farmer co-ops with desired tonnage and quality specs.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="p-3 bg-slate-900 text-white rounded-xl w-fit">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Certified Quality Grading</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Filter farmer stock by moisture percentage, grain size, and harvest date.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="p-3 bg-slate-900 text-white rounded-xl w-fit">
                <Building2 size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Freight Estimator</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Automated freight per-quintal transportation calculator from farmgate to delivery depot.
              </p>
            </div>
          </div>
        )}

        {activeTab === "investors" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="p-6 bg-teal-50/60 rounded-2xl border border-teal-200 space-y-3">
              <div className="p-3 bg-teal-700 text-white rounded-xl w-fit">
                <PieChart size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Commodity Yield Calculator</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Simulate capital returns based on holding durations and Mandi price growth curves.
              </p>
            </div>

            <div className="p-6 bg-teal-50/60 rounded-2xl border border-teal-200 space-y-3">
              <div className="p-3 bg-teal-700 text-white rounded-xl w-fit">
                <LineChart size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Inter-Mandi Arbitrage</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Identify price spreads between neighboring Mandis adjusted for transport logistics.
              </p>
            </div>

            <div className="p-6 bg-teal-50/60 rounded-2xl border border-teal-200 space-y-3">
              <div className="p-3 bg-teal-700 text-white rounded-xl w-fit">
                <Zap size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Volatility Risk Scoring</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Quantitative risk assessment for major oilseeds, cereals, and horticulture crops.
              </p>
            </div>
          </div>
        )}

        {activeTab === "traders" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
              <div className="p-3 bg-slate-900 text-white rounded-xl w-fit">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Arbitrage Radar</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Real-time regional Mandi spread calculations for maximum margin trade routes.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
              <div className="p-3 bg-slate-900 text-white rounded-xl w-fit">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Spot Rate Feed</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Live updates across 15+ major commodities from regional Mandi hubs.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
              <div className="p-3 bg-slate-900 text-white rounded-xl w-fit">
                <Building2 size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Logistics Routing</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Distance & transport rate estimates for inter-state grain transit.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Public Live Rates Widget */}
      <section className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-black uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 text-amber-500" /> Live Mandi Rates
            </div>
            <h2 className="text-2xl font-black text-gray-900">Today's Mandi Rates & Model Advice</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {LIVE_CROPS.map((c) => (
              <button
                key={c.crop}
                onClick={() => setSelectedCrop(c.crop)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedCrop === c.crop
                    ? "bg-slate-900 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c.crop}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
            <span className="text-xs font-bold text-gray-500 uppercase">Crop</span>
            <div className="text-2xl font-black text-gray-900 mt-1">{currentCropData.crop}</div>
            <span className="inline-block mt-2 text-[10px] font-extrabold bg-gray-200 text-gray-800 px-2.5 py-0.5 rounded-full">
              MSP: ₹{currentCropData.msp}/qtl
            </span>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
            <span className="text-xs font-bold text-gray-500 uppercase">Current Rate</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">₹{currentCropData.price} <span className="text-xs text-gray-500 font-normal">/ qtl</span></div>
            <span className="inline-block mt-2 text-[10px] font-extrabold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full">
              Change: {currentCropData.change}
            </span>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
            <span className="text-xs font-bold text-gray-500 uppercase">Recommendation</span>
            <div className="text-base font-black text-gray-900 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              {currentCropData.advice}
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase">Role-Based Access</span>
              <p className="text-xs mt-1 font-semibold text-slate-300">
                Sign in to access your customized role tools.
              </p>
            </div>
            <Link
              href="/login"
              className="mt-3 text-center bg-emerald-400 text-slate-950 hover:bg-emerald-300 text-xs font-black py-2 rounded-xl transition shadow"
            >
              Sign In →
            </Link>
          </div>
        </div>
      </section>

      {/* Photography CTA */}
      <section className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-12 overflow-hidden border border-slate-800 shadow-xl text-center space-y-4">
        <div className="absolute inset-0 z-0 opacity-25 bg-[url('https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-emerald-950/80 z-0 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-black">Get Started with KrishiMitra</h2>
          <p className="text-slate-300 text-sm font-medium">
            Join thousands of farmers, buyers, traders, and investors using agricultural market intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/login"
              className="bg-emerald-400 text-slate-950 hover:bg-emerald-300 font-black text-sm px-8 py-3.5 rounded-2xl shadow transition"
            >
              Sign In Now
            </Link>
            <Link
              href="/signup"
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-sm px-8 py-3.5 rounded-2xl shadow transition"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
