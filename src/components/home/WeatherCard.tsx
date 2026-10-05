"use client";

import { useEffect, useState } from "react";
import { fetchWeather, type WeatherResponse } from "@/lib/weather";

type WeatherCardProps = {
  latitude: number;
  longitude: number;
};

export default function WeatherCard({ latitude, longitude }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchWeather(latitude, longitude);
        setWeather(data);
      } catch {
        setError("ไม่สามารถโหลดข้อมูลสภาพอากาศได้ กรุณาลองใหม่อีกครั้ง");
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [latitude, longitude]);

  if (loading) {
    return (
      <section>
        <h2>สภาพอากาศ</h2>
        <p>กำลังโหลดข้อมูลสภาพอากาศ...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h2>สภาพอากาศ</h2>
        <p>{error}</p>
      </section>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <section>
      <h2>สภาพอากาศ</h2>

      <p>
        อุณหภูมิ {weather.current.temperature_2m} {weather.current_units.temperature_2m}
      </p>

      <p>
        ความชื้น {weather.current.relative_humidity_2m} {weather.current_units.relative_humidity_2m}
      </p>

      <p>
        อุณหภูมิที่รู้สึก {weather.current.apparent_temperature}{" "}
        {weather.current_units.apparent_temperature}
      </p>

      <p>
        ความเร็วลม {weather.current.wind_speed_10m} {weather.current_units.wind_speed_10m}
      </p>
    </section>
  );
}
