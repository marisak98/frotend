"use client";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { ReactNode } from "react";
import styles from "@/components/dashboard/dashboard.module.css";
import Navbar from "@/components/dashboard/navbar/navbar";

type LayaoutProps = { children?: ReactNode };

export default function Layaout({ children }: LayaoutProps) {
  return (
    <div className="min-h-screen bg-[#151c2c] ">
      <div className={styles.container}>
        <div className={styles.menu}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
}
