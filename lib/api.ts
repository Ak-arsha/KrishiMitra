import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- Typed endpoint helpers ----

export const registerUser = (payload: any) => api.post("/api/auth/register", payload);
export const loginUser = (payload: any) => api.post("/api/auth/login", payload);
export const googleLoginUser = (payload: any) => api.post("/api/auth/google", payload);

// Farmer Dashboard
export const getFarmerDashboard = () => api.get("/api/farmer/dashboard");
export const getMarketPrices = (location?: string) => 
  api.get("/api/farmer/market-prices", { params: { location } });
export const getPriceForecast = (crop: string) => 
  api.get(`/api/farmer/price-forecast/${crop}`);
export const getSellRecommendation = (crop: string, location?: string) =>
  api.get(`/api/farmer/sell-recommendation/${crop}`, { params: { location } });
export const getCropSuggestions = (query: string, limit: number = 10) =>
  api.get("/api/farmer/crops/suggestions", { params: { query, limit } });

export const getSellAdvice = (payload: {
  crop: string;
  quantity_quintal: number;
  quality_grade: string;
  market: string;
  state: string;
}) => api.post("/api/sell-advisor/advise", payload);

export const getBuyerMatches = (payload: {
  crop: string;
  quantity_quintal: number;
  quality_grade: string;
  latitude: number;
  longitude: number;
  max_distance_km: number;
}) => api.post("/api/buyers/match", payload);

export const getMarketFeed = (market: string, state: string, crops?: string) =>
  api.get("/api/market/feed", { params: { market, state, crops } });

export const getNewsSummary = (crop: string) =>
  api.get("/api/market/news-summary", { params: { crop } });

export const getStorageAdvice = (payload: {
  crop: string;
  quantity_quintal: number;
  harvest_date: string;
  current_price: number;
  predicted_price_30d?: number;
}) => api.post("/api/storage/advise", payload);

export const getMspComparison = (crop: string, market: string, state: string) =>
  api.get("/api/msp/compare", { params: { crop, market, state } });

export const getExplainability = (crop: string, market: string, state: string) =>
  api.get("/api/explainable/breakdown", { params: { crop, market, state } });

export const askVoiceAssistant = (payload: { query: string; crop?: string; market?: string; state?: string }) =>
  api.post("/api/voice/ask", payload);
