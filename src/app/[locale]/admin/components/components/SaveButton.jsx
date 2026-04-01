import React, { useState } from "react";
import { useTrip } from "../../context/TripContext";

export default function SaveButton() {
  const { tripData,saveTrip } = useTrip();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSave = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await saveTrip();
      if (res.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleSave}
        // disabled={loading}
        disabled={
          !tripData.title.en ||
          !tripData.description.en ||
          tripData.price <= 0 ||
          !tripData.duration ||
          !tripData.priceLevel ||
          tripData.cities.length === 0 ||
          tripData.categories.length === 0
        }
        className={`w-full py-3 rounded-lg font-bold transition shadow-lg 
          ${
            loading
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-[#c9a34a] text-black hover:bg-yellow-500"
          }
        `}
      >
        {loading ? "Saving..." : "Save Trip"}
      </button>

      {status === "success" && (
        <p className="mt-2 text-green-600 font-semibold">
          Trip saved successfully ✅
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-red-600 font-semibold">Error saving trip ❌</p>
      )}
    </div>
  );
}
