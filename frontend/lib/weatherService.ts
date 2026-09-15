export interface LiveWeatherData {
  locationName: string;
  latitude: number;
  longitude: number;
  temperature: number;
  humidity: number;
  weatherCode: number;
  weatherDescription: string;
  conditionCategory: "clear" | "cloudy" | "rain" | "thunderstorm";
  isDay: boolean;
  windSpeed: number;
  soilMoisturePct: number;
  soilMoistureStatus: string;
  timestamp: string;
}

export const CITY_COORDINATES: Record<string, { lat: number; lon: number }> = {
  jaipur: { lat: 26.9124, lon: 75.7873 },
  kota: { lat: 25.2138, lon: 75.8648 },
  indore: { lat: 22.7196, lon: 75.8577 },
  bhopal: { lat: 23.2599, lon: 77.4126 },
  ludhiana: { lat: 30.9010, lon: 75.8573 },
  amritsar: { lat: 31.6340, lon: 74.8723 },
  lucknow: { lat: 26.8467, lon: 80.9462 },
  kanpur: { lat: 26.4499, lon: 80.3319 },
  nashik: { lat: 19.9975, lon: 73.7898 },
  pune: { lat: 18.5204, lon: 73.8567 },
  delhi: { lat: 28.6139, lon: 77.2090 },
};

export function parseWeatherCode(code: number): { description: string; category: "clear" | "cloudy" | "rain" | "thunderstorm" } {
  if (code === 0) return { description: "Clear Sky", category: "clear" };
  if (code >= 1 && code <= 3) return { description: "Partly Cloudy", category: "cloudy" };
  if (code >= 45 && code <= 48) return { description: "Foggy", category: "cloudy" };
  if (code >= 51 && code <= 67) return { description: "Light to Moderate Rain", category: "rain" };
  if (code >= 80 && code <= 82) return { description: "Rain Showers", category: "rain" };
  if (code >= 95 && code <= 99) return { description: "Thunderstorm with Heavy Rain", category: "thunderstorm" };
  return { description: "Favorable Farm Weather", category: "clear" };
}

export async function fetchLiveWeatherAndSoil(locationName?: string, customLat?: number, customLon?: number): Promise<LiveWeatherData> {
  const cityKey = (locationName || "Jaipur").toLowerCase();
  let coords = CITY_COORDINATES[cityKey] || CITY_COORDINATES.jaipur;

  for (const k of Object.keys(CITY_COORDINATES)) {
    if (cityKey.includes(k)) {
      coords = CITY_COORDINATES[k];
      break;
    }
  }

  const lat = customLat ?? coords.lat;
  const lon = customLon ?? coords.lon;

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || process.env.WEATHER_API_KEY;

  try {
    if (API_KEY && API_KEY !== "your_api_key_here") {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
      if (res.ok) {
        const data = await res.json();
        const mainCond = (data.weather?.[0]?.main || "").toLowerCase();
        let cat: "clear" | "cloudy" | "rain" | "thunderstorm" = "clear";
        if (mainCond.includes("rain") || mainCond.includes("drizzle")) cat = "rain";
        if (mainCond.includes("thunder")) cat = "thunderstorm";
        if (mainCond.includes("cloud")) cat = "cloudy";

        return {
          locationName: locationName || data.name || "Jaipur",
          latitude: lat,
          longitude: lon,
          temperature: Math.round(data.main?.temp ?? 31),
          humidity: data.main?.humidity ?? 45,
          weatherCode: 0,
          weatherDescription: data.weather?.[0]?.description || "Clear Sky",
          conditionCategory: cat,
          isDay: true,
          windSpeed: Math.round((data.wind?.speed ?? 3.5) * 3.6),
          soilMoisturePct: 14.5,
          soilMoistureStatus: "14.5% Optimal Soil Moisture",
          timestamp: new Date().toISOString(),
        };
      }
    }

    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m,soil_moisture_0_to_7cm&timezone=auto`;
    const res = await fetch(openMeteoUrl);
    if (res.ok) {
      const data = await res.json();
      const curr = data.current || {};
      const code = curr.weather_code ?? 0;
      const parsed = parseWeatherCode(code);
      const rawSoil = curr.soil_moisture_0_to_7cm ?? 0.14;
      const soilPct = Math.round(rawSoil > 1 ? rawSoil : rawSoil * 100 * 10) / 10;
      const soilStatus = soilPct > 20 ? `${soilPct}% High Moisture` : soilPct < 8 ? `${soilPct}% Dry Soil` : `${soilPct}% Optimal Soil Moisture`;

      return {
        locationName: locationName || "Jaipur, Rajasthan",
        latitude: lat,
        longitude: lon,
        temperature: Math.round(curr.temperature_2m ?? 31),
        humidity: curr.relative_humidity_2m ?? 42,
        weatherCode: code,
        weatherDescription: parsed.description,
        conditionCategory: parsed.category,
        isDay: curr.is_day === 1,
        windSpeed: Math.round(curr.wind_speed_10m ?? 12),
        soilMoisturePct: soilPct,
        soilMoistureStatus: soilStatus,
        timestamp: new Date().toISOString(),
      };
    }
  } catch (err) {
    console.warn("Live weather service fallback engaged:", err);
  }

  return {
    locationName: locationName || "Jaipur, Rajasthan",
    latitude: lat,
    longitude: lon,
    temperature: 31,
    humidity: 45,
    weatherCode: 0,
    weatherDescription: "Sunny / Clear Sky",
    conditionCategory: "clear",
    isDay: true,
    windSpeed: 12,
    soilMoisturePct: 14.2,
    soilMoistureStatus: "14.2% Optimal Soil Moisture",
    timestamp: new Date().toISOString(),
  };
}
