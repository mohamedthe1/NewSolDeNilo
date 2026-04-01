"use client";
import { motion, AnimatePresence } from "framer-motion";

/* Logo Letter Component */
export default function LogoLetter({ char, theme }) {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.2, textShadow: "0 0 20px rgba(201,163,74,0.9)" }}
      style={{
        borderColor: "#FF9800",
        backgroundImage: `linear-gradient(to bottom right, ${theme.logoGradientFrom}, ${theme.logoGradientTo})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      className="relative px-[8px] text-center font-extrabold border-2 rounded-lg transition-transform duration-500"
    >
      {char}
    </motion.span>
  );
}