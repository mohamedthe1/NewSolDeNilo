"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { FaChartBar } from "react-icons/fa";
import EgyptianBackground from "@/components/layout/EgyptianBackground";

// ✅ استدعاء الـ contexts
import { useUsers } from "../context/UserContext";
import { useTrip } from "../context/TripContext";
import { usePurchase } from "../context/PurchaseContext";

export default function Reports() {
  const { themeName } = useTheme();
  const { users } = useUsers();
  const { trips } = useTrip();
  const { purchases } = usePurchase();

  // ✅ بيانات أساسية من الـ contexts
  const stats = [
    { id: "Users", value: users.length },
    { id: "Trips", value: trips.length },
    { id: "Bookings", value: purchases.length },
    { id: "Revenue", value: 250000 }, // هنا ممكن تربطها بكونتكست لو عندك بيانات مالية
  ];

  const colors = themeName === "dark" ? { scheme: "nivo" } : { scheme: "set2" };

  const sectionStyle = `rounded-lg p-6 shadow-lg ${
    themeName === "dark"
      ? "bg-black/40 border border-gold/30 text-white"
      : "bg-white/70 border border-[#c9a34a]/30 text-[#3a2c0a] backdrop-blur-sm"
  }`;

  return (
    <div
      className={`rounded-xl shadow-lg p-6 ${
        themeName === "dark"
          ? "bg-black/40 border border-gold/30 text-white"
          : "bg-white/70 border border-[#c9a34a]/30 text-[#3a2c0a] backdrop-blur-sm"
      }`}
    >
      <EgyptianBackground />

      <h2
        className={`flex items-center gap-2 text-2xl font-bold mb-6 ${
          themeName === "dark"
            ? "text-gold"
            : "bg-gradient-to-r from-[#c9a34a] to-[#eab308] bg-clip-text text-transparent"
        }`}
      >
        <FaChartBar /> Reports
      </h2>

      {/* ✅ Bar Chart */}
      <div className={`${sectionStyle} mb-6`} style={{ height: "350px" }}>
        <h3 className="text-xl font-bold mb-4">📊 Users, Trips & Bookings</h3>
        <ResponsiveBar
          data={stats}
          keys={["value"]}
          indexBy="id"
          margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
          padding={0.3}
          colors={colors}
          axisBottom={{
            legend: "Category",
            legendPosition: "middle",
            legendOffset: 40,
          }}
          axisLeft={{
            legend: "Value",
            legendPosition: "middle",
            legendOffset: -50,
          }}
        />
      </div>

      {/* ✅ Pie Chart */}
      <div className={`${sectionStyle} mb-6`} style={{ height: "350px" }}>
        <h3 className="text-xl font-bold mb-4">🍩 Distribution</h3>
        <ResponsivePie
          data={stats}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={colors}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextColor={themeName === "dark" ? "#FFD700" : "#333"}
          radialLabelsLinkColor={{ from: "color" }}
          sliceLabelsSkipAngle={10}
          sliceLabelsTextColor="#fff"
        />
      </div>

      {/* ✅ Line Chart */}
      <div className={sectionStyle} style={{ height: "350px" }}>
        <h3 className="text-xl font-bold mb-4">📈 Bookings Over Time</h3>
        <ResponsiveLine
          data={[
            {
              id: "Bookings",
              data: purchases.map((p) => ({
                x: new Date(p.created_at).toLocaleDateString(),
                y: 1, // ممكن تجمعهم حسب التاريخ لو عايز
              })),
            },
          ]}
          margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto" }}
          colors={colors}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          enableSlices="x"
        />
      </div>
    </div>
  );
}
