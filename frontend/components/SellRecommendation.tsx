"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Clock, TrendingUp } from "lucide-react";

interface SellRecommendationProps {
  crop: string;
}

type RecommendationType = "sell_now" | "wait" | "hold";

interface Recommendation {
  type: RecommendationType;
  confidence: number;
  reason: string;
  factors: string[];
  estimatedBestDay: string;
  potentialGain: number;
}

export default function SellRecommendation({ crop }: SellRecommendationProps) {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching recommendation from ML model
    setLoading(true);
    
    // Mock recommendation based on crop
    const mockRec: Recommendation = {
      type: Math.random() > 0.5 ? "sell_now" : "wait",
      confidence: Math.floor(Math.random() * 20) + 75,
      reason:
        Math.random() > 0.5
          ? `Current market prices for ${crop} are at a 3-month high. Market demand is strong.`
          : `Price forecasts show ${crop} prices may increase by 5-8% in the next 2-3 days.`,
      factors: [
        "Market demand is high",
        "Weather conditions favorable",
        `₹ price point is optimal for ${crop}`,
        "Low supply in your region"
      ],
      estimatedBestDay: new Date(Date.now() + Math.random() * 5 * 24 * 60 * 60 * 1000)
        .toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" }),
      potentialGain: Math.floor(Math.random() * 500) + 100
    };

    setRecommendation(mockRec);
    setLoading(false);
  }, [crop]);

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Analyzing market data...</div>;
  }

  if (!recommendation) {
    return <div className="text-center py-8 text-gray-500">Unable to generate recommendation</div>;
  }

  const getRecommendationDisplay = () => {
    switch (recommendation.type) {
      case "sell_now":
        return {
          title: "✅ SELL NOW",
          bgColor: "bg-green-50 border-green-300",
          textColor: "text-green-800",
          icon: <CheckCircle className="text-green-600" size={24} />,
          accentColor: "bg-green-100"
        };
      case "wait":
        return {
          title: "⏳ WAIT",
          bgColor: "bg-amber-50 border-amber-300",
          textColor: "text-amber-800",
          icon: <Clock className="text-amber-600" size={24} />,
          accentColor: "bg-amber-100"
        };
      default:
        return {
          title: "📊 HOLD",
          bgColor: "bg-blue-50 border-blue-300",
          textColor: "text-blue-800",
          icon: <TrendingUp className="text-blue-600" size={24} />,
          accentColor: "bg-blue-100"
        };
    }
  };

  const display = getRecommendationDisplay();

  return (
    <div className="space-y-4">
      {/* Main Recommendation */}
      <div className={`border-2 rounded-lg p-6 ${display.bgColor}`}>
        <div className="flex items-center gap-4 mb-4">
          {display.icon}
          <div>
            <h3 className={`text-2xl font-bold ${display.textColor}`}>{display.title}</h3>
            <p className={`text-sm ${display.textColor} opacity-75`}>
              {recommendation.confidence}% confidence
            </p>
          </div>
        </div>

        {/* Confidence Meter */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                recommendation.type === "sell_now"
                  ? "bg-green-600"
                  : recommendation.type === "wait"
                  ? "bg-amber-600"
                  : "bg-blue-600"
              }`}
              style={{ width: `${recommendation.confidence}%` }}
            ></div>
          </div>
        </div>

        {/* Reason */}
        <p className={`text-sm leading-relaxed ${display.textColor}`}>
          {recommendation.reason}
        </p>
      </div>

      {/* Key Factors */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
          <AlertCircle size={18} />
          Key Factors
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {recommendation.factors.map((factor, idx) => (
            <div key={idx} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
              <span className="text-green-600 font-bold text-lg leading-none mt-0.5">✓</span>
              <span className="text-gray-700 text-sm">{factor}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className={`${display.accentColor} rounded-lg p-4 text-center`}>
        <p className="text-xs text-gray-600 mb-1">Estimated Best Selling Day</p>
        <p className={`text-lg font-bold ${display.textColor}`}>{recommendation.estimatedBestDay}</p>
        <p className="text-xs text-gray-600 mt-1">
          Potential gain: ₹{recommendation.potentialGain}+
        </p>
      </div>

      {/* Action Button */}
      <button
        className={`w-full py-3 rounded-lg font-semibold text-white transition ${
          recommendation.type === "sell_now"
            ? "bg-green-600 hover:bg-green-700"
            : recommendation.type === "wait"
            ? "bg-amber-600 hover:bg-amber-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {recommendation.type === "sell_now"
          ? "View Buyers Near Me"
          : "Check Back Tomorrow"}
      </button>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 text-center bg-gray-50 p-3 rounded">
        This recommendation is AI-generated based on market data and should be considered alongside your own judgment.
      </p>
    </div>
  );
}
