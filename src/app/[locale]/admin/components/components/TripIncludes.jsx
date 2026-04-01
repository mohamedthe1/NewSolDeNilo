import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useTrip } from "../../context/TripContext";

export default function TripIncludes() {
  const { themeName } = useTheme();
  const { tripData, updateTripField } = useTrip();
  const languages = ["en", "es", "fr", "de", "it", "zh"];

  // إضافة عنصر جديد مترجم بست لغات
  const addInclude = () => {
    const newInclude = { en: "", es: "", fr: "", de: "", it: "", zh: "" };
    updateTripField("includes", [...tripData.includes, newInclude]);
  };

  // تحديث قيمة لغة معينة داخل عنصر معين
  const updateInclude = (index, lang, value) => {
    const updated = [...tripData.includes];
    updated[index] = { ...updated[index], [lang]: value };
    updateTripField("includes", updated);
  };

  return (
    <div>
      <h3
        className={`text-xl font-bold mb-3 ${
          themeName === "dark" ? "text-gold" : "text-[#3a2c0a]"
        }`}
      >
        Trip Includes
      </h3>

      {tripData.includes.map((inc, i) => (
        <div
          key={i}
          className={`mb-4 p-3 rounded-lg border ${
            themeName === "dark"
              ? "bg-[#0f0f0f] border-gold/30 text-white"
              : "bg-[#fdf6e3] border-[#c9a34a]/40 text-[#3a2c0a]"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle
              className={`text-xl ${
                themeName === "dark" ? "text-gold" : "text-[#c9a34a]"
              }`}
            />
            <span className="font-semibold">Include {i + 1}</span>
          </div>

          {/* حقول إدخال لكل لغة */}
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <input
                key={lang}
                type="text"
                value={inc[lang] ?? ""}
                onChange={(e) => updateInclude(i, lang, e.target.value)}
                placeholder={`Include (${lang.toUpperCase()})`}
                className={`p-2 rounded-lg border outline-none ${
                  themeName === "dark"
                    ? "bg-[#1a1a1a] border-gold/30 text-white"
                    : "bg-white border-[#c9a34a]/40 text-[#3a2c0a]"
                }`}
              />
            ))}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addInclude}
        className={`px-4 py-2 rounded-lg font-bold mt-2 ${
          themeName === "dark"
            ? "bg-[#c9a34a] text-black hover:bg-yellow-500"
            : "bg-[#c9a34a] text-white hover:bg-[#b5892e]"
        }`}
      >
        + Add Include
      </button>
    </div>
  );
}
