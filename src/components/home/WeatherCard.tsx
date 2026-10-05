"use client";

import { useEffect, useState } from "react";
import { fetchWeather, type WeatherResponse } from "@/lib/weather";

type WeatherCardProps = {
  latitude: number;
  longitude: number;
};

const cardClass =
  "rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[var(--color-surface)] p-[var(--space-4)] [box-shadow:var(--shadow-card)]";

function Stat({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div>
      <dt className="text-sm text-[color:var(--color-muted)]">{label}</dt>
      <dd className="text-lg font-semibold text-[color:var(--color-text)]">
        {value} <span className="text-sm font-normal text-[color:var(--color-muted)]">{unit}</span>
      </dd>
    </div>
  );
}

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
      <section className={cardClass} aria-busy="true">
        <h2 className="text-lg font-bold text-[color:var(--color-text)]">สภาพอากาศ</h2>
        <p className="mt-[var(--space-2)] text-sm text-[color:var(--color-muted)]">
          กำลังโหลดข้อมูลสภาพอากาศ...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={cardClass}>
        <h2 className="text-lg font-bold text-[color:var(--color-text)]">สภาพอากาศ</h2>
        <p role="alert" className="mt-[var(--space-2)] text-sm text-[color:var(--color-primary)]">
          {error}
        </p>
      </section>
    );
  }

  if (!weather) {
    return null;
  }

  const { current, current_units: units } = weather;

  return (
    <section className={cardClass}>
      <h2 className="text-lg font-bold text-[color:var(--color-text)]">สภาพอากาศ</h2>

      <dl className="mt-[var(--space-4)] grid grid-cols-2 gap-[var(--space-4)]">
        <Stat label="อุณหภูมิ" value={current.temperature_2m} unit={units.temperature_2m} />
        <Stat
          label="รู้สึกเหมือน"
          value={current.apparent_temperature}
          unit={units.apparent_temperature}
        />
        <Stat
          label="ความชื้น"
          value={current.relative_humidity_2m}
          unit={units.relative_humidity_2m}
        />
        <Stat label="ความเร็วลม" value={current.wind_speed_10m} unit={units.wind_speed_10m} />
      </dl>
    </section>
  );
}
