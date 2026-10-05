import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const notoSansThai = Noto_Sans_Thai({
  display: "swap",
  variable: "--font-sans",
  subsets: ["thai", "latin"],
});

/* const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); */

export const metadata: Metadata = {
  title: "คู่มือเที่ยวเชียงใหม่ล้านนนา",
  description: "ค้นหาวัด คาเฟ่ ธรรมชาติ และของอร่อยในเชียงใหม่",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={notoSansThai.variable}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
