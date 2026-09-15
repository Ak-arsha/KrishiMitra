"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getExplainability } from "@/lib/api";
import { CROPS, MARKETS } from "@/lib/utils";
import {
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Sparkles,
  Sliders,
  HelpCircle,
  IndianRupee,
  Info,
} from "lucide-react";

export default function ExplainableAiPage() {
  const [crop, setCrop] = useState("Wheat");
  const [market, setMarket] = useState("Jaipur");
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<any[] | null>(null);

  const handleRun = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const state = MARKETS[market] || "Rajasthan";
      const res = await getExplainability(crop, market, state);
      setExplanation(res.data.explanation);
    } finally {
      setLoading(false);
    }
  };

  const maxAbs = explanation
    ? Math.max(...explanation.map((e) => Math.abs(e.impact)), 1)
    : 1;

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-950 p-8 text-white shadow-2xl"
      >
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-400/20 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Brain size={14} /> Model Transparency & Perturbation Feature Weights
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
            Explainable AI Panel 🧠
          </h1>
          <p className="text-purple-100/90 text-sm sm:text-base leading-relaxed">
            Understand the exact economic, seasonal, and environmental variables driving XGBoost & LightGBM Mandi price predictions in plain language.
          </p>
        </div>
      </motion.div>

      {/* Inputs Card */}
      <Card className="border border-purple-100 shadow-xl bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-purple-100 flex items-center gap-2">
          <Sliders className="text-purple-700" size={20} />
          <h2 className="text-lg font-bold text-gray-800">Parameters</h2>
        </div>

        <CardContent className="p-6">
          <form onSubmit={handleRun} className="flex flex-wrap gap-4 items-end">
            <div className="w-full sm:w-48">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Crop
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
              >
                {CROPS.map((c) => (
                  <option key={c} value={c}>
                    🌾 {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-48">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Market
              </label>
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm"
              >
                {Object.keys(MARKETS).map((m) => (
                  <option key={m} value={m}>
                    📍 {m} ({MARKETS[m]})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-purple-200 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> Computing SHAP Weights...
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Explain Price Prediction
                </>
              )}
            </button>
          </form>
        </CardContent>
      </Card>

      {/* Explanation Results */}
      {explanation && (
        <Card className="border border-purple-100 shadow-xl bg-white rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Feature Contribution Breakdown — {crop} @ {market}
              </h3>
              <p className="text-xs text-gray-500">
                Shows positive (+) and negative (-) impacts on price in ₹/quintal
              </p>
            </div>
            <div className="px-3 py-1 bg-purple-50 border border-purple-200 text-purple-800 rounded-full text-xs font-bold flex items-center gap-1">
              <Info size={14} /> Perturbation Derived
            </div>
          </div>

          <div className="space-y-6">
            {explanation.map((e, i) => {
              const positive = e.impact >= 0;
              const width = (Math.abs(e.impact) / maxAbs) * 100;

              return (
                <motion.div
                  key={e.feature || i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 bg-gray-50/70 border border-gray-100 rounded-xl space-y-2"
                >
                  <div className="flex items-center justify-between font-bold text-sm">
                    <span className="flex items-center gap-2 text-gray-900">
                      {positive ? (
                        <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-700">
                          <ArrowUpRight size={16} />
                        </div>
                      ) : (
                        <div className="p-1.5 bg-red-100 rounded-lg text-red-700">
                          <ArrowDownRight size={16} />
                        </div>
                      )}
                      {e.feature}
                    </span>

                    <span
                      className={`text-base font-extrabold ${
                        positive ? "text-emerald-700" : "text-red-700"
                      }`}
                    >
                      {positive ? "+" : ""}₹{e.impact?.toLocaleString()}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${width}%` }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                      className={`h-full rounded-full ${
                        positive ? "bg-emerald-500" : "bg-red-500"
                      }`}
                    />
                  </div>

                  <p className="text-xs text-gray-600 font-medium pt-1">
                    {e.explanation}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
