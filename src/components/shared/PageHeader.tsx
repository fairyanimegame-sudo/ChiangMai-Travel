type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="container py-[var(--space-8)]">
      <h1 className="text-3xl font-bold text-[color:var(--color-text)]">{title}</h1>
      {description && (
        <p className="mt-[var(--space-2)] text-[color:var(--color-muted)]">{description}</p>
      )}
    </header>
  );
}
