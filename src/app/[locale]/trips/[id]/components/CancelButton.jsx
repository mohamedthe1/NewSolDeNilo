"use client";
import React, { useState } from "react";
import { usePurchase } from "@/context/PurchaseContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

export default function CancelButton({ trip }) {
  const { cancelTrip } = usePurchase();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // ✅ جلب المستخدم الحالي

  const cancelBooking = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await cancelTrip(trip.id,user.id);
      if (result.success) {
        toast.success("✅ Booking cancelled successfully!");
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="mt-4">
      <button
        onClick={cancelBooking}
        disabled={loading}
               className="fixed bottom-6 left-6 px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2 transition transform hover:scale-105 hover:shadow-2xl z-40 text-white cursor-pointer bg-gradient-to-r from-red-500 to-red-600"

      >
        {loading ? "Cancelling..." : "❌ Cancel Booking"}
      </button>
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
    </div>
  );
}
