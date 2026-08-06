"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/form-elements";
import { Badge } from "@/components/ui/form-elements";
import { getSellAdvice } from "@/lib/api";
import { CROPS, MARKETS } from "@/lib/utils";
import { Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function SellAdvisorPage() {
  const [form, setForm] = useState({
    crop: "Wheat",
    quantity_quintal: 20,
    quality_grade: "A",
    market: "Jaipur",
  });
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const state = MARKETS[form.market] || "Rajasthan";
      const res = await getSellAdvice({ ...form, state });
      setAdvice(res.data);
    } catch (e: any) {
      setError(e?.response?.data?.detail || "Could not fetch advice. Is the backend running on :8000?");
    } finally {
      setLoading(false);
    }
  };

  const actionMeta: Record<string, { label: string; color: "success" | "warning" | "danger"; icon: any }> = {
    sell_now: { label: "Sell Now", color: "danger", icon: TrendingDown },
    wait: { label: "Wait / Hold", color: "success", icon: TrendingUp },
    sell_partial: { label: "Sell Partially", color: "warning", icon: Minus },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Sell Advisor</h1>
        <p className="text-muted-foreground">Predict crop prices and get a sell-now vs. wait recommendation.</p>
      </div>

      <Card>
        <CardContent className="pt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Crop</label>
            <Select value={form.crop} onChange={(e) => setForm({ ...form, crop: e.target.value })}>
              {CROPS.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Quantity (quintal)</label>
            <Input
              type="number"
              value={form.quantity_quintal}
              onChange={(e) => setForm({ ...form, quantity_quintal: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Quality Grade</label>
            <Select value={form.quality_grade} onChange={(e) => setForm({ ...form, quality_grade: e.target.value })}>
              <option value="A">A (Best)</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Market</label>
            <Select value={form.market} onChange={(e) => setForm({ ...form, market: e.target.value })}>
              {Object.keys(MARKETS).map((m) => <option key={m} value={m}>{m}</option>)}
            </Select>
          </div>
          <div className="sm:col-span-2 lg:col-span-4">
            <Button onClick={handleSubmit} disabled={loading} className="w-full sm:w-auto">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Get Sell Advice
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {advice && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4 lg:grid-cols-3"
        >
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardDescription>Predicted Price</CardDescription>
              <CardTitle className="text-3xl">₹{advice.predicted_price_per_quintal.toLocaleString()}</CardTitle>
              <p className="text-xs text-muted-foreground">
                Range: ₹{advice.price_range_low.toLocaleString()} – ₹{advice.price_range_high.toLocaleString()} / quintal
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {(() => {
                const meta = actionMeta[advice.recommended_action] || actionMeta.sell_partial;
                const Icon = meta.icon;
                return (
                  <div className="flex items-center gap-2">
                    <Badge variant={meta.color}><Icon className="h-3 w-3 mr-1 inline" />{meta.label}</Badge>
                    <span className="text-xs text-muted-foreground">{Math.round(advice.confidence * 100)}% confidence</span>
                  </div>
                );
              })()}
              <p className="text-sm">{advice.reasoning_summary}</p>
              <p className="text-sm font-medium">Best window: {advice.best_sell_window}</p>
              <p className="text-sm text-muted-foreground border-t border-border pt-3">
                Estimated total value: <span className="font-semibold text-foreground">₹{advice.estimated_total_value.toLocaleString()}</span>
              </p>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>30-Day Price Forecast</CardTitle>
              <CardDescription>{advice.msp_comparison?.message}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={advice.price_forecast_30d}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(140 15% 90%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={["auto", "auto"]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="predicted_price" stroke="hsl(142 50% 30%)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="low" stroke="hsl(140 10% 70%)" strokeWidth={1} dot={false} strokeDasharray="4 4" />
                  <Line type="monotone" dataKey="high" stroke="hsl(140 10% 70%)" strokeWidth={1} dot={false} strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {advice.natural_language_summary && (
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-base">In Plain Language</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{advice.natural_language_summary}</p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  );
}
