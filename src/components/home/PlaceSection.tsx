import Link from "next/link";
import type { Place } from "@/types/place";
import PlaceCard, { EXPLORE_PATH } from "./PlaceCard";

// ---------- Derived data ----------
// คำนวณจากรายการ places ชุดเดียว ไม่เก็บข้อมูลซ้ำแยกตามหัวข้อ
// หน้าอื่นเรียกใช้ได้เลย เช่น <PlaceSection places={getTrendingPlaces(places, 4)} />

/** มาแรงตอนนี้: เฉพาะที่มี trendingRank เรียงจากอันดับ 1 ขึ้นไป */
export function getTrendingPlaces(places: Place[], limit?: number): Place[] {
  const trending = places
    .filter((place) => place.trendingRank !== undefined)
    .sort((a, b) => (a.trendingRank ?? 0) - (b.trendingRank ?? 0));
  return limit === undefined ? trending : trending.slice(0, limit);
}

/** แนะนำห้ามพลาด: เฉพาะที่ isRecommended เป็น true */
export function getRecommendedPlaces(places: Place[], limit?: number): Place[] {
  const recommended = places.filter((place) => place.isRecommended === true);
  return limit === undefined ? recommended : recommended.slice(0, limit);
}

type PlaceSectionProps = {
  title: string;
  subtitle: string;
  places: Place[];
  /** true = แสดงป้ายอันดับจาก place.trendingRank (ใช้กับ "มาแรงตอนนี้") */
  showRank?: boolean;
  /** ปลายทางของลิงก์ "ดูทั้งหมด" ค่าเริ่มต้น EXPLORE_PATH (เส้นทางเดียวกับลิงก์ของการ์ด) */
  viewAllHref?: string;
  /** กำหนดลิงก์ของแต่ละการ์ดเอง ถ้าไม่ส่งมา PlaceCard จะใช้ {EXPLORE_PATH}/{id} */
  placeHref?: (place: Place) => string;
};

// สไตล์ทั้งหมดอ้างอิง design tokens ใน globals.css และใช้ class .container สำหรับความกว้างหน้า
export default function PlaceSection({
  title,
  subtitle,
  places,
  showRank = false,
  viewAllHref = EXPLORE_PATH,
  placeHref,
}: PlaceSectionProps) {
  if (places.length === 0) return null;

  return (
    <section className="container py-[var(--space-8)]">
      <div className="mb-[var(--space-4)] flex items-end justify-between gap-[var(--space-4)]">
        <div>
          <h2 className="text-2xl font-bold text-[color:var(--color-text)]">{title}</h2>
          <p className="text-sm text-[color:var(--color-muted)]">{subtitle}</p>
        </div>
        <Link
          href={viewAllHref}
          className="shrink-0 text-sm font-medium text-[color:var(--color-primary)]! hover:text-[color:var(--color-primary-dark)]! hover:underline"
        >
          ดูทั้งหมด →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2 sm:gap-[var(--space-6)] lg:grid-cols-4">
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            rank={showRank ? place.trendingRank : undefined}
            href={placeHref?.(place)}
          />
        ))}
      </div>
    </section>
  );
}
