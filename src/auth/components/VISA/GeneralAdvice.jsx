"use client";
import React from "react";
import Image from "next/image";
import { AdviceCard } from "@/constants/FixedTexts";
import { motion } from "framer-motion";
import { useScreenSize } from "../../../hooks/screenSize";
import { useTheme } from "@/context/ThemeContext"; // ✅ استدعاء الثيم
import { useTranslation } from "react-i18next"; // ✅ استدعاء الترجمة

const GeneralAdvice = () => {
  const { width } = useScreenSize();
  const { theme } = useTheme(); // ✅ جلب الثيم الحالي
  const { t } = useTranslation("visa"); // ✅ جلب الترجمة

  return (
    <div className={`w-full flex items-center flex-col px-4 ${theme.background}`}>
      <h1
        className={theme.title}
        style={{
          fontSize: "clamp(2rem, 4vw, 3.5rem)",
          textTransform: "capitalize",
          marginBottom: "2rem",
        }}
      >
        {t("generalAdviceTitle")} {/* العنوان مترجم */}
      </h1>

      <div className="flex flex-row flex-wrap gap-6 items-center justify-center w-full">
        {AdviceCard.map((i, index) => (
          <motion.div
            key={i.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`${theme.card} ${theme.shadow}`}
            style={{
              display: "flex",
              flexDirection: width <= 1024 ? "column" : "row-reverse",
              alignItems: width <= 1024 ? "" : "center",
              overflow: "hidden",
              maxWidth: "700px",
              width: "100%",
              minHeight: "500px",
              transition: "box-shadow 0.3s ease",
            }}
          >
            {/* صورة الكارد */}
            <div style={{ flex: "0 0 300px", position: "relative", zIndex: "10" }}>
              <Image
                src={i.imageUrl}
                alt={t(i.titleKey)} // ✅ العنوان مترجم
                width={width <= 1024 ? 700 : 500}
                height={250}
                className="object-cover"
              />
            </div>

            {/* محتوى الكارد */}
            <div
              className={`${theme.text}`}
              style={{
                flex: 1,
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <h2 className={theme.heading} style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
                {t(i.titleKey)} {/* ✅ العنوان مترجم */}
              </h2>
              <p className={theme.subText} style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                {t(i.descriptionKey)} {/* ✅ الوصف مترجم */}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GeneralAdvice;
