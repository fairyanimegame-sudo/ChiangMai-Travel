import Link from "next/link";

type PromoBannerProps = {
  icon: string;
  title: string;
  description: string;
  href: string;
};

export default function PromoBanner({ icon, title, description, href }: PromoBannerProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-[var(--space-4)] rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[var(--color-primary-soft)] p-[var(--space-4)] [box-shadow:var(--shadow-card)] transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <span
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-surface)] text-2xl"
      >
        {icon}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="text-base font-semibold text-[color:var(--color-primary-dark)]">{title}</h3>
        <p className="text-sm text-[color:var(--color-muted)]">{description}</p>
      </div>

      <span
        aria-hidden="true"
        className="text-[color:var(--color-primary)] transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
