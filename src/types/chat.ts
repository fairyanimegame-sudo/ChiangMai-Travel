export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

/** body ที่ ChatWindow ส่งไป POST /api/chat */
export type ChatRequest = {
  messages: ChatMessage[];
};

/** ตอบกลับเมื่อสำเร็จ */
export type ChatResponse = {
  reply: string;
};

/** ตอบกลับเมื่อผิดพลาด (ข้อความเป็นมิตร แสดงให้ผู้ใช้อ่านได้) */
export type ChatErrorResponse = {
  error: string;
};