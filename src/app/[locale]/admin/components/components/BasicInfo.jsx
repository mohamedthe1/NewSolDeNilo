import React from "react";
import { FaDollarSign, FaEuroSign } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useTrip } from "../../context/TripContext";

export default function BasicInfo() {
  const { themeName } = useTheme();
  const { tripData, updateTripField } = useTrip();

  const languages = ["en", "es", "fr", "de", "it", "zh"];

  // 🎨 ستايل موحد حسب الثيم
  const inputClass = `w-full p-3 rounded-lg border outline-none transition-colors
    ${themeName === "dark"
      ? "bg-[#1a1a1a] border-gold/30 text-white placeholder-gray-400 focus:border-gold"
      : "bg-white border-[#c9a34a]/40 text-[#3a2c0a] placeholder-gray-500 focus:border-[#c9a34a]"
    }`;

  const selectClass = `bg-transparent border-none outline-none font-semibold cursor-pointer
    ${themeName === "dark" ? "text-white" : "text-[#3a2c0a]"}`;

  return (
    <div className="space-y-6">
      {/* إدخال العنوان لكل لغة */}
      <div className="grid grid-cols-2 gap-4">
        {languages.map((lang) => (
          <input
            key={lang}
            type="text"
            placeholder={`Trip Title (${lang.toUpperCase()})`}
            value={tripData.title?.[lang] ?? ""}
            onChange={(e) =>
              updateTripField("title", {
                ...tripData.title,
                [lang]: e.target.value,
              })
            }
            className={inputClass}
          />
        ))}
      </div>

      {/* إدخال الوصف لكل لغة */}
      <div className="grid grid-cols-2 gap-4">
        {languages.map((lang) => (
          <textarea
            key={lang}
            placeholder={`Description (${lang.toUpperCase()})`}
            rows="3"
            value={tripData.description?.[lang] ?? ""}
            onChange={(e) =>
              updateTripField("description", {
                ...tripData.description,
                [lang]: e.target.value,
              })
            }
            className={inputClass}
          ></textarea>
        ))}
      </div>

      {/* Price + Duration */}
      <div className="flex flex-row gap-3">
        {/* السعر */}
        <div className="relative w-[30%]">
          <input
            type="number"
            placeholder="Price"
            value={tripData.price ?? ""}
            onChange={(e) => updateTripField("price", e.target.value)}
            className={`${inputClass} pr-12
              [appearance:textfield] 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none`}
          />
          <div className="absolute inset-y-0 right-3 flex items-center gap-2">
            {tripData.currency === "USD" ? (
              <FaDollarSign
                className="text-green-600 cursor-pointer"
                onClick={() => updateTripField("currency", "EUR")}
              />
            ) : (
              <FaEuroSign
                className="text-blue-600 cursor-pointer"
                onClick={() => updateTripField("currency", "USD")}
              />
            )}
          </div>
        </div>

        {/* المدة */}
        <div className="relative w-[40%]">
          <input
            type="number"
            placeholder="Duration"
            value={tripData.duration ?? ""}
            onChange={(e) => updateTripField("duration", e.target.value)}
            className={`${inputClass} pr-20
              [appearance:textfield] 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none`}
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <select
              value={tripData.duration_unit}
              onChange={(e) => updateTripField("duration_unit", e.target.value)}
              className={selectClass}
            >
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
