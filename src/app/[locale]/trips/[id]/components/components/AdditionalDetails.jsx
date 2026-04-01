"use client";
import {
  FaChild,
  FaDog,
  FaUsers,
  FaCat,
  FaUserTie,
  FaLanguage,
} from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

export default function AdditionalDetails({
  hasChildren,
  setHasChildren,
  childrenCount,
  setChildrenCount,
  hasPets,
  setHasPets,
  pets,
  setPets,
  groupSize,
  setGroupSize,
  hasGuide,
  setHasGuide,
  guideLanguages,
  setGuideLanguages,
}) {
  const { themeName } = useTheme();

  const availableLanguages = [
    "English",
    "Chinese",
    "French",
    "German",
    "Spanish",
    "Italian",
  ];

  const toggleLanguage = (lang) => {
    if (guideLanguages.includes(lang)) {
      setGuideLanguages(guideLanguages.filter((l) => l !== lang));
    } else {
      if (guideLanguages.length < 2) {
        setGuideLanguages([...guideLanguages, lang]);
      } else {
        alert("❌ You can select only up to 2 languages.");
      }
    }
  };

  // ✅ توليد قائمة من 1 إلى 100
  const options = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="mb-6 border-b border-gray-300/30 pb-4">
      <h3
        className={`text-lg font-semibold mb-3 ${
          themeName === "dark" ? "text-[#c9a34a]" : "text-[#11111194]"
        }`}
      >
        Additional Details
      </h3>

      <div className="flex flex-row gap-8">
        {/* الأطفال */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasChildren}
              onChange={() => setHasChildren(!hasChildren)}
              className="accent-[#c9a34a]"
            />
            <FaChild className="text-[#c9a34a]" />{" "}
            <span>Traveling with children</span>
          </label>

          {hasChildren && (
            <div className="ml-6 mb-3 flex items-center gap-2">
              <label className="font-medium">Number of children:</label>
              <select
                value={childrenCount}
                onChange={(e) => setChildrenCount(Number(e.target.value))}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {options.map((num) => (
                  <option key={num} value={num} style={{backgroundColor:"#999"}}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* الحيوانات */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasPets}
              onChange={() => setHasPets(!hasPets)}
              className="accent-[#c9a34a]"
            />
            <FaDog className="text-[#c9a34a]" />{" "}
            <span>Traveling with pets</span>
          </label>

          {hasPets && (
            <div className="ml-6 mb-3">
              <label className="font-medium block mb-2">Select pets:</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pets.includes("cat")}
                    onChange={() =>
                      setPets(
                        pets.includes("cat")
                          ? pets.filter((p) => p !== "cat")
                          : [...pets, "cat"]
                      )
                    }
                  />
                  <FaCat className="text-[#c9a34a]" /> Cat
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pets.includes("dog")}
                    onChange={() =>
                      setPets(
                        pets.includes("dog")
                          ? pets.filter((p) => p !== "dog")
                          : [...pets, "dog"]
                      )
                    }
                  />
                  <FaDog className="text-[#c9a34a]" /> Dog
                </label>
              </div>
            </div>
          )}
        </div>

        {/* المرشد السياحي */}
        <div className="flex flex-col">
          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasGuide}
              onChange={() => setHasGuide(!hasGuide)}
              className="accent-[#c9a34a]"
            />
            <FaUserTie className="text-[#c9a34a]" /> <span>Tour Guide</span>
          </label>

          {hasGuide && (
            <div className="ml-6 mb-3">
              <label className="font-medium block mb-2 flex items-center gap-2">
                <FaLanguage className="text-[#c9a34a]" /> Select up to 2
                languages:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableLanguages.map((lang) => (
                  <label
                    key={lang}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={guideLanguages.includes(lang)}
                      onChange={() => toggleLanguage(lang)}
                    />
                    {lang}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* حجم المجموعة */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            <FaUsers className="text-[#c9a34a]" />
            <label className="block mb-1 font-medium">Group Size</label>
          </div>
          <select
            value={groupSize}
            onChange={(e) => setGroupSize(Number(e.target.value))}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {options.map((num) => (
              <option key={num} value={num} style={{backgroundColor:"#999"}}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
