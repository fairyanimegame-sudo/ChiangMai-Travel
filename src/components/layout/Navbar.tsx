import Link from "next/link";
import NavLinks from "./NavbarLinks";
import styles from "./Navbar .module.css";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          เชียงใหม่ทริปเที่ยว
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
