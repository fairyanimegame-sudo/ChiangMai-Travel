"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { categories } from "@/data/categories";

// undefined = "ไม่แตะค่านี้", "" = "ล้างค่านี้", มีค่า = "ตั้งค่า"
function setOrDelete(params: URLSearchParams, key: string, value?: string) {
  if (value === undefined) return;
  if (value) params.set(key, value);
  else params.delete(key);
}

export default function ExploreFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // อ่าน key "q" ให้ตรงกับที่ explore/page.tsx และ SearchBar ใช้
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const updateUrl = (newQ?: string, newCategory?: string, newSort?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    setOrDelete(params, "q", newQ);
    setOrDelete(params, "category", newCategory);
    setOrDelete(params, "sort", newSort);

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
          <option value="rating">คะแนนสูงสุด</option>
          <option value="name">ชื่อ (ก-ฮ)</option>
        </select>
      </div>
    </div>
  );
}
