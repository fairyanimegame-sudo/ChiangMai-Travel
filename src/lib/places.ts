// src/lib/places.ts
import { places } from "@/data/places";
import { Place } from "@/types/place";

// ฟังก์ชันค้นหาสถานที่ 1 แห่งด้วยรหัส id
export function getPlaceById(id: string): Place | undefined {
  // รับค่า id เข้ามา และคืนค่า Place กลับไป
  return places.find((place) => place.id === id); // ใช้เมธอด find ค้นหาใน array ว่ารายการไหนมี id ตรงกับที่ส่งมา
}

// ฟังก์ชันกรองสถานที่ตามคำค้นหาและหมวดหมู่
export function filterPlaces(
  placesToFilter: Place[],
  { q, categoryId }: { q?: string; categoryId?: string },
): Place[] {
  // รับ array เริ่มต้น และเงื่อนไขการกรอง (q และ categoryId)
  return placesToFilter.filter((place) => {
    // ตรวจสอบคำค้นหา (q): ถ้ามี q ให้เช็กว่าชื่อสถานที่รวมคำนั้นไหม (แปลงเป็นพิมพ์เล็กทั้งคู่) ถ้าไม่มี q ถือว่าให้ผ่านเสมอ
    const matchQ = q ? place.name.toLowerCase().includes(q.toLowerCase()) : true;
    // ตรวจสอบหมวดหมู่ (categoryId): ถ้ามีการเลือกหมวด ให้เช็กว่ารหัสตรงกันไหม ถ้าไม่เลือกถือว่าให้ผ่านเสมอ
    const matchCategory = categoryId ? place.categoryId === categoryId : true;

    return matchQ && matchCategory;
  });
}

// ฟังก์ชันเรียงลำดับข้อมูลสถานที่
export function sortPlaces(placesToSort: Place[], sort?: string): Place[] {
  return [...placesToSort].sort((a, b) => {
    if (sort === "rating") {
      return b.rating - a.rating;
    }
    if (sort === "name") {
      return a.name.localeCompare(b.name, "th"); // ใช้ localeCompare อิงตามพจนานุกรมภาษาไทย (ก-ฮ)
    }
    return 0;
  });
}
