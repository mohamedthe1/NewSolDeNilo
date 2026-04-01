/* eslint-disable react-hooks/purity */
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { sites } from "@/constants/images";
import Highlighter from "react-highlight-words";

export default function TripHeader({ trip, lang }) {
  const { themeName } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ تغيير تلقائي كل 3 ثواني
  useEffect(() => {
    if (!trip?.gallery_images || trip.gallery_images.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === trip.gallery_images.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [trip?.gallery_images?.length]);

  if (!trip?.gallery_images || trip.gallery_images.length === 0) {
    return (
      <div className="text-center py-10">
        No photos are available for this trip.
      </div>
    );
  }

  const searchWords = sites.map((site) => site.name);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`w-full p-6 rounded-xl shadow-lg transition ${
        themeName === "dark"
          ? "bg-black/40 text-gold"
          : "bg-white/90 text-[#3a2c0a]"
      }`}
    >
      {/* العنوان */}
      <motion.h1
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-3xl font-extrabold mb-6 border-b pb-3 ${
          themeName === "dark" ? "border-gold/50" : "border-[#c9a34a]/50"
        }`}
      >
        {trip.title?.[lang] || trip.title?.en}
      </motion.h1>

      {/* ✅ الصورة الرئيسية */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="overflow-hidden rounded-lg shadow-md mb-6 relative h-[500px]"
      >
        <Image
          src={trip.gallery_images[activeIndex].url || "/default.jpg"}
          alt={
            trip.gallery_images[activeIndex].name?.[lang] ||
            trip.gallery_images[activeIndex].name?.en ||
            "Trip image"
          }
          fill
          className="object-cover w-full h-[500px] transform hover:scale-105 transition duration-500 rounded-lg"
          priority
        />

        {trip.gallery_images[activeIndex].name && (
          <div className="absolute bottom-4 left-4 text-xl font-bold px-4 py-2 rounded bg-black/50 text-white">
            {trip.gallery_images[activeIndex].name?.[lang] ||
              trip.gallery_images[activeIndex].name?.en}
          </div>
        )}
      </motion.div>

      {/* ✅ الصور الجانبية المصغرة مع Drag */}
      <motion.div
        className="flex gap-4 lg:flex-wrap cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -200, right: 0 }}
        dragElastic={0.1}
      >
        {trip.gallery_images.map((img, index) => (
          <div
            key={index}
            className={`relative w-[150px] h-[100px] rounded-lg cursor-pointer border-2`}
            style={{
              borderColor:
                index === activeIndex
                  ? themeName === "dark"
                    ? "#FFD700"
                    : "#c9a34a"
                  : "transparent",
            }}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={img.url || "/default.jpg"}
              alt={img.name?.[lang] || img.name?.en || `Thumbnail ${index}`}
              fill
              className="object-cover rounded-lg"
            />

            {img.name && (
              <div className="absolute bottom-2 left-2 text-xs font-bold bg-black/50 text-white px-2 py-1 rounded">
                {img.name?.[lang] || img.name?.en}
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* ✅ الوصف مع تمييز الكلمات */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="leading-relaxed text-lg mt-6"
      >
        <Highlighter
          highlightClassName="bg-yellow-200"
          searchWords={[trip?.title?.[lang] || trip?.title?.en || ""]}
          autoEscape={true}
          textToHighlight={trip?.description?.[lang] || trip?.description?.en || ""}
        />
      </motion.div>
    </motion.section>
  );
}
