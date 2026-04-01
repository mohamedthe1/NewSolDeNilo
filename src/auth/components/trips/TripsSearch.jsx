"use client";
import React from "react";
import { FaSearch, FaThLarge, FaBars } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useCitiesCategories } from "@/context/CitiesCategoriesContext";

export default function TripsSearch({
  search,
  setSearch,
  cardStyle,
  setCardStyle,
  filters,
  setFilters,
}) {
  const { themeName } = useTheme();
  const { t, i18n } = useTranslation("trips");
  const { cities, categories, loading } = useCitiesCategories();
  const lang = i18n.language || "en";

  const handleCityClick = (cityId) => {
    setFilters((prev) => ({
      ...prev,
      city: prev.city === cityId ? "" : cityId,
    }));
    console.log("City filter updated:", cityId);
  };

  const handleCategoryClick = (catId) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === catId ? "" : catId,
    }));
    console.log("Category filter updated:", catId);
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
    <>
      {/* شريط البحث */}
      <div
        className={`hidden lg:flex w-[100%] items-center gap-3 p-4 rounded-xl shadow transition ${
          themeName === "dark"
            ? "bg-[#0f0f0f] border border-gold/30 text-white"
            : "bg-white/80 border border-[#c9a34a]/30 text-[#3a2c0a] backdrop-blur-sm"
        }`}
      >
        <FaSearch
          className={`text-xl ${themeName === "dark" ? "text-gold" : "text-[#3a2c0a]"}`}
        />
        <input
          type="text"
          placeholder={t("Searchtrips")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`flex-1 p-2 rounded-lg border outline-none transition ${
            themeName === "dark"
              ? "bg-[#1a1a1a] text-white border-gold/30 focus:border-gold"
              : "bg-white text-[#3a2c0a] border-[#c9a34a]/30 focus:border-[#c9a34a]"
          }`}
        />
      </div>

      {/* فلترة المدن والفئات */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex lg:hidden flex-col gap-4 mb-6 mt-5"
      >
        {/* المدن */}
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
                  className={chipStyle(filters.city === city.id)}
                  onClick={() => handleCityClick(city.id)}
                >
                  {displayName}
                </span>
              );
            })}
          </div>
        </div>

        {/* الفئات */}
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
                  className={chipStyle(filters.category === cat.id)}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {displayName}
                </span>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}
