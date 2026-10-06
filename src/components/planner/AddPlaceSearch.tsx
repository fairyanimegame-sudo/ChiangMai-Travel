"use client";

import { useId, useMemo, useRef, useState } from "react";
import type { Place } from "@/types/place";

type AddPlaceSearchProps = {
  available: Place[];
  onAdd: (id: string) => void;
};

export default function AddPlaceSearch({ available, onAdd }: AddPlaceSearchProps) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? available.filter(
          (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
        )
      : available;
  }, [available, query]);

  const safeIndex = Math.min(activeIndex, Math.max(results.length - 1, 0));
  const isEmpty = available.length === 0;

  const select = (place: Place) => {
    onAdd(place.id);
    setQuery("");
    setActiveIndex(0);
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex(Math.min(safeIndex + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(Math.max(safeIndex - 1, 0));
    } else if (e.key === "Enter" && open && results[safeIndex]) {
      e.preventDefault();
      select(results[safeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <label htmlFor="add-place" className="text-sm text-[color:var(--color-muted)]">
        เพิ่มสถานที่
      </label>
      <input
        ref={inputRef}
        id="add-place"
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && results[safeIndex] ? `${listId}-${safeIndex}` : undefined}
        autoComplete="off"
        disabled={isEmpty}
        value={query}
        placeholder={isEmpty ? "เพิ่มครบทุกแห่งแล้ว" : "พิมพ์ชื่อสถานที่ เช่น ดอยสุเทพ..."}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={handleKeyDown}
        className="mt-[var(--space-1)] w-full rounded border border-[color:var(--color-border)] bg-[var(--color-surface)] p-[var(--space-2)] disabled:opacity-60"
      />

      {open && !isEmpty && (
        <ul
          id={listId}
          role="listbox"
          onMouseDown={(e) => e.preventDefault()}
          className="absolute z-20 mt-[var(--space-1)] max-h-72 w-full overflow-y-auto rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[var(--color-surface)] [box-shadow:var(--shadow-card)]"
        >
          {results.length === 0 ? (
            <li className="p-[var(--space-3)] text-sm text-[color:var(--color-muted)]">
              ไม่พบสถานที่ที่ตรงกับ “{query}”
            </li>
          ) : (
            results.map((place, i) => (
              <li
                key={place.id}
                id={`${listId}-${i}`}
                ref={(el) => {
                  if (el && i === safeIndex) el.scrollIntoView({ block: "nearest" });
                }}
                role="option"
                aria-selected={i === safeIndex}
                onClick={() => select(place)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`cursor-pointer px-[var(--space-3)] py-[var(--space-2)] ${
                  i === safeIndex ? "bg-[var(--color-primary-soft)]" : ""
                }`}
              >
                <p className="font-medium">{place.name}</p>
                <p className="text-xs text-[color:var(--color-muted)]">{place.category}</p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
