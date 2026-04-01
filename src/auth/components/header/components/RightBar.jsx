"use client";
import { Avatar, Button, Typography, Select, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import ThemeToggle from "../../ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { usePurchase } from "@/context/PurchaseContext";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function RightBar({ scrolled }) {
  const { isLoggedIn, logout, user, handleOpen } = useAuth();
  const { themeName } = useTheme();
  const { t } = useTranslation("header");
console.log(user)
  const { currency, setCurrency } = usePurchase();
  const pathname = usePathname();
  // ✅ حالة العملة
  const segments = pathname.split("/").filter(Boolean);


  const isHome =
    segments.length === 0 ||
    (segments.length === 1 &&
      ["en", "fr", "de", "it", "es", "pt"].includes(segments[0]));

  return (
    <div className="flex items-center gap-4">
      {/* Theme Toggle */}
      <ThemeToggle scrolled={scrolled} />

      {/* زر تسجيل الدخول/الخروج */}
      <motion.div whileHover={{ scale: 1.1 }} className="flex">
        <Button
          onClick={isLoggedIn ? logout : handleOpen}
          style={{
            padding: "12px 15px",
            background: "linear-gradient(to right, #ca8a04, #FF9800)",
            color: "#fff",
            fontWeight: "600",
            letterSpacing: "0.05em",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
          }}
        >
          {isLoggedIn ? t("Logout") : t("SignUp")}
        </Button>
      </motion.div>

      {/* ✅ اختيار العملة */}
      <Select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        size="small"
        IconComponent={() => null}
        className="hidden lg:flex"
        sx={{
          padding: "8px 16px",
          borderRadius: "12px",
          fontWeight: "600",
          background: "linear-gradient(to right, #1f2937, #111827)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",

          // ✅ النص داخل الـ Select
          "& .MuiSelect-select": {
            color: "#f9fafb", // لون النص الأساسي
          },

          // ✅ السهم
          "& .MuiSelect-icon": {
            color: "#999",
          },

          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },

          "&:hover": {
            background: "linear-gradient(to right, #374151, #1f2937)",
          },
        }}
      >
        <MenuItem value="USD" sx={{ color: "#FF9800" }}>
          USD $
        </MenuItem>
        <MenuItem value="EUR" sx={{ color: "#e6e6e6" }}>
          EUR €
        </MenuItem>
      </Select>

      {/* عرض المستخدم */}
      {isLoggedIn && user && (
        <div className="hidden lg:flex items-center gap-2">
          {" "}
          <img
            alt={`${user?.name}` || "User Avatar"}
            src={`${user?.avatar}` || "/default-avatar.png"}
            width={40}
            height={40}
            style={{ border: "2px solid #d4af37", borderRadius: "50%" }}
          />{" "}
          <Typography
            variant="subtitle1"
            sx={{
              textTransform: "capitalize",
              fontWeight: "600",
              color:
                themeName === "dark"
                  ? "#fff"
                  : !isHome
                    ? "#333"
                    : scrolled
                      ? "#333"
                      : "#fff",
            }}
          >
            {" "}
            {user?.name}{" "}
          </Typography>{" "}
        </div>
      )}
    </div>
  );
}
