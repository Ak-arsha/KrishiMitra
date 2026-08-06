"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MarketPrice {
  crop: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  unit: string;
}

interface MarketPricesProps {
  location?: string;
}

// Mock data - in production, this would come from an API
const MOCK_PRICES: MarketPrice[] = [
  { crop: "Rice", currentPrice: 4500, previousPrice: 4400, change: 2.3, unit: "₹/quintal" },
  { crop: "Wheat", currentPrice: 2200, previousPrice: 2150, change: 2.3, unit: "₹/quintal" },
  { crop: "Maize", currentPrice: 1900, previousPrice: 1850, change: 2.7, unit: "₹/quintal" },
  { crop: "Cotton", currentPrice: 5800, previousPrice: 6000, change: -3.7, unit: "₹/kg" },
  { crop: "Sugarcane", currentPrice: 3100, previousPrice: 3050, change: 1.6, unit: "₹/quintal" },
  { crop: "Tomato", currentPrice: 2800, previousPrice: 3000, change: -6.7, unit: "₹/quintal" },
  { crop: "Onion", currentPrice: 1800, previousPrice: 1950, change: -7.7, unit: "₹/quintal" },
  { crop: "Potato", currentPrice: 1200, previousPrice: 1150, change: 4.3, unit: "₹/quintal" },
];

export default function MarketPrices({ location }: MarketPricesProps) {
  const [prices, setPrices] = useState<MarketPrice[]>(MOCK_PRICES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In production, fetch from API
    // const fetchPrices = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await fetch(`/api/market/prices?location=${location}`);
    //     const data = await response.json();
    //     setPrices(data);
    //   } catch (error) {
    //     console.error("Failed to fetch prices:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchPrices();
    setLoading(false);
  }, [location]);

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getPriceChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp size={16} className="inline mr-1" />;
    if (change < 0) return <TrendingDown size={16} className="inline mr-1" />;
    return <Minus size={16} className="inline mr-1" />;
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading market prices...</div>;
  }

  return (
    <div className="space-y-3">
      <div className="text-sm text-gray-600 mb-4">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {prices.map(price => (
          <div
            key={price.crop}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition bg-white"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-800">{price.crop}</h4>
                <p className="text-xs text-gray-500">{price.unit}</p>
              </div>
              <div className={`text-sm font-semibold ${getPriceChangeColor(price.change)}`}>
                {getPriceChangeIcon(price.change)}
                {price.change > 0 ? "+" : ""}{price.change.toFixed(1)}%
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold text-gray-800">{price.currentPrice}</p>
                <p className="text-xs text-gray-400 line-through">{price.previousPrice}</p>
              </div>
              <div className="text-right text-xs text-gray-500">
                <div>Change:</div>
                <div className={getPriceChangeColor(price.change)}>
                  ₹{Math.abs(price.currentPrice - price.previousPrice)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-xs text-gray-500 text-center pt-4 border-t">
        Prices are indicative and based on local market data
      </div>
    </div>
  );
}
