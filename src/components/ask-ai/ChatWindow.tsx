"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatErrorResponse, ChatMessage, ChatResponse } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import SuggestedPrompts from "./SuggestedPrompts";

const MAX_LENGTH = 500;
const GREETING =
  "สวัสดีครับ ผมช่วยวางแผนเที่ยวเชียงใหม่ให้ได้ อยากไปที่ไหน หรือชอบแนวไหน ลองถามได้เลย";
const NETWORK_ERROR = "เชื่อมต่อไม่สำเร็จ ลองใหม่อีกครั้งนะ";

type ChatWindowProps = {
  /** คำถามจาก ?prompt= (เช่นจาก PromoBanner) จะถูกส่งให้อัตโนมัติหนึ่งครั้ง */
  initialPrompt?: string;
};

export default function ChatWindow({ initialPrompt }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const sentInitialRef = useRef(false);
  // เก็บประวัติล่าสุดไว้ใน ref เพื่อให้ send() ไม่ต้องผูกกับ state (ใช้ใน effect ได้ปลอดภัย)
  const messagesRef = useRef<ChatMessage[]>([]);

  const send = useCallback(async (raw: string) => {
    const text = raw.trim().slice(0, MAX_LENGTH);
    if (!text) return;

    const next: ChatMessage[] = [...messagesRef.current, { role: "user", content: text }];
    messagesRef.current = next;
    setMessages(next);
    setInput("");
    setLoading(true);

    let reply = NETWORK_ERROR;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as Partial<ChatResponse & ChatErrorResponse>;
      reply = (res.ok ? data.reply : data.error) || NETWORK_ERROR;
    } catch {
      // network ล้มหรือ response ไม่ใช่ JSON → ใช้ข้อความเป็นมิตรด้านบน
    }

    const withReply: ChatMessage[] = [...next, { role: "assistant", content: reply }];
    messagesRef.current = withReply;
    setMessages(withReply);
    setLoading(false);
  }, []);

  // ส่งคำถามจาก ?prompt= ครั้งเดียว (ref กันส่งซ้ำตอน React Strict Mode รัน effect สองรอบ)
  useEffect(() => {
    if (initialPrompt && !sentInitialRef.current) {
      sentInitialRef.current = true;
      void send(initialPrompt);
    }
  }, [initialPrompt, send]);

  // เลื่อนลงล่างอัตโนมัติเมื่อมีข้อความใหม่หรือสถานะ "กำลังคิด..." เปลี่ยน
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col gap-[var(--space-4)]">
      <div
        role="log"
        aria-live="polite"
        aria-label="บทสนทนากับผู้ช่วย AI"
        className="flex h-[60vh] flex-col gap-[var(--space-3)] overflow-y-auto rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[var(--color-bg)] p-[var(--space-4)]"
      >
        <MessageBubble role="assistant" content={GREETING} />
        {messages.map((message, index) => (
          <MessageBubble key={index} role={message.role} content={message.content} />
        ))}
        {loading && (
          <p className="text-sm text-[color:var(--color-muted)]" role="status">
            กำลังคิด...
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length === 0 && <SuggestedPrompts onSelect={send} disabled={loading} />}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!loading) void send(input);
        }}
        className="flex gap-[var(--space-2)]"
      >
        <label htmlFor="chat-input" className="sr-only">
          พิมพ์คำถาม
        </label>
        <input
          id="chat-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={MAX_LENGTH}
          placeholder="ถามเรื่องเที่ยวเชียงใหม่..."
          autoComplete="off"
          className="min-w-0 flex-1 rounded-[var(--radius-full)] border border-[color:var(--color-border)] bg-[var(--color-surface)] px-[var(--space-4)] py-[var(--space-3)]"
        />
        <button
          type="submit"
          disabled={loading || input.trim().length === 0}
          className="shrink-0 rounded-[var(--radius-full)] bg-[var(--color-primary)] px-[var(--space-6)] py-[var(--space-3)] font-medium text-white transition-colors hover:bg-[var(--color-primary-dark)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "กำลังส่ง..." : "ส่ง"}
        </button>
      </form>
      <p className="text-right text-xs text-[color:var(--color-muted)]">
        {input.length}/{MAX_LENGTH}
      </p>
    </div>
  );
}
