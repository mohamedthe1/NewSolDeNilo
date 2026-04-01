"use client";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useTripID } from "../../context/TripIDContext";

const EditTripDailyItinerary = () => {
  const { themeName } = useTheme();
  const { tripData, updateTripField } = useTripID();

  const languages = ["en", "es", "fr", "de", "it", "zh"];
  const safeItinerary = Array.isArray(tripData?.itinerary) ? tripData.itinerary : [];

  // ✅ تحديث نشاط معين
  const updateActivity = (dayIndex, actIndex, field, value, lang) => {
    const updatedDays = [...safeItinerary];
    const activities = [...(updatedDays[dayIndex]?.activities || [])];

    if (field === "activity") {
      activities[actIndex] = {
        ...activities[actIndex],
        activity_translations: {
          ...activities[actIndex].activity_translations,
          [lang]: value,
        },
      };
    } else {
      activities[actIndex] = { ...activities[actIndex], [field]: value };
    }

    updatedDays[dayIndex] = { ...updatedDays[dayIndex], activities };
    updateTripField("itinerary", updatedDays);
  };

  // ✅ إضافة نشاط جديد
  const addActivity = (dayIndex) => {
    const updatedDays = [...safeItinerary];
    const activities = [...(updatedDays[dayIndex]?.activities || [])];
    activities.push({
      time: "",
      activity_translations: { en: "", es: "", fr: "", de: "", it: "", zh: "" },
    });
    updatedDays[dayIndex] = { ...updatedDays[dayIndex], activities };
    updateTripField("itinerary", updatedDays);
  };

  // ✅ إزالة نشاط
  const removeActivity = (dayIndex, actIndex) => {
    const updatedDays = [...safeItinerary];
    const activities = [...(updatedDays[dayIndex]?.activities || [])];
    activities.splice(actIndex, 1); // حذف النشاط
    updatedDays[dayIndex] = { ...updatedDays[dayIndex], activities };
    updateTripField("itinerary", updatedDays);
  };

  // ✅ إضافة يوم جديد
  const addDay = () => {
    const updatedDays = [
      ...safeItinerary,
      { day_number: safeItinerary.length + 1, activities: [] },
    ];
    updateTripField("itinerary", updatedDays);
  };

  // ✅ إزالة يوم كامل
  const removeDay = (dayIndex) => {
    const updatedDays = safeItinerary.filter((_, i) => i !== dayIndex);
    updateTripField("itinerary", updatedDays);
  };

  return (
    <div>
      <h3
        className={`text-xl font-bold mb-3 ${
          themeName === "dark" ? "text-gold" : "text-[#3a2c0a]"
        }`}
      >
        Daily Itinerary
      </h3>

      {safeItinerary.length === 0 ? (
        <p className={themeName === "dark" ? "text-gray-300" : "text-gray-700"}>
          No days yet.
        </p>
      ) : (
        safeItinerary.map((day, dayIndex) => {
          const activities = Array.isArray(day?.activities) ? day.activities : [];

          return (
            <div
              key={dayIndex}
              className={`mb-6 p-4 rounded-lg border ${
                themeName === "dark"
                  ? "bg-[#0f0f0f] border-gold/30 text-white"
                  : "bg-[#fdf6e3] border-[#c9a34a]/40 text-[#3a2c0a]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Day {day?.day_number ?? dayIndex + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeDay(dayIndex)}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-bold ${
                    themeName === "dark"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  <FaTrash /> Remove Day
                </button>
              </div>

              {activities.map((act, actIndex) => (
                <div key={actIndex} className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <input
                      type="time"
                      value={act?.time ?? ""}
                      onChange={(e) =>
                        updateActivity(dayIndex, actIndex, "time", e.target.value)
                      }
                      className={`p-2 rounded-lg border ${
                        themeName === "dark"
                          ? "bg-[#1a1a1a] border-gold/30 text-white"
                          : "bg-white border-[#c9a34a]/40 text-[#3a2c0a]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => removeActivity(dayIndex, actIndex)}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-bold ${
                        themeName === "dark"
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      <FaTrash /> Remove Activity
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <input
                        key={lang}
                        type="text"
                        value={act?.activity_translations?.[lang] ?? ""}
                        onChange={(e) =>
                          updateActivity(dayIndex, actIndex, "activity", e.target.value, lang)
                        }
                        placeholder={`Activity (${lang.toUpperCase()})`}
                        className={`p-2 rounded-lg border ${
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
                onClick={() => addActivity(dayIndex)}
                className={`px-3 py-1 rounded font-bold ${
                  themeName === "dark"
                    ? "bg-[#c9a34a] text-black hover:bg-yellow-500"
                    : "bg-[#c9a34a] text-white hover:bg-[#b5892e]"
                }`}
              >
                + Add Activity
              </button>
            </div>
          );
        })
      )}

      <button
        type="button"
        onClick={addDay}
        className={`px-4 py-2 rounded font-bold ${
          themeName === "dark"
            ? "bg-[#c9a34a] text-black hover:bg-yellow-500"
            : "bg-[#c9a34a] text-white hover:bg-[#b5892e]"
        }`}
      >
        + Add Day
      </button>
    </div>
  );
};

export default EditTripDailyItinerary;
