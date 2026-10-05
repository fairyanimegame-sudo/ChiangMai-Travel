import { trips } from "@/data/trips";
import TripIdeaCard from "./TripIdeaCard";

export default function TripIdeaSection() {
  return (
    <section className="container py-[var(--space-8)]">
      <div className="mb-[var(--space-4)]">
        <h2 className="text-2xl font-bold text-[color:var(--color-text)]">ไอเดียทริปพร้อมจัด</h2>
        <p className="text-sm text-[color:var(--color-muted)]">
          เลือกแผนเที่ยวเชียงใหม่ที่ใช่ แล้วปรับให้เป็นของคุณ
        </p>
      </div>

      <div className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2 sm:gap-[var(--space-6)]">
        {trips.map((trip) => (
          <TripIdeaCard key={trip.id} trip={trip} />
        ))}
      </div>
    </section>
  );
}