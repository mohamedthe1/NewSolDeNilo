/* eslint-disable react-hooks/purity */
"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Sidebar from "./components/Sidebar";
import DashboardHome from "./components/DashboardHome";
import AddTrip from "./components/AddTrip";
import TripsList from "./components/TripsList";
import BookingsList from "./components/BookingsList";
import Reports from "./components/Reports";
import MessagesList from "./components/MessagesList";
import EditTrip from "./components/EditTrip"; // ✅ استدعاء مكون التعديل
import EgyptianBackground from "@/components/layout/EgyptianBackground";
import UsersSection from "./components/UsersSection";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

const symbols = ["𓂀","𓋹","𓆣","𓇼","𓇯","𓏏","𓎛","𓊽","𓃾","𓅓","𓈇","𓉐","𓊹","𓌙","𓍿","𓎟"];

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { theme, themeName } = useTheme();
    const router = useRouter();
   const { user } = useAuth();

  // useEffect(() => {
  //   if (!user || user?.role !== "ADMIN") {
  //     router.replace("/"); // رجعه للصفحة الرئيسية
  //   }
  // }, [user, router]);

  // // لو المستخدم مش Admin، ما تعرضش أي محتوى
  // if (!user || user?.role !== "ADMIN") {
  //   return null;
  // }
  return (
    <main className={`relative flex min-h-screen ${theme.background} ${theme.text} overflow-hidden`}>
      <EgyptianBackground />

      <div className="absolute inset-0 pointer-events-none z-10">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className={`absolute ${
              themeName === "dark" ? "text-gray-700" : "text-[#c9a34a]"
            } opacity-20 text-7xl animate-pulse`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {symbols[Math.floor(Math.random() * symbols.length)]}
          </span>
        ))}
      </div>

      {/* Sidebar */}
      <Sidebar setActiveSection={setActiveSection} activeSection={activeSection} themeName={themeName} />

      {/* Main Content */}
      <section
        className={`flex-1 p-10 relative z-10 ${
          themeName === "dark" ? "bg-black" : "bg-white"
        } rounded-tl-3xl`}
      >
        {activeSection === "dashboard" && <DashboardHome themeName={themeName} />}
        {activeSection === "addTrip" && <AddTrip themeName={themeName} />}
        {activeSection === "trips" && <TripsList themeName={themeName} />}
        {activeSection === "editTrip" && <EditTrip themeName={themeName} />} {/* ✅ سكشن تعديل الرحلات */}
        {activeSection === "users" && <UsersSection themeName={themeName} />}
        {activeSection === "bookings" && <BookingsList themeName={themeName} />}
        {activeSection === "reports" && <Reports themeName={themeName} />}
        {activeSection === "messages" && <MessagesList themeName={themeName} />}
      </section>
    </main>
  );
}
