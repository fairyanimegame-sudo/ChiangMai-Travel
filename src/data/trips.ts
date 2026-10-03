import type { TripIdea } from "@/types/trip";

export const trips: TripIdea[] = [
  {
    id: "old-city-walk",
    icon: "🏯",
    duration: "ครึ่งวัน",
    title: "เดินเที่ยวเมืองเก่า",
    description: "เดินชมวัดและกำแพงเมืองในคูเมือง สัมผัสกลิ่นอายล้านนาแบบสบายๆ",
    image: "/images/trips/trip-old-city.jpg",
    stops: ["ประตูท่าแพ", "วัดพระสิงห์", "วัดเจดีย์หลวง", "อนุสาวรีย์สามกษัตริย์"],
    placeIds: ["tha-phae-gate", "wat-phra-singh", "wat-chedi-luang", "three-kings-monument"],
  },
  {
    id: "nimman-day",
    icon: "☕",
    duration: "1 วัน",
    title: "หนึ่งวันในนิมมาน",
    description: "คาเฟ่ ร้านอาหาร และช้อปปิ้งในย่านที่ทันสมัยที่สุดของเชียงใหม่",
    image: "/images/trips/trip-nimman.jpg",
    stops: ["ถนนนิมมานเหมินท์", "วันนิมมาน", "เมญ่า ไลฟ์สไตล์ ช้อปปิ้ง เซ็นเตอร์", "วัดสวนดอก"],
    placeIds: ["nimmanhaemin-road", "one-nimman", "maya-mall", "wat-suan-dok"],
  },
  {
    id: "doi-trip",
    icon: "⛰️",
    duration: "1 วัน",
    title: "ขึ้นดอย",
    description: "ไหว้พระธาตุ ชมวิวเมือง และเยี่ยมชมหมู่บ้านบนดอยสุเทพ",
    image: "/images/trips/trip-doi.jpg",
    stops: [
      "วัดพระธาตุดอยสุเทพ",
      "พระตำหนักภูพิงคราชนิเวศน์",
      "หมู่บ้านม้งดอยปุย",
      "น้ำตกห้วยแก้ว",
    ],
    placeIds: ["doi-suthep", "phuping-palace", "doi-pui-hmong-village", "huay-kaew-waterfall"],
  },
  {
    id: "nature-adventure",
    icon: "🌿",
    duration: "2 วัน",
    title: "ธรรมชาติแอดเวนเจอร์",
    description: "ขึ้นยอดสูงสุดของประเทศไทย เดินป่า และชมน้ำตกที่ดอยอินทนนท์",
    image: "/images/trips/trip-nature.jpg",
    stops: [
      "น้ำตกวชิรธาร",
      "ยอดดอยอินทนนท์",
      "พระมหาธาตุนภเมทนีดล นภพลภูมิสิริ",
      "เส้นทางเดินป่ากิ่วแม่ปาน",
    ],
    placeIds: [
      "wachirathan-waterfall",
      "doi-inthanon",
      "royal-pagodas-doi-inthanon",
      "kew-mae-pan-trail",
    ],
  },
];
