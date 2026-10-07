"use client";

import { useEffect, /* useId */ useState } from "react";
import { fetchWeather, getWeatherInfo, getWeatherTip, type WeatherResponse } from "@/lib/weather";

type WeatherCardProps = {
  latitude: number;
  longitude: number;
};

/* type TabKey = "temp" | "rain" | "wind";
 */
/* type ChartPoint = {
  label: string;
  temp: number;
  rain: number;
  wind: number;
};
 */
/* const TABS: { key: TabKey; label: string }[] = [
  { key: "temp", label: "อุณหภูมิ" },
  { key: "rain", label: "โอกาสฝนตก" },
  { key: "wind", label: "ลม" },
]; */

const DAY_NAMES = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"];

/* const TAB_COLORS: Record<TabKey, string> = {
  temp: "#e8590c", // ส้มโคมล้านนา
  rain: "#3b82f6", // ฟ้าน้ำฝน
  wind: "#16a34a", // เขียวใบไม้
}; */

const cardClass =
  "rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[var(--color-surface)] p-[var(--space-4)] [box-shadow:var(--shadow-card)]";

/* =========================
   ฟังก์ชันช่วย
========================= */

/** แปลง "2026-10-06" → ลำดับวันในสัปดาห์ (0 = อาทิตย์) โดยไม่ผูกกับ timezone ของเครื่อง */
function getDayIndex(dateString: string): number {
  const [year, month, day] = dateString.slice(0, 10).split("-").map(Number);
  return new Date(year, month - 1, day).getDay();
}

/** index ของชั่วโมงปัจจุบันใน hourly.time */
function getNowIndex(weather: WeatherResponse): number {
  const nowHour = `${weather.current.time.slice(0, 13)}:00`;
  const index = weather.hourly.time.indexOf(nowHour);
  return index >= 0 ? index : 0;
}

/** จุดบนกราฟ ห่างกันทีละ 3 ชั่วโมง (วันนี้เริ่มจากตอนนี้ วันอื่นเริ่มจาก 00:00) */
/* function buildChartPoints(weather: WeatherResponse, dayIndex: number): ChartPoint[] {
  const { hourly } = weather;
  const isToday = dayIndex === 0;
  const start = isToday ? getNowIndex(weather) : dayIndex * 24;
  const count = isToday ? 9 : 8;

  const points: ChartPoint[] = [];

  for (let i = 0; i < count; i++) {
    const index = start + i * 3;

    if (index >= hourly.time.length) {
      break;
    }

    points.push({
      label: isToday && i === 0 ? "ตอนนี้" : hourly.time[index].slice(11, 16),
      temp: Math.round(hourly.temperature_2m[index]),
      rain: Math.round(hourly.precipitation_probability[index] ?? 0),
      wind: Math.round(hourly.wind_speed_10m[index]),
    });
  }

  return points;
}
 */
/** ทำเส้นโค้งนุ่ม ๆ ผ่านทุกจุด (Catmull-Rom → Bezier) */
/* function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) {
    return "";
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }

  return path;
}
 */
function formatWindUnit(unit: string): string {
  return unit === "km/h" ? "กม./ชม." : unit;
}

/* =========================
   กราฟเส้น (อุณหภูมิ / ลม)
========================= */

/* function LineChart({
  values,
  color,
  unitLabel,
}: {
  values: number[];
  color: string;
  unitLabel: string;
}) {
  const gradientId = `area-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const count = values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const TOP = 32;
  const BOTTOM = 88;

  const xs = values.map((_, i) => ((i + 0.5) / count) * 100);
  const ys = values.map((value) =>
    max === min ? 60 : BOTTOM - ((value - min) / (max - min)) * (BOTTOM - TOP),
  );

  // เติมจุดหัว-ท้ายให้เส้นยาวเต็มกรอบ
  const curve = smoothPath([
    { x: 0, y: ys[0] },
    ...xs.map((x, i) => ({ x, y: ys[i] })),
    { x: 100, y: ys[count - 1] },
  ]);

  return (
    <div className="relative h-28">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.03" />
          </linearGradient>
        </defs>

        <path d={`${curve} L 100 100 L 0 100 Z`} fill={`url(#${gradientId})`} />
        <path
          d={curve}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {values.map((value, i) => (
        <div key={i} className="absolute" style={{ left: `${xs[i]}%`, top: `${ys[i]}%` }}>
          <span
            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white"
            style={{ borderColor: color }}
            aria-hidden="true"
          />
          <span className="absolute -translate-x-1/2 -translate-y-[calc(100%+0.4rem)] whitespace-nowrap text-[11px] font-semibold text-[color:var(--color-text)]">
            {value}
            {unitLabel}
          </span>
        </div>
      ))}
    </div>
  );
}
 */
/* =========================
   กราฟแท่ง (โอกาสฝนตก)
========================= */

/* function RainBars({ values, color }: { values: number[]; color: string }) {
  return (
    <div className="flex h-28 items-end">
      {values.map((value, i) => (
        <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1 px-1">
          <span className="text-[11px] font-semibold text-[color:var(--color-text)]">{value}%</span>
          <div
            className="w-full max-w-8 rounded-t-xl"
            style={{
              height: `${Math.max(value, 5) * 0.72}%`,
              background: `linear-gradient(to top, ${color}, ${color}66)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
 */
/* =========================
   การ์ดสภาพอากาศ
========================= */

export default function WeatherCard({ latitude, longitude }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  /*   const [tab, setTab] = useState<TabKey>("temp");
  const [selectedDay, setSelectedDay] = useState(0);
 */
  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchWeather(latitude, longitude);

        if (!cancelled) {
          setWeather(data);
        }
      } catch {
        if (!cancelled) {
          setError("ไม่สามารถโหลดข้อมูลสภาพอากาศได้ กรุณาลองใหม่อีกครั้ง");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      cancelled = true;
    };
  }, [latitude, longitude, reloadKey]);

  /* ---------- กำลังโหลด ---------- */
  if (loading) {
    return (
      <section className="container py-[var(--space-4)]" aria-busy="true">
        <div className={`${cardClass} mx-auto max-w-3xl`}>
          <div className="animate-pulse space-y-[var(--space-2)]">
            <div className="h-16 rounded-[var(--radius-md)] bg-[color:var(--color-primary-soft)]" />
            <div className="h-28 rounded-[var(--radius-md)] bg-[color:var(--color-bg)]" />
          </div>
          <p className="mt-[var(--space-2)] text-xs text-[color:var(--color-muted)]">
            รอแป๊บเน้อ กำลังดูท้องฟ้าให้อยู่...
          </p>
        </div>
      </section>
    );
  }

  /* ---------- โหลดไม่สำเร็จ ---------- */
  if (error) {
    return (
      <section className="container py-[var(--space-4)]">
        <div className={`${cardClass} mx-auto max-w-3xl`}>
          <p role="alert" className="text-sm text-[color:var(--color-primary)]">
            {error}
          </p>
          <button
            type="button"
            onClick={() => setReloadKey((key) => key + 1)}
            className="mt-[var(--space-2)] rounded-[var(--radius-full)] bg-[color:var(--color-primary)] px-[var(--space-4)] py-[var(--space-1)] text-sm font-semibold text-white hover:bg-[color:var(--color-primary-dark)]"
          >
            ลองอีกครั้ง
          </button>
        </div>
      </section>
    );
  }

  if (!weather) {
    return null;
  }

  /* ---------- ข้อมูลปัจจุบัน ---------- */
  const { current, current_units: units /* daily */ } = weather;

  const nowIndex = getNowIndex(weather);
  const rainChanceNow = Math.round(weather.hourly.precipitation_probability[nowIndex] ?? 0);
  const info = getWeatherInfo(current.weather_code, current.is_day === 1);
  const tip = getWeatherTip({
    temperature: current.temperature_2m,
    rainChance: rainChanceNow,
    weatherCode: current.weather_code,
  });

  const nowDayName = DAY_NAMES[getDayIndex(current.time)];
  const nowClock = current.time.slice(11, 16);

  /* ---------- กราฟ ---------- */
  /*  const points = buildChartPoints(weather, selectedDay);
  const chartValues = points.map((point) => point[tab]);
  const chartColor = TAB_COLORS[tab]; */

  /*   const chartLabel: Record<TabKey, string> = {
    temp: `อุณหภูมิ (${units.temperature_2m})`,
    rain: "โอกาสฝนตก (%)",
    wind: `ความเร็วลม (${formatWindUnit(units.wind_speed_10m)})`,
  };
 */
  /*   const chartSummary = points.map((point) => `${point.label} ${point[tab]}`).join(", ");
   */
  const chipClass =
    "rounded-[var(--radius-full)] bg-white/70 px-[var(--space-2)] py-[var(--space-1)]";

  return (
    <section aria-busy="true" className="h-full">
      <div className={`${cardClass} h-full`}>
        {/* ===== อากาศตอนนี้ ===== */}
        <div
          className="rounded-[var(--radius-md)] p-[var(--space-3)] md:p-[var(--space-4)]"
          style={{ background: "linear-gradient(135deg, #fff3e0 0%, #ffe4e1 100%)" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-[var(--space-3)]">
            <div className="flex items-center gap-[var(--space-3)]">
              <span className="text-4xl leading-none" aria-hidden="true">
                {info.icon}
              </span>

              <p className="text-4xl font-bold leading-none text-[color:var(--color-text)]">
                {Math.round(current.temperature_2m)}
                <span className="ml-0.5 align-top text-base font-medium text-[color:var(--color-muted)]">
                  {units.temperature_2m}
                </span>
              </p>

              <div className="leading-tight">
                <p className="font-semibold text-[color:var(--color-primary)]">{info.label}</p>
                <p className="text-xs text-[color:var(--color-muted)]">
                  เชียงใหม่ · วัน{nowDayName} {nowClock} น.
                </p>
              </div>
            </div>

            <ul className="flex flex-wrap gap-[var(--space-2)] text-xs text-[color:var(--color-text)]">
              <li className={chipClass}>☔ {rainChanceNow}%</li>
              <li className={chipClass}>
                💧 {Math.round(current.relative_humidity_2m)}
                {units.relative_humidity_2m}
              </li>
              <li className={chipClass}>
                🍃 {Math.round(current.wind_speed_10m)} {formatWindUnit(units.wind_speed_10m)}
              </li>
            </ul>
          </div>

          <p className="mt-[var(--space-2)] text-sm text-[color:var(--color-text)]">{tip}</p>
        </div>
      </div>
    </section>
  );
}
