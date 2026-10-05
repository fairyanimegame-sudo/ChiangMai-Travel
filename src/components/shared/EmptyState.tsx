import Link from "next/link";

type EmptyStateProps = {
  icon?: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
};

export default function EmptyState({
  icon = "🔍",
  title,
  description,
  actionHref,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="container flex flex-col items-center gap-[var(--space-3)] py-[var(--space-12)] text-center">
      <span aria-hidden="true" className="text-5xl">
        {icon}
      </span>
      <h2 className="text-xl font-semibold text-[color:var(--color-text)]">{title}</h2>
      {description && <p className="text-[color:var(--color-muted)]">{description}</p>}
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="rounded-[var(--radius-full)] bg-[var(--color-primary)] px-[var(--space-6)] py-[var(--space-2)] font-medium text-white! hover:bg-[var(--color-primary-dark)]"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
