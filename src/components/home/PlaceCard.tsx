import Image from "next/image";
import Link from "next/link";
import type { Place } from "@/types/place";

/** เส้นทางหน้ารวมสถานที่ ตรงกับเมนู "สำรวจ" ใน Navbar ใช้ร่วมกันทั้งลิงก์การ์ดและปุ่ม "ดูทั้งหมด" (ถ้าทีมเปลี่ยนชื่อเส้นทาง แก้ที่นี่ที่เดียว) */
export const EXPLORE_PATH = "/explore";

type PlaceCardProps = {
  place: Place;
  /** ใส่ค่าเฉพาะการ์ดในส่วน "มาแรงตอนนี้" เพื่อแสดงป้ายอันดับ (Optional) */
  rank?: number;
  /** ปลายทางเมื่อกดการ์ด ถ้าไม่ส่งมาจะใช้ {EXPLORE_PATH}/{place.id} */
  href?: string;
};

// สไตล์ทั้งหมดอ้างอิง design tokens ใน globals.css (var(--color-*), var(--space-*), var(--radius-*))
export default function PlaceCard({
  place,
  rank,
  href = `${EXPLORE_PATH}/${place.id}`,
}: PlaceCardProps) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[var(--color-surface)] [box-shadow:var(--shadow-card)] transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[4/3] w-full bg-[var(--color-primary-soft)]">
        {/* alt ว่าง เพราะชื่อสถานที่อยู่ในลิงก์ด้านล่างแล้ว (กันโปรแกรมอ่านหน้าจออ่านซ้ำ) */}
        <Image
          src={place.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {rank !== undefined && (
          <span
            role="img"
            aria-label={`อันดับ ${rank}`}
            className="absolute left-[var(--space-3)] top-[var(--space-3)] flex h-8 min-w-8 items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-primary)] px-[var(--space-2)] text-sm font-bold text-white [box-shadow:var(--shadow-card)]"
          >
            {rank}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-[var(--space-1)] p-[var(--space-4)]">
        <h3 className="text-base font-semibold leading-snug text-[color:var(--color-text)]">
          {/* after:absolute after:inset-0 ทำให้พื้นที่การ์ดทั้งใบกดได้ โดยยังมีลิงก์เดียวสำหรับโปรแกรมอ่านหน้าจอ */}
          <Link href={href} className="after:absolute after:inset-0">
            {place.name}
          </Link>
        </h3>
        <p className="flex-1 text-sm text-[color:var(--color-muted)]">{place.category}</p>
        <p className="mt-[var(--space-2)] flex items-center gap-[var(--space-1)] text-sm font-medium text-[color:var(--color-text)]">
          <span aria-hidden="true" className="text-[color:var(--color-star)]">
            ★
          </span>
          {place.rating.toFixed(1)}
        </p>
      </div>
    </article>
  );
}
