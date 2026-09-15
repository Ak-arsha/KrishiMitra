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
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Building2,
  ChevronRight,
  Users,
  LineChart,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { user, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"farmers" | "buyers" | "investors">("farmers");
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

  // Logged-in Overview
  if (user) {
    return (
      <div className="space-y-8 py-4 font-sans">
        {/* Hero Banner for Logged-In User */}
        <div className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-12 overflow-hidden border border-slate-800 shadow-2xl">
          <div className="absolute inset-0 z-0 opacity-25 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-emerald-950/80 z-0 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 rounded-full text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Welcome to KrishiMitra Platform
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Welcome back, {user.full_name}
            </h1>
            <p className="mt-2 text-slate-300 text-sm sm:text-base font-medium">
              Access your personalized AI farm advisory, procurement RFQs, and investor market analytics.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/sell-advisor"
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs px-5 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <span>Check Sell Advisor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/buyer-portal"
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-3 rounded-xl border border-slate-700 transition flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                <span>Buyer Procurement</span>
              </Link>
              <Link
                href="/investor-analytics"
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-3 rounded-xl border border-slate-700 transition flex items-center gap-2"
              >
                <PieChart className="w-4 h-4 text-teal-400" />
                <span>Investor Analytics</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Public Landing Page (No Login Required)
  return (
    <div className="space-y-16 py-4 font-sans">
      {/* Agriculture Photo Background Hero Banner */}
      <section className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-14 overflow-hidden border border-slate-800 shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-emerald-950/80 z-0 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 rounded-full text-emerald-300 text-xs font-black uppercase tracking-wider mb-6 border border-emerald-400/30">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Multi-Role Agricultural & Mandi Intelligence
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Agricultural Intelligence for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Farmers, Buyers & Investors</span>
          </h1>

          <p className="mt-4 text-slate-300 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
            Real-time APMC Mandi forecasts, direct bulk procurement RFQs, investor crop yield models, and Gemini AI voice speech synthesis across India.
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

      {/* Interactive Role Switcher Tabs */}
      <section className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <span className="text-xs font-black uppercase text-emerald-700 tracking-wider">Customized Ecosystem</span>
            <h2 className="text-2xl font-black text-gray-900">Tailored Solutions for Every Stakeholder</h2>
          </div>

          <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
            {[
              { key: "farmers", label: "For Farmers", icon: Leaf },
              { key: "buyers", label: "For Buyers", icon: ShoppingBag },
              { key: "investors", label: "For Investors", icon: PieChart },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
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

        {/* Tab Content Display */}
        {activeTab === "farmers" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
            <div className="p-6 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
              <div className="p-3 bg-emerald-600 text-white rounded-xl w-fit">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">AI Sell Advisor</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                XGBoost and LightGBM models forecast crop prices for the next 5 days to advise whether to sell immediately or hold.
              </p>
            </div>

            <div className="p-6 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
              <div className="p-3 bg-emerald-600 text-white rounded-xl w-fit">
                <Warehouse size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Storage vs Sell Calculator</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Calculate warehouse rental costs against projected market price increases to maximize harvest returns.
              </p>
            </div>

            <div className="p-6 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-3">
              <div className="p-3 bg-emerald-600 text-white rounded-xl w-fit">
                <Mic size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Voice Kisan Assistant</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Ask farming and mandi questions using voice in Hindi, English, and regional languages with Gemini AI speech synthesis.
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
                Post bulk buying orders directly to verified local farmer co-ops with desired tonnage and quality specs.
              </p>
              <Link href="/buyer-portal" className="text-xs font-bold text-emerald-700 block pt-1 hover:underline">
                Explore Buyer Portal →
              </Link>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="p-3 bg-slate-900 text-white rounded-xl w-fit">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Certified Quality Grading</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Filter inventory by moisture percentage, grain size, organic certification, and harvest dates.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="p-3 bg-slate-900 text-white rounded-xl w-fit">
                <Building2 size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Freight Cost Estimation</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Automated freight per-quintal transportation calculator from farmgate to your delivery depot.
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
              <h3 className="text-base font-bold text-gray-900">Commodity Yield ROI Calculator</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Simulate capital returns based on holding durations, seasonal Mandi price curves, and crop risk scores.
              </p>
              <Link href="/investor-analytics" className="text-xs font-bold text-emerald-700 block pt-1 hover:underline">
                Explore Investor Analytics →
              </Link>
            </div>

            <div className="p-6 bg-teal-50/60 rounded-2xl border border-teal-200 space-y-3">
              <div className="p-3 bg-teal-700 text-white rounded-xl w-fit">
                <LineChart size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Inter-Mandi Arbitrage Radar</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Identify price spreads between neighboring APMC Mandis adjusted for transport logistics costs.
              </p>
            </div>

            <div className="p-6 bg-teal-50/60 rounded-2xl border border-teal-200 space-y-3">
              <div className="p-3 bg-teal-700 text-white rounded-xl w-fit">
                <Zap size={20} />
              </div>
              <h3 className="text-base font-bold text-gray-900">Volatility Risk Scoring</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                Quantitative risk assessment for major oilseeds, cereals, and horticulture commodities.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Public Live Mandi Rates Preview Widget */}
      <section className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-black uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 text-amber-500" /> Live Mandi Rate Intelligence
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
            <span className="text-xs font-bold text-gray-500 uppercase">AI Recommendation</span>
            <div className="text-base font-black text-gray-900 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              {currentCropData.advice}
            </div>
            <span className="inline-block mt-2 text-[10px] font-extrabold bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full">
              XGBoost Model
            </span>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase">Full Platform</span>
              <p className="text-xs mt-1 font-semibold text-slate-300">
                Sign in to view full 5-day charts, buyer procurement & voice chatbot.
              </p>
            </div>
            <Link
              href="/login"
              className="mt-3 text-center bg-emerald-400 text-slate-950 hover:bg-emerald-300 text-xs font-black py-2 rounded-xl transition shadow"
            >
              Sign In to Access →
            </Link>
          </div>
        </div>
      </section>

      {/* Agricultural Photography Banner */}
      <section className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-12 overflow-hidden border border-slate-800 shadow-xl text-center space-y-4">
        <div className="absolute inset-0 z-0 opacity-25 bg-[url('https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-emerald-950/80 z-0 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-black">Ready to get started with KrishiMitra?</h2>
          <p className="text-slate-300 text-sm font-medium">
            Join thousands of farmers, grain procurement merchants, and agri-investors using AI-powered agricultural intelligence.
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
