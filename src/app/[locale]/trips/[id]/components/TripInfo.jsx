"use client";
import { FaDollarSign, FaEuroSign, FaClock } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { usePurchase } from "@/context/PurchaseContext"; 
import { motion } from "framer-motion";

// كائن الترجمات
const translations = {
  en: { title: "Trip Info", Adult: "Adult",Child:"Child", duration: "Duration" },
  de: { title: "Reiseinformationen", Adult: "Erwachsene",Child:"Kind", duration: "Dauer" },
  it: { title: "Informazioni sul viaggio", Adult: "Adulto",Child:"Bambino", duration: "Durata" },
  es: { title: "Información del viaje", Adult: "Adulto",Child:"Niño", duration: "Duración" },
  zh: { title: "行程信息", price: "价格", Adult: "成人",Child:"孩子", },
  fr: { title: "Informations sur le voyage", Adult: "Adulte",Child:"Enfant", duration: "Durée" },
};

export default function TripInfo({ trip, lang }) {
  const { themeName } = useTheme();
  const { currency } = usePurchase(); // ✅ العملة المختارة من الـ context

  const t = translations[lang] || translations.en;

  // ✅ منطق التحويل
  let displayedPrice = trip.price;
  if (currency === "EUR" && trip.currency === "USD") {
    displayedPrice = (trip.price * 0.85).toFixed(2); // تحويل من دولار إلى يورو
  } else if (currency === "USD" && trip.currency === "EUR") {
    displayedPrice = (trip.price * 1.18).toFixed(2); // تحويل من يورو إلى دولار
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`h-fit p-6 rounded-xl shadow-lg transition ${
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
        {t.title}
      </motion.h2>

      {/* المعلومات */}
      <div className="space-y-3">
        {/* السعر */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
            {currency === "USD" ? (
              <FaDollarSign
                className={
                  themeName === "dark" ? "text-yellow-300" : "text-green-600"
                }
              />
            ) : (
              <FaEuroSign
                className={
                  themeName === "dark" ? "text-yellow-300" : "text-blue-600"
                }
              />
            )}
          </motion.div>
          <span>
            {t.Adult}: {displayedPrice} {currency}
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
            {currency === "USD" ? (
              <FaDollarSign
                className={
                  themeName === "dark" ? "text-yellow-300" : "text-green-600"
                }
              />
            ) : (
              <FaEuroSign
                className={
                  themeName === "dark" ? "text-yellow-300" : "text-blue-600"
                }
              />
            )}
          </motion.div>
          <span>
            {t.Child}: {displayedPrice/2} {currency}
          </span>
        </motion.div>

        {/* المدة */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-2"
        >
          <motion.div whileHover={{ scale: 1.2, rotate: -10 }}>
            <FaClock
              className={
                themeName === "dark" ? "text-yellow-300" : "text-[#c9a34a]"
              }
            />
          </motion.div>
          <span>
            {t.duration}: {trip.duration} {trip.duration_unit?.[lang] }
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}
