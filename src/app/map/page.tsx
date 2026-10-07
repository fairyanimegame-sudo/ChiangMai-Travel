"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { places } from "@/data/places";
import MapPlaceList from "@/app/map/MapPlaceList";

const PlaceMap = dynamic(() => import("@/app/map/PlaceMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] md:h-[550px]">
      กำลังโหลดแผนที่...
    </div>
  ),
});

export default function MapPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const placeParam = searchParams.get("place");

  const [clickedPlaceId, setClickedPlaceId] = useState<string>();

  const selectedPlaceId = clickedPlaceId ?? placeParam ?? undefined;
  /* useEffect(() => {
    if (placeParam) {
      setClickedPlaceId(placeParam);
    }
  }, [placeParam]); */

  const filteredPlaces = category
    ? places.filter((place) => place.categoryId === category)
    : places;

  return (
    <main className="mx-auto w-full max-w-7xl p-4 md:p-6">
      <h1 className="mb-4 text-2xl font-bold">แผนที่เชียงใหม่</h1>

      <div className="grid gap-4 md:grid-cols-[1fr_320px]">
        <PlaceMap places={filteredPlaces} selectedPlaceId={selectedPlaceId} />

        <MapPlaceList
          places={filteredPlaces}
          selectedPlaceId={selectedPlaceId}
          onSelectPlace={setClickedPlaceId}
        />
      </div>
    </main>
  );
}
