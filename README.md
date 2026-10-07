# ChiangMai-Travel local

คำอธิบายสั้นๆ ว่าเว็บนี้ทำอะไร

🔗 **Demo:** https://your-site.com


## ✨ ฟีเจอร์

- แผนที่
- รายละเอียดสถานที่
- ค้นหาและกรองข้อมูล
- จัดทริป
- ถาม AI

## 🧰 เทคโนโลยีที่ใช้
 
- [Next.js](https://nextjs.org) 16 (App Router) + [React](https://react.dev) 19
- TypeScript (strict mode)
- [Tailwind CSS](https://tailwindcss.com) v4 + CSS Modules + design tokens ใน `globals.css`
- [Leaflet](https://leafletjs.com) / [react-leaflet](https://react-leaflet.js.org) สำหรับแผนที่
- [Zod](https://zod.dev) ตรวจ input ของ API และ response จาก Open-Meteo
- [Open-Meteo](https://open-meteo.com) API สำหรับสภาพอากาศ (ไม่ต้องใช้ key)
- [Google Gemini API](https://ai.google.dev) สำหรับผู้ช่วย AI
- ESLint + Prettier + EditorConfig

## 🚀 เริ่มต้นใช้งาน

### สิ่งที่ต้องมี
 
- Node.js 20.9 ขึ้นไป
- npm

### ติดตั้งและรัน
 
```bash
# 1) ติดตั้ง dependencies
npm install
 
# 2) สร้างไฟล์ environment
cp .env.example .env.local
# แล้วใส่ AI_API_KEY ใน .env.local (ดูหัวข้อถัดไป)
 
# 3) รันโหมดพัฒนา
npm run dev
```

### ตั้งค่า Environment

คัดลอกไฟล์ตัวอย่างแล้วแก้ค่า

```bash
cp .env.example .env
```

| ตัวแปร | คำอธิบาย |
|--------|----------|
| `PORT` | พอร์ตที่เซิร์ฟเวอร์ใช้ |
| `DATABASE_URL` | ลิงก์เชื่อมต่อฐานข้อมูล |

### รันโปรเจกต์

```bash
npm run dev
```

เปิดเบราว์เซอร์ที่ http://localhost:3000

## 📁 โครงสร้างโปรเจค
 
```text
.
├── public/
│   ├── images/
│   │   ├── places/          # รูปสถานที่ (อ้างอิงจาก place.image)
│   │   └── trips/           # รูปไอเดียทริป
│   └── audio/dialect/       # (ไม่บังคับ) ไฟล์เสียงคำเมือง
└── src/
    ├── app/                 # เส้นทางทั้งหมด (App Router)
    │   ├── page.tsx         # หน้าแรก
    │   ├── explore/         # สำรวจ + รายละเอียดสถานที่ [id]
    │   ├── map/             # แผนที่ (Leaflet โหลดแบบ client-only)
    │   ├── planner/         # จัดทริป
    │   ├── ask-ai/          # หน้าแชต AI
    │   ├── dialect/         # คำเมือง
    │   ├── api/chat/        # POST /api/chat เรียก Gemini ฝั่ง Server
    │   ├── layout.tsx       # Root layout + ฟอนต์ Noto Sans Thai
    │   ├── globals.css      # design tokens (สี ระยะห่าง รูปทรง)
    │   ├── loading.tsx · error.tsx · not-found.tsx
    ├── components/
    │   ├── home/            # Hero, SearchBar, CategoryChips, WeatherCard, PlaceCard, ...
    │   ├── explore/         # ExploreFilters
    │   ├── planner/         # PlannerClient, PlannerList, AddPlaceSearch, ...
    │   ├── ask-ai/          # ChatWindow, MessageBubble, SuggestedPrompts
    │   ├── layout/          # Navbar
    │   └── shared/          # PageHeader, EmptyState
    ├── data/                # ข้อมูลคงที่: places, trips, categories, dialect
    ├── lib/                 # ai.ts, weather.ts, places.ts, dialect.ts, useLocalStorage.ts
    └── types/               # Place, TripIdea, Category, Chat, Dialect
```
