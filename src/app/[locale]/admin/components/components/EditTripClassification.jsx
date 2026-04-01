"use client";
import React from "react";
import { FaCity, FaTags, FaDollarSign } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useTripID } from "../../context/TripIDContext";
import { useCitiesCategories } from "../../context/CitiesCategoriesContext";
import { useTranslation } from "react-i18next";

const EditTripClassification = () => {
  const { themeName } = useTheme();
  const { tripData, updateTripField } = useTripID();
  const {
    cities: allCities = [],
    categories: allCategories = [],
    loading,
  } = useCitiesCategories();
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  // ✅ تأمين القيم الافتراضية
  const categories = Array.isArray(tripData?.categories)
    ? tripData.categories
    : [];
  const cities = Array.isArray(tripData?.cities) ? tripData.cities : [];
  const priceLevel = tripData?.priceLevel ?? "";

  const baseBoxStyle = `flex items-center gap-2 p-2 rounded-lg cursor-pointer transition`;
  const lightBoxStyle = `bg-white/80 border border-[#c9a34a]/40 text-gray-800 hover:bg-[#fdf6e3]`;
  const darkBoxStyle = `bg-black/40 border border-gold/40 text-gold hover:bg-[#1a1a1a]`;

  const toggleSelection = (list, key, value) => {
    const updated = list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value];
    updateTripField(key, updated);
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500">
        Loading cities & categories...
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
      {/* الكاتجري */}
      <div className="flex flex-col gap-2">
        <label
          className={`flex items-center gap-2 font-bold ${
            themeName === "dark" ? "text-gold" : "text-gray-700"
          }`}
        >
          <FaTags /> Categories
        </label>
        {allCategories.map((cat) => {
          const categoryName =
            cat.name?.[currentLang] || cat.name?.["en"] || String(cat.name);
          return (
            <div
              key={cat.id}
              className={`${baseBoxStyle} ${
                themeName === "dark" ? darkBoxStyle : lightBoxStyle
              }`}
              onClick={() =>
                toggleSelection(categories, "categories", cat.id) // ✅ تخزين ID
              }
            >
              <input
                type="checkbox"
                checked={categories.includes(cat.id)} // ✅ مقارنة بالـ ID
                onChange={() =>
                  toggleSelection(categories, "categories", cat.id)
                }
              />
              <span>{categoryName}</span>
            </div>
          );
        })}
      </div>

      {/* المدن */}
      <div className="flex flex-col gap-2">
        <label
          className={`flex items-center gap-2 font-bold ${
            themeName === "dark" ? "text-gold" : "text-gray-700"
          }`}
        >
          <FaCity /> Cities
        </label>
        {allCities.map((city) => {
          const cityName =
            city.name?.[currentLang] || city.name?.["en"] || "Unknown";

          return (
            <div
              key={city.id}
              className={`${baseBoxStyle} ${
                themeName === "dark" ? darkBoxStyle : lightBoxStyle
              }`}
              onClick={() => toggleSelection(cities, "cities", city.id)} // ✅ تخزين ID
            >
              <input
                type="checkbox"
                checked={cities.includes(city.id)} // ✅ مقارنة بالـ ID
                onChange={() => toggleSelection(cities, "cities", city.id)}
              />
              <span>{cityName}</span>
            </div>
          );
        })}
      </div>

      {/* الفئة السعرية */}
      <div className="flex flex-col gap-2">
        <label
          className={`flex items-center gap-2 font-bold ${
            themeName === "dark" ? "text-gold" : "text-gray-700"
          }`}
        >
          <FaDollarSign /> Price Level
        </label>
        <select
          value={priceLevel}
          onChange={(e) => updateTripField("priceLevel", e.target.value)}
          className={`w-full p-3 rounded-lg font-semibold transition focus:outline-none focus:ring-2 ${
            themeName === "dark"
              ? "bg-black/40 border border-gold/40 text-gold focus:ring-gold"
              : "bg-white/80 border border-[#c9a34a]/40 text-gray-800 focus:ring-[#c9a34a]"
          }`}
        >
          <option value="">Select Price Level</option>
          <option value="Economy">Economy</option>
          <option value="Standard">Standard</option>
          <option value="Luxury">Luxury</option>
        </select>
      </div>
    </div>
  );
};

export default EditTripClassification;
