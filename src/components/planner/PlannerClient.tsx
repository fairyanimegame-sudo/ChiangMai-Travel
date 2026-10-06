"use client";

import { useEffect } from "react";
import EmptyState from "@/components/shared/EmptyState";
import { places } from "@/data/places";
import { trips } from "@/data/trips";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { Place } from "@/types/place";
import AddPlaceSearch from "./AddPlaceSearch";
import PlanSummary from "./PlanSummary";
import PlannerList from "./PlannerList";
import StartTripButton from "./StartTripButton";

type PlannerClientProps = {
  initialPlaceIds: string[];
  tripId?: string;
};

const EMPTY_PLAN: string[] = [];

export default function PlannerClient({ initialPlaceIds, tripId }: PlannerClientProps) {
  const [planIds, setPlanIds, isLoaded] = useLocalStorage<string[]>(
    "planner-place-ids",
    EMPTY_PLAN,
  );
  const [planName, setPlanName] = useLocalStorage<string>("planner-name", "");

  useEffect(() => {
    if (initialPlaceIds.length > 0) {
      setPlanIds(initialPlaceIds);
    }
  }, [initialPlaceIds, setPlanIds]);

  const trip = trips.find((t) => t.id === tripId);

  const selected = planIds
    .map((id) => places.find((p) => p.id === id))
    .filter((p): p is Place => p !== undefined);

  const available = places.filter((p) => !planIds.includes(p.id));

  const handleAdd = (id: string) => setPlanIds([...planIds, id]);

  const handleRemove = (id: string) => setPlanIds(planIds.filter((x) => x !== id));

  const handleMove = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= planIds.length) return;
    const next = [...planIds];
    [next[index], next[target]] = [next[target], next[index]];
    setPlanIds(next);
  };

  if (!isLoaded) {
    return (
      <p className="container py-[var(--space-8)] text-[color:var(--color-muted)]">
        กำลังโหลดแผน...
      </p>
    );
  }

  return (
    <div className="container grid gap-[var(--space-6)] pb-[var(--space-12)]">
      <PlanSummary
        name={planName}
        onNameChange={setPlanName}
        count={selected.length}
        tripTitle={trip?.title}
      />

      <AddPlaceSearch available={available} onAdd={handleAdd} />

      {selected.length === 0 ? (
        <EmptyState
          icon="🗺️"
          title="ยังไม่มีสถานที่ในแผน"
          description="เลือกจากรายการด้านบน หรือไปสำรวจสถานที่เพิ่ม"
          actionHref="/explore"
          actionLabel="ไปหน้าสำรวจ"
        />
      ) : (
        <>
          <PlannerList items={selected} onMove={handleMove} onRemove={handleRemove} />
          <div className="flex flex-wrap items-start gap-[var(--space-3)]">
            <StartTripButton places={selected} />
            <button
              type="button"
              onClick={() => setPlanIds([])}
              className="rounded-[var(--radius-full)] border border-[color:var(--color-border)] bg-[var(--color-surface)] px-[var(--space-6)] py-[var(--space-2)] font-medium"
            >
              ล้างแผน
            </button>
          </div>
        </>
      )}
    </div>
  );
}
