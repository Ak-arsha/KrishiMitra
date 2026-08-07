"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getMarketPrices } from "@/lib/api";

interface MarketPrice {
  crop: string;
  current_price: number;
  previous_price: number;
  change_percent: number;
  change_amount: number;
  unit: string;
}

interface MarketPricesProps {
  location?: string;
}

export default function MarketPrices({ location }: MarketPricesProps) {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      try {
        const response = await getMarketPrices(location);
        setPrices(response.data.prices || []);
      } catch (error) {
        console.error("Failed to fetch prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
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

  if (!prices.length) {
    return <div className="text-center py-8 text-gray-500">No market price data available right now.</div>;
  }

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
              <div className={`text-sm font-semibold ${getPriceChangeColor(price.change_percent)}`}>
                {getPriceChangeIcon(price.change_percent)}
                {price.change_percent > 0 ? "+" : ""}{price.change_percent.toFixed(1)}%
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold text-gray-800">{price.current_price}</p>
                <p className="text-xs text-gray-400 line-through">{price.previous_price}</p>
              </div>
              <div className="text-right text-xs text-gray-500">
                <div>Change:</div>
                <div className={getPriceChangeColor(price.change_percent)}>
                  ₹{Math.abs(price.change_amount)}
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
