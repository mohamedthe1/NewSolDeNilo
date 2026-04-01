// file: context/TripContext.js
import React, { createContext, useContext, useState } from "react";

const TripContext = createContext();

export function TripProvider({ children }) {
  const [tripData, setTripData] = useState({
    title: { en: "", es: "", fr: "", de: "", it: "", zh: "" },
    description: { en: "", es: "", fr: "", de: "", it: "", zh: "" },
    price: 0,
    currency: "USD",
    duration: 0,
    duration_unit: "days",
    priceLevel: "",
    cover_image: "",
    gallery_images: [],
    cities: [],
    categories: [],
    includes: [],
    itinerary: [],
  });

  // ✅ state للرحلات كلها
  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(false);
  // تحديث أي جزء من بيانات الرحلة
  const updateTripField = (field, value) => {
    setTripData((prev) => ({ ...prev, [field]: value }));
  };

  // إضافة Include جديد
  const addInclude = (include) => {
    setTripData((prev) => ({
      ...prev,
      includes: [...prev.includes, include],
    }));
  };

  // إضافة يوم جديد في الـ Itinerary
  const addDay = (day) => {
    setTripData((prev) => ({
      ...prev,
      itinerary: [...prev.itinerary, day],
    }));
  };

  // إرسال البيانات للـ API (إنشاء رحلة جديدة)
  const saveTrip = async () => {
    const res = await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripData),
    });
    return res.json();
  };

  // ✅ جلب جميع الرحلات
const fetchTrips = async () => {
  setLoadingTrips(true);
  try {
    const res = await fetch("/api/trips", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // تأكد إن الاستجابة صحيحة
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    console.log("Trips API result:", result);

    // لو الـ API بيرجع { success: true, trips: [...] }
    if (result.success && Array.isArray(result.trips)) {
      setTrips(result.trips);
    }
    // لو الـ API بيرجع مصفوفة مباشرة
    else if (Array.isArray(result)) {
      setTrips(result);
    }
    // fallback لو البيانات مش بالصيغة المتوقعة
    else {
      console.warn("Unexpected trips format:", result);
      setTrips([]);
    }
  } catch (err) {
    console.error("Error fetching trips:", err);
    setTrips([]); // علشان ما يفضلش فاضي
  } finally {
    setLoadingTrips(false); // ✅ يوقف اللودنج مهما حصل
  }
};

const getTripById = (id) => {
  return trips.find((trip) => String(trip.id) === String(id));
};
  return (
    <TripContext.Provider
      value={{
        tripData,
        updateTripField,
        addInclude,
        addDay,
        saveTrip,
        setTripData,
        trips,
        fetchTrips,
        loadingTrips,
        getTripById,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

// Hook للاستخدام داخل أي كومبوننت
export const useTrip = () => useContext(TripContext);
