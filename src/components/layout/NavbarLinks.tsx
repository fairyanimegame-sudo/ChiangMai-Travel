"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const links = [
  { href: "/explore", label: "สำรวจ" },
  { href: "/map", label: "แผนที่" },
  { href: "/planner", label: "จัดทริป" },
  { href: "/ask-ai", label: "ถาม AI" },
  { href: "/dialect", label: "คำเมือง" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="เมนูหลัก">
      <ul className={styles.list}>
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={isActive ? styles.active : styles.link}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
