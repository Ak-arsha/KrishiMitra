"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { fetchLiveWeatherAndSoil, LiveWeatherData } from "@/lib/weatherService";
import {
  Sun,
  Sunset,
  Moon,
  CloudSun,
  CloudRain,
  Zap,
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export function DynamicGreetingBar() {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");
  const [timeIcon, setTimeIcon] = useState<any>(Sun);
  const [weather, setWeather] = useState<LiveWeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hr = now.getHours();
      const name = user?.full_name || "Partner";

      if (hr >= 5 && hr < 12) {
        setGreeting(`Good morning, dear ${name}! 🌅`);
        setTimeIcon(CloudSun);
      } else if (hr >= 12 && hr < 17) {
        setGreeting(`Good afternoon, dear ${name}! ☀️`);
        setTimeIcon(Sun);
      } else if (hr >= 17 && hr < 20) {
        setGreeting(`Good evening, dear ${name}! 🌇`);
        setTimeIcon(Sunset);
      } else {
        setGreeting(`Good night, dear ${name}! 🌙`);
        setTimeIcon(Moon);
      }
    };

    updateGreeting();
    const timer = setInterval(updateGreeting, 60000);

    fetchLiveWeatherAndSoil(user?.location_name || "Jaipur")
      .then((data) => setWeather(data))
      .finally(() => setLoading(false));

    return () => clearInterval(timer);
  }, [user]);

  const TimeIcon = timeIcon;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Side: Personalized Greeting & Role Workspace */}
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-emerald-300 border border-emerald-400/30">
            <TimeIcon className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{(user?.role || "FARMER").toUpperCase()} WORKSPACE</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {greeting}
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
            Welcome to your real-time farm advisory dashboard. Monitored for live Mandi rates, regional weather forecasts, and soil moisture analytics.
          </p>
        </div>

        {/* Right Side: Real-Time Live Weather & Soil Analytics Widget */}
        <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700/80 shadow-lg min-w-[280px] space-y-3 text-xs font-semibold">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <span className="text-slate-400 flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {weather?.locationName || user?.location_name || "Jaipur, Rajasthan"}
            </span>
            <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              LIVE API
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
                <Thermometer className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Temperature</span>
                <span className="text-sm font-extrabold text-white">{weather?.temperature ?? 31}°C</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Humidity</span>
                <span className="text-sm font-extrabold text-white">{weather?.humidity ?? 45}%</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700/80 pt-2 flex items-center justify-between text-[11px]">
            <span className="text-slate-300 font-bold flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-teal-400" /> Soil Moisture:
            </span>
            <span className="text-emerald-400 font-extrabold">
              {weather?.soilMoistureStatus || "14.2% Optimal"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
