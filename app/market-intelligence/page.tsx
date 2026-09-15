"use client";

import React, { useEffect, useState } from "react";
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
import { getMarketFeed, getNewsSummary } from "@/lib/api";
import { MARKETS } from "@/lib/utils";
import {
  Loader2,
  TrendingUp,
  TrendingDown,
  Newspaper,
  Activity,
  Zap,
  Sparkles,
  MapPin,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";

export default function MarketIntelligencePage() {
  const [market, setMarket] = useState("Jaipur");
  const [feed, setFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  const loadFeed = async () => {
    setLoading(true);
    try {
      const state = MARKETS[market] || "Rajasthan";
      const res = await getMarketFeed(market, state);
      setFeed(res.data.feed);
      if (res.data.feed && res.data.feed.length > 0 && !selectedCrop) {
        openCropSummary(res.data.feed[0].crop);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeed();
  }, [market]);

  const openCropSummary = async (crop: string) => {
    setSelectedCrop(crop);
    setSummaryLoading(true);
    try {
      const res = await getNewsSummary(crop);
      setSummary(res.data.summary);
    } catch {
      setSummary("Could not load market news summary for " + crop);
    } finally {
      setSummaryLoading(false);
    }
  };

  const stabilityMeta: Record<
    string,
    { label: string; bg: string; text: string; border: string }
  > = {
    stable: {
      label: "STABLE",
      bg: "bg-emerald-500/10",
      text: "text-emerald-700",
      border: "border-emerald-300",
    },
    moderate: {
      label: "MODERATE VOLATILITY",
      bg: "bg-amber-500/10",
      text: "text-amber-700",
      border: "border-amber-300",
    },
    volatile: {
      label: "HIGH VOLATILITY",
      bg: "bg-red-500/10",
      text: "text-red-700",
      border: "border-red-300",
    },
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-800 via-orange-950 to-slate-950 p-8 text-white shadow-2xl"
      >
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Activity size={14} /> Real-Time Volatility & Mandi Rate Monitor
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
            Market Intelligence Feed 📈
          </h1>
          <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed">
            Monitor real-time Mandi price trends, historical volatility indices, and LLM-summarized news signals across major crop categories in India.
          </p>
        </div>
      </motion.div>

      {/* Market Selector Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-amber-100 shadow-xl">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Select Mandi Location</h2>
          <p className="text-xs text-gray-500">
            Showing crop volatility index for regional agricultural hubs
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {Object.keys(MARKETS).map((m) => (
            <button
              key={m}
              onClick={() => setMarket(m)}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition border flex items-center gap-1.5 ${
                market === m
                  ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200"
                  : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
              }`}
            >
              <MapPin size={14} /> {m} ({MARKETS[m]})
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-500 gap-3 font-semibold">
          <Loader2 className="animate-spin text-amber-600" size={24} /> Loading Mandi price trends...
        </div>
      ) : (
        <div className="space-y-8">
          {/* Crop Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {feed.map((c, i) => {
              const meta =
                stabilityMeta[c.stability] || stabilityMeta.moderate;
              const isSelected = selectedCrop === c.crop;

              return (
                <motion.div
                  key={c.crop}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card
                    onClick={() => openCropSummary(c.crop)}
                    className={`border shadow-lg hover:shadow-xl transition-all cursor-pointer rounded-2xl overflow-hidden bg-white ${
                      isSelected
                        ? "border-amber-500 ring-2 ring-amber-500/20"
                        : "border-gray-100 hover:border-amber-200"
                    }`}
                  >
                    <CardHeader className="p-6 bg-gradient-to-b from-gray-50/50 to-transparent">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-xl font-black text-gray-900">
                          🌾 {c.crop}
                        </CardTitle>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${meta.bg} ${meta.text} ${meta.border}`}
                        >
                          {meta.label}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between pt-2">
                        <div className="text-2xl font-black text-gray-900 flex items-center">
                          <IndianRupee size={20} className="text-amber-600" />
                          {c.current_price?.toLocaleString()}
                          <span className="text-xs font-normal text-gray-500 ml-1">
                            / quintal
                          </span>
                        </div>

                        <div
                          className={`flex items-center gap-1 text-xs font-extrabold px-2.5 py-1 rounded-lg ${
                            c.trend_pct_30d >= 0
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {c.trend_pct_30d >= 0 ? (
                            <TrendingUp size={14} />
                          ) : (
                            <TrendingDown size={14} />
                          )}
                          {c.trend_pct_30d >= 0 ? "+" : ""}
                          {c.trend_pct_30d}% / 30d
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 pt-0">
                      <div className="h-24 w-full pt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={c.series || []}>
                            <defs>
                              <linearGradient
                                id={`chart-${c.crop}`}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="5%"
                                  stopColor="#f59e0b"
                                  stopOpacity={0.4}
                                />
                                <stop
                                  offset="95%"
                                  stopColor="#f59e0b"
                                  stopOpacity={0.0}
                                />
                              </linearGradient>
                            </defs>
                            <Area
                              type="monotone"
                              dataKey="predicted_price"
                              stroke="#d97706"
                              strokeWidth={2}
                              fill={`url(#chart-${c.crop})`}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Detailed Selected Crop Intelligence Panel */}
          {selectedCrop && (
            <Card className="border border-amber-200 shadow-2xl bg-white rounded-2xl overflow-hidden p-8">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="p-3 bg-amber-100 rounded-xl text-amber-800">
                  <Newspaper size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    AI Market Intelligence Breakdown — {selectedCrop}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Gemini LLM news synthesis for {selectedCrop} in {market} Mandi
                  </p>
                </div>
              </div>

              {summaryLoading ? (
                <div className="flex items-center gap-2 text-amber-700 text-sm font-semibold py-4">
                  <Loader2 className="animate-spin" size={18} /> Generating Gemini AI summary...
                </div>
              ) : (
                <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-100 text-sm text-amber-950 font-medium leading-relaxed flex items-start gap-3">
                  <CheckCircle2 className="text-amber-600 mt-0.5 shrink-0" size={20} />
                  <div>{summary}</div>
                </div>
              )}
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
