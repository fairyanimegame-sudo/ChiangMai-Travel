// src/app/explore/[id]/page.tsx
import { getPlaceById, filterPlaces } from "@/lib/places";
import { places } from "@/data/places";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export function generateMetadata({ params }: { params: { id: string } }) {
  const place = getPlaceById(params.id);
  return { title: place ? `${place.name} - Nihao Chiang Mai` : "ไม่พบสถานที่" };
}

export default function PlaceDetailPage({ params }: { params: { id: string } }) {
  const place = getPlaceById(params.id);

  if (!place) {
    notFound();
  }

  const similarPlaces = filterPlaces(places, { categoryId: place.categoryId })
    .filter((p) => p.id !== place.id)
    .slice(0, 3);

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <div className="relative w-full h-[300px] md:h-[500px] mb-8">
        <Image
          src={`/images/places/${place.id}.jpg`}
          alt={place.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <h1 className="text-4xl font-bold mb-2">{place.name}</h1>
      <p className="text-[var(--color-primary)] font-medium mb-4">
        หมวดหมู่: {place.categoryId} | คะแนน: {place.rating}
      </p>

      <p className="text-lg leading-relaxed mb-8">{place.description}</p>

      <div className="flex flex-wrap gap-4 mb-12">
        <Link
          href={`/planner?places=${place.id}`}
          className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-[var(--radius-full)] font-medium"
        >
          เพิ่มในแผนทริป
        </Link>
        <Link
          href={`/map?place=${place.id}`}
          className="border-2 border-[var(--color-primary)] text-[var(--color-primary)] px-6 py-3 rounded-[var(--radius-full)] font-medium"
        >
          ดูบนแผนที่
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-6">สถานที่ที่คล้ายกัน</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {similarPlaces.map((sp) => (
          <div key={sp.id} className="border p-4 rounded shadow bg-white">
            <h3 className="font-bold">{sp.name}</h3>
          </div>
        ))}
      </div>
    </main>
  );
}
