"use client";
import { FaTags } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useCitiesCategories } from "@/context/CitiesCategoriesContext";
import { motion } from "framer-motion";

// كائن الترجمات للعناوين
const translations = {
  en: { title: "Categories" },
  de: { title: "Kategorien" },
  it: { title: "Categorie" },
  es: { title: "Categorías" },
  zh: { title: "类别" },
  fr: { title: "Catégories" },
};

export default function TripCategories({ trip, lang }) {
  const { themeName } = useTheme();
  const { categories: allCategories } = useCitiesCategories();

  // لو اللغة مش موجودة، نرجع للإنجليزية
  const t = translations[lang] || translations.en;

  // دالة ترجمة النصوص من jsonb
  const getLocalizedText = (obj) => {
    if (!obj) return "Unknown";
    if (typeof obj === "string") return obj;
    return obj?.[lang] || obj?.en || "Unknown";
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`p-6 rounded-xl shadow-lg transition ${
        themeName === "dark"
          ? "bg-black/40 text-gold"
          : "bg-white/90 text-[#3a2c0a]"
      }`}
    >
      {/* العنوان */}
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`text-2xl font-bold flex items-center gap-2 mb-4 border-b pb-2 ${
          themeName === "dark" ? "border-gold/50" : "border-[#c9a34a]/50"
        }`}
      >
        <FaTags
          className={themeName === "dark" ? "text-[#FF9800]" : "text-[#FF9800]"}
        />
        {t.title}
      </motion.h2>

      {/* الكاتجريز */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trip.trip_categories?.map((cat, idx) => {
          // نجيب الكاتجري من allCategories بالـ id
          const catObj = allCategories.find(
            (category) => category.id === cat.category_id
          );

          const categoryName =
            getLocalizedText(catObj?.name) ||
            getLocalizedText(cat.categories?.name) ||
            "Unknown";

          return (
            <motion.div
              key={cat.category_id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                themeName === "dark"
                  ? "bg-black/60 hover:bg-black/80"
                  : "bg-[#fdf6e3] hover:bg-[#f5deb3]"
              }`}
            >
              <FaTags
                className={`flex-shrink-0 ${
                  themeName === "dark" ? "text-[#FF9800]" : "text-[#FF9800]"
                }`}
              />
              <span className="text-sm md:text-base font-medium">
                {categoryName}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
