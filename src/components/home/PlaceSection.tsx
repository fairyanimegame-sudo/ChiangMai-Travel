import Link from "next/link";
import type { Place } from "@/types/place";
import PlaceCard from "./PlaceCard";
 

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
  showRank?: boolean;
 
  viewAllHref?: string;
};
 
export default function PlaceSection({
  title,
  subtitle,
  places,
  showRank = false,
  viewAllHref = "/places", /** ปลายทางของลิงก์ "ดูทั้งหมด" (/places หรือจะใช้อะไรแล้วแต่เลย) */
}: PlaceSectionProps) {
  if (places.length === 0) return null;
 
  return (
    <section>
      <div>
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <Link href={viewAllHref}>ดูทั้งหมด</Link>
      </div>
 
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {places.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            rank={showRank ? place.trendingRank : undefined}
          />
        ))}
      </div>
    </section>
  );
}
 

// ยังไม่ตกแต่ง (ยังไม่ได้ตกแต่ง className / สไตล์) ให้เพื่อนเติมเองได้ Tailwind