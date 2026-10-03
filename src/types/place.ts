export type Place = {
  id: string; // ไม่ซ้ำกัน ใช้เป็น key และใน URL
  name: string;
  category: string; // ป้ายหมวดละเอียดบนการ์ด เช่น "วัด / วัฒนธรรม"
  rating: number; // 0–5
  image: string; // path ใน public เช่น "/images/places/doi-suthep.jpg"
  trendingRank?: number; // มีค่า = อยู่ใน "มาแรงตอนนี้" (1 = อันดับแรก)
  isRecommended?: boolean; // true = อยู่ใน "แนะนำห้ามพลาด"
};
