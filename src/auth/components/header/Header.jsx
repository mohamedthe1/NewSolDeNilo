"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import Logo from "./components/Logo";
import NavBar from "./components/NavBar";
import RightBar from "./components/RightBar";
import MobileNavBar from "./components/MobileNavBar";
import AdminButton from "./components/AdminButton"
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(""); // ✅ الحالة لإدارة الـ active
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 pt-8 lg:pt-0 ${
        scrolled
          ? `${theme.background} ${theme.border} ${theme.shadow}`
          : "bg-transparent"
      }`}
    >
      <div className="max-w-8xl container mx-auto px-6 py-4 flex items-center justify-between">
        <Logo scrolled={scrolled}/>
        <NavBar scrolled={scrolled}/>
        <MobileNavBar activeTab={activeTab} setActiveTab={setActiveTab} /> {/* ✅ نمرر الحالة */}
        <RightBar scrolled={scrolled}/>
        <AdminButton />
      </div>
    </motion.header>
  );
}
