type PlanSummaryProps = {
  name: string;
  onNameChange: (name: string) => void;
  count: number;
  tripTitle?: string;
};

export default function PlanSummary({ name, onNameChange, count, tripTitle }: PlanSummaryProps) {
  return (
    <section className="rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[var(--color-surface)] p-[var(--space-4)] [box-shadow:var(--shadow-card)]">
      <label htmlFor="plan-name" className="text-sm text-[color:var(--color-muted)]">
        ชื่อแผน
      </label>
      <input
        id="plan-name"
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="เช่น ทริปเชียงใหม่ 2 วัน"
        className="mt-[var(--space-1)] w-full rounded border border-[color:var(--color-border)] p-[var(--space-2)]"
      />
      <p className="mt-[var(--space-3)] text-sm text-[color:var(--color-muted)]">
        {count} จุดแวะ{tripTitle && ` · จากไอเดียทริป: ${tripTitle}`}
      </p>
    </section>
  );
}
