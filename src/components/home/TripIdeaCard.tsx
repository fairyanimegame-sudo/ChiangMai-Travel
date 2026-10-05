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
    <article className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/15 dark:bg-zinc-900">
      <div className="relative aspect-[4/3] w-full bg-zinc-200 dark:bg-zinc-800">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-zinc-900">
          {trip.icon} {trip.duration}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold">{trip.title}</h3>
        <p className="flex-1 text-sm text-zinc-600 dark:text-zinc-400">{trip.description}</p>
        <p className="text-sm text-zinc-500">{trip.stops.length} จุดแวะ</p>
        <Link
          href={buildPlanHref(trip)}
          className="mt-2 rounded-full bg-green-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-green-700"
        >
          ใช้แผนนี้
        </Link>
      </div>
    </article>
  );
}
