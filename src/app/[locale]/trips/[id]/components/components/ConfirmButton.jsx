"use client";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { usePurchase } from "@/context/PurchaseContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

export default function ConfirmButton({
  trip,
  onClose,
  arrivalDate,
  departureDate,
  hasChildren,
  childrenCount,
  hasPets,
  pets,
  groupSize,
  hasGuide,
  guideLanguages,
}) {
  const { purchaseTrip } = usePurchase();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handlePurchase = async () => {
    setLoading(true);

    const bookingData = {
      tripId: trip, // ✅ مهم
      numPersons: groupSize,
      hasChildren,
      numChildren: childrenCount,
      hasPets,
      petTypes: pets,
      hasGuide,
      selectedLanguages: guideLanguages,
      arrivalDate,
      departureDate,
      userId: user.id,
      status: "Pending",
      platform: "web",
    };
console.log(bookingData)
    const result = await purchaseTrip(bookingData);

    if (result.success) {
      toast.success("✅ Trip booked successfully!");
      onClose();
    } else {
      toast.error("❌ " + result.error);
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handlePurchase}
      disabled={loading}
      className={`mt-4 w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition cursor-pointer text-white ${
        loading
          ? "opacity-50 cursor-not-allowed"
          : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
      }`}
    >
      <FaCheckCircle className="w-5 h-5 animate-pulse" />
      {loading ? "Processing..." : "Book Now"}
    </button>
  );
}
