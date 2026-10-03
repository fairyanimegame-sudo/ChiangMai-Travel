"use client";

import { useState } from "react";
import {useRouter} from "next/navigation"; //ใช้เปลี่ยนหน้าเพจ

export default function SearchBar() {
    //state
    const[query , setQuery] = useState(""); //เก็บข้อความค้นหา(เริ่มต้นด้วยค่าว่าง"")
    const router = useRouter(); //ใช้งาน useRouter เก็บไว้ในตัวแปร router เพื่อใช้เตรียมเปลี่ยนหน้าเพจ

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //ป้องกันการรีเฟรชหน้าเพจเมื่อกด Enter
        if(!query.trim()) return; //ถ้า query เป็นค่าว่างหรือมีแต่ช่องว่าง ให้ return ออกไป ไม่ทำอะไร
        router.push(`/explore?q=${encodeURIComponent(query)}`);
        //เปลี่ยนหน้าไป /explore พร้อมส่งค่าค้นหา query ไปที่พารามิเตอร์ q โดยใช้ encodeURIComponent เพื่อเข้ารหัสข้อความค้นหาให้ปลอดภัย
    };

    //แสดงผลที่หน้าจอ
    return (
        <form onSubmit={handleSubmit} //ผูกฟังก์ชัน handleSubmit เข้ากับ event onSubmit ของ form
        //ตกแต่ง SearchBar
        className="flex items-center w-full max-w-lg mx-auto bg-white rounded-full p-2 shadow-lg">

            <input //ช่องค้นหา
                type = "text"
                value = {query}
                onChange = {(e) => setQuery(e.target.value)} //เมื่อมีการพิมพ์ข้อความในช่องค้นหา จะเอาค่าที่พิมพ์ไปอัพเดตลง state query ทันที
                placeholder = "ค้าหาสถานที่ท่องเที่ยวในเชียงใหม่..."
                aria-label = "ช่องค้นหา"
                className = "flex-grow px-4 py-2 text-gray-700 bg-transparent outline-none rounded-l-full"
            />
            <button
                type = "submit"
                className = "px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition-colors"
            >ค้นหา</button>
        </form>
    )
}