"use client";

import React, { useEffect, useState } from "react";
import { fetchLiveWeatherAndSoil, LiveWeatherData } from "@/lib/weatherService";
import { useAuth } from "@/app/context/AuthContext";

export function DynamicAtmosphere() {
  const { user } = useAuth();
  const [hour, setHour] = useState<number>(12);
  const [weatherData, setWeatherData] = useState<LiveWeatherData | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setHour(now.getHours());
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);

    fetchLiveWeatherAndSoil(user?.location_name || "Jaipur").then((data) => {
      setWeatherData(data);
    });

    return () => clearInterval(interval);
  }, [user]);

  // Determine Time of Day Period
  const isMorning = hour >= 6 && hour < 12;
  const isAfternoon = hour >= 12 && hour < 17;
  const isEvening = hour >= 17 && hour < 20;
  const isNight = hour >= 20 || hour < 6;

  const category = weatherData?.conditionCategory || "clear";

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none transition-all duration-1000">
      {/* 1. ATMOSPHERIC TIME-OF-DAY GRADIENT OVERLAY */}
      {isMorning && (
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100/40 via-orange-50/20 to-transparent transition-opacity duration-1000" />
      )}

      {isAfternoon && (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/30 via-amber-50/20 to-transparent transition-opacity duration-1000" />
      )}

      {isEvening && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-100/30 to-orange-400/25 transition-opacity duration-1000" />
      )}

      {isNight && (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-indigo-950/20 to-slate-900/10 transition-opacity duration-1000" />
      )}

      {/* 2. DYNAMIC SUN / MOON POSITIONING */}

      {/* MORNING SUN (Top-Left / Top-Center) */}
      {isMorning && (
        <div className="absolute top-[8%] left-[18%] -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-tr from-amber-400/40 to-yellow-300/30 blur-2xl animate-pulse" />
      )}

      {/* AFTERNOON SUN (Top High Zenith) */}
      {isAfternoon && (
        <div className="absolute top-[4%] left-[50%] -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-tr from-yellow-300/35 to-amber-200/25 blur-3xl" />
      )}

      {/* EVENING SUNSET SUN (Moving Down to Bottom with Rich Orange Glow) */}
      {isEvening && (
        <div className="absolute bottom-[6%] right-[20%] w-72 h-72 rounded-full bg-gradient-to-t from-orange-600/45 via-amber-500/35 to-red-500/20 blur-3xl animate-pulse" />
      )}

      {/* NIGHT MOON & TWINKLE DOTS */}
      {isNight && (
        <>
          <div className="absolute top-[10%] right-[12%] w-32 h-32 rounded-full bg-slate-200/20 blur-xl" />
          <div className="absolute top-[12%] right-[14%] w-10 h-10 rounded-full bg-amber-100/40 shadow-[0_0_20px_rgba(251,191,36,0.3)]" />
          <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-white/40 rounded-full animate-ping" />
          <div className="absolute top-[35%] left-[75%] w-1 h-1 bg-white/30 rounded-full animate-pulse" />
          <div className="absolute top-[15%] left-[45%] w-1.5 h-1.5 bg-amber-200/50 rounded-full animate-pulse" />
        </>
      )}

      {/* 3. SUBTLE WEATHER OVERLAYS (Rain & Thunderstorm) */}
      {category === "rain" && (
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(148,163,184,0.4)_50%,transparent_100%)] bg-[length:2px_40px] animate-rain" />
        </div>
      )}

      {category === "thunderstorm" && (
        <div className="absolute inset-0 bg-purple-500/5 animate-thunderstorm-flash pointer-events-none" />
      )}

      {/* BOTTOM EVENING SUNSET HORIZON BAR */}
      {isEvening && (
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-orange-500/25 via-amber-500/15 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
