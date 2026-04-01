"use client";
import React from "react";
import { FaMapMarkerAlt, FaDollarSign, FaEuroSign, FaTags, FaFire } from "react-icons/fa";
import { useCitiesCategories } from "@/context/CitiesCategoriesContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import Divider from "@/components/layout/Divider";
import { useQueryFilters } from "@/context/QueryContext";
import { usePurchase } from "@/context/PurchaseContext";

export default function TripsFilter() {
  const { cities: allCities, categories: allCategories, loading } = useCitiesCategories();
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const { t } = useTranslation("trips");
  const { themeName } = useTheme();

  const { city, category, price, popular, updateValue } = useQueryFilters();
  const { currency } = usePurchase();

  const handleCheckboxChange = (type, value) => {
    let current = (type === "city" ? city : category) || [];

    if (current === "all" || current.includes("all")) {
      current = [];
    }

    if (current.includes(value)) {
      updateValue(type, current.filter((v) => v !== value));
    } else {
      updateValue(type, [...current, value]);
    }
  };

  const rangesUSD = [
    { label: "0 - 900", value: "Economy", min: 0, max: 900 },
    { label: "901 - 1500", value: "Standard", min: 901, max: 1500 },
    { label: "1500+", value: "Luxury", min: 1501, max: Infinity },
  ];

  const conversionRate = 0.85;

  const priceRanges =
    currency === "EUR"
      ? rangesUSD.map((r) => ({
          ...r,
          label:
            r.max === Infinity
              ? `${(r.min * conversionRate).toFixed(0)}+ €`
              : `${(r.min * conversionRate).toFixed(0)} - ${(r.max * conversionRate).toFixed(0)} €`,
        }))
      : rangesUSD.map((r) => ({
          ...r,
          label:
            r.max === Infinity
              ? `${r.min}+ $`
              : `${r.min} - ${r.max} $`,
        }));

  if (loading) {
    return <p className="text-center text-gray-500">{t("Loading")}</p>;
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  return (
    <motion.aside
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className={`p-6 rounded-xl shadow-lg transition ${
        themeName === "dark"
          ? "bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1a1a] text-[#FF9800] border border-[#c9a34a]/40 "
          : "bg-white/0 border border-[#c9a34a]/30  text-[#1a1a1a]"
      }`}
    >
      <motion.h3 variants={fadeUp} className="text-xl font-bold mb-6 text-[#FF9800]">
        {t("Filters")}
      </motion.h3>

      <motion.div variants={staggerContainer} className="flex flex-col gap-8">
        {/* المدن */}
        <motion.div variants={fadeUp}>
          <label className="flex items-center gap-2 font-semibold mb-3 text-[#FF9800]">
            <FaMapMarkerAlt /> {t("Cities")} :
          </label>
          <div className="grid grid-cols-2 gap-2 ml-6">
            {allCities.map((cityObj) => {
              const cityName =
                cityObj.name?.[currentLang] ||
                cityObj.name?.["en"] ||
                cityObj.name;
              return (
                <motion.label
                  variants={fadeUp}
                  key={cityObj.id ?? cityName}
                  className="flex items-center gap-2 cursor-pointer hover:text-[#FF9800] transition"
                >
                  <input
                    type="checkbox"
                    className="accent-[#FF9800] cursor-pointer"
                    checked={city === "all" || city?.includes(cityName) || false}
                    onChange={() => handleCheckboxChange("city", cityName)}
                  />
                  {cityName}
                </motion.label>
              );
            })}
          </div>
        </motion.div>

        <Divider fadeUp={fadeUp} themeName={themeName} />

        {/* الكاتجري */}
        <motion.div variants={fadeUp}>
          <label className="flex items-center gap-2 font-semibold mb-3 text-[#FF9800]">
            <FaTags /> {t("Categories")} :
          </label>
          <div className="grid grid-cols-2 gap-2 ml-6">
            {allCategories.map((cat) => {
              const categoryName =
                cat.name?.[currentLang] || cat.name?.["en"] || cat.name;
              return (
                <motion.label
                  variants={fadeUp}
                  key={cat.id ?? categoryName}
                  className="flex items-center gap-2 cursor-pointer hover:text-[#FF9800] transition"
                >
                  <input
                    type="checkbox"
                    className="accent-[#FF9800] cursor-pointer"
                    checked={category === "all" || category?.includes(categoryName) || false}
                    onChange={() => handleCheckboxChange("category", categoryName)}
                  />
                  {categoryName}
                </motion.label>
              );
            })}
          </div>
        </motion.div>

        <Divider fadeUp={fadeUp} themeName={themeName} />

        {/* السعر */}
        <motion.div variants={fadeUp}>
          <label className="flex items-center gap-2 font-semibold mb-3 text-[#FF9800]">
            {currency === "USD" ? <FaDollarSign /> : <FaEuroSign />} {t("PriceRange")} :
          </label>
          <div className="flex flex-col gap-2 ml-6">
            {priceRanges.map((range) => (
              <motion.label
                variants={fadeUp}
                key={range.value}
                className="flex items-center gap-2 cursor-pointer hover:text-[#FF9800] transition"
              >
                <input
                  type="radio"
                  name="priceRange"
                  className="accent-[#FF9800] cursor-pointer"
                  checked={price === range.value}
                  onChange={() => updateValue("price", range.value)}
                />
                {range.label}
              </motion.label>
            ))}
          </div>
        </motion.div>

        <Divider fadeUp={fadeUp} themeName={themeName} />

        {/* الأكثر طلباً */}
        <motion.div variants={fadeUp}>
          <label className="flex items-center gap-2 font-semibold cursor-pointer text-[#FF9800] hover:text-[#FF9800] transition">
            <FaFire /> {t("MostPopular")}
            <input
              type="checkbox"
              className="ml-2 accent-[#FF9800] cursor-pointer"
              checked={popular === true}
              onChange={(e) => updateValue("popular", e.target.checked)}
            />
          </label>
        </motion.div>
      </motion.div>
    </motion.aside>
  );
}
