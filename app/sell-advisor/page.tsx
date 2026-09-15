"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { getSellAdvice } from "@/lib/api";
import { CROPS, MARKETS } from "@/lib/utils";
import {
  Loader2,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  HelpCircle,
  IndianRupee,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sliders,
} from "lucide-react";

export default function SellAdvisorPage() {
  const [form, setForm] = useState({
    crop: "Wheat",
    quantity_quintal: 25,
    quality_grade: "A",
    market: "Jaipur",
  });
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const state = MARKETS[form.market] || "Rajasthan";
      const res = await getSellAdvice({ ...form, state });
      setAdvice(res.data);
    } catch (e: any) {
      setError(
        e?.response?.data?.detail ||
          "Could not fetch AI advice. Please verify the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const actionMeta: Record<
    string,
    { label: string; bg: string; text: string; icon: any; border: string }
  > = {
    sell_now: {
      label: "SELL NOW",
      bg: "bg-red-500/10",
      text: "text-red-700 font-extrabold",
      icon: TrendingDown,
      border: "border-red-300",
    },
    wait: {
      label: "HOLD / WAIT FOR PEAK",
      bg: "bg-emerald-500/10",
      text: "text-emerald-700 font-extrabold",
      icon: TrendingUp,
      border: "border-emerald-300",
    },
    sell_partial: {
      label: "SELL PARTIALLY (50%)",
      bg: "bg-amber-500/10",
      text: "text-amber-700 font-extrabold",
      icon: Minus,
      border: "border-amber-300",
    },
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-green-950 p-8 text-white shadow-2xl"
      >
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles size={14} className="animate-spin" /> Powered by XGBoost & LightGBM ML
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
            AI Sell Advisor Engine 🌾
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Get instant, data-driven recommendations on whether to sell your crop today or hold for higher Mandi prices, backed by historical Agmarknet trends and 30-day forecast models.
          </p>
        </div>
      </motion.div>

      {/* Input Control Card */}
      <Card className="border border-emerald-100 shadow-xl bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-emerald-100 flex items-center gap-2">
          <Sliders className="text-emerald-700" size={20} />
          <h2 className="text-lg font-bold text-gray-800">Crop Harvest & Mandi Parameters</h2>
        </div>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Crop Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Select Crop
                </label>
                <select
                  value={form.crop}
                  onChange={(e) => setForm({ ...form, crop: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-sm transition"
                >
                  {CROPS.map((c) => (
                    <option key={c} value={c}>
                      🌾 {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mandi Market Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Target Mandi Market
                </label>
                <select
                  value={form.market}
                  onChange={(e) => setForm({ ...form, market: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-sm transition"
                >
                  {Object.keys(MARKETS).map((m) => (
                    <option key={m} value={m}>
                      📍 {m} ({MARKETS[m]})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quality Grade Pills */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Quality Grade
                </label>
                <div className="flex gap-2">
                  {["A", "B", "C"].map((grade) => (
                    <button
                      key={grade}
                      type="button"
                      onClick={() => setForm({ ...form, quality_grade: grade })}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-black transition border ${
                        form.quality_grade === grade
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      Grade {grade}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Harvest Quantity
                  </label>
                  <span className="text-xs font-extrabold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                    {form.quantity_quintal} Quintals
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="500"
                  value={form.quantity_quintal}
                  onChange={(e) =>
                    setForm({ ...form, quantity_quintal: Number(e.target.value) })
                  }
                  className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-200 transition duration-200 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Running XGBoost Inference...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Analyze Harvest & Recommend Action
                </>
              )}
            </button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm font-medium">
          <AlertTriangle className="text-red-600 flex-shrink-0" size={20} />
          {error}
        </div>
      )}

      {/* Advice Dashboard Output */}
      {advice && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Key Metrics Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Recommendation Gauge */}
            <Card className="border border-emerald-100 shadow-xl bg-white rounded-2xl p-6 relative overflow-hidden">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                AI Recommendation
              </div>

              {(() => {
                const meta =
                  actionMeta[advice.recommended_action] || actionMeta.wait;
                const Icon = meta.icon;
                return (
                  <div className="space-y-4">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border ${meta.bg} ${meta.border} ${meta.text}`}
                    >
                      <Icon size={20} />
                      <span className="text-lg tracking-wide">{meta.label}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100">
                      <span className="text-gray-500">Model Confidence</span>
                      <span className="font-extrabold text-emerald-700">
                        {Math.round(advice.confidence * 100)}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${advice.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })()}
            </Card>

            {/* Price Prediction Metric */}
            <Card className="border border-emerald-100 shadow-xl bg-white rounded-2xl p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Predicted Price / Quintal
              </div>
              <div className="text-4xl font-black text-gray-900 flex items-center gap-1">
                <IndianRupee size={32} className="text-emerald-600" />
                {advice.predicted_price_per_quintal?.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Est. Range: ₹{advice.price_range_low?.toLocaleString()} – ₹
                {advice.price_range_high?.toLocaleString()}
              </p>
            </Card>

            {/* Total Estimated Revenue */}
            <Card className="border border-emerald-100 shadow-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-200 mb-2">
                Total Est. Harvest Revenue
              </div>
              <div className="text-4xl font-black flex items-center gap-1">
                ₹{advice.estimated_total_value?.toLocaleString()}
              </div>
              <p className="text-xs text-emerald-100/90 mt-2 flex items-center gap-1">
                <Calendar size={14} /> Peak Window: {advice.best_sell_window}
              </p>
            </Card>
          </div>

          {/* 30-Day Price Forecast Chart */}
          <Card className="border border-emerald-100 shadow-xl bg-white rounded-2xl overflow-hidden p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 pb-4 border-b border-gray-100 gap-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  30-Day Projected Price Curve (₹/Quintal)
                </h3>
                <p className="text-xs text-gray-500">
                  {advice.msp_comparison?.message ||
                    "Benchmarked against Government Minimum Support Price (MSP)"}
                </p>
              </div>

              {advice.msp_comparison?.floor_price && (
                <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-800 flex items-center gap-1.5 w-fit">
                  <Award size={16} className="text-amber-600" />
                  MSP Floor: ₹{advice.msp_comparison.floor_price}/quintal
                </div>
              )}
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={advice.price_forecast_30d || []}>
                  <defs>
                    <linearGradient id="priceColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#64748b" }} />
                  <YAxis
                    domain={["auto", "auto"]}
                    tick={{ fontSize: 11, fill: "#64748b" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      color: "#ffffff",
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted_price"
                    stroke="#059669"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#priceColor)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Plain Language Summary */}
          {advice.natural_language_summary && (
            <Card className="border border-emerald-100 shadow-lg bg-emerald-50/50 rounded-2xl p-6">
              <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-600" size={18} />
                Simple Language Advisory Breakdown
              </h4>
              <p className="text-sm text-emerald-950 font-medium leading-relaxed">
                {advice.natural_language_summary}
              </p>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  );
}
