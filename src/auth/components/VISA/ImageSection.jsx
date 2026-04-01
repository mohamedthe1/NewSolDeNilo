"use client";
import React from "react";
import Image from "next/image";
import { useScreenSize } from "@/hooks/screenSize";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles"; // ✅ استدعاء الثيم

const ImageSection = () => {
  const { width } = useScreenSize();
const { t } = useTranslation("visa");
  const muiTheme = useTheme(); // ✅ يجيب الثيم الحالي (light/dark)

  return (
    <section
      className="relative w-full h-[600px]"
      style={{
        background: `linear-gradient(to bottom, ${muiTheme.palette.background.default}, ${muiTheme.palette.background.paper})`, // ✅ خلفية متدرجة من الثيم
      }}
    >
      <Image
        src={
          width <= 911
            ? "/assets/Copilot_20250922_151508.webp"
            : "/assets/Copilot_20250922_151913.webp"
        }
        alt="Egypt Visa Banner"
        fill
        className="object-cover bg-bottom z-0"
        priority
      />

      {/* طبقة شفافية */}
      <div
        className="absolute top-0 left-0 w-full h-full z-10"
        style={{ backgroundColor: muiTheme.palette.action.hover }} // ✅ طبقة شفافية من الثيم
      />

      {/* النصوص */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 animate-slideUp delay-200">
        <h1
          className="text-6xl font-bold tracking-wide animate-pulseSlow"
          style={{ color: muiTheme.palette.primary.contrastText }} // ✅ النص من الثيم
        >
          {t("VISA")}
        </h1>
        <p
          className="mt-4 text-2xl font-semibold animate-fadeIn delay-400"
          style={{ color: muiTheme.palette.text.primary }} // ✅ النصوص الثانوية من الثيم
        >
          {t("VISA_P")}
        </p>
      </div>
    </section>
  );
};

export default ImageSection;
