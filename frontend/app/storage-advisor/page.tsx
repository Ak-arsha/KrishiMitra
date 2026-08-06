"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select, Badge } from "@/components/ui/form-elements";
import { getStorageAdvice } from "@/lib/api";
import { CROPS } from "@/lib/utils";
import { Loader2, Warehouse, PackageX, PackageCheck } from "lucide-react";

export default function StorageAdvisorPage() {
  const [form, setForm] = useState({
    crop: "Onion",
    quantity_quintal: 15,
    harvest_date: new Date().toISOString().slice(0, 10),
    current_price: 1500,
    predicted_price_30d: 1650,
  });
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<any>(null);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await getStorageAdvice(form);
      setAdvice(res.data);
    } finally {
      setLoading(false);
    }
  };

  const recMeta: Record<string, { label: string; color: "success" | "warning" | "danger"; icon: any }> = {
    store: { label: "Store It", color: "success", icon: PackageCheck },
    partial_store: { label: "Store Partially", color: "warning", icon: Warehouse },
    sell_immediately: { label: "Sell Immediately", color: "danger", icon: PackageX },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Storage Advisor</h1>
        <p className="text-muted-foreground">Should you store your harvest or sell it right away?</p>
      </div>

      <Card>
        <CardContent className="pt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="text-sm font-medium mb-1 block">Crop</label>
            <Select value={form.crop} onChange={(e) => setForm({ ...form, crop: e.target.value })}>
              {CROPS.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Quantity (quintal)</label>
            <Input type="number" value={form.quantity_quintal}
              onChange={(e) => setForm({ ...form, quantity_quintal: Number(e.target.value) })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Harvest Date</label>
            <Input type="date" value={form.harvest_date}
              onChange={(e) => setForm({ ...form, harvest_date: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Current Price (₹/quintal)</label>
            <Input type="number" value={form.current_price}
              onChange={(e) => setForm({ ...form, current_price: Number(e.target.value) })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Predicted Price in 30 days (₹/quintal)</label>
            <Input type="number" value={form.predicted_price_30d}
              onChange={(e) => setForm({ ...form, predicted_price_30d: Number(e.target.value) })} />
          </div>
          <div className="flex items-end">
            <Button onClick={submit} disabled={loading} className="w-full">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Get Storage Advice
            </Button>
          </div>
        </CardContent>
      </Card>

      {advice && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              {(() => {
                const meta = recMeta[advice.recommendation] || recMeta.sell_immediately;
                const Icon = meta.icon;
                return (
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    <CardTitle>{meta.label}</CardTitle>
                    <Badge variant={meta.color}>{advice.recommendation.replace("_", " ")}</Badge>
                  </div>
                );
              })()}
              <CardDescription>{advice.reasoning}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-xs text-muted-foreground">Estimated storage cost</p>
                <p className="text-xl font-semibold">₹{advice.estimated_storage_cost.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-xs text-muted-foreground">Spoilage risk</p>
                <p className="text-xl font-semibold">{advice.estimated_spoilage_risk_pct}%</p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-xs text-muted-foreground">Projected net gain if stored</p>
                <p className={`text-xl font-semibold ${advice.projected_gain_if_stored >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                  ₹{advice.projected_gain_if_stored.toLocaleString()}
                </p>
              </div>
              <p className="sm:col-span-3 text-xs text-muted-foreground">
                Suggested facility: {advice.nearest_warehouse_suggestion}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
