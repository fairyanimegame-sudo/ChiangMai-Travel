import Image from "next/image";
import Link from "next/link";
import type { TripIdea } from "@/types/trip";

type TripIdeaCardProps = {
  trip: TripIdea;
};

// path หน้าแผนเที่ยว ต้องตกลงกับทีมก่อน (ตอนนี้ใช้ /plan ชั่วคราว)
const PLAN_PATH = "/plan";

function buildPlanHref(trip: TripIdea): string {
  const params = new URLSearchParams({
    trip: trip.id,
    places: trip.placeIds.join(","),
  });
  return `${PLAN_PATH}?${params.toString()}`;
}

export default function TripIdeaCard({ trip }: TripIdeaCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[var(--color-surface)] [box-shadow:var(--shadow-card)]">
      <div className="relative aspect-[4/3] w-full bg-[var(--color-primary-soft)]">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute left-[var(--space-3)] top-[var(--space-3)] rounded-[var(--radius-full)] bg-[var(--color-surface)] px-[var(--space-3)] py-[var(--space-1)] text-sm font-medium text-[color:var(--color-text)] [box-shadow:var(--shadow-card)]">
          {trip.icon} {trip.duration}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-[var(--space-2)] p-[var(--space-4)]">
        <h3 className="text-lg font-semibold text-[color:var(--color-text)]">{trip.title}</h3>
        <p className="flex-1 text-sm text-[color:var(--color-muted)]">{trip.description}</p>
        <p className="text-sm text-[color:var(--color-muted)]">{trip.stops.length} จุดแวะ</p>
        <Link
          href={buildPlanHref(trip)}
          className="mt-[var(--space-2)] rounded-[var(--radius-full)] bg-[var(--color-primary)] px-[var(--space-4)] py-[var(--space-2)] text-center text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-dark)]"
        >
          ใช้แผนนี้
        </Link>
      </div>
    </article>
  );
}