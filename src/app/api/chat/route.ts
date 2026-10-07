import { z } from "zod";
import { AiError, askAi, fallbackReply, hasApiKey } from "@/lib/ai";
import type { ChatErrorResponse, ChatResponse } from "@/types/chat";

const MAX_MESSAGE_LENGTH = 500; // ข้อความของผู้ใช้
const MAX_REPLY_LENGTH = 8_000; // คำตอบของ AI ที่ถูกส่งกลับมาเป็นประวัติ (ยาวกว่าที่ผู้ใช้พิมพ์ได้)
const MAX_MESSAGES = 20;
const MAX_BODY_BYTES = 100_000;

// ตรวจรูปแบบ body ที่ ChatWindow ส่งมา (ห้ามเชื่อ input จาก client)
const chatRequestSchema = z.object({
  messages: z
    .array(
      z.discriminatedUnion("role", [
        z.object({
          role: z.literal("user"),
          content: z.string().trim().min(1).max(MAX_MESSAGE_LENGTH),
        }),
        z.object({
          role: z.literal("assistant"),
          content: z.string().trim().min(1).max(MAX_REPLY_LENGTH),
        }),
      ]),
    )
    .min(1)
    .max(MAX_MESSAGES),
});
function errorResponse(error: string, status: number) {
  return Response.json({ error } satisfies ChatErrorResponse, { status });
}

function replyResponse(reply: string) {
  return Response.json({ reply } satisfies ChatResponse);
}

export async function POST(request: Request) {
  // 1) อ่านและตรวจ input
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return errorResponse("ข้อความยาวเกินไป ลองพิมพ์ให้สั้นลงนิดนึงนะ", 413);
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return errorResponse("ส่งข้อความไม่สำเร็จ ลองใหม่อีกครั้งนะ", 400);
  }

  const parsed = chatRequestSchema.safeParse(json);
  if (!parsed.success) {
    return errorResponse(`พิมพ์ข้อความ 1–${MAX_MESSAGE_LENGTH} ตัวอักษรต่อครั้งนะ`, 400);
  }

  const { messages } = parsed.data;
  const last = messages[messages.length - 1];
  if (last.role !== "user") {
    return errorResponse("ส่งข้อความไม่สำเร็จ ลองใหม่อีกครั้งนะ", 400);
  }

  // 2) ไม่มี key → โหมดสำรอง (เดโมต้องไม่ล่ม)
  if (!hasApiKey()) {
    return replyResponse(fallbackReply(last.content));
  }

  // 3) เรียก AI ฝั่ง Server ถ้าล้ม/หมดเวลา → โหมดสำรองพร้อมข้อความเป็นมิตร
  try {
    return replyResponse(await askAi(messages));
  } catch (error) {
    const kind = error instanceof AiError ? error.kind : "upstream";
    // log ประเภท + สาเหตุจาก Gemini (key ถูกตัดออกแล้ว) ไม่ log เนื้อหาที่ผู้ใช้พิมพ์
    const detail = error instanceof AiError ? `${error.status ?? ""} ${error.message}`.trim() : "";
    console.error(`[api/chat] AI request failed: ${kind}${detail ? ` - ${detail}` : ""}`);

    const note =
      kind === "timeout"
        ? "AI ตอบช้าไปหน่อย เลยขอแนะนำจากทริปที่เตรียมไว้ให้ก่อนนะ"
        : "ตอนนี้ AI ตอบไม่ได้ชั่วคราว เลยขอแนะนำจากทริปที่เตรียมไว้ให้ก่อนนะ";
    return replyResponse(fallbackReply(last.content, note));
  }
}
