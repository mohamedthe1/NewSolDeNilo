"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import DividerWithIcon from "@/components/layout/DividerWithIcon";

export default function AboutHero() {
  const { themeName } = useTheme();
  const { t } = useTranslation("about");

  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-5"
        >
          <p
            className={`uppercase tracking-widest text-sm ${themeName === "dark" ? "text-white/60" : "text-[#6b4f1d]"}`}
          >
            {t("AboutWasetTravel")}
          </p>
          <DividerWithIcon />
          <h1
            className={`text-4xl lg:text-5xl font-extrabold leading-tight ${themeName === "dark" ? "text-gold" : "bg-gradient-to-r from-[#c9a34a] to-[#FF9800] bg-clip-text text-transparent"}`}
          >
            {t("h1")}
          </h1>
          <DividerWithIcon />
          <p
            className={`${themeName === "dark" ? "text-white/80" : "text-[#5c4520]"} text-lg`}
          >
            {t("p")}
          </p>
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-80 lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl"
        >
          <Image
            src="/Sharm_El_Sheikh/pexels-fotis-michalainas-2149881541-30835578.webp"
            alt="WasetTravel Luxury Experience"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
