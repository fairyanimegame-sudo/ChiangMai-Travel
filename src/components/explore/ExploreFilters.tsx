"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { categories } from "@/data/categories";

export default function ExploreFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const updateUrl = (newQ?: string, newCategory?: string, newSort?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newQ !== undefined) {
      newQ ? params.set("q", newQ) : params.delete("q");
    }
    if (newCategory !== undefined) {
      newCategory ? params.set("category", newCategory) : params.delete("category");
    }
    if (newSort !== undefined) {
      newSort ? params.set("sort", newSort) : params.delete("sort");
    }

    router.push(`/explore?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-[var(--space-4)] mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ค้นหาสถานที่..."
          className="border p-2 rounded w-full"
        />
        <button
          onClick={() => updateUrl(searchQuery, undefined, undefined)}
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded"
        >
          ค้นหา
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateUrl(undefined, "", undefined)}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          ทั้งหมด
        </button>

        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => updateUrl(undefined, c.id, undefined)}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            {c.label}
          </button>
        ))}
      </div>

      <div>
        <select
          onChange={(e) => updateUrl(undefined, undefined, e.target.value)}
          defaultValue={searchParams.get("sort") || ""}
          className="border p-2 rounded"
        >
          <option value="" disabled hidden>
            เรียงลำดับ...
          </option>
          <option value="score">คะแนนสูงสุด</option>
          <option value="name">ชื่อ (ก-ฮ)</option>
        </select>
      </div>
    </div>
  );
}
