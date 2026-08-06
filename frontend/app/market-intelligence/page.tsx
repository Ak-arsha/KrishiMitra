"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, Badge } from "@/components/ui/form-elements";
import { Button } from "@/components/ui/button";
import { getMarketFeed, getNewsSummary } from "@/lib/api";
import { MARKETS } from "@/lib/utils";
import { Loader2, TrendingUp, TrendingDown } from "lucide-react";

export default function MarketIntelligencePage() {
  const [market, setMarket] = useState("Jaipur");
  const [feed, setFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>("");

  const load = async () => {
    setLoading(true);
    try {
      const state = MARKETS[market] || "Rajasthan";
      const res = await getMarketFeed(market, state);
      setFeed(res.data.feed);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [market]);

  const stabilityColor: Record<string, "success" | "warning" | "danger"> = {
    stable: "success", moderate: "warning", volatile: "danger",
  };

  const openCrop = async (crop: string) => {
    setSelected(crop);
    setSummary("Loading summary...");
    const res = await getNewsSummary(crop);
    setSummary(res.data.summary);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Market Intelligence Feed</h1>
          <p className="text-muted-foreground">Live price trends and volatility across your crops.</p>
        </div>
        <div className="w-48">
          <Select value={market} onChange={(e) => setMarket(e.target.value)}>
            {Object.keys(MARKETS).map((m) => <option key={m} value={m}>{m}</option>)}
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading feed...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {feed.map((c, i) => (
            <motion.div key={c.crop} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => openCrop(c.crop)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{c.crop}</CardTitle>
                    <Badge variant={stabilityColor[c.stability]}>{c.stability}</Badge>
                  </div>
                  <CardDescription>₹{c.current_price.toLocaleString()}/quintal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-sm">
                    {c.trend_pct_30d >= 0 ? <TrendingUp className="h-4 w-4 text-emerald-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
                    <span className={c.trend_pct_30d >= 0 ? "text-emerald-600" : "text-red-600"}>
                      {c.trend_pct_30d >= 0 ? "+" : ""}{c.trend_pct_30d}% / 30d
                    </span>
                  </div>
                  <ResponsiveContainer width="100%" height={80}>
                    <LineChart data={c.series}>
                      <Line type="monotone" dataKey="predicted_price" stroke="hsl(142 50% 30%)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {selected && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Market Summary — {selected}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
