const PROMPTS = [
  "แผนเที่ยวเชียงใหม่ 3 วัน",
  "ที่เที่ยวธรรมชาติใกล้เมือง",
  "คาเฟ่น่านั่งย่านนิมมาน",
  "วัดสวย ๆ ที่ควรไป",
];

type SuggestedPromptsProps = {
  /** กดแล้วส่งคำถามทันที */
  onSelect: (prompt: string) => void;
  disabled?: boolean;
};

export default function SuggestedPrompts({ onSelect, disabled = false }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-wrap gap-[var(--space-2)]" aria-label="คำถามแนะนำ" role="group">
      {PROMPTS.map((prompt) => (
        <button
          key={prompt}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(prompt)}
          className="rounded-[var(--radius-full)] border border-[color:var(--color-border)] bg-[var(--color-surface)] px-[var(--space-4)] py-[var(--space-2)] text-sm text-[color:var(--color-text)] transition-colors hover:bg-[var(--color-primary-soft)] hover:text-[color:var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
