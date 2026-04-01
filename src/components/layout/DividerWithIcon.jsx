"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export default function DividerWithIcon() {
  const { themeName } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center gap-3 justify-center"
    >
      <div
        className={`h-[3px] w-full ${
          themeName === "dark"
            ? "bg-[#FFC107] opacity-15"
            : "bg-[#FF9800]/50 opacity-30"
        }`}
      ></div>
      <span
        className={`text-2xl ${
          themeName === "dark" ? "text-gold" : "text-[#FF9800]"
        }`}
      >
        𓋹
      </span>
      <div
        className={`h-[3px] w-full ${
          themeName === "dark"
            ? "bg-[#FFC107] opacity-15"
            : "bg-[#FF9800]/50 opacity-30"
        }`}
      ></div>
    </motion.div>
  );
}
