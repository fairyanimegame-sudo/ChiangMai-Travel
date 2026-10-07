import Link from "next/link";
import { places } from "@/data/places";
import type { ChatRole } from "@/types/chat";

type MessageBubbleProps = {
  role: ChatRole;
  content: string;
};

// ชื่อสถานที่ยาวก่อน เพื่อให้ชื่อที่ซ้อนกันจับคู่ชื่อยาวที่สุดก่อน
const sortedPlaces = [...places].sort((a, b) => b.name.length - a.name.length);
const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const placePattern = new RegExp(
  `(${sortedPlaces.map((p) => escapeRegExp(p.name)).join("|")})`,
  "g",
);

/** แปลงชื่อสถานที่ในระบบเป็นลิงก์ไป /explore/[id] (ส่วนที่เหลือเป็นข้อความธรรมดา) */
function renderWithPlaceLinks(content: string) {
  return content.split(placePattern).map((part, index) => {
    const place = sortedPlaces.find((p) => p.name === part);
    if (!place) return part;
    return (
      <Link
        key={index}
        href={`/explore/${place.id}`}
        className="font-medium text-[color:var(--color-primary)]! underline"
      >
        {part}
      </Link>
    );
  });
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap break-words rounded-[var(--radius-lg)] px-[var(--space-4)] py-[var(--space-3)] text-sm leading-relaxed sm:text-base ${
          isUser
            ? "bg-[var(--color-primary)] text-white"
            : "border border-[color:var(--color-border)] bg-[var(--color-surface)] text-[color:var(--color-text)]"
        }`}
      >
        {/* ข้อความผู้ใช้แสดงเป็นข้อความล้วน ลิงก์เฉพาะคำตอบของ AI */}
        {isUser ? content : renderWithPlaceLinks(content)}
      </div>
    </div>
  );
}
