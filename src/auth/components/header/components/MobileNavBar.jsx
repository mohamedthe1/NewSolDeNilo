"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { Home, Compass, Heart, User } from "lucide-react";

export default function MobileNavBar({ activeTab, setActiveTab }) {
  const router = useRouter();
  const pathname = usePathname(); 
  const { theme } = useTheme();

  const navItems = [
    { id: "home", label: "Home", icon: <Home size={22} />, path: "/" },
    { id: "trips", label: "Trips", icon: <Compass size={22} />, path: "/trips" },
    { id: "about", label: "About", icon: <Heart size={22} />, path: "/about" },
    { id: "contact", label: "Contact", icon: <User size={22} />, path: "/contact" },
  ];

  // ✅ إزالة prefix الخاص باللغة (en, ar, fr...)
  const cleanPath = pathname.replace(/^\/(en|ar|fr)/, "");

  // ✅ حدّث الـ activeTab عند تغيّر المسار
  useEffect(() => {
    let current;
    if (cleanPath === "/") {
      // لو المسار هو / فقط → خلي الـ Home active
      current = navItems.find((item) => item.path === "/");
    } else {
      // باقي الصفحات → استخدم startsWith
      current = navItems.find((item) => cleanPath.startsWith(item.path) && item.path !== "/");
    }
    if (current) setActiveTab(current.id);
  }, [cleanPath]);

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 lg:hidden border-t  bg-transparent`}
    >
      <div className="flex justify-around items-center py-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center text-xs font-semibold transition-all cursor-pointer ${
              activeTab === item.id ? "text-[#FF9800]" : theme.text
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
