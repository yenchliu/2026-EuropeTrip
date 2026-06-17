import { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, Loader2 } from "lucide-react";

interface WeatherWidgetProps {
  lat: number;
  lon: number;
  dateStr: string; // formatted as YYYY-MM-DD
}

export function WeatherWidget({ lat, lon, dateStr }: WeatherWidgetProps) {
  const [temp, setTemp] = useState<number | null>(null);
  const [condition, setCondition] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Open-Meteo supports up to 16 days of forecast. Check if date is within range.
        const targetDate = new Date(dateStr);
        const today = new Date();
        const diffTime = targetDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < -90 || diffDays > 15) {
          // Out of range (we only handle recent past and near future)
          if (isMounted) {
            setTemp(null);
            setLoading(false);
          }
          return;
        }

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,weathercode&timezone=auto&start_date=${dateStr}&end_date=${dateStr}`;
        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error("Weather API Error");
        }

        const data = await res.json();

        if (isMounted && data.daily && data.daily.temperature_2m_max?.length > 0) {
          setTemp(data.daily.temperature_2m_max[0]);
          setCondition(data.daily.weathercode[0]);
        }
      } catch (err) {
        console.error("Failed to fetch weather", err);
        if (isMounted) {
          setTemp(null); // Clear or leave null on error
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchWeather();
    return () => { isMounted = false; };
  }, [lat, lon, dateStr]);

  if (loading) {
    return (
      <div className="flex flex-col items-end opacity-50">
        <Loader2 className="w-4 h-4 animate-spin text-[#8C8A82] mb-1" />
        <span className="text-[8px] text-[#8C8A82] font-bold tracking-widest uppercase">載入中</span>
      </div>
    );
  }

  if (temp === null) return null;

  // WMO Weather interpretation codes
  // 0: Clear sky
  // 1, 2, 3: Mainly clear, partly cloudy, and overcast
  // 45, 48: Fog
  // 51-55: Drizzle
  // 61-65: Rain
  const isRain = condition !== null && (condition >= 51 && condition <= 65 || condition >= 80);
  const isCloudy = condition !== null && (condition === 3 || condition === 45 || condition === 48);

  const Icon = isRain ? CloudRain : isCloudy ? Cloud : Sun;
  const weatherText = isRain ? "雨天" : isCloudy ? "多雲" : "晴朗";

  return (
    <div className="flex flex-col items-end">
      <span className="text-xl font-light text-[#1A1A1A]">{temp}°C</span>
      <div className="flex items-center gap-1">
        <Icon className="w-3 h-3 text-[#8C8A82]" />
        <span className="text-[10px] text-[#8C8A82] font-bold tracking-widest uppercase">{weatherText}</span>
      </div>
    </div>
  );
}
