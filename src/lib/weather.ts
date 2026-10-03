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
});

/**
 * Type ของข้อมูลสภาพอากาศ
 */
export type WeatherResponse = z.infer<typeof WeatherResponseSchema>;

export type CurrentWeather = z.infer<typeof CurrentWeatherSchema>;

/**
 * ดึงข้อมูลสภาพอากาศจาก Open-Meteo API
 */
export async function fetchWeather(
  latitude: number,
  longitude: number
): Promise<WeatherResponse> {
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
    ].join(",")
  );

  url.searchParams.set("timezone", "auto");

  const response = await fetch(url.toString());

  // ตรวจสอบ HTTP response ก่อนอ่าน JSON
  if (!response.ok) {
    throw new Error(
      `Weather API request failed: ${response.status} ${response.statusText}`
    );
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