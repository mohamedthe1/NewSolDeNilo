"use client";
import React from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";

const ThemeToggle = ({ scrolled }) => {
  const { themeName, toggleThemeFun } = useTheme();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const isHome =
    segments.length === 0 ||
    (segments.length === 1 &&
      ["en", "fr", "de", "it", "es", "pt"].includes(segments[0]));

  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Button
        sx={{ zIndex: 9999 }}
        onClick={toggleThemeFun}
        className={`
          p-2 rounded-full border transition-all duration-300
          ${
            themeName === "dark"
              ? "bg-yellow-500 border-yellow-600 hover:bg-yellow-600 hover:text-white"
              : isHome
                ? "bg-gray-200 border-gray-300 hover:bg-gray-300 hover:text-black" // ✅ ستايل قديم للهوم
                : "bg-white border-gray-300 hover:bg-gray-100 hover:text-black" // ✅ ستايل جديد لغير الهوم
          }
        `}
      >
        {themeName === "dark" ? (
          <BsSun size={20} color="#fff" />
        ) : (
          <BsMoon size={20} color={scrolled  ? "#999" : isHome  ? "#fff": "#999"} />
        )}
      </Button>
    </motion.div>
  );
};

export default ThemeToggle;
