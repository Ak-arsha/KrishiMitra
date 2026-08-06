"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/form-elements";
import { getExplainability } from "@/lib/api";
import { CROPS, MARKETS } from "@/lib/utils";
import { Loader2, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function ExplainableAiPage() {
  const [crop, setCrop] = useState("Wheat");
  const [market, setMarket] = useState("Jaipur");
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<any[] | null>(null);

  const run = async () => {
    setLoading(true);
    try {
      const state = MARKETS[market] || "Rajasthan";
      const res = await getExplainability(crop, market, state);
      setExplanation(res.data.explanation);
    } finally {
      setLoading(false);
    }
  };

  const maxAbs = explanation ? Math.max(...explanation.map((e) => Math.abs(e.impact)), 1) : 1;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Explainable AI Panel</h1>
        <p className="text-muted-foreground">See exactly which factors drive the price model's prediction.</p>
      </div>

      <Card>
        <CardContent className="pt-6 flex flex-wrap gap-4 items-end">
          <div className="w-40">
            <label className="text-sm font-medium mb-1 block">Crop</label>
            <Select value={crop} onChange={(e) => setCrop(e.target.value)}>
              {CROPS.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </div>
          <div className="w-40">
            <label className="text-sm font-medium mb-1 block">Market</label>
            <Select value={market} onChange={(e) => setMarket(e.target.value)}>
              {Object.keys(MARKETS).map((m) => <option key={m} value={m}>{m}</option>)}
            </Select>
          </div>
          <Button onClick={run} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Explain Prediction
          </Button>
        </CardContent>
      </Card>

      {explanation && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Feature Contributions — {crop} @ {market}</CardTitle>
            <CardDescription>How much each factor pushes the predicted price up or down (₹/quintal)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {explanation.map((e, i) => {
              const positive = e.impact >= 0;
              const width = (Math.abs(e.impact) / maxAbs) * 100;
              return (
                <motion.div key={e.feature} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium flex items-center gap-1">
                      {positive ? <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" /> : <ArrowDownRight className="h-3.5 w-3.5 text-red-600" />}
                      {e.feature}
                    </span>
                    <span className={positive ? "text-emerald-600" : "text-red-600"}>
                      {positive ? "+" : ""}₹{e.impact.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${width}%` }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className={`h-full rounded-full ${positive ? "bg-emerald-500" : "bg-red-500"}`}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{e.explanation}</p>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
