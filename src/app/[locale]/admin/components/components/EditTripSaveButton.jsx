"use client";
import React, { useState } from "react";
import { useTripID } from "../../context/TripIDContext";

const EditTripSaveButton = () => {
  const { tripData, saveTrip, loading } = useTripID();
  const [status, setStatus] = useState(null);

  // ✅ حفظ التعديلات
  const handleSave = async () => {
    const result = await saveTrip();
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <div style={{marginTop:"20px"}} className="w-full">
      <button
        type="button"
        onClick={handleSave}
       
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
};

export default EditTripSaveButton;
