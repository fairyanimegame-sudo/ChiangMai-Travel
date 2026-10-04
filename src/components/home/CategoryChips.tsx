import React from 'react';
import Link from 'next/link'; //ใช้เปลี่ยนหน้าโดยไม่โหลดหน้าใหม่
import {categories} from '@/data/categories';

export default function CategoryChips() {
    return (
        //กำหนดความกว้างเต็ม (w-full) และซ่อน Scrollbar แต่ยังเลื่อนได้ (overflow-x-auto)
        <div className="w-full overflow-x-auto py-[var(--space-4)] scrollbar-hide">
            {/* เรียงปุ่ม ใช้ flex เพื่อเรียงแนวนอน , กำหนดระยะห่างช่องไฟด้วย gap , กันข้อความตกบรรทัดด้วย whitespace-nowrap */}
            <div className="flex items-center justify-start md:justify-center gap-[var(--space-3)] whitespace-nowrap px-[var(--space-4)] min-w-max">
                
                {categories.map((category) => ( //วนลูปอ่านข้อมูลทีละรายการจาก array categories ที่ import มา
                    <Link
                        key={category.id}
                        href={category.href} 
                        // กำหนดสไตล์ของชิปหมวดหมู่ พื้นหลังสีขาว ขอบมน ตัวหนังสือสีเทา เมื่อเอาเมาส์ชี้จะเปลี่ยนเป็นตัวหนังสือเป็นสีแดงและพื้นหลังสีแดงอ่อน
                        className="px-[var(--space-4)] py-[var(--space-2)] bg-[var(--color-surface)] text-[var(--color-text)]
                            text-sm font-medium rounded-[var(--radius-full)] border border-[var(--color-border)]
                            hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]
                            hover:bg-[var(--color-primary-soft)] transition-colors shadow-sm"
                    >
                        {category.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}