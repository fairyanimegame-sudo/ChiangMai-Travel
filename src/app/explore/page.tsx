// src/app/explore/page.tsx
import { places } from '@/data/places'; // ดึงข้อมูลดิบของสถานที่ทั้งหมด
import { filterPlaces, sortPlaces } from '@/lib/places'; // ดึงฟังก์ชันกรองและเรียงลำดับที่เราสร้างไว้
import ExploreFilters from '@/components/explore/ExploreFilters'; // นำเข้าคอมโพเนนต์แผงกรองด้านบน
// import PlaceCard from '@/components/shared/PlaceCard'; // ปลดคอมเมนต์เมื่อดึงโค้ด PlaceCard มารวมโปรเจกต์แล้ว[cite: 30]
// import EmptyState from '@/components/shared/EmptyState'; // ปลดคอมเมนต์เมื่อคนที่ 1 สร้าง EmptyState เสร็จ[cite: 30]

// สร้าง Server Component รับค่า searchParams (คำค้นหา หมวด และการเรียง) จาก URL โดยตรง[cite: 30]
export default function ExplorePage({ searchParams }: { searchParams: { q?: string; category?: string; sort?: string } }) { 
  
  // นำข้อมูลดิบมาผ่านฟังก์ชันกรอง โดยส่งคำค้นหาและหมวดหมู่ที่ได้จาก URL เข้าไปเช็ก[cite: 30]
  const filtered = filterPlaces(places, { q: searchParams.q, categoryId: searchParams.category }); 
  
  // นำข้อมูลที่ผ่านการกรองแล้ว มาผ่านฟังก์ชันเรียงลำดับต่อ[cite: 30]
  const results = sortPlaces(filtered, searchParams.sort); 

  return ( // เริ่มวาดโครงสร้างหน้าจอ
    <main className="container mx-auto p-4 min-h-screen"> 
      
      <h1 className="text-3xl font-bold mb-6">สำรวจสถานที่</h1>
      
      <ExploreFilters /> {/* เรียกแสดงแผงเครื่องมือค้นหา กรอง เรียง */}
      
      {/* แจ้งจำนวนรายการที่ผ่านเงื่อนไขการค้นหาทั้งหมด[cite: 30] */}
      <p className="mb-4 text-[var(--color-muted)]">พบผลลัพธ์ {results.length} รายการ</p> 

      {results.length > 0 ? ( // ตรวจสอบว่าหลังจากกรองแล้วมีข้อมูลเหลือให้แสดงหรือไม่
        
        // ถ้ามีข้อมูล ให้สร้างโครงสร้างตาราง กริดแบบ 1, 2, และ 4 คอลัมน์ตามขนาดจอ[cite: 30]
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"> 
          
          {results.map(place => ( // นำผลลัพธ์มาวนลูปทีละรายการเพื่อแสดงการ์ด
            
            // หมายเหตุ: ตรงนี้ให้เอา <PlaceCard place={place} /> มาใส่แทน div ขัดตาทัพเมื่อรวมโค้ดเสร็จแล้ว[cite: 30]
            <div key={place.id} className="border p-4 rounded shadow"> 
              <h2 className="font-bold">{place.name}</h2> 
              <p>คะแนน: {place.rating}</p> 
            </div>
            
          ))}
        </div>
        
      ) : ( 
        
        // ถ้าไม่มีข้อมูลเลย ให้แสดง Empty State (หน้าจอว่างเปล่า)[cite: 30]
        // <EmptyState icon="search" title="ไม่พบสถานที่" message="ลองเปลี่ยนคำค้นหาหรือหมวดหมู่ดูนะ" /> // ใช้ตัวนี้เมื่อรวมไฟล์เสร็จ[cite: 30]
        <div className="text-center py-10">ไม่พบสถานที่ที่ต้องการ</div> 
        
      )}
    </main>
  );
}
