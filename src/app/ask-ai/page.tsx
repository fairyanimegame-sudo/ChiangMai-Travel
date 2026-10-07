import type { Metadata } from "next";
import ChatWindow from "../../components/ask-ai/ChatWindow";

export const metadata: Metadata = {
  title: "ถาม AI | คู่มือเที่ยวเชียงใหม่",
  description: "ให้ผู้ช่วย AI ช่วยวางแผนเที่ยวเชียงใหม่",
};

type AskAiPageProps = {
  searchParams: Promise<{ prompt?: string | string[] }>;
};

export default async function AskAiPage({ searchParams }: AskAiPageProps) {
  const { prompt } = await searchParams;
  // ?prompt= จาก PromoBanner (ค่าที่ได้เป็น string หรือ array ได้ จึงเลือกตัวแรก และจำกัดความยาว)
  const initialPrompt = (Array.isArray(prompt) ? prompt[0] : prompt)?.trim().slice(0, 500);

  return (
    <main className="container py-[var(--space-8)]">
      <h1 className="text-2xl font-bold text-[color:var(--color-text)]">ถาม AI</h1>
      <p className="mb-[var(--space-4)] text-sm text-[color:var(--color-muted)]">
        ผู้ช่วยท่องเที่ยวเชียงใหม่ ช่วยแนะนำสถานที่และวางแผนเที่ยว
      </p>
      <ChatWindow initialPrompt={initialPrompt || undefined} />
    </main>
  );
}
