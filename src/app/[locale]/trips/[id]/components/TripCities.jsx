"use client";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useCitiesCategories } from "@/context/CitiesCategoriesContext";
import { motion } from "framer-motion";

// كائن الترجمات للعناوين
const translations = {
  en: { title: "Cities" },
  de: { title: "Städte" },
  it: { title: "Città" },
  es: { title: "Ciudades" },
  zh: { title: "城市" },
  fr: { title: "Villes" },
};

export default function TripCities({ trip, lang }) {
  const { themeName } = useTheme();
  const { cities: allCities } = useCitiesCategories();
  console.log(trip);
  // لو اللغة مش موجودة، نرجع للإنجليزية
  const t = translations[lang] || translations.en;

  // دالة ترجمة النصوص من jsonb
  const getLocalizedText = (obj) => {
    if (!obj) return "Unknown";
    if (typeof obj === "string") return obj;
    return obj?.[lang] || obj?.en || "Unknown";
  };
console.log("Trip Cities:", trip.trip_cities);
console.log("All Cities:", allCities);

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
        <FaMapMarkerAlt
          className={themeName === "dark" ? "text-[#FF9800]" : "text-[#FF9800]"}
        />
        {t.title}
      </motion.h2>

      {/* المدن */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trip.trip_cities?.map((c, idx) => {
          console.log("Trip Cities:", trip.trip_cities);
          console.log("All Cities:", allCities);

          // نجيب المدينة من allCities بالـ id
          const cityObj = allCities.find((city) => city.id === c.city_id);

          const cityName =
            getLocalizedText(cityObj?.name) ||
            getLocalizedText(c.cities?.name) ||
            "Unknown";

          return (
            <motion.div
              key={c.city_id}
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
              <FaMapMarkerAlt
                className={`flex-shrink-0 ${
                  themeName === "dark" ? "text-[#FF9800]" : "text-[#FF9800]"
                }`}
              />
              <span className="text-sm md:text-base font-medium">
                {cityName}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
