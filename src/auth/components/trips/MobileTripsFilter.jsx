"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useCitiesCategories } from "@/context/CitiesCategoriesContext";

export default function MobileTripsFilter({ filters, setFilters }) {
  const { t, i18n } = useTranslation("home");
  const { cities, categories, loading } = useCitiesCategories();
  const lang = i18n.language || "en";

  const handleCityClick = (cityName) => {
    setFilters((prev) => ({
      ...prev,
      city: prev.city === cityName ? "" : cityName,
    }));
  };

  const handleCategoryClick = (catName) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === catName ? "" : catName,
    }));
  };

  const chipStyle = (active) =>
    `px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
      active
        ? "bg-[#FF9800] text-white shadow-md"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  if (loading) {
    return (
      <p className="lg:hidden text-center text-gray-500 mb-6">
        {t("LoadingCategories")}
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:hidden w-full flex flex-col gap-4 mb-6"
    >
      {/* فلترة المدن */}
      <div>
        <h3 className="text-lg font-bold mb-2">{t("FilterByCity")}</h3>
        <div className="flex flex-wrap gap-2">
          <span
            className={chipStyle(filters.city === "")}
            onClick={() => handleCityClick("")}
          >
            {t("All")}
          </span>
          {cities.map((city) => {
            const displayName =
              typeof city.name === "object"
                ? city.name[lang] || city.name["en"]
                : city.name;
            return (
              <span
                key={city.id}
                className={chipStyle(filters.city === displayName)}
                onClick={() => handleCityClick(displayName)}
              >
                {displayName}
              </span>
            );
          })}
        </div>
      </div>

      {/* فلترة الكاتيجوري */}
      <div>
        <h3 className="text-lg font-bold mb-2">{t("FilterByCategory")}</h3>
        <div className="flex flex-wrap gap-2">
          <span
            className={chipStyle(filters.category === "")}
            onClick={() => handleCategoryClick("")}
          >
            {t("All")}
          </span>
          {categories.map((cat) => {
            const displayName =
              typeof cat.name === "object"
                ? cat.name[lang] || cat.name["en"]
                : cat.name;
            return (
              <span
                key={cat.id}
                className={chipStyle(filters.category === displayName)}
                onClick={() => handleCategoryClick(displayName)}
              >
                {displayName}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
