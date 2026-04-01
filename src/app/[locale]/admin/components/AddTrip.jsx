"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

// استدعاء الكومبوننتات
import BasicInfo from "./components/BasicInfo";
import CoverImageUpload from "./components/CoverImageUpload";
import GalleryUpload from "./components/GalleryUpload";
import TripIncludes from "./components/TripIncludes";
import DailyItinerary from "./components/DailyItinerary";
import SaveButton from "./components/SaveButton";
import TripClassification from "./components/TripClassification";
import EgyptianBackground from "@/components/layout/EgyptianBackground";

export default function AddTrip() {
  const { themeName } = useTheme();

  // الحالة الخاصة بالصور والبيانات
  const [coverImage, setCoverImage] = useState(null);
  const [coverName, setCoverName] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [tripIncludes, setTripIncludes] = useState([""]);
  const [itinerary, setItinerary] = useState([
    { day: 1, activities: [{ time: "", activity: "" }] },
  ]);
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [priceLevel, setPriceLevel] = useState("");

  return (
    <motion.form
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`space-y-8 max-w-3xl mx-auto p-8 rounded-2xl shadow-2xl ${
        themeName === "dark"
          ? "bg-black/40 border border-gold/30"
          : "bg-white/70 border border-[#c9a34a]/30 backdrop-blur-sm"
      }`}
    >
      <EgyptianBackground />
      {/* العنوان */}
      <h2
        className={`text-3xl font-extrabold text-center ${
          themeName === "dark"
            ? "text-gold"
            : "bg-gradient-to-r from-[#c9a34a] to-[#eab308] bg-clip-text text-transparent"
        }`}
      >
        Add New Trip
      </h2>

      {/* معلومات أساسية */}
      <BasicInfo />
      <TripClassification
        category={category}
        setCategory={setCategory}
        city={city}
        setCity={setCity}
        priceLevel={priceLevel}
        setPriceLevel={setPriceLevel}
      />
      {/* صورة الغلاف */}
      <CoverImageUpload
        coverImage={coverImage}
        setCoverImage={setCoverImage}
        coverName={coverName}
        setCoverName={setCoverName}
      />

      {/* صور المعرض */}
      <GalleryUpload
        galleryImages={galleryImages}
        setGalleryImages={setGalleryImages}
      />

      {/* ما تحتوي عليه الرحلة */}
      <TripIncludes
        tripIncludes={tripIncludes}
        setTripIncludes={setTripIncludes}
      />

      {/* البرنامج اليومي */}
      <DailyItinerary itinerary={itinerary} setItinerary={setItinerary} />

      {/* زر الحفظ */}
      <SaveButton />
    </motion.form>
  );
}
