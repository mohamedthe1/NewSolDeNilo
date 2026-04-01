"use client";
import { FaTimes } from "react-icons/fa";
import TravelerInfo from "./TravelerInfo";
import AdditionalDetails from "./AdditionalDetails";
import TripDetails from "./TripDetails";
import ConfirmButton from "./ConfirmButton";
import TripSchedule from "./TripSchedule"; // ✅ الكومبوننت الجديد
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

export default function PurchaseModal({ trip, onClose }) {
  const { themeName } = useTheme();

  // ✅ State للجدول الزمني
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [hasChildren, setHasChildren] = useState(false);
  const [childrenCount, setChildrenCount] = useState(0);
  const [hasGuide, setHasGuide] = useState(false);
  const [guideLanguages, setGuideLanguages] = useState([]);

  const [hasPets, setHasPets] = useState(false);
  const [pets, setPets] = useState([]); // ممكن تكون ["cat", "dog"]

  const [groupSize, setGroupSize] = useState(1);

  const modalClasses =
    themeName === "dark"
      ? "bg-gradient-to-b from-gray-800 via-gray-900 to-black text-yellow-300 z-55"
      : "bg-gradient-to-b from-white via-gray-100 to-white text-gray-900 z-55";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-54 transition-opacity animate-fadeIn overflow-y-scroll z-50">
      <div
        className={`rounded-2xl shadow-2xl p-8 w-[100%] max-w-[1000px] mt-25 relative transform animate-slideUp ${modalClasses}`}
      >
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 cursor-pointer transition"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        {/* الأقسام */}
        <TravelerInfo />
        <TripSchedule
          arrivalDate={arrivalDate}
          setArrivalDate={setArrivalDate}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
        />
        <AdditionalDetails
          hasChildren={hasChildren}
          setHasChildren={setHasChildren}
          childrenCount={childrenCount}
          setChildrenCount={setChildrenCount}
          hasPets={hasPets}
          setHasPets={setHasPets}
          pets={pets}
          setPets={setPets}
          groupSize={groupSize}
          setGroupSize={setGroupSize}
          hasGuide={hasGuide}
          setHasGuide={setHasGuide}
          guideLanguages={guideLanguages}
          setGuideLanguages={setGuideLanguages}
        />

        <TripDetails trip={trip} groupSize={groupSize} />
        <ConfirmButton
          trip={trip.id}
          onClose={onClose}
          arrivalDate={arrivalDate}
          departureDate={departureDate}
          hasChildren={hasChildren}
          childrenCount={childrenCount}
          hasPets={hasPets}
          pets={pets}
          groupSize={groupSize}
          hasGuide={hasGuide}
          guideLanguages={guideLanguages}
        />
      </div>
    </div>
  );
}
