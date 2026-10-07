import { z } from "zod";

/**
 * Schema สำหรับข้อมูลสภาพอากาศจาก Open-Meteo
 *
 * อ้างอิงโครงสร้าง response จาก Open-Meteo Forecast API
 */
const CurrentWeatherSchema = z.object({
  time: z.string(),
  interval: z.number(),
  temperature_2m: z.number(),
  relative_humidity_2m: z.number(),
  apparent_temperature: z.number(),
  is_day: z.number(),
  weather_code: z.number(),
  wind_speed_10m: z.number(),
});

/** พยากรณ์รายชั่วโมง (เริ่มที่ 00:00 ของวันนี้ ต่อเนื่อง 8 วัน) */
const HourlyWeatherSchema = z.object({
  time: z.array(z.string()),
  temperature_2m: z.array(z.number()),
  // ช่วงท้าย ๆ ของพยากรณ์ API อาจส่ง null มา
  precipitation_probability: z.array(z.number().nullable()),
  wind_speed_10m: z.array(z.number()),
});

/** พยากรณ์รายวัน 8 วัน (วันนี้ + อีก 7 วัน) */
const DailyWeatherSchema = z.object({
  time: z.array(z.string()),
  weather_code: z.array(z.number()),
  temperature_2m_max: z.array(z.number()),
  temperature_2m_min: z.array(z.number()),
  precipitation_probability_max: z.array(z.number().nullable()),
});

const WeatherResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
  current: CurrentWeatherSchema,
  current_units: z.object({
    time: z.string(),
    interval: z.string(),
    temperature_2m: z.string(),
    relative_humidity_2m: z.string(),
    apparent_temperature: z.string(),
    is_day: z.string(),
    weather_code: z.string(),
    wind_speed_10m: z.string(),
  }),
  hourly: HourlyWeatherSchema,
  daily: DailyWeatherSchema,
});

/**
 * Type ของข้อมูลสภาพอากาศ
 */
export type WeatherResponse = z.infer<typeof WeatherResponseSchema>;

export type CurrentWeather = z.infer<typeof CurrentWeatherSchema>;

export type HourlyWeather = z.infer<typeof HourlyWeatherSchema>;

export type DailyWeather = z.infer<typeof DailyWeatherSchema>;

/**
 * ดึงข้อมูลสภาพอากาศจาก Open-Meteo API
 */
export async function fetchWeather(latitude: number, longitude: number): Promise<WeatherResponse> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.searchParams.set("latitude", latitude.toString());
  url.searchParams.set("longitude", longitude.toString());

  url.searchParams.set(
    "current",
    [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "weather_code",
      "wind_speed_10m",
    ].join(","),
  );

  url.searchParams.set(
    "hourly",
    ["temperature_2m", "precipitation_probability", "wind_speed_10m"].join(","),
  );

  url.searchParams.set(
    "daily",
    [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
    ].join(","),
  );

  url.searchParams.set("forecast_days", "8");
  url.searchParams.set("timezone", "auto");

  const response = await fetch(url.toString());

  // ตรวจสอบ HTTP response ก่อนอ่าน JSON
  if (!response.ok) {
    throw new Error(`Weather API request failed: ${response.status} ${response.statusText}`);
  }

  const data: unknown = await response.json();

  // ตรวจสอบข้อมูลด้วย Zod
  const result = WeatherResponseSchema.safeParse(data);

  if (!result.success) {
    console.error("Invalid weather API response:", result.error);
    throw new Error("Invalid weather API response");
  }

  return result.data;
}

/* =========================
   แปลง weather_code → ไอคอน + คำอธิบายภาษาไทย
   (รหัสตาม WMO ที่ Open-Meteo ใช้)
========================= */

export type WeatherInfo = {
  icon: string;
  label: string;
};

export function getWeatherInfo(code: number, isDay = true): WeatherInfo {
  if (code === 0) {
    return isDay ? { icon: "☀️", label: "ฟ้าใส แดดสวย" } : { icon: "🌙", label: "ฟ้าโปร่ง ดาวสวย" };
  }
  if (code === 1) {
    return isDay ? { icon: "🌤️", label: "ท้องฟ้าโปร่ง" } : { icon: "🌙", label: "ท้องฟ้าโปร่ง" };
  }
  if (code === 2) {
    return { icon: "⛅", label: "มีเมฆบางส่วน" };
  }
  if (code === 3) {
    return { icon: "☁️", label: "เมฆครึ้ม" };
  }
  if (code === 45 || code === 48) {
    return { icon: "🌫️", label: "หมอกลงบาง ๆ" };
  }
  if (code >= 51 && code <= 57) {
    return { icon: "🌦️", label: "ฝนปรอย ๆ" };
  }
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return { icon: "🌧️", label: "ฝนตก" };
  }
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    return { icon: "❄️", label: "หนาวจัด" };
  }
  if (code >= 95) {
    return { icon: "⛈️", label: "ฝนฟ้าคะนอง" };
  }
  return { icon: "🌤️", label: "อากาศดี" };
}

/**
 * ข้อความเตือนน่ารัก ๆ สไตล์คนเหนือ ตามสภาพอากาศตอนนี้
 */
export function getWeatherTip(params: {
  temperature: number;
  rainChance: number;
  weatherCode: number;
}): string {
  const { temperature, rainChance, weatherCode } = params;

  if (weatherCode >= 95) {
    return "ฝนฟ้าคะนอง อยู่ในที่ร่มก่อนเน้อ ⚡";
  }
  if (rainChance >= 50 || (weatherCode >= 51 && weatherCode <= 67) || weatherCode >= 80) {
    return "พกร่มไปด้วยเน้อ ฝนอาจมาแบบไม่บอกก่อน ☔";
  }
  if (temperature >= 35) {
    return "แดดแรงเน้อ ทาครีมกันแดดแล้วดื่มน้ำเยอะ ๆ 🧴";
  }
  if (temperature <= 20) {
    return "อากาศเย็นสบาย พกเสื้อคลุมไปด้วยเน้อ 🧣";
  }
  if (rainChance >= 30) {
    return "อาจมีฝนบ้าง พกร่มพับเล็ก ๆ ไว้ก็อุ่นใจเน้อ 🌂";
  }
  return "อากาศกำลังดี ออกไปเดินเล่นกันเน้อ 🏮";
}
