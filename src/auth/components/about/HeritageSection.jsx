"use client";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import DividerWithIcon from "@/components/layout/DividerWithIcon";

export default function HeritageSection() {
  const { themeName } = useTheme();
  const { t } = useTranslation("about");

  // ✨ إعدادات الأنيميشن
  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      className="relative z-10 pb-20 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div
        className={`max-w-7xl mx-auto rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 border ${
          themeName === "dark"
            ? "border-gold/25 bg-black/40"
            : "border-[#c9a34a]/25 bg-white/70"
        }`}
      >
        {/* النص */}
        <motion.div variants={fadeLeft} className="flex-1">
          <h3
            className={`text-2xl font-bold mb-3 ${themeName === "dark" ? "text-gold" : "bg-gradient-to-r from-[#c9a34a] to-[#FF9800] bg-clip-text text-transparent"}`}
          >
            {t("h5")}
          </h3>
          <DividerWithIcon />

          <p
            className={`${themeName === "dark" ? "text-white/80" : "text-[#5c4520]"}`}
          >
            {t("p4")}
          </p>
        </motion.div>

        {/* الصورة */}
        <motion.div
          variants={fadeRight}
          className="flex-1 relative w-full h-56"
        >
          <Image
            src="/HomePageImage/pexels-axp-photography-500641970-18934598.webp"
            alt="Egyptian Heritage"
            fill
            className="object-cover rounded-2xl"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
