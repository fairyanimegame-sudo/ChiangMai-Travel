"use client";

import type { Place } from "@/types/place";

type MapPlaceListProps = {
  places: Place[];
  selectedPlaceId?: string;
  onSelectPlace: (placeId: string) => void;
};

export default function MapPlaceList({
  places,
  selectedPlaceId,
  onSelectPlace,
}: MapPlaceListProps) {
  if (places.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center">
        <p className="text-sm text-[var(--color-muted)]">
          ไม่พบสถานที่ในหมวดนี้
        </p>
      </div>
    );
  }

  return (
    <div className="h-[400px] overflow-y-auto pr-1 md:h-[550px]">
      <div className="grid gap-3">
        {places.map((place) => {
          const isSelected = place.id === selectedPlaceId;

          return (
            <button
              key={place.id}
              type="button"
              onClick={() => onSelectPlace(place.id)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                isSelected
                  ? "border-[var(--color-primary)] bg-[var(--color-surface)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)]"
              } hover:border-[var(--color-primary)]`}
              aria-pressed={isSelected}
            >
              <h3 className="font-semibold text-[var(--color-text)]">
                {place.name}
              </h3>

              <p className="mt-1 text-sm text-[var(--color-muted)]">
                ⭐ {place.rating.toFixed(1)}
              </p>

              <p className="mt-2 text-xs text-[var(--color-muted)]">
                คลิกเพื่อดูตำแหน่งบนแผนที่
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}