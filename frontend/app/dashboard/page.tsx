"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, MapPin, Leaf, AlertCircle, Calendar } from "lucide-react";
import CropInput from "@/components/CropInput";
import MarketPrices from "@/components/MarketPrices";
import PriceForecast from "@/components/PriceForecast";
import SellRecommendation from "@/components/SellRecommendation";
import { getFarmerDashboard } from "@/lib/api";

interface Farmer {
  id: string;
  full_name: string;
  email: string;
  location_name: string;
  latitude: number;
  longitude: number;
}

export default function FarmerDashboard() {
  const router = useRouter();
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const loadDashboard = async () => {
      try {
        const response = await getFarmerDashboard();
        setFarmer(response.data.farmer || null);
        localStorage.setItem("farmer", JSON.stringify(response.data.farmer));
      } catch (error) {
        console.error("Failed to load dashboard", error);
        const farmerData = localStorage.getItem("farmer");
        if (farmerData) {
          setFarmer(JSON.parse(farmerData));
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [router]);

  const handleCropSelected = (crop: string) => {
    setSelectedCrop(crop);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {farmer?.full_name || "Farmer"}! 🌾
          </h1>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={18} />
            <span>{farmer?.location_name || "Location"}</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Crop Input & Recommendation */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Crop Input */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Leaf size={24} />
                    Tell us about your crop
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Type or speak to get personalized insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <CropInput onCropSelected={handleCropSelected} />
                </CardContent>
              </Card>

              {/* Sell Recommendation */}
              {selectedCrop && (
                <Card className="border-0 shadow-lg border-l-4 border-l-amber-500">
                  <CardHeader className="bg-amber-50">
                    <CardTitle className="flex items-center gap-2 text-amber-800">
                      <TrendingUp size={20} />
                      Sell Recommendation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <SellRecommendation crop={selectedCrop} />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right Column - Market Prices & Forecast */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Market Prices */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-lg">
                  <CardTitle>📊 Market Prices Today</CardTitle>
                  <CardDescription className="text-blue-100">
                    Real-time prices for common crops in your region
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <MarketPrices location={farmer?.location_name} />
                </CardContent>
              </Card>

              {/* Price Forecast */}
              {selectedCrop && (
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar size={20} />
                      5-Day Price Forecast
                    </CardTitle>
                    <CardDescription className="text-purple-100">
                      Predicted prices for {selectedCrop} over the next 5 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <PriceForecast crop={selectedCrop} location={farmer?.location_name} />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <Card className="border-0 shadow-lg bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <AlertCircle size={20} />
              💡 Smart Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Check weather forecasts before selling</li>
              <li>✓ Monitor market volatility in your region</li>
              <li>✓ Use voice input for quick crop updates</li>
              <li>✓ Compare prices across nearby markets</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
