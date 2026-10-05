import React from "react";
import SearchBar from "./SearchBar"; // นำเข้า SearchBar

export default function HeroSection() {
  return (
    <section
      //   กำหนดความสูงและจัดให้อยู่กึ่งกลาง
      className="relative w-full h-[100vh] min-h-[400px] flex items-center justify-center bg-cover bg-center"
      // เปลี่ยนพาธรูปภาพเมื่อได้รับไฟล์รูปจริงจากโฟลเดอร์ public/images/hero-placeholder.jpg (ต้องตั้งชื่อให้ตรง)
      style={{ backgroundImage: "url('/images/places/hero-placeholder.jpg')" }}
    >
      {/* เลเยอร์สีดำโปร่งแสง */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* คอนเทนเนอร์สำหรับเนื้อหาข้อความ) */}
      <div className="relative z-10 text-center px-[var(--space-4)] flex flex-col items-center space-y-[var(--space-4)] w-full max-w-3xl">
        {/* ข้อความต้อนรับ */}
        <p className="text-lg md:text-xl font-medium text-[var(--color-surface)] opacity-90">
          ยินดีต้อนรับสู่เชียงใหม่
        </p>

        {/* หัวข้อหลัก */}
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-surface)] drop-shadow-md">
          ออกเดินทางค้นพบประสบการณ์ใหม่
        </h1>

        {/* คำโปรย */}
        <p className="text-base md:text-lg text-[var(--color-surface)] opacity-90 max-w-xl">
          วางแผนทริปในฝันของคุณ สัมผัสธรรมชาติ วัฒนธรรม และของกินอร่อยทั่วเชียงใหม่
        </p>

        {/* พื้นที่สำหรับวาง SearchBar */}
        <div className="w-full mt-[var(--space-6)]">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
