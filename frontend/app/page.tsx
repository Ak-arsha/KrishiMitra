"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import {
  Leaf,
  TrendingUp,
  Users,
  Newspaper,
  Brain,
  Mic,
  Warehouse,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  BarChart3,
  Search,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { user, isLoading, loginWithGoogle } = useAuth();
  const router = useRouter();

  // Selected crop preview for live public widget
  const [selectedCrop, setSelectedCrop] = useState("Wheat");

  const LIVE_CROPS = [
    { crop: "Wheat", price: 2450, change: "+₹45", trend: "up", msp: 2275, advice: "HOLD (Price rising)" },
    { crop: "Paddy", price: 2183, change: "MSP", trend: "stable", msp: 2183, advice: "SELL AT MSP" },
    { crop: "Mustard", price: 5720, change: "+₹80", trend: "up", msp: 5650, advice: "SELL NOW (Peak)" },
    { crop: "Soybean", price: 4650, change: "-₹30", trend: "down", msp: 4600, advice: "HOLD FOR 3 DAYS" },
    { crop: "Tomato", price: 3400, change: "+₹150", trend: "up", msp: 2800, advice: "SELL IMMEDIATELY" },
  ];

  const currentCropData = LIVE_CROPS.find((c) => c.crop === selectedCrop) || LIVE_CROPS[0];

  const MODULES = [
    {
      href: "/sell-advisor",
      icon: TrendingUp,
      title: "AI Sell Advisor",
      description: "Get precise Sell / Wait / Hold recommendations backed by XGBoost & LightGBM machine learning models.",
      badge: "85%+ Accuracy",
    },
    {
      href: "/buyer-recommendations",
      icon: Users,
      title: "Buyer Match Engine",
      description: "Match with nearby verified grain merchants and buyers ranked by price fit and distance.",
      badge: "Direct Contact",
    },
    {
      href: "/market-intelligence",
      icon: Newspaper,
      title: "Market Feed & Volatility",
      description: "Track live APMC Mandi rates, historical price curves, and daily market stability indices.",
      badge: "Real-time Data",
    },
    {
      href: "/explainable-ai",
      icon: Brain,
      title: "Explainable AI Insights",
      description: "Understand the exact factors driving price shifts in simple, plain Hindi or English.",
      badge: "Transparent AI",
    },
    {
      href: "/voice-assistant",
      icon: Mic,
      title: "Voice Kisan Assistant",
      description: "Ask crop and market questions using voice in 8+ Indian regional languages, powered by Gemini.",
      badge: "Multilingual Voice",
    },
    {
      href: "/storage-advisor",
      icon: Warehouse,
      title: "Storage vs Sell Advisor",
      description: "Calculate warehousing costs vs price gain potential to decide whether to store your harvest.",
      badge: "Cost Profit Calculator",
    },
  ];

  const handleGuestDemoAccess = async () => {
    try {
      await loginWithGoogle("demo.kisan@krishimitra.org", "Demo Kisan User");
      router.push("/dashboard");
    } catch (e) {
      router.push("/login");
    }
  };

  // If user is logged in, render dashboard overview
  if (user) {
    return (
      <div className="space-y-8 py-4">
        {/* Logged in Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-green-950 text-white rounded-3xl p-8 border border-emerald-500/20 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" /> Welcome to KrishiMitra 🌾
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Namaste, {user.full_name}! 🙏
            </h1>
            <p className="mt-2 text-emerald-100/80 text-base font-medium">
              Your AI-powered farm advisory dashboard — get price forecasts, buyer matching, voice advisory, and mandi intelligence.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/sell-advisor"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <span>Check Sell Advisor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/voice-assistant"
                className="bg-purple-600/80 hover:bg-purple-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <Mic className="w-4 h-4" />
                <span>Voice Kisan Assistant</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Dashboard Modules */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m, i) => (
            <motion.div
              key={m.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Link href={m.href}>
                <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-200 h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition">
                        <m.icon className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-600 group-hover:bg-emerald-100 group-hover:text-emerald-800 px-2.5 py-1 rounded-full transition">
                        {m.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition">
                      {m.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-medium">
                      {m.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>Open Module</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // PUBLIC GUEST HOMEPAGE (Without Login / Pre-auth View)
  return (
    <div className="space-y-16 py-4 font-sans">
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 text-white p-8 sm:p-12 overflow-hidden border border-emerald-500/20 shadow-2xl">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-green-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 rounded-full text-emerald-300 text-xs font-extrabold uppercase tracking-wider mb-6 border border-emerald-400/30">
            <Sparkles className="w-4 h-4" /> AI-Powered Agricultural & Mandi Intelligence
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Know <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">When to Sell</span> & Maximize Crop Value 🌾
          </h1>

          <p className="mt-4 text-emerald-100/90 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
            KrishiMitra provides real-time Mandi price forecasts, buyer matching, voice advisory in Indian languages, and AI-driven storage decisions for farmers across India.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <Link
              href="/signup"
              className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-gray-950 font-black text-sm px-7 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/login"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm px-6 py-4 rounded-2xl transition hover:scale-105 active:scale-95 flex items-center gap-2 backdrop-blur-md"
            >
              <span>Sign In</span>
            </Link>

            <button
              type="button"
              onClick={handleGuestDemoAccess}
              className="text-xs text-emerald-300 hover:text-white underline underline-offset-4 font-bold px-2 py-2 transition"
            >
              ⚡ Instant 1-Click Guest Demo
            </button>
          </div>
        </div>
      </section>

      {/* Public Live Mandi Rates Preview Widget (No Login Required) */}
      <section className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-black uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 text-amber-500" /> Public Live Rate Preview
            </div>
            <h2 className="text-2xl font-black text-gray-900">Today's APMC Mandi Rates & AI Advice</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {LIVE_CROPS.map((c) => (
              <button
                key={c.crop}
                onClick={() => setSelectedCrop(c.crop)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedCrop === c.crop
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c.crop}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200/70">
            <span className="text-xs font-bold text-gray-500 uppercase">Selected Crop</span>
            <div className="text-2xl font-black text-gray-900 mt-1">{currentCropData.crop}</div>
            <span className="inline-block mt-2 text-[10px] font-extrabold bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full">
              MSP: ₹{currentCropData.msp}/qtl
            </span>
          </div>

          <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200/70">
            <span className="text-xs font-bold text-gray-500 uppercase">Current Mandi Rate</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">₹{currentCropData.price} <span className="text-xs text-gray-500 font-normal">/ qtl</span></div>
            <span className="inline-block mt-2 text-[10px] font-extrabold bg-green-200 text-green-900 px-2.5 py-0.5 rounded-full">
              Day Change: {currentCropData.change}
            </span>
          </div>

          <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200/70">
            <span className="text-xs font-bold text-gray-500 uppercase">AI Recommendation</span>
            <div className="text-base font-black text-emerald-950 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              {currentCropData.advice}
            </div>
            <span className="inline-block mt-2 text-[10px] font-extrabold bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full">
              XGBoost Model
            </span>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-200 uppercase">Full Intelligence</span>
              <p className="text-xs mt-1 font-semibold text-white/90">
                Sign in to view 5-day price graphs, buyer recommendations & voice assistant.
              </p>
            </div>
            <Link
              href="/login"
              className="mt-3 text-center bg-white text-emerald-900 hover:bg-emerald-100 text-xs font-bold py-2 rounded-xl transition shadow"
            >
              Unlock Full App →
            </Link>
          </div>
        </div>
      </section>

      {/* Core Platform Modules Overview */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">Features & Tools</span>
          <h2 className="text-3xl font-black text-gray-900">Complete AI Suite for Farmers & Traders</h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Everything you need to analyze crop trends, calculate storage gains, and connect directly with buyers.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m, i) => (
            <div
              key={m.title}
              className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3.5 bg-emerald-50 text-emerald-700 rounded-2xl">
                    <m.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                    {m.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{m.title}</h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed font-medium">{m.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href="/login"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
                >
                  <span>Test with Sign In</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/signup"
                  className="text-xs font-bold text-gray-400 hover:text-gray-600"
                >
                  Create Account
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
        <h2 className="text-3xl font-black">Ready to explore KrishiMitra? 🌾</h2>
        <p className="text-emerald-100 text-sm max-w-xl mx-auto font-medium">
          Create a free account or sign in with 1-click Google account picker to access all AI farm advisory features.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="/login"
            className="bg-white text-emerald-950 hover:bg-emerald-100 font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow transition"
          >
            Sign In Now
          </Link>
          <Link
            href="/signup"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow transition"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}
