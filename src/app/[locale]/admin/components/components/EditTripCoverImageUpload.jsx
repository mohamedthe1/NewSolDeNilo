"use client";
import React from "react";
import Image from "next/image";
import { FaImage, FaTrash } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useTripID } from "../../context/TripIDContext";

const EditTripCoverImageUpload = () => {
  const { themeName } = useTheme();
  const { tripData, updateTripField } = useTripID();

  // ✅ اختيار صورة الغلاف
  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateTripField("cover_image", URL.createObjectURL(file));
      updateTripField("cover_name", file.name);
    }
  };

  // ✅ حذف صورة الغلاف
  const removeCoverImage = () => {
    updateTripField("cover_image", "");
    updateTripField("cover_name", "");
  };

  return (
    <div>
      <h3
        className={`text-xl font-bold mb-3 ${
          themeName === "dark" ? "text-gold" : "text-[#3a2c0a]"
        }`}
      >
        Cover Image
      </h3>

      {/* زر اختيار الصورة */}
      <label
        className={`flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg font-bold w-fit ${
          themeName === "dark"
            ? "bg-[#c9a34a] text-black hover:bg-yellow-500"
            : "bg-[#c9a34a] text-white hover:bg-[#b5892e]"
        }`}
      >
        <FaImage /> Choose Cover Image
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverImage}
          className="hidden"
        />
      </label>

      {/* معاينة الصورة + اسم + زر حذف */}
      {tripData?.cover_image && (
        <div className="mt-3">
          <Image
            src={tripData.cover_image}
            alt="Cover Preview"
            width={128}
            height={128}
            className="w-32 h-32 object-cover rounded-lg shadow"
          />
          {/* حقول إدخال متعددة اللغات */}
          {["en", "es", "fr", "de", "it", "zh"].map((lang) => (
            <input
              key={lang}
              type="text"
              value={tripData.cover_name?.[lang] || ""}
              onChange={(e) =>
                updateTripField("cover_name", {
                  ...tripData.cover_name,
                  [lang]: e.target.value,
                })
              }
              placeholder={`Name (${lang.toUpperCase()})`}
              className={`mt-2 w-full p-2 rounded-lg border text-sm outline-none ${
                themeName === "dark"
                  ? "bg-[#0f0f0f] border-gold/30 text-white"
                  : "bg-[#fdf6e3] border-[#c9a34a]/40 text-[#3a2c0a]"
              }`}
            />
          ))}

          {/* زر حذف الصورة */}
          <button
            type="button"
            onClick={removeCoverImage}
            className={`mt-2 flex items-center gap-2 px-3 py-1 rounded-lg font-bold text-sm ${
              themeName === "dark"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            <FaTrash /> Remove Image
          </button>
        </div>
      )}
    </div>
  );
};

export default EditTripCoverImageUpload;
