import { trips } from "@/data/trips";
import TripIdeaCard from "./TripIdeaCard";

export default function TripIdeaSection() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10">
      <h2 className="text-2xl font-bold">ไอเดียทริปพร้อมจัด</h2>
      <p className="mt-1 text-zinc-600 dark:text-zinc-400">
        เลือกแผนเที่ยวเชียงใหม่ที่ใช่ แล้วปรับให้เป็นของคุณ
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {trips.map((trip) => (
          <TripIdeaCard key={trip.id} trip={trip} />
        ))}
      </div>
    </section>
  );
}
