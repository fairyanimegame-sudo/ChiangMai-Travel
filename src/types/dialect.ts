export type DialectGroupId = "greeting" | "food" | "place" | "number" | "daily";

export type DialectGroup = {
  id: DialectGroupId;
  label: string; // ข้อความบน chip เช่น "ทักทาย"
};

export type DialectWord = {
  id: string; // ไม่ซ้ำกัน ใช้เป็น key
  word: string; // คำเมือง เช่น "ปิ๊ก"
  pronunciation: string; // คำอ่านโดยประมาณ ช่วยคนที่อ่านอักษรเมืองไม่คล่อง
  thai: string; // ความหมายในภาษาไทยกลาง
  example: string; // ตัวอย่างประโยคสั้น ๆ
  groupId: DialectGroupId; // กลุ่ม ใช้กรองในหน้า /dialect
  audioSrc?: string; // path ใน public เช่น "/audio/dialect/pik.mp3" ถ้าไม่มีจะใช้เสียงสังเคราะห์
};
