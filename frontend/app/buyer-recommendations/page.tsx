"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select, Badge } from "@/components/ui/form-elements";
import { getBuyerMatches } from "@/lib/api";
import { CROPS } from "@/lib/utils";
import { Loader2, MapPin, Star } from "lucide-react";

export default function BuyerRecommendationsPage() {
  const [form, setForm] = useState({
    crop: "Wheat",
    quantity_quintal: 20,
    quality_grade: "A",
    latitude: 26.9124,
    longitude: 75.7873,
    max_distance_km: 100,
  });
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<any[] | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getBuyerMatches(form);
      setMatches(res.data.matches);
    } catch (e: any) {
      setError(e?.response?.data?.detail || "Could not fetch buyer matches. Register a buyer account first, or check the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Buyer Recommendation Engine</h1>
        <p className="text-muted-foreground">Geo-spatial matching between your listing and nearby registered buyers.</p>
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
            <label className="text-sm font-medium mb-1 block">Quality Grade</label>
            <Select value={form.quality_grade} onChange={(e) => setForm({ ...form, quality_grade: e.target.value })}>
              <option value="A">A (Best)</option><option value="B">B</option><option value="C">C</option>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Your Latitude</label>
            <Input type="number" step="0.0001" value={form.latitude}
              onChange={(e) => setForm({ ...form, latitude: Number(e.target.value) })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Your Longitude</label>
            <Input type="number" step="0.0001" value={form.longitude}
              onChange={(e) => setForm({ ...form, longitude: Number(e.target.value) })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Max Distance (km)</label>
            <Input type="number" value={form.max_distance_km}
              onChange={(e) => setForm({ ...form, max_distance_km: Number(e.target.value) })} />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <Button onClick={handleSubmit} disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Find Buyers
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {matches && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {matches.length === 0 && (
            <p className="text-sm text-muted-foreground col-span-full">
              No buyers found in range. Register a buyer account with a location to see matches here.
            </p>
          )}
          {matches.map((m, i) => (
            <motion.div key={m.buyer_id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{m.buyer_name}</CardTitle>
                    <Badge variant="success"><Star className="h-3 w-3 mr-1 inline" />{(m.match_score * 100).toFixed(0)}%</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {m.distance_km} km away
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                  <p className="text-sm">Est. price: <span className="font-semibold">₹{m.estimated_price_per_quintal.toLocaleString()}/quintal</span></p>
                  <p className="text-xs text-muted-foreground">{m.reason}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
