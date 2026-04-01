"use client";
import React from "react";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useTripID } from "../../context/TripIDContext";

const EditTripIncludes = () => {
  const { themeName } = useTheme();
  const { tripData, updateTripField } = useTripID();

  // اللغات المدعومة
  const languages = ["en", "es", "fr", "de", "it", "zh"];

  // ✅ تحديث نص include معين
  const updateInclude = (index, lang, value) => {
    const updatedIncludes = [...(tripData?.includes || [])];
    updatedIncludes[index] = {
      ...updatedIncludes[index],
      include_translations: {
        ...updatedIncludes[index].include_translations,
        [lang]: value,
      },
    };
    updateTripField("includes", updatedIncludes);
  };

  // ✅ إضافة include جديد
  const addInclude = () => {
    const updatedIncludes = [
      ...(tripData?.includes || []),
      {
        id: Date.now().toString(),
        include_translations: {
          en: "",
          es: "",
          fr: "",
          de: "",
          it: "",
          zh: "",
        },
      },
    ];
    updateTripField("includes", updatedIncludes);
  };

  // ✅ إزالة include
  const removeInclude = (index) => {
    const updatedIncludes = (tripData?.includes || []).filter(
      (_, i) => i !== index
    );
    updateTripField("includes", updatedIncludes);
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

      {tripData?.includes?.map((inc, i) => (
        <div
          key={inc.id ?? i}
          className={`mb-4 p-3 rounded-lg border ${
            themeName === "dark"
              ? "bg-[#0f0f0f] border-gold/30 text-white"
              : "bg-[#fdf6e3] border-[#c9a34a]/40 text-[#3a2c0a]"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FaCheckCircle
                className={`text-xl ${
                  themeName === "dark" ? "text-gold" : "text-[#c9a34a]"
                }`}
              />
              <span className="font-semibold">Include {i + 1}</span>
            </div>
            {/* زر إزالة */}
            <button
              type="button"
              onClick={() => removeInclude(i)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-bold ${
                themeName === "dark"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              <FaTrash /> Remove
            </button>
          </div>

          {/* حقول إدخال لكل لغة */}
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <input
                key={lang}
                type="text"
                value={inc.include_translations?.[lang] ?? ""}
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
};

export default EditTripIncludes;
