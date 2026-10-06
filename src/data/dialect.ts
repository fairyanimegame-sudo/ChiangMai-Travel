// src/data/dialect.ts
import type { DialectGroup, DialectWord } from "@/types/dialect";

export const dialectGroups: DialectGroup[] = [
  { id: "greeting", label: "ทักทาย" },
  { id: "food", label: "ของกิน" },
  { id: "place", label: "สถานที่" },
  { id: "number", label: "ตัวเลข" },
  { id: "daily", label: "ชีวิตประจำวัน" },
];

export const dialectWords: DialectWord[] = [
  // --- ทักทาย ---
  { id: "d01", word: "สวัสดีเจ้า", pronunciation: "สะ-หวัด-ดี-เจ้า", thai: "สวัสดีครับ/ค่ะ", example: "สวัสดีเจ้า ยินดีต้อนรับมาเชียงใหม่เน้อ", groupId: "greeting" },
  { id: "d02", word: "ปิ๊ก", pronunciation: "ปิ๊ก", thai: "กลับ", example: "เดี๋ยวปิ๊กโรงแรมก่อนเน้อ", groupId: "greeting" },
  { id: "d03", word: "ขอบคุณหลายเจ้า", pronunciation: "ขอบ-คุน-หลาย-เจ้า", thai: "ขอบคุณมาก", example: "ขอบคุณหลายเจ้า ที่ช่วยบอกทาง", groupId: "greeting" },
  { id: "d04", word: "บ่เป็นหยัง", pronunciation: "บ่-เปน-หยัง", thai: "ไม่เป็นไร", example: "บ่เป็นหยังเจ้า ไม่ต้องเกรงใจ", groupId: "greeting" },

  // --- ของกิน ---
  { id: "d05", word: "กิ๋น", pronunciation: "กิ๋น", thai: "กิน", example: "ไปกิ๋นข้าวซอยกั๋นเน้อ", groupId: "food" },
  { id: "d06", word: "ลำ", pronunciation: "ลำ", thai: "อร่อย", example: "ไส้อั่วร้านนี้ลำขนาด", groupId: "food" },
  { id: "d07", word: "ข้าวนึ่ง", pronunciation: "ข้าว-นึ่ง", thai: "ข้าวเหนียว", example: "ขอข้าวนึ่งกับหมูปิ้งเจ้า", groupId: "food" },
  { id: "d08", word: "แอ็บ", pronunciation: "แอ็บ", thai: "อาหารห่อใบตองย่างไฟ (เช่น แอ็บปลา)", example: "มื้อนี้อยากกิ๋นแอ็บปลา", groupId: "food" },

  // --- สถานที่ ---
  { id: "d09", word: "กาด", pronunciation: "กาด", thai: "ตลาด", example: "ไปกาดหลวงซื้อของฝากกั๋น", groupId: "place" },
  { id: "d10", word: "เฮือน", pronunciation: "เฮือน", thai: "บ้าน", example: "เฮือนหลังนี้เป็นร้านอาหารล้านนา", groupId: "place" },
  { id: "d11", word: "ดอย", pronunciation: "ดอย", thai: "ภูเขา", example: "วันหยุดอยากขึ้นดอยไปดูทะเลหมอก", groupId: "place" },
  { id: "d12", word: "ห้วย", pronunciation: "ห้วย", thai: "ลำธาร", example: "น้ำตกห้วยแก้วอยู่ตีนดอยสุเทพ", groupId: "place" },

  // --- ตัวเลข ---
  { id: "d13", word: "นึ่ง", pronunciation: "นึ่ง", thai: "หนึ่ง", example: "ขอกาแฟนึ่งแก้วเจ้า", groupId: "number" },
  { id: "d14", word: "ซาว", pronunciation: "ซาว", thai: "ยี่สิบ", example: "ค่าขนมซาวบาทเจ้า", groupId: "number" },
  { id: "d15", word: "ฮ้อย", pronunciation: "ฮ้อย", thai: "ร้อย", example: "ของชิ้นนี้ฮ้อยบาท", groupId: "number" },
  { id: "d16", word: "เท่าใด๋", pronunciation: "เถ่า-ได๋", thai: "เท่าไร", example: "อันนี้ราคาเท่าใด๋เจ้า", groupId: "number" },

  // --- ชีวิตประจำวัน ---
  { id: "d17", word: "ม่วน", pronunciation: "ม่วน", thai: "สนุก", example: "เที่ยวเชียงใหม่ม่วนขนาด", groupId: "daily" },
  { id: "d18", word: "จ๊าด", pronunciation: "จ๊าด", thai: "มาก", example: "อากาศบนดอยหนาวจ๊าดเลย", groupId: "daily" },
  { id: "d19", word: "บ่", pronunciation: "บ่", thai: "ไม่", example: "ตอนนี้บ่ฮ้อนเน้อ", groupId: "daily" },
  { id: "d20", word: "หยัง", pronunciation: "หยัง", thai: "อะไร", example: "กำลังกิ๋นหยังอยู่เจ้า", groupId: "daily" },
  { id: "d21", word: "ไผ", pronunciation: "ไผ", thai: "ใคร", example: "ไผมาบ้างเจ้า", groupId: "daily" },
  { id: "d22", word: "เน้อ", pronunciation: "เน้อ", thai: "นะ (คำลงท้ายชวนให้เห็นด้วย)", example: "ไปด้วยกั๋นเน้อ", groupId: "daily" },
];