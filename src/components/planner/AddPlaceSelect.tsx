import type { Place } from "@/types/place";

type AddPlaceSelectProps = {
  available: Place[];
  onAdd: (id: string) => void;
};

export default function AddPlaceSelect({ available, onAdd }: AddPlaceSelectProps) {
  return (
    <div>
      <label htmlFor="add-place" className="text-sm text-[color:var(--color-muted)]">
        เพิ่มสถานที่
      </label>
      <select
        id="add-place"
        value=""
        disabled={available.length === 0}
        onChange={(e) => {
          if (e.target.value) onAdd(e.target.value);
        }}
        className="mt-[var(--space-1)] w-full rounded border border-[color:var(--color-border)] bg-[var(--color-surface)] p-[var(--space-2)]"
      >
        <option value="">
          {available.length === 0 ? "เพิ่มครบทุกแห่งแล้ว" : "เลือกสถานที่..."}
        </option>
        {available.map((place) => (
          <option key={place.id} value={place.id}>
            {place.name}
          </option>
        ))}
      </select>
    </div>
  );
}
