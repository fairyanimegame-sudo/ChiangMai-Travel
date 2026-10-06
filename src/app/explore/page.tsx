import { places } from "@/data/places";
import { filterPlaces, sortPlaces } from "@/lib/places";
import ExploreFilters from "@/components/explore/ExploreFilters";
import PlaceCard from "@/components/home/PlaceCard";

type ExplorePageProps = {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
};

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const { q, category, sort } = await searchParams;

  const filtered = filterPlaces(places, { q, categoryId: category });
  const results = sortPlaces(filtered, sort);

  return (
    <main className="container py-[var(--space-8)]">
      <h1 className="text-2xl font-bold">สำรวจสถานที่</h1>

      <ExploreFilters />

      <p className="mb-[var(--space-4)] text-[color:var(--color-muted)]">
        พบผลลัพธ์ {results.length} รายการ
      </p>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-4">
          {results.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      ) : (
        <p className="py-[var(--space-8)] text-center">ไม่พบสถานที่ที่ตรงกับเงื่อนไข</p>
      )}
    </main>
  );
}
