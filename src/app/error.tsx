// error.tsx  (ต้องเป็น Client Component)
"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container py-[var(--space-12)] text-center">
      <h2 className="text-xl font-semibold">มีบางอย่างผิดพลาด</h2>
      <p className="mt-[var(--space-2)] text-[color:var(--color-muted)]">กรุณาลองใหม่อีกครั้ง</p>
      <button
        onClick={reset}
        className="mt-[var(--space-4)] rounded-[var(--radius-full)] bg-[var(--color-primary)] px-[var(--space-6)] py-[var(--space-2)] text-white"
      >
        ลองใหม่
      </button>
    </div>
  );
}