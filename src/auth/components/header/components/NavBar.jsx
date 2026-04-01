"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

// دالة بسيطة لتحويل النص لـ Base64
const encodeQuery = (queryObj) => {
  const str = JSON.stringify(queryObj);
  return Buffer.from(str).toString("base64");
};

export default function NavBar({ scrolled }) {
  const { themeName } = useTheme();
  const pathname = usePathname();
  const { t } = useTranslation("header");

  const navItems = ["home", "trips", "about", "contact","visaInfo"];

  const segments = pathname.split("/").filter(Boolean);
  const langPrefix = segments[0];
  const normalizedPath = "/" + segments.slice(1).join("/");

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
      }}
      className="hidden lg:flex items-center gap-10 font-medium text-lg"
    >
      {navItems.map((item) => {
        let path;
        if (item === "home") {
          path = "/";
        } else if (item === "trips") {
          // ✅ القيم الافتراضية كل مرة
          const encoded = encodeQuery({
            city: "all",
            category: "all",
            price: "Economy",
            popular: false,
          });
          path = `/trips?data=${encoded}`;
        } else {
          path = `/${item}`;
        }

        const isActive =
          (item === "home" && normalizedPath === "/") ||
          (item !== "home" && normalizedPath.startsWith(`/${item}`));

        return (
          <motion.div
            key={item}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link
              href={`/${langPrefix}${path}`}
              className={`relative group px-4 py-2 rounded-lg transition-all capitalize duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-yellow-800 to-yellow-500 text-white font-bold shadow-md scale-105 border-b-4 border-yellow-600"
                  : themeName === "dark"
                  ? "text-gray-200 hover:text-yellow-700"
                  : normalizedPath !== "/"
                  ? "text-gray-800 hover:text-yellow-600 font-semibold"
                  : scrolled
                  ? "text-gray-800 hover:text-yellow-600"
                  : "text-gray-200 hover:text-yellow-600"
              }`}
            >
              <span>{t(item)}</span>
              <span
                className={`absolute left-0 -bottom-1 h-[3px] bg-yellow-400 rounded-full transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
              {isActive && (
                <span className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-500 rounded-full shadow-md animate-pulse"></span>
              )}
            </Link>
          </motion.div>
        );
      })}
    </motion.nav>
  );
}
