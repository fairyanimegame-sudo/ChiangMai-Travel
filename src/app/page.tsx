import PromoBanner from "@/components/home/PromoBanner";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">
          เที่ยวเชียงใหม่
        </h1>

        <div className="flex flex-col gap-4">
          <PromoBanner
            icon="🤖"
            title="แผน AI 3 วัน"
            description="วางแผนเที่ยวเชียงใหม่ 3 วันด้วย AI"
            href="/ai-plan"
          />

          <PromoBanner
            icon="🚶"
            title="เทศกาลถนนคนเดิน"
            description="ค้นพบกิจกรรมและสถานที่น่าสนใจบนถนนคนเดิน"
            href="/walking-street"
          />
        </div>
      </div>
    </main>
  );
}