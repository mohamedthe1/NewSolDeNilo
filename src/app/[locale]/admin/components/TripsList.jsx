"use client";
import React, { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaTrash, FaMapMarkedAlt } from "react-icons/fa";
import EgyptianBackground from "@/components/layout/EgyptianBackground";
import { useTrip } from "../context/TripContext"; 
import { useTripID } from "../context/TripIDContext"; 
import DividerWithIcon from "@/components/layout/DividerWithIcon";
import { motion } from "framer-motion";

export default function TripsList() {
  const { themeName } = useTheme();
  const { trips, fetchTrips } = useTrip();
  const { deleteTrip } = useTripID();

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (id) => {
    const result = await deleteTrip(id);
    if (result.success) {
      fetchTrips();
    }
  };

  return (
    <div
      className={`rounded-xl shadow-lg p-6 ${
        themeName === "dark"
          ? "bg-black/40 border border-gold/30 text-white"
          : "bg-white/70 border border-[#c9a34a]/30 text-[#3a2c0a] backdrop-blur-sm"
      }`}
    >
      <EgyptianBackground />

      {/* ✅ عدد الرحلات */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-6"
      >
        <h2
          className={`text-2xl font-bold ${
            themeName === "dark"
              ? "text-gold"
              : "bg-gradient-to-r from-[#c9a34a] to-[#eab308] bg-clip-text text-transparent"
          }`}
        >
          All Trips
        </h2>
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md ${
            themeName === "dark"
              ? "bg-gold/20 text-gold"
              : "bg-[#fdf6e3] text-[#3a2c0a]"
          }`}
        >
          <FaMapMarkedAlt />
          <span className="font-semibold">Total: {trips.length}</span>
        </div>
      </motion.div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr
            className={`${
              themeName === "dark"
                ? "bg-gold/20 text-gold"
                : "bg-[#fdf6e3] text-[#3a2c0a]"
            }`}
          >
            <th className="p-3">Title</th>
            <th className="p-3">City</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <>
              <motion.tr
                key={trip.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`transition hover:scale-[1.01] ${
                  themeName === "dark"
                    ? "hover:bg-gold/10"
                    : "hover:bg-[#fdf6e3]/50"
                }`}
              >
                <td className="p-3">{trip.title?.en || trip.title}</td>
                <td className="p-3">
                  {Array.isArray(trip.trip_cities)
                    ? trip.trip_cities
                        .map((c) =>
                          typeof c.cities?.name === "object"
                            ? c.cities.name.en || c.cities.name.ar
                            : c.cities?.name,
                        )
                        .join("  𓋹  ")
                    : "—"}
                </td>
                <td className="p-3 font-semibold">
                  {trip.price} {trip.currency}
                </td>
                <td className="p-3 flex gap-3">
                  <button
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(trip.id)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-bold transition ${
                      themeName === "dark"
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </motion.tr>
              <DividerWithIcon />
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
