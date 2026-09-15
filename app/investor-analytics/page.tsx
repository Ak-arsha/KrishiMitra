"use client";

import React, { useState } from "react";
import {
  PieChart,
  TrendingUp,
  ShieldAlert,
  DollarSign,
  BarChart3,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  Building2,
} from "lucide-react";

export default function InvestorAnalyticsPage() {
  const [investmentAmount, setInvestmentAmount] = useState(500000);
  const [selectedCrop, setSelectedCrop] = useState("Mustard");
  const [holdingMonths, setHoldingMonths] = useState(3);

  const CROP_MODELS: Record<string, { expectedRoiPct: number; riskLevel: string; volatilityScore: number; forecastTrend: string }> = {
    Mustard: { expectedRoiPct: 14.8, riskLevel: "Moderate Risk", volatilityScore: 4.2, forecastTrend: "Strong Bullish (+12% in 90 days)" },
    Wheat: { expectedRoiPct: 8.5, riskLevel: "Low / Stable", volatilityScore: 2.1, forecastTrend: "Steady Growth (+6% in 90 days)" },
    Rice: { expectedRoiPct: 9.2, riskLevel: "Low / Stable", volatilityScore: 2.4, forecastTrend: "Export Demand Support" },
    Soybean: { expectedRoiPct: 18.2, riskLevel: "High Volatility", volatilityScore: 7.8, forecastTrend: "Cyclical Rebound (+15% in 90 days)" },
    Paddy: { expectedRoiPct: 7.2, riskLevel: "MSP Protected", volatilityScore: 1.5, forecastTrend: "Government Floor Price" },
    Tomato: { expectedRoiPct: 24.5, riskLevel: "High Risk / High Return", volatilityScore: 8.9, forecastTrend: "High Spikes Expected" },
    Cotton: { expectedRoiPct: 13.5, riskLevel: "Moderate Risk", volatilityScore: 5.1, forecastTrend: "Textile Demand Lift" },
    Chana: { expectedRoiPct: 10.4, riskLevel: "Low / Stable", volatilityScore: 3.0, forecastTrend: "Pulse Procurement Buffer" },
    Onion: { expectedRoiPct: 21.0, riskLevel: "High Volatility", volatilityScore: 8.2, forecastTrend: "Monsoon Supply Fluctuation" },
    Potato: { expectedRoiPct: 9.8, riskLevel: "Moderate Risk", volatilityScore: 4.0, forecastTrend: "Cold Chain Storage Gain" },
  };

  const selectedModel = CROP_MODELS[selectedCrop] || CROP_MODELS["Mustard"];
  const projectedReturn = Math.round(investmentAmount * (1 + (selectedModel.expectedRoiPct / 100) * (holdingMonths / 12)));
  const projectedProfit = projectedReturn - investmentAmount;

  const ARBITRAGE_OPPORTUNITIES = [
    {
      crop: "Mustard",
      buyMandi: "Bharatpur Mandi",
      buyPrice: 5620,
      sellMandi: "Jaipur Central Mandi",
      sellPrice: 5780,
      spreadPerQtl: 160,
      netRoiAfterFreight: 9.4,
      status: "High Opportunity",
    },
    {
      crop: "Wheat (Sharbati)",
      buyMandi: "Kota Mandi",
      buyPrice: 2390,
      sellMandi: "Delhi Grain Hub",
      sellPrice: 2560,
      spreadPerQtl: 170,
      netRoiAfterFreight: 11.2,
      status: "Verified",
    },
    {
      crop: "Soybean",
      buyMandi: "Ujjain Mandi",
      buyPrice: 4550,
      sellMandi: "Indore Processing Depot",
      sellPrice: 4720,
      spreadPerQtl: 170,
      netRoiAfterFreight: 8.8,
      status: "Stable",
    },
    {
      crop: "Tomato",
      buyMandi: "Nashik APMC",
      buyPrice: 2750,
      sellMandi: "Mumbai Vashi Wholesale",
      sellPrice: 3400,
      spreadPerQtl: 650,
      netRoiAfterFreight: 18.5,
      status: "High Opportunity",
    },
  ];

  return (
    <div className="space-y-10 py-4 font-sans">
      {/* Background Hero Banner */}
      <section className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-12 overflow-hidden border border-slate-800 shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-emerald-950/80 z-0 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 rounded-full text-emerald-300 text-xs font-extrabold uppercase tracking-wider mb-4 border border-emerald-400/30">
            <PieChart className="w-4 h-4" /> Financial & Agri-Investor Analytics
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Commodity Risk Metrics & <span className="text-emerald-400">Yield ROI Intelligence</span>
          </h1>

          <p className="mt-3 text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
            Data analytics suite for crop financiers, agri-venture funds, and traders analyzing mandi price volatility, arbitrage spreads, and seasonal ROI models.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold text-slate-300">
            <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Machine Learning Price Projections
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
              <ShieldAlert className="w-4 h-4 text-amber-400" /> Mandi Volatility Risk Scores
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
              <BarChart3 className="w-4 h-4 text-teal-400" /> Inter-Mandi Arbitrage Spreads
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Interactive ROI Calculator & Arbitrage Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Interactive ROI Calculator (1 Col) */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4" /> Agri ROI & Yield Simulator
          </div>
          <h2 className="text-xl font-black">Projected Yield Calculator</h2>
          <p className="text-xs text-slate-400 font-medium">Estimate capital return based on seasonal mandi price curves and historical holding trends.</p>

          <div className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-slate-300 mb-1">Target Commodity</label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {Object.keys(CROP_MODELS).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Capital Deployment Amount (₹)</label>
              <input
                type="number"
                step="50000"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Holding Duration (Months): {holdingMonths} Month(s)</label>
              <input
                type="range"
                min="1"
                max="12"
                value={holdingMonths}
                onChange={(e) => setHoldingMonths(parseInt(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">Projected Annual ROI:</span>
              <span className="text-emerald-400 font-extrabold text-sm">+{selectedModel.expectedRoiPct}%</span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">Risk Rating:</span>
              <span className="text-amber-300 font-bold">{selectedModel.riskLevel}</span>
            </div>

            <div className="border-t border-slate-700 pt-3">
              <span className="text-[11px] text-slate-400 block font-semibold">Estimated Total Value ({holdingMonths}m)</span>
              <span className="text-2xl font-black text-emerald-400 mt-0.5 block">₹{projectedReturn.toLocaleString("en-IN")}</span>
              <span className="text-xs text-emerald-300 font-bold flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> Est. Net Profit: +₹{projectedProfit.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Inter-Mandi Arbitrage Spreads & Risk Index (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-xl font-black text-gray-900">Inter-Mandi Arbitrage Opportunities</h2>
                <p className="text-xs text-gray-500 font-medium">Real-time price spreads between regional Mandis adjusted for freight transport</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full w-fit">
                Live Spread Detector
              </span>
            </div>

            <div className="space-y-4">
              {ARBITRAGE_OPPORTUNITIES.map((arb, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50/80 rounded-2xl p-5 border border-gray-200 hover:border-emerald-400 hover:bg-white transition shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black text-gray-900">{arb.crop}</span>
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-md">
                      Net ROI: +{arb.netRoiAfterFreight}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold text-gray-700 bg-white p-3 rounded-xl border border-gray-200">
                    <div>
                      <span className="text-gray-400 text-[10px] uppercase block">Buy Location</span>
                      <strong className="text-gray-900">{arb.buyMandi}</strong>
                      <span className="text-emerald-700 block font-extrabold">₹{arb.buyPrice} / qtl</span>
                    </div>

                    <div>
                      <span className="text-gray-400 text-[10px] uppercase block">Sell Target</span>
                      <strong className="text-gray-900">{arb.sellMandi}</strong>
                      <span className="text-emerald-700 block font-extrabold">₹{arb.sellPrice} / qtl</span>
                    </div>

                    <div>
                      <span className="text-gray-400 text-[10px] uppercase block">Gross Price Spread</span>
                      <strong className="text-emerald-800 text-sm font-black">+₹{arb.spreadPerQtl} / qtl</strong>
                      <span className="text-[10px] text-gray-500 block font-normal">After freight & charges</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Commodity Market Stability Index Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">Oilseeds Index</span>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">Low Risk</span>
              </div>
              <div className="text-2xl font-black text-gray-900">Mustard & Soybean</div>
              <p className="text-xs text-gray-500 font-medium">Strong industrial crushing demand; prices projected to hold steady over the next quarter.</p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">Grains & Cereals</span>
                <span className="text-xs font-extrabold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">MSP Protected</span>
              </div>
              <div className="text-2xl font-black text-gray-900">Wheat & Paddy</div>
              <p className="text-xs text-gray-500 font-medium">Underpinned by government procurement buffer stocks; minimal downside risk.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
