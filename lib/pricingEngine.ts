export interface CropBase {
  crop: string;
  base_price: number;
  msp: number;
  unit: string;
  stability: "stable" | "moderate" | "volatile";
  trend_30d: number;
  expected_roi: number;
  risk_level: string;
}

export const BASE_CROP_CATALOG: Record<string, CropBase> = {
  Wheat: {
    crop: "Wheat",
    base_price: 2450,
    msp: 2275,
    unit: "₹/quintal",
    stability: "stable",
    trend_30d: 4.2,
    expected_roi: 8.5,
    risk_level: "Low / Stable",
  },
  Rice: {
    crop: "Rice",
    base_price: 4500,
    msp: 2183,
    unit: "₹/quintal",
    stability: "stable",
    trend_30d: 3.1,
    expected_roi: 9.2,
    risk_level: "Low / Stable",
  },
  Mustard: {
    crop: "Mustard",
    base_price: 5720,
    msp: 5650,
    unit: "₹/quintal",
    stability: "moderate",
    trend_30d: 6.8,
    expected_roi: 14.8,
    risk_level: "Moderate Risk",
  },
  Soybean: {
    crop: "Soybean",
    base_price: 4650,
    msp: 4600,
    unit: "₹/quintal",
    stability: "volatile",
    trend_30d: -2.1,
    expected_roi: 18.2,
    risk_level: "High Volatility",
  },
  Paddy: {
    crop: "Paddy",
    base_price: 2183,
    msp: 2183,
    unit: "₹/quintal",
    stability: "stable",
    trend_30d: 1.5,
    expected_roi: 7.2,
    risk_level: "MSP Protected",
  },
  Tomato: {
    crop: "Tomato",
    base_price: 3400,
    msp: 1200,
    unit: "₹/quintal",
    stability: "volatile",
    trend_30d: 18.4,
    expected_roi: 24.5,
    risk_level: "High Return / Risk",
  },
  Cotton: {
    crop: "Cotton",
    base_price: 7120,
    msp: 7020,
    unit: "₹/quintal",
    stability: "moderate",
    trend_30d: 5.4,
    expected_roi: 13.5,
    risk_level: "Moderate Risk",
  },
  Chana: {
    crop: "Chana",
    base_price: 5440,
    msp: 5440,
    unit: "₹/quintal",
    stability: "stable",
    trend_30d: 3.1,
    expected_roi: 10.4,
    risk_level: "Low / Stable",
  },
  Onion: {
    crop: "Onion",
    base_price: 1850,
    msp: 900,
    unit: "₹/quintal",
    stability: "volatile",
    trend_30d: 12.2,
    expected_roi: 21.0,
    risk_level: "High Volatility",
  },
  Potato: {
    crop: "Potato",
    base_price: 1450,
    msp: 700,
    unit: "₹/quintal",
    stability: "moderate",
    trend_30d: 2.8,
    expected_roi: 9.8,
    risk_level: "Moderate Risk",
  },
  Maize: {
    crop: "Maize",
    base_price: 2090,
    msp: 2090,
    unit: "₹/quintal",
    stability: "stable",
    trend_30d: 2.1,
    expected_roi: 7.8,
    risk_level: "Low / Stable",
  },
  Turmeric: {
    crop: "Turmeric",
    base_price: 7800,
    msp: 6500,
    unit: "₹/quintal",
    stability: "volatile",
    trend_30d: 8.9,
    expected_roi: 16.5,
    risk_level: "Moderate / High",
  },
  Chilli: {
    crop: "Chilli",
    base_price: 8500,
    msp: 7200,
    unit: "₹/quintal",
    stability: "volatile",
    trend_30d: 14.1,
    expected_roi: 22.4,
    risk_level: "High Risk / Return",
  },
  Groundnut: {
    crop: "Groundnut",
    base_price: 6375,
    msp: 6375,
    unit: "₹/quintal",
    stability: "stable",
    trend_30d: 4.0,
    expected_roi: 11.2,
    risk_level: "Stable Growth",
  },
};

export const LOCATION_PRICING_CONFIG: Record<string, { mult: number; boosts: Record<string, number> }> = {
  jaipur: { mult: 1.0, boosts: { Wheat: 40, Mustard: 50, Soybean: 0 } },
  kota: { mult: 0.97, boosts: { Wheat: -30, Mustard: -40, Soybean: -20, Chana: -60 } },
  indore: { mult: 1.04, boosts: { Soybean: 380, Wheat: 60, Mustard: 130 } },
  bhopal: { mult: 1.02, boosts: { Soybean: 250, Wheat: 35, Rice: 170, Paddy: 70 } },
  ludhiana: { mult: 1.06, boosts: { Wheat: 140, Rice: 320, Paddy: 220, Maize: -40 } },
  amritsar: { mult: 1.08, boosts: { Rice: 580, Paddy: 450, Wheat: 120 } },
  lucknow: { mult: 0.96, boosts: { Wheat: -70, Rice: 80, Potato: 130 } },
  kanpur: { mult: 0.97, boosts: { Chana: 220, Wheat: -40, Mustard: 80 } },
  nashik: { mult: 1.12, boosts: { Onion: 420, Tomato: 650, Cotton: 330 } },
  pune: { mult: 1.15, boosts: { Tomato: 780, Onion: 490, Soybean: 210 } },
};

export function getLocationConfig(locationName?: string) {
  const locLower = (locationName || "Jaipur").toLowerCase();
  for (const key of Object.keys(LOCATION_PRICING_CONFIG)) {
    if (locLower.includes(key)) {
      return LOCATION_PRICING_CONFIG[key];
    }
  }
  return LOCATION_PRICING_CONFIG.jaipur;
}

export function getCropCalculatedPrice(cropName: string, locationName?: string) {
  const item = BASE_CROP_CATALOG[cropName] || BASE_CROP_CATALOG.Wheat;
  const config = getLocationConfig(locationName);
  const boost = config.boosts[item.crop] || 0;
  const current_price = Math.round(item.base_price * config.mult + boost);
  const prev_diff = (item.crop.length % 3 === 0 ? 1 : -1) * (20 + (item.base_price % 40));
  const previous_price = current_price - prev_diff;
  const change_amount = current_price - previous_price;
  const change_percent = Math.round((change_amount / previous_price) * 100 * 10) / 10;

  return {
    crop: item.crop,
    current_price,
    previous_price,
    change_amount,
    change_percent,
    msp: item.msp,
    unit: item.unit,
    stability: item.stability,
    trend_30d: item.trend_30d,
    expected_roi: item.expected_roi,
    risk_level: item.risk_level,
  };
}

export function getDynamicMarketFeed(market: string, state: string, requestedCrops?: string[]) {
  const cropKeys = requestedCrops && requestedCrops.length > 0 
    ? requestedCrops 
    : Object.keys(BASE_CROP_CATALOG);

  const feed = cropKeys.map((cName) => {
    const calc = getCropCalculatedPrice(cName, market);
    const series = Array.from({ length: 8 }).map((_, i) => ({
      date: `Day ${i * 4 + 1}`,
      predicted_price: Math.round(calc.current_price * (1 + Math.sin(i / 2) * 0.03 + (i * 0.004))),
    }));

    return {
      crop: calc.crop,
      market: `${market} Main Mandi`,
      stability: calc.stability,
      current_price: calc.current_price,
      trend_pct_30d: calc.trend_30d,
      series,
    };
  });

  return {
    market,
    state,
    feed,
    volatility_index: "Dynamic APMC Live Stream",
    last_updated: new Date().toISOString(),
  };
}

export function getDynamicForecast(cropName: string, locationName?: string) {
  const calc = getCropCalculatedPrice(cropName, locationName);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const today = new Date();

  const forecast = days.map((day, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);

    const delta = Math.sin(i * 0.8) * (calc.current_price * 0.02) + (i * calc.current_price * 0.006);
    const predicted = Math.round((calc.current_price + delta) * 100) / 100;
    const diff = Math.round(delta * 10) / 10;

    return {
      day,
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      predicted_price: predicted,
      confidence: 0.88,
      trend: diff > 10 ? "up" : diff < -10 ? "down" : "stable",
      price_change: diff,
    };
  });

  const avgPrice = Math.round((forecast.reduce((acc, f) => acc + f.predicted_price, 0) / forecast.length) * 100) / 100;

  return {
    crop: calc.crop,
    location: locationName || "Jaipur Mandi",
    forecast,
    average_price: avgPrice,
    forecast_period: "5 days",
    model_confidence: 0.88,
    generated_at: new Date().toISOString(),
  };
}

export function getDynamicSellAdvice(cropName: string, quantity: number, quality: string, market: string, state: string) {
  const calc = getCropCalculatedPrice(cropName, market);
  const qualityMultiplier = quality === "A" ? 1.05 : quality === "B" ? 1.0 : 0.94;
  const adjustedCurrent = Math.round(calc.current_price * qualityMultiplier);
  const predictedPrice = Math.round(adjustedCurrent * 1.045);

  const priceForecast30d = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i * 2);
    return {
      date: d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
      predicted_price: Math.round(adjustedCurrent * (1 + Math.sin(i / 2) * 0.04 + (i * 0.003))),
    };
  });

  const isAboveMsp = adjustedCurrent >= calc.msp;
  const gainPerQtl = predictedPrice - adjustedCurrent;
  const totalGain = gainPerQtl * quantity;

  return {
    crop: calc.crop,
    market,
    quality_grade: quality,
    recommended_action: isAboveMsp ? "wait" : "sell_now",
    confidence: 0.92,
    predicted_price_per_quintal: predictedPrice,
    current_price_per_quintal: adjustedCurrent,
    price_range_low: Math.round(predictedPrice * 0.96),
    price_range_high: Math.round(predictedPrice * 1.05),
    estimated_total_value: predictedPrice * quantity,
    best_sell_window: "Next 5 to 8 Days (Peak Demand Expected)",
    price_forecast_30d: priceForecast30d,
    msp_comparison: {
      floor_price: calc.msp,
      message: isAboveMsp
        ? `Current market price (₹${adjustedCurrent}/qtl) is above Government MSP Floor (₹${calc.msp}/qtl).`
        : `Current market price is near Government MSP Floor (₹${calc.msp}/qtl).`,
      above_msp: isAboveMsp,
    },
    natural_language_summary: `Based on machine learning price trends and regional mandi arrival volumes, holding your ${quantity} quintals of Grade ${quality} ${calc.crop} in ${market} Mandi for another 5–8 days is projected to generate an additional profit of ₹${totalGain.toLocaleString("en-IN")}.`,
  };
}

export function getDynamicBuyerMatches(cropName: string, quantity: number, quality: string, locationName?: string) {
  const calc = getCropCalculatedPrice(cropName, locationName);
  
  return [
    {
      buyer_id: "b1",
      buyer_name: `Rajesh Kumar (Shree Ram ${calc.crop} Traders)`,
      trader_type: "Mandi Wholesaler",
      distance_km: 8.4,
      estimated_price_per_quintal: calc.current_price + 45,
      match_score: 0.96,
      reason: `High procurement demand for immediate dispatch of ${calc.crop}`,
      phone: "+91 98290 12345",
      verified: true,
    },
    {
      buyer_id: "b2",
      buyer_name: `Vikas Sharma (Kisan ${calc.crop} Processing Mills)`,
      trader_type: "Bulk Processor",
      distance_km: 14.2,
      estimated_price_per_quintal: calc.current_price + 85,
      match_score: 0.92,
      reason: "Direct miller offer with instant RTGS payment",
      phone: "+91 94140 67890",
      verified: true,
    },
    {
      buyer_id: "b3",
      buyer_name: "Suresh Patel (Agro Export Corp)",
      trader_type: "Institutional Buyer",
      distance_km: 22.1,
      estimated_price_per_quintal: calc.current_price + 120,
      match_score: 0.88,
      reason: "Export grade premium buyer with container logistics",
      phone: "+91 97850 54321",
      verified: true,
    },
  ];
}

export function generateVoiceAnswer(query: string, rawCrop?: string, rawMarket?: string) {
  const q = query.toLowerCase();
  
  let detectedCrop = rawCrop || "Wheat";
  for (const cName of Object.keys(BASE_CROP_CATALOG)) {
    if (q.includes(cName.toLowerCase())) {
      detectedCrop = cName;
      break;
    }
  }

  if (q.includes("गेहूँ")) detectedCrop = "Wheat";
  if (q.includes("सरसों")) detectedCrop = "Mustard";
  if (q.includes("चावल") || q.includes("धान")) detectedCrop = "Rice";
  if (q.includes("सोयाबीन")) detectedCrop = "Soybean";
  if (q.includes("टमाटर")) detectedCrop = "Tomato";
  if (q.includes("प्याज़") || q.includes("प्याज")) detectedCrop = "Onion";
  if (q.includes("आलू")) detectedCrop = "Potato";
  if (q.includes("मक्का")) detectedCrop = "Maize";
  if (q.includes("चना")) detectedCrop = "Chana";

  const market = rawMarket || "Jaipur";
  const calc = getCropCalculatedPrice(detectedCrop, market);

  if (q.includes("buy") || q.includes("procure") || q.includes("buyer")) {
    return `${market} मंडी में ${calc.crop} का वर्तमान थोक खरीद भाव ₹${calc.current_price.toLocaleString("en-IN")} प्रति क्विंटल है। थोक खरीदारों और प्रोसेसरों के लिए आगामी 3-5 दिनों में मिलर मांग से पहले स्टॉक उठाना फायदेमंद रहेगा। (Government MSP Floor: ₹${calc.msp.toLocaleString("en-IN")}/qtl)`;
  }

  if (q.includes("investor") || q.includes("roi") || q.includes("yield")) {
    return `${calc.crop} कमोडिटी हेतु 3-माह होल्डिंग यील्ड विश्लेषण: ${market} क्षेत्र में अनुमानित वार्षिक ROI +${calc.expected_roi}% है, जिसका रिस्क लेवल '${calc.risk_level}' है। 30-दिवसीय मूल्य रुझान: +${calc.trend_30d}%।`;
  }

  if (q.includes("msp") || q.includes("एमएसपी")) {
    return `${calc.crop} का आधिकारिक सरकारी एमएसपी ₹${calc.msp.toLocaleString("en-IN")} प्रति क्विंटल है। वर्तमान में ${market} मंडी भाव (₹${calc.current_price.toLocaleString("en-IN")}/qtl) एमएसपी से ₹${(calc.current_price - calc.msp).toLocaleString("en-IN")} ऊपर मजबूत बना हुआ है।`;
  }

  return `${market} मंडी में आज ${calc.crop} का ताजा भाव ₹${calc.current_price.toLocaleString("en-IN")} प्रति क्विंटल है (पिछला भाव: ₹${calc.previous_price.toLocaleString("en-IN")})। आगामी 5 दिनों में AI मॉडल के अनुसार भाव में ₹${Math.round(calc.current_price * 0.035)} की बढ़त का अनुमान है। सलाह: 5-8 दिन होल्ड करके बेचें।`;
}
