/* eslint-disable react-hooks/static-components */
"use client";
import ThemeToggle from "@/auth/components/ThemeToggle";
import React from "react";
import Link from "next/link";
import {
  FaHome,
  FaPlus,
  FaSuitcase,
  FaUsers,
  FaClipboardList,
  FaChartBar,
  FaEnvelope,
  FaEdit,
} from "react-icons/fa";
import EgyptianBackground from "@/components/layout/EgyptianBackground";

export default function Sidebar({ activeSection, setActiveSection }) {
  // ✅ دالة لتوليد زر مع حالة Active
  const NavButton = ({ section, icon, label }) => {
    const isActive = activeSection === section;
    return (
      <button
        onClick={() => setActiveSection(section)}
        className={`flex items-center gap-3 px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative cursor-pointer
          ${
            isActive
              ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg border-l-4 border-yellow-500"
              : "text-gold hover:text-yellow-400 hover:bg-black/20"
          }`}
      >
        {/* ✅ خط جانبي يوضح الزر النشط */}
        {isActive && (
          <span className="absolute left-0 top-0 h-full w-1 bg-yellow-500 rounded-r"></span>
        )}

        {/* ✅ نقطة ذهبية صغيرة بجانب الزر النشط */}
        {isActive && (
          <span className="absolute -left-3 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
        )}

        {/* ✅ أيقونة مع تأثير عند النشط */}
        <span
          className={`text-lg transition-transform ${
            isActive ? "scale-110 text-yellow-800 drop-shadow-md" : ""
          }`}
        >
          {icon}
        </span>
        {label}
      </button>
    );
  };

  return (
    <aside className="w-64 p-6 flex flex-col gap-6 bg-black/0 border-r border-gold/30">
      <EgyptianBackground />

      <h2 className="text-2xl font-bold mb-6 flex flex-row items-center justify-between">
        <span>WasetTravel</span> <ThemeToggle />
      </h2>

      <nav className="flex flex-col gap-3">
        <Link
          href="/"
          className="flex items-center gap-3 font-bold text-gold hover:text-yellow-500 transition"
        >
          ⬅ Back to Home
        </Link>

        <NavButton section="dashboard" icon={<FaHome />} label="Dashboard" />
        <NavButton section="addTrip" icon={<FaPlus />} label="Add New Trip" />
        <NavButton section="trips" icon={<FaSuitcase />} label="All Trips" />
        <NavButton section="editTrip" icon={<FaEdit />} label="Edit Trips" />
        <NavButton section="users" icon={<FaUsers />} label="Users" />
        <NavButton section="bookings" icon={<FaClipboardList />} label="Bookings" />
        <NavButton section="reports" icon={<FaChartBar />} label="Reports" />
        <NavButton section="messages" icon={<FaEnvelope />} label="Messages" />
      </nav>
    </aside>
  );
}
