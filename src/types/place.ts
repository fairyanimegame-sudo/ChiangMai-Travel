import type { CategoryId } from "./category";

export type Place = {
  id: string; // ไม่ซ้ำกัน ใช้เป็น key และใน URL
  name: string;
  category: string; // ป้ายหมวดละเอียดบนการ์ด เช่น "วัด / วัฒนธรรม"
  categoryId: CategoryId; // หมวดหลัก ใช้กรองใน /explore และ /map
  rating: number; // 0–5
  image: string; // path ใน public เช่น "/images/places/doi-suthep.jpg"
  lat: number; // ละติจูด ใช้ปักหมุดบน /map
  lng: number; // ลองจิจูด
  description: string; // คำอธิบายสั้น ๆ ใช้ในหน้า /explore/[id]
  trendingRank?: number; // มีค่า = อยู่ใน "มาแรงตอนนี้" (1 = อันดับแรก)
  isRecommended?: boolean; // true = อยู่ใน "แนะนำห้ามพลาด"
};