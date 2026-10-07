"use client";

import { useState, type FormEvent } from "react";
import type { ChatErrorResponse, ChatMessage, ChatRequest, ChatResponse } from "@/types/chat";

type ChatWindowProps = {
  initialPrompt?: string;
};

export default function ChatWindow({ initialPrompt = "" }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages } satisfies ChatRequest),
      });
      const data: ChatResponse | ChatErrorResponse = await response.json();

      if (!response.ok || "error" in data) {
        setError("error" in data ? data.error : "เกิดข้อผิดพลาด");
        return;
      }
      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setError("เชื่อมต่อไม่ได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div aria-live="polite">
        {messages.map((message, index) => (
          <p key={index}>
            <strong>{message.role === "user" ? "คุณ" : "AI"}: </strong>
            {message.content}
          </p>
        ))}
        {loading && <p>AI กำลังคิด...</p>}
        {error && <p role="alert">{error}</p>}
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="chat-input">ถามเรื่องเที่ยวเชียงใหม่</label>
        <input
          id="chat-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={1000}
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          ส่ง
        </button>
      </form>
    </div>
  );
}
