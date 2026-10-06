import type { Place } from "@/types/place";

type StartTripButtonProps = {
  places: Place[];
};

const MAX_STOPS = 10;

function buildDirectionsUrl(places: Place[]): string {
  const stops = places.slice(0, MAX_STOPS);
  const destination = stops[stops.length - 1];
  const waypoints = stops.slice(0, -1);

  const params = new URLSearchParams({
    api: "1",
    destination: `${destination.lat},${destination.lng}`,
    travelmode: "driving",
    dir_action: "navigate",
  });

  if (waypoints.length > 0) {
    params.set("waypoints", waypoints.map((p) => `${p.lat},${p.lng}`).join("|"));
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export default function StartTripButton({ places }: StartTripButtonProps) {
  if (places.length === 0) return null;

  return (
    <div className="grid gap-[var(--space-2)]">
      <a
        href={buildDirectionsUrl(places)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-fit items-center gap-[var(--space-2)] rounded-[var(--radius-full)] bg-[var(--color-primary)] px-[var(--space-6)] py-[var(--space-2)] font-medium text-white hover:bg-[var(--color-primary-dark)]"
      >
        <span aria-hidden="true">🧭</span>
        เริ่มนำทาง
      </a>
      {places.length > MAX_STOPS && (
        <p className="text-sm text-[color:var(--color-muted)]">
          Google Maps รองรับสูงสุด {MAX_STOPS} จุด ระบบจะนำทางเฉพาะ {MAX_STOPS} จุดแรกของแผน
        </p>
      )}
    </div>
  );
}
