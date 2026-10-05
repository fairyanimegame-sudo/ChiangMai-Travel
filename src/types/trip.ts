export type TripIdea = {
  id: string;
  icon: string; // emoji เช่น "🏛️"
  duration: string; // เช่น "1 วัน"
  title: string;
  description: string;
  image: string;
  stops: string[]; // ชื่อจุดแวะ ใช้แสดงสรุปบนการ์ด
  placeIds: string[]; // id ของ Place ใช้ประกอบลิงก์ "ใช้แผนนี้"
};
