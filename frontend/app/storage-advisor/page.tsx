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
import { getStorageAdvice } from "@/lib/api";
import { CROPS } from "@/lib/utils";
import {
  Loader2,
  Warehouse,
  PackageX,
  PackageCheck,
  IndianRupee,
  AlertTriangle,
  Sliders,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
} from "lucide-react";

export default function StorageAdvisorPage() {
  const [form, setForm] = useState({
    crop: "Onion",
    quantity_quintal: 25,
    harvest_date: new Date().toISOString().slice(0, 10),
    current_price: 2200,
    predicted_price_30d: 2650,
  });

  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<any>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await getStorageAdvice(form);
      setAdvice(res.data);
    } finally {
      setLoading(false);
    }
  };

  const recMeta: Record<
    string,
    { label: string; bg: string; text: string; icon: any; border: string }
  > = {
    store: {
      label: "RECOMMENDED: STORE HARVEST",
      bg: "bg-emerald-500/10",
      text: "text-emerald-700 font-extrabold",
      icon: PackageCheck,
      border: "border-emerald-300",
    },
    partial_store: {
      label: "RECOMMENDED: STORE 50% HARVEST",
      bg: "bg-amber-500/10",
      text: "text-amber-700 font-extrabold",
      icon: Warehouse,
      border: "border-amber-300",
    },
    sell_immediately: {
      label: "RECOMMENDED: SELL IMMEDIATELY",
      bg: "bg-red-500/10",
      text: "text-red-700 font-extrabold",
      icon: PackageX,
      border: "border-red-300",
    },
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-950 p-8 text-white shadow-2xl"
      >
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 border border-teal-400/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Warehouse size={14} /> Storage ROI & Deterioration Risk Calculator
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
            Storage Advisor Engine 🏬
          </h1>
          <p className="text-teal-100/90 text-sm sm:text-base leading-relaxed">
            Calculate the exact 30-day net gain of storing your crop vs. immediate Mandi sale, taking cold-storage rent and spoilage risk percentage into account.
          </p>
        </div>
      </motion.div>

      {/* Input Parameters Card */}
      <Card className="border border-teal-100 shadow-xl bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 px-6 py-4 border-b border-teal-100 flex items-center gap-2">
          <Sliders className="text-teal-700" size={20} />
          <h2 className="text-lg font-bold text-gray-800">Storage Parameters</h2>
        </div>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Crop Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Select Crop
                </label>
                <select
                  value={form.crop}
                  onChange={(e) => setForm({ ...form, crop: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
                >
                  {CROPS.map((c) => (
                    <option key={c} value={c}>
                      🌾 {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Harvest Quantity
                  </label>
                  <span className="text-xs font-extrabold px-2 py-0.5 bg-teal-100 text-teal-800 rounded-full">
                    {form.quantity_quintal} Quintals
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  value={form.quantity_quintal}
                  onChange={(e) =>
                    setForm({ ...form, quantity_quintal: Number(e.target.value) })
                  }
                  className="w-full h-2 bg-teal-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
              </div>

              {/* Current Price */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Current Price Today (₹/quintal)
                </label>
                <input
                  type="number"
                  value={form.current_price}
                  onChange={(e) =>
                    setForm({ ...form, current_price: Number(e.target.value) })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
                />
              </div>

              {/* Predicted Price in 30 days */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Predicted Price in 30 Days (₹/quintal)
                </label>
                <input
                  type="number"
                  value={form.predicted_price_30d}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      predicted_price_30d: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
                />
              </div>

              {/* Harvest Date */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Harvest Date
                </label>
                <input
                  type="date"
                  value={form.harvest_date}
                  onChange={(e) =>
                    setForm({ ...form, harvest_date: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-800 focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-600 via-emerald-600 to-slate-800 hover:from-teal-700 hover:to-emerald-700 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-teal-200 transition duration-200 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Calculating Storage Net ROI...
                </>
              ) : (
                <>
                  <Warehouse size={18} /> Analyze Storage vs. Immediate Sale
                </>
              )}
            </button>
          </form>
        </CardContent>
      </Card>

      {/* Storage Advice Result */}
      {advice && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="border border-teal-100 shadow-xl bg-white rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6">
            {(() => {
              const meta = recMeta[advice.recommendation] || recMeta.sell_immediately;
              const Icon = meta.icon;
              return (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-teal-100 rounded-2xl text-teal-800">
                      <Icon size={28} />
                    </div>
                    <div>
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${meta.bg} ${meta.border} ${meta.text}`}
                      >
                        {meta.label}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{advice.reasoning}</p>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Metrics Breakdown Grid */}
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Est. 30-Day Storage Cost
                </div>
                <div className="text-2xl font-black text-gray-900 flex items-center">
                  <IndianRupee size={20} className="text-teal-600" />
                  {advice.estimated_storage_cost?.toLocaleString()}
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Spoilage / Spoil Risk
                </div>
                <div className="text-2xl font-black text-amber-600 flex items-center gap-1">
                  <ShieldAlert size={20} />
                  {advice.estimated_spoilage_risk_pct}%
                </div>
              </div>

              <div className="p-5 bg-teal-50 rounded-2xl border border-teal-100">
                <div className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
                  Projected Net Profit / Gain
                </div>
                <div
                  className={`text-2xl font-black flex items-center ${
                    advice.projected_gain_if_stored >= 0
                      ? "text-emerald-700"
                      : "text-red-700"
                  }`}
                >
                  <IndianRupee size={20} />
                  {advice.projected_gain_if_stored?.toLocaleString()}
                </div>
              </div>
            </div>

            {advice.nearest_warehouse_suggestion && (
              <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100 text-xs font-semibold text-teal-900 flex items-center gap-2">
                <Warehouse size={18} className="text-teal-700 shrink-0" />
                Nearest Cold Storage Facility: {advice.nearest_warehouse_suggestion}
              </div>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  );
}
