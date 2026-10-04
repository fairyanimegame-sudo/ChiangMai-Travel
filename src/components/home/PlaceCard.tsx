import Image from "next/image";
import type { Place } from "@/types/place";

type PlaceCardProps = {
  place: Place;
  /** ใส่ค่าเฉพาะการ์ดในส่วน "มาแรงตอนนี้" เพื่อแสดงป้ายอันดับ (Optional) */
  rank?: number;
};

// สไตล์ทั้งหมดอ้างอิง design tokens ใน globals.css (var(--color-*), var(--space-*), var(--radius-*))
export default function PlaceCard({ place, rank }: PlaceCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[var(--color-surface)] [box-shadow:var(--shadow-card)] transition-transform duration-200 hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full bg-[var(--color-primary-soft)]">
        <Image
          src={place.image}
          alt={place.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {rank !== undefined && (
          <span
            aria-label={`อันดับ ${rank}`}
            className="absolute left-[var(--space-3)] top-[var(--space-3)] flex h-8 min-w-8 items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-primary)] px-[var(--space-2)] text-sm font-bold text-white [box-shadow:var(--shadow-card)]"
          >
            {rank}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-[var(--space-1)] p-[var(--space-4)]">
        <h3 className="text-base font-semibold leading-snug text-[color:var(--color-text)]">
          {place.name}
        </h3>
        <p className="flex-1 text-sm text-[color:var(--color-muted)]">{place.category}</p>
        <p className="mt-[var(--space-2)] flex items-center gap-[var(--space-1)] text-sm font-medium text-[color:var(--color-text)]">
          <span aria-hidden="true" className="text-[color:var(--color-star)]">
            ★
          </span>
          {place.rating.toFixed(1)}
        </p>
      </div>
    </article>
  );
}
