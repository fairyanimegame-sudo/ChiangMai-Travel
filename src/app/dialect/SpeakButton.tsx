"use client";

import { useRef, useState, useSyncExternalStore } from "react";

type SpeakButtonProps = {
  text: string;
  audioSrc?: string;
};

// ตรวจว่าเบราว์เซอร์รองรับเสียงสังเคราะห์ไหม โดยไม่ทำให้ hydration mismatch
const subscribe = () => () => {};
const getSupported = () => "speechSynthesis" in window;
const getServerSupported = () => false;

export default function SpeakButton({ text, audioSrc }: SpeakButtonProps) {
  const supported = useSyncExternalStore(subscribe, getSupported, getServerSupported);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // ไม่มีไฟล์เสียงและเบราว์เซอร์ก็ไม่รองรับ → ไม่แสดงปุ่ม ดีกว่าแสดงปุ่มที่กดแล้วเงียบ
  if (!audioSrc && !supported) return null;

  function handleClick() {
    if (audioSrc) {
      audioRef.current ??= new Audio(audioSrc);
      audioRef.current.currentTime = 0;
      void audioRef.current.play();
      return;
    }

    window.speechSynthesis.cancel(); // หยุดเสียงเก่าก่อน กันกดรัวแล้วเสียงซ้อนกัน
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "th-TH";
    utterance.rate = 0.8; // พูดช้าลงนิดหน่อย ให้คนเรียนฟังทัน
    utterance.onstart = () => setPlaying(true);
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`ฟังเสียงคำว่า ${text}`}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-primary-soft)] text-lg transition-colors hover:bg-[var(--color-primary)] hover:text-white"
    >
      <span aria-hidden="true">{playing ? "🔊" : "🔈"}</span>
    </button>
  );
}