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
import { getBuyerMatches } from "@/lib/api";
import { CROPS } from "@/lib/utils";
import {
  Loader2,
  MapPin,
  Star,
  Users,
  Sliders,
  Phone,
  ShieldCheck,
  Building,
  CheckCircle,
  AlertCircle,
  IndianRupee,
  Navigation,
} from "lucide-react";

export default function BuyerRecommendationsPage() {
  const [form, setForm] = useState({
    crop: "Wheat",
    quantity_quintal: 25,
    quality_grade: "A",
    latitude: 26.9124,
    longitude: 75.7873,
    max_distance_km: 100,
  });

  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<any[] | null>(null);
  const [error, setError] = useState("");
  const [selectedBuyer, setSelectedBuyer] = useState<any | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await getBuyerMatches(form);
      setMatches(res.data.matches);
    } catch (e: any) {
      setError(
        e?.response?.data?.detail ||
          "Could not fetch buyer matches. Please check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 p-8 text-white shadow-2xl"
      >
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-400/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Users size={14} /> Geo-Spatial Haversine Buyer Match Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
            Buyer Recommendation Engine 🤝
          </h1>
          <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
            Connect with verified grain buyers, millers, and local merchants in your vicinity. Ranked dynamically by road distance, price offer, and trade reputation score.
          </p>
        </div>
      </motion.div>

      {/* Input Parameters Card */}
      <Card className="border border-blue-100 shadow-xl bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100 flex items-center gap-2">
          <Sliders className="text-blue-700" size={20} />
          <h2 className="text-lg font-bold text-gray-800">Match Parameters</h2>
        </div>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Crop Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Harvest Crop
                </label>
                <select
                  value={form.crop}
                  onChange={(e) => setForm({ ...form, crop: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition"
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
                    Quantity
                  </label>
                  <span className="text-xs font-extrabold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
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
                  className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {/* Quality Grade */}
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
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      Grade {grade}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Distance Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Max Distance Radius
                  </label>
                  <span className="text-xs font-extrabold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                    {form.max_distance_km} km
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="10"
                  value={form.max_distance_km}
                  onChange={(e) =>
                    setForm({ ...form, max_distance_km: Number(e.target.value) })
                  }
                  className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-800 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-blue-200 transition duration-200 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Calculating Geo-Distance...
                </>
              ) : (
                <>
                  <Navigation size={18} /> Find Nearby Verified Buyers
                </>
              )}
            </button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm font-medium">
          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          {error}
        </div>
      )}

      {/* Buyer Matches Grid */}
      {matches && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              Matched Verified Buyers ({matches.length})
            </h3>
            <span className="text-xs text-gray-500 font-medium">
              Sorted by Match Score & Proximity
            </span>
          </div>

          {matches.length === 0 ? (
            <Card className="p-8 text-center bg-gray-50 border border-gray-200 rounded-2xl">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-700 font-semibold mb-1">
                No buyers found within {form.max_distance_km} km radius.
              </p>
              <p className="text-xs text-gray-500">
                Try increasing the search distance radius or selecting a different crop grade.
              </p>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matches.map((m, i) => (
                <motion.div
                  key={m.buyer_id || i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="border border-blue-100 shadow-lg hover:shadow-xl transition-shadow bg-white rounded-2xl overflow-hidden flex flex-col justify-between h-full group">
                    <CardHeader className="p-6 bg-gradient-to-b from-blue-50/50 to-transparent">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mb-1">
                            <ShieldCheck size={16} /> Verified Mandi Trader
                          </div>
                          <CardTitle className="text-lg font-black text-gray-900">
                            {m.buyer_name}
                          </CardTitle>
                        </div>

                        <div className="px-3 py-1 bg-emerald-500/10 text-emerald-700 rounded-full font-black text-xs border border-emerald-300 flex items-center gap-1">
                          <Star size={12} className="fill-emerald-600" />
                          {Math.round(m.match_score * 100)}% Match
                        </div>
                      </div>

                      <CardDescription className="flex items-center gap-1 text-xs font-semibold text-gray-600">
                        <MapPin size={14} className="text-blue-600" /> {m.distance_km} km away
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-6 pt-0 space-y-4">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="text-xs text-gray-500 font-medium">Offered Price</div>
                        <div className="text-2xl font-black text-gray-900 flex items-center gap-0.5">
                          <IndianRupee size={20} className="text-emerald-600" />
                          {m.estimated_price_per_quintal?.toLocaleString()}{" "}
                          <span className="text-xs font-normal text-gray-500">/ quintal</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{m.reason}</p>
                      </div>

                      <button
                        onClick={() => setSelectedBuyer(m)}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center gap-2 active:scale-[0.99]"
                      >
                        <Phone size={14} /> Contact Buyer / Request Quote
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Buyer Contact Modal */}
      {selectedBuyer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100 animate-fade-in">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Building className="text-blue-600" size={20} />
                <h3 className="text-lg font-bold text-gray-900">
                  {selectedBuyer.buyer_name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBuyer(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-blue-50 rounded-xl flex items-center justify-between">
                <span className="text-gray-600 font-medium">Offered Rate</span>
                <span className="font-extrabold text-blue-900">
                  ₹{selectedBuyer.estimated_price_per_quintal}/quintal
                </span>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl flex items-center justify-between">
                <span className="text-gray-600 font-medium">Proximity</span>
                <span className="font-extrabold text-emerald-900">
                  {selectedBuyer.distance_km} km away
                </span>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Trader Phone Number
                </label>
                <div className="p-3 bg-gray-100 rounded-xl font-bold text-gray-900 text-center tracking-widest">
                  +91 98765 43210
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <button
                onClick={() => setSelectedBuyer(null)}
                className="flex-1 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <a
                href="tel:+919876543210"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold text-center shadow flex items-center justify-center gap-1.5"
              >
                <Phone size={14} /> Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
