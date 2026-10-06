import type { Place } from "@/types/place";

type PlannerListProps = {
  items: Place[];
  onMove: (index: number, direction: -1 | 1) => void;
  onRemove: (id: string) => void;
};

const btn =
  "rounded border border-[color:var(--color-border)] px-[var(--space-2)] py-[var(--space-1)] text-sm disabled:opacity-40";

export default function PlannerList({ items, onMove, onRemove }: PlannerListProps) {
  return (
    <ol className="grid gap-[var(--space-3)]">
      {items.map((place, index) => (
        <li
          key={place.id}
          className="flex items-center gap-[var(--space-3)] rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[var(--color-surface)] p-[var(--space-3)]"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-primary)] text-sm font-bold text-white">
            {index + 1}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{place.name}</p>
            <p className="text-sm text-[color:var(--color-muted)]">{place.category}</p>
          </div>
          <div className="flex gap-[var(--space-1)]">
            <button
              type="button"
              className={btn}
              disabled={index === 0}
              onClick={() => onMove(index, -1)}
              aria-label={`ย้าย ${place.name} ขึ้น`}
            >
              ↑
            </button>
            <button
              type="button"
              className={btn}
              disabled={index === items.length - 1}
              onClick={() => onMove(index, 1)}
              aria-label={`ย้าย ${place.name} ลง`}
            >
              ↓
            </button>
            <button
              type="button"
              className={btn}
              onClick={() => onRemove(place.id)}
              aria-label={`ลบ ${place.name}`}
            >
              ✕
            </button>
          </div>
        </li>
      ))}
    </ol>
  );
}
