import PlaceSection, {
  getRecommendedPlaces,
  getTrendingPlaces,
} from "@/components/home/PlaceSection";
/* import TripIdeaSection from "@/components/home/TripIdeaSection";
 */ import CategoryChips from "@/components/home/CategoryChips";
import HeroSection from "@/components/home/HeroSection";
import WeatherCard from "@/components/home/WeatherCard";
import { places } from "@/data/places";
import PromoBanner from "@/components/home/PromoBanner";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CategoryChips />

      <section className="container py-[var(--space-4)]">
        <div className="grid grid-cols-1 gap-[var(--space-4)] lg:grid-cols-2">
          <div className="lg:col-span-2">
            <PromoBanner
              icon="🏮"
              title="เทศกาลถนนคนเดิน"
              description="เดินเล่น ชิมของกิน ช้อปงานคราฟต์"
              href="/explore?category=nightmarket"
            />
          </div>
          <PromoBanner
            icon="🤖"
            title="แผนเที่ยว 3 วันจาก AI"
            description="บอกสไตล์ที่ชอบ แล้วให้ AI จัดทริปให้"
            href={`/ask-ai?prompt=${encodeURIComponent("ช่วยวางแผนเที่ยวเชียงใหม่ 3 วัน")}`}
          />
          <WeatherCard latitude={18.7883} longitude={98.9853} />
        </div>
      </section>

      <PlaceSection
        title="มาแรงตอนนี้"
        subtitle="สถานที่ยอดนิยมที่กำลังได้รับความสนใจ"
        places={getTrendingPlaces(places, 4)}
        showRank
      />

      <PlaceSection
        title="แนะนำห้ามพลาด"
        subtitle="สถานที่น่าสนใจที่ไม่ควรพลาดเมื่อมาเชียงใหม่"
        places={getRecommendedPlaces(places, 4)}
      />
    </main>
  );
}
