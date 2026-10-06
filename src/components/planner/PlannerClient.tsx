"use client";

import { useEffect, useState } from "react";
import EmptyState from "@/components/shared/EmptyState";
import { places } from "@/data/places";
import { trips } from "@/data/trips";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { Place } from "@/types/place";
import AddPlaceSelect from "./AddPlaceSelect";
import PlanSummary from "./PlanSummary";
import PlannerList from "./PlannerList";

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
  const [copied, setCopied] = useState(false);

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

  const handleCopyLink = async () => {
    const params = new URLSearchParams({ places: planIds.join(",") });
    const url = `${window.location.origin}/planner?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
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

      <AddPlaceSelect available={available} onAdd={handleAdd} />

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
          <div className="flex flex-wrap gap-[var(--space-3)]">
            <button
              type="button"
              onClick={handleCopyLink}
              className="rounded-[var(--radius-full)] bg-[var(--color-primary)] px-[var(--space-6)] py-[var(--space-2)] font-medium text-white hover:bg-[var(--color-primary-dark)]"
            >
              {copied ? "คัดลอกแล้ว ✓" : "คัดลอกลิงก์แผน"}
            </button>
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
