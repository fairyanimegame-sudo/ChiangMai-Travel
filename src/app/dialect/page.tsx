import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import DialectCard from "@/app/dialect/DialectCard";
import EmptyState from "@/components/shared/EmptyState";
import { dialectGroups, dialectWords } from "@/data/dialect";
import { filterDialectWords } from "@/lib/dialect";

export const metadata: Metadata = {
  title: "คำเมืองน่ารู้ - คู่มือเที่ยวเชียงใหม่ล้านนา",
  description: "เรียนรู้คำเมืองพื้นฐานพร้อมเสียงอ่าน ก่อนไปเที่ยวเชียงใหม่",
};

type DialectPageProps = {
  searchParams: Promise<{ group?: string }>;
};

const chipBase =
  "rounded-[var(--radius-full)] border px-[var(--space-4)] py-[var(--space-2)] text-sm font-medium transition-colors";

export default async function DialectPage({ searchParams }: DialectPageProps) {
  const { group } = await searchParams;

  // ตรวจว่าค่าจาก URL เป็นกลุ่มที่มีจริง ไม่เชื่อ input จากผู้ใช้ตรง ๆ
  const activeGroup = dialectGroups.find((g) => g.id === group);
  const words = filterDialectWords(dialectWords, activeGroup?.id);

  return (
    <main>
      <PageHeader
        title="คำเมืองน่ารู้"
        description="กดปุ่มลำโพงเพื่อฟังเสียงอ่าน (เสียงสังเคราะห์อาจเป็นสำเนียงไทยกลาง)"
      />

      <nav aria-label="กลุ่มคำเมือง" className="container flex flex-wrap gap-[var(--space-3)]">
        <Link
          href="/dialect"
          aria-current={!activeGroup ? "page" : undefined}
          className={`${chipBase} ${!activeGroup ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[color:var(--color-primary)]" : "border-[var(--color-border)] bg-[var(--color-surface)]"}`}
        >
          ทั้งหมด
        </Link>
        {dialectGroups.map((g) => {
          const isActive = g.id === activeGroup?.id;
          return (
            <Link
              key={g.id}
              href={`/dialect?group=${g.id}`}
              aria-current={isActive ? "page" : undefined}
              className={`${chipBase} ${isActive ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[color:var(--color-primary)]" : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]"}`}
            >
              {g.label}
            </Link>
          );
        })}
      </nav>

      {words.length > 0 ? (
        <section className="container grid grid-cols-1 gap-[var(--space-4)] py-[var(--space-8)] sm:grid-cols-2 lg:grid-cols-3">
          {words.map((item) => (
            <DialectCard key={item.id} item={item} />
          ))}
        </section>
      ) : (
        <EmptyState title="ยังไม่มีคำในกลุ่มนี้" actionHref="/dialect" actionLabel="ดูทั้งหมด" />
      )}
    </main>
  );
}