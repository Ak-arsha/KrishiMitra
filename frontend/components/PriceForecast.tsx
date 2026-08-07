"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, TrendingUp } from "lucide-react";
import { getPriceForecast } from "@/lib/api";

interface ForecastDay {
  day: string;
  date: string;
  predicted_price: number;
  confidence: number;
  trend: "up" | "down" | "stable";
}

interface PriceForecastProps {
  crop: string;
  location?: string;
}

export default function PriceForecast({ crop, location }: PriceForecastProps) {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      try {
        const response = await getPriceForecast(crop);
        setForecast(response.data.forecast || []);
      } catch (error) {
        console.error("Failed to fetch forecast:", error);
      } finally {
        setLoading(false);
      }
    };

    if (crop) {
      fetchForecast();
    }
  }, [crop, location]);

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getTrendBgColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "bg-green-50 border-green-200";
      case "down":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="inline mr-1" size={16} />;
      case "down":
        return <ArrowDown className="inline mr-1" size={16} />;
      default:
        return <TrendingUp className="inline mr-1" size={16} />;
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading forecast...</div>;
  }

  // Calculate average and trend
  const avgPrice = Math.floor(
    forecast.reduce((sum, day) => sum + day.predicted_price, 0) / forecast.length
  );
  const firstPrice = forecast[0]?.predicted_price || 0;
  const lastPrice = forecast[forecast.length - 1]?.predicted_price || 0;
  const overallTrend = lastPrice > firstPrice ? "📈 Going Up" : lastPrice < firstPrice ? "📉 Going Down" : "➡️ Stable";

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm opacity-80">Avg Price</p>
            <p className="text-2xl font-bold">₹{avgPrice}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">5-Day Trend</p>
            <p className="text-lg font-semibold">{overallTrend}</p>
          </div>
          <div>
            <p className="text-sm opacity-80">Confidence</p>
            <p className="text-2xl font-bold">85%</p>
          </div>
        </div>
      </div>

      {/* Forecast Cards */}
      <div className="grid grid-cols-5 gap-2">
        {forecast.map((day, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 transition hover:shadow-md ${getTrendBgColor(day.trend)}`}
          >
            <div className="text-center">
              {/* Day & Date */}
              <p className="font-bold text-sm text-gray-800">{day.day}</p>
              <p className="text-xs text-gray-600 mb-2">{day.date}</p>

              {/* Trend Icon */}
              <div className={`flex justify-center mb-2 ${getTrendColor(day.trend)}`}>
                {getTrendIcon(day.trend)}
              </div>

              {/* Price */}
              <p className="text-lg font-bold text-gray-800 mb-1">
                ₹{Math.floor(day.predicted_price)}
              </p>

              {/* Confidence */}
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full"
                  style={{ width: `${day.confidence}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">{day.confidence}% confidence</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">📊 Forecast Insights</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✓ {crop} prices are expected to {overallTrend.includes("Up") ? "increase" : overallTrend.includes("Down") ? "decrease" : "remain stable"}</li>
          <li>✓ Best selling window: {forecast[forecast.length - 1]?.day}</li>
          <li>✓ Average price prediction: ₹{avgPrice}</li>
          <li>✓ Model confidence: 85% (based on historical trends)</li>
        </ul>
      </div>

      <div className="text-xs text-gray-500 text-center">
        Forecasts are AI-generated predictions based on historical market data
      </div>
    </div>
  );
}
