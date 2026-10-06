import type { DialectWord } from "@/types/dialect";
import SpeakButton from "./SpeakButton";

export default function DialectCard({ item }: { item: DialectWord }) {
  const audioSrc = "audioSrc" in item ? (item as { audioSrc?: string }).audioSrc : undefined;

  return (
    <article className="flex h-full flex-col gap-[var(--space-2)] rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[var(--color-surface)] p-[var(--space-4)] [box-shadow:var(--shadow-card)]">
      <div className="flex items-start justify-between gap-[var(--space-3)]">
        <div>
          <h3 className="text-2xl font-bold text-[color:var(--color-primary)]">{item.word}</h3>
          <p className="text-sm text-[color:var(--color-muted)]">อ่านว่า {item.pronunciation}</p>
        </div>
        <SpeakButton text={item.word} audioSrc={audioSrc} />
      </div>
      <p className="font-medium text-[color:var(--color-text)]">{item.thai}</p>
      <p className="mt-auto text-sm text-[color:var(--color-muted)]">“{item.example}”</p>
    </article>
  );
}