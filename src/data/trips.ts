import type { TripIdea } from "@/types/trip";

export const trips: TripIdea[] = [
  {
    id: "old-city-walk",
    icon: "🏯",
    duration: "ครึ่งวัน",
    title: "เดินเที่ยวเมืองเก่า",
    description: "เริ่มที่ตลาดวโรรสและประตูท่าแพ แล้วเดินชมวัดสำคัญในคูเมือง",
    image: "/images/trips/trip-old-city.jpg",
    stops: ["ตลาดวโรรส", "ประตูท่าแพ", "วัดเจดีย์หลวง", "วัดพระสิงห์"],
    placeIds: ["14", "8", "4", "3"],
  },
  {
    id: "nimman-day",
    icon: "☕",
    duration: "1 วัน",
    title: "หนึ่งวันในนิมมาน",
    description: "คาเฟ่ ช้อปปิ้ง แกลเลอรีศิลปะ และวัดในป่า ในย่านที่ทันสมัยที่สุดของเชียงใหม่",
    image: "/images/trips/trip-nimman.jpg",
    stops: ["ย่านนิมมานเหมินทร์", "เมญ่า (MAYA)", "บ้านค่างวัด", "วัดอุโมงค์"],
    placeIds: ["7", "12", "15", "5"],
  },
  {
    id: "doi-trip",
    icon: "⛰️",
    duration: "1 วัน",
    title: "ขึ้นดอย",
    description: "แวะน้ำตกห้วยแก้ว ไหว้พระธาตุดอยสุเทพ ชมวิวที่ม่อนแจ่ม และปิดท้ายที่น้ำตกบัวตอง",
    image: "/images/trips/trip-doi.jpg",
    stops: ["น้ำตกห้วยแก้ว", "วัดพระธาตุดอยสุเทพ", "ม่อนแจ่ม", "น้ำตกบัวตอง"],
    placeIds: ["6", "1", "11", "9"],
  },
  {
    id: "nature-adventure",
    icon: "🌿",
    duration: "2 วัน",
    title: "ธรรมชาติแอดเวนเจอร์",
    description: "ขึ้นดอยอินทนนท์ แวะหมู่บ้านบนเขา ใกล้ชิดช้าง และปิดท้ายด้วยไนท์ซาฟารี",
    image: "/images/trips/trip-nature.jpg",
    stops: ["ดอยอินทนนท์", "บ้านแม่กำปอง", "Elephant Nature Park", "เชียงใหม่ไนท์ซาฟารี"],
    placeIds: ["2", "13", "10", "16"],
  },
];
