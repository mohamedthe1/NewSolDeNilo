"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import DividerWithIcon from "@/components/layout/DividerWithIcon";
import { useTrip } from "@/context/TripContext";
import { usePurchase } from "@/context/PurchaseContext"; // ✅ استدعاء PurchaseContext
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const TopTripsSection = () => {
  const { themeName } = useTheme();
  const { t ,i18n} = useTranslation("home");
  const router = useRouter();
  const { user } = useAuth();
const normalizedLang = i18n.language.split("-")[0];

  const { trips, fetchTrips, loadingTrips } = useTrip();
  const { currency, purchases } = usePurchase(); // ✅ جلب العملة والحجوزات

  useEffect(() => {
    fetchTrips();
  }, []);

  const symbols = [
    "𓂀",
    "𓋹",
    "𓆣",
    "𓇼",
    "𓇯",
    "𓏏",
    "𓎛",
    "𓊽",
    "𓃾",
    "𓅓",
    "𓈇",
    "𓉐",
    "𓊹",
    "𓌙",
    "𓍿",
    "𓎟",
  ];

  if (loadingTrips) {
    return <p className="text-center text-gray-500">Loading top trips...</p>;
  }

  const topTrips = [...trips]
    .sort(
      (a, b) =>
        (Array.isArray(b.reviews) ? b.reviews.length : 0) -
        (Array.isArray(a.reviews) ? a.reviews.length : 0),
    )
    .slice(0, 6);

  const convertPrice = (price, tripCurrency) => {
    let converted = price;
    if (currency === "EUR" && tripCurrency === "USD") {
      converted = (price * 0.85).toFixed(2);
    } else if (currency === "USD" && tripCurrency === "EUR") {
      converted = (price * 1.18).toFixed(2);
    }
    return converted;
  };

  return (
    <section
      className={`flex w-full flex-col relative py-24 px-6 transition-colors duration-500 ${
        themeName === "dark"
          ? "bg-[#0f0f0f] text-white"
          : "bg-[#fdf6e3] text-[#3a2c0a]"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className={`absolute ${themeName === "dark" ? "text-gray-700" : "text-[#c9a34a]"} opacity-40 text-6xl animate-pulse`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {symbols[Math.floor(Math.random() * symbols.length)]}
          </span>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h2
          className={`text-5xl font-extrabold tracking-wide drop-shadow-md ${
            themeName === "dark"
              ? "text-gold"
              : "bg-gradient-to-r from-[#c9a34a] to-[#eab308] bg-clip-text text-transparent"
          }`}
        >
          {t("TopTrips")}
        </h2>
        <DividerWithIcon />
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-7xl w-full mx-auto">
        {topTrips.map((trip, i) => {
          // ✅ تحقق إذا كان المستخدم اشترى هذه الرحلة
          const hasPurchased = purchases.some(
            (p) =>
              p.trip_id === trip.id &&
              p.user_id === user?.id &&
              p.status !== "Cancelled",
          );

          return (
            <motion.div
              key={trip.id || i}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="flex-1 basis-full sm:basis-[48%] lg:basis-[30%] xl:basis-[22%] relative rounded-2xl overflow-hidden group transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:-rotate-1"
            >
              <div className="relative h-72">
                <Image
                  src={trip.cover_image || "/default.jpg"}
                  alt={trip.title?.en || "Trip image"}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700 rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-gold/20 transition duration-500"></div>
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold tracking-wide mb-1 text-white">
                  {trip.title?.[normalizedLang] || "Untitled Trip"}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400 text-lg font-semibold">
                    ⭐ {trip.rating || "4.5"}
                  </span>
                  <span className="text-sm opacity-80 text-white">
                    ({Array.isArray(trip.reviews) ? trip.reviews.length : 0}{" "}
                    {t("reviews")})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p
                    className={`text-lg font-semibold ${themeName === "dark" ? "text-gold" : "text-[#c9a34a]"}`}
                  >
                    {convertPrice(trip.price, trip.currency)} {currency}
                  </p>
                  <button
                    onClick={() => router.push(`/trips/${trip.id}`)}
                    style={{ cursor: "pointer", zIndex: "1" }}
                    className={`px-5 py-2 rounded-lg font-medium transition text-white ${
                      themeName === "dark"
                        ? hasPurchased ? "bg-green-500 hover:bg-green-600": "bg-[#c9a34a] hover:bg-yellow-500"
                        :  hasPurchased ? "bg-green-500 hover:bg-green-600": "bg-[#c9a34a] hover:bg-yellow-500"
                    }`}
                  >
                    {hasPurchased ? t("Tripdetails") : t("BookNow")}
                  </button>
                </div>
              </div>

              <div
                className={`absolute inset-0 rounded-2xl border ${
                  themeName === "dark"
                    ? "border-gold/20 group-hover:border-gold/40"
                    : "border-[#c9a34a]/30 group-hover:border-[#c9a34a]/60"
                } transition-all duration-500`}
              ></div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default TopTripsSection;
