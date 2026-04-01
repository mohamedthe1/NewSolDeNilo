/* eslint-disable react-hooks/purity */
"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Link from "next/link"; // ✅ استخدم Link من Next.js

const Footer = () => {
  const { theme, themeName } = useTheme();
  const { t } = useTranslation("footer");

  const symbols = [
    "𓂀","𓋹","𓆣","𓇼","𓇯","𓏏","𓎛","𓊽",
    "𓃾","𓅓","𓈇","𓉐","𓊹","𓌙","𓍿","𓎟",
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
      className={`
        flex flex-col items-center justify-center
        py-12 px-6 w-full relative overflow-hidden
        transition-colors duration-500
        ${theme.background} ${theme.text}
      `}
    >
      {/* خلفية الرموز */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className={`absolute ${
              themeName === "dark" ? "text-gray-700" : "text-[#c9a34a]"
            } opacity-20 text-6xl animate-pulse`}
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

      {/* اسم البراند */}
      <motion.p
        variants={fadeUp}
        className={`
          text-2xl font-extrabold tracking-wide drop-shadow-md relative z-10
          ${themeName === "dark" ? "text-gold" : "bg-gradient-to-r from-[#c9a34a] to-[#eab308] bg-clip-text text-transparent"}
        `}
      >
        LUXOR & ASWAN
      </motion.p>

      {/* الوصف */}
      <motion.p variants={fadeUp} className="mt-2 text-sm opacity-80 text-center max-w-xl relative z-10">
        {t("p")}
      </motion.p>

      {/* روابط سريعة */}
      <motion.div variants={fadeUp} className="flex gap-6 mt-6 text-sm font-medium relative z-10">
        <Link href="/" className={`hover:underline ${
          themeName === "dark" ? "text-white/80 hover:text-gold" : "text-[#3a2c0a]/80 hover:text-[#c9a34a]"
        }`}>
          {t("Home")}
        </Link>
        <Link href="/about" className={`hover:underline ${
          themeName === "dark" ? "text-white/80 hover:text-gold" : "text-[#3a2c0a]/80 hover:text-[#c9a34a]"
        }`}>
          {t("AboutUs")}
        </Link>
        <Link href="/trips" className={`hover:underline ${
          themeName === "dark" ? "text-white/80 hover:text-gold" : "text-[#3a2c0a]/80 hover:text-[#c9a34a]"
        }`}>
          {t("Tours")}
        </Link>
        <Link href="/contact" className={`hover:underline ${
          themeName === "dark" ? "text-white/80 hover:text-gold" : "text-[#3a2c0a]/80 hover:text-[#c9a34a]"
        }`}>
          {t("Contact")}
        </Link>
      </motion.div>

      {/* أيقونات السوشيال ميديا */}
      <motion.div variants={fadeUp} className="flex gap-5 mt-8 relative z-10">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
          className={`p-3 rounded-full transition ${
            themeName === "dark"
              ? "bg-gold/20 hover:bg-gold/40 text-gold"
              : "bg-[#c9a34a]/20 hover:bg-[#c9a34a]/40 text-[#c9a34a]"
          }`}>
          <FaFacebookF />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
          className={`p-3 rounded-full transition ${
            themeName === "dark"
              ? "bg-gold/20 hover:bg-gold/40 text-gold"
              : "bg-[#c9a34a]/20 hover:bg-[#c9a34a]/40 text-[#c9a34a]"
          }`}>
          <FaInstagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
          className={`p-3 rounded-full transition ${
            themeName === "dark"
              ? "bg-gold/20 hover:bg-gold/40 text-gold"
              : "bg-[#c9a34a]/20 hover:bg-[#c9a34a]/40 text-[#c9a34a]"
          }`}>
          <FaTwitter />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
          className={`p-3 rounded-full transition ${
            themeName === "dark"
              ? "bg-gold/20 hover:bg-gold/40 text-gold"
              : "bg-[#c9a34a]/20 hover:bg-[#c9a34a]/40 text-[#c9a34a]"
          }`}>
          <FaYoutube />
        </a>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
