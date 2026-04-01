"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const TripIDContext = createContext();

export function TripIDProvider({ children }) {
  const [tripData, setTripData] = useState(null); // رحلة واحدة
  const [tripsList, setTripsList] = useState([]); // جميع الرحلات
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ استدعاء جميع الرحلات مع فلترة العناوين فقط
  const fetchAllTrips = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/trips");
      let data = {};
      try {
        data = await res.json(); // نحاول قراءة JSON
      } catch {
        data = { trips: [] }; // لو الرد مش JSON أو فاضي
      }

      if (res.ok) {
        // نخزن id + العنوان
        const titles = (data.trips || []).map((trip) => ({
          id: trip.id,
          title: trip.title?.en ?? "Untitled",
        }));
        setTripsList(titles);
      } else {
        setError(data.error || "Failed to fetch trips");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ استدعاء رحلة واحدة بالـ ID
  const fetchTripById = async (id) => {
    if (!id) {
      setError("No trip ID provided");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/trips/${id}`);
      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {}; // لو الرد مش JSON أو فاضي
      }

      if (res.ok) {
        setTripData(data.trip); // لاحظ إن الـ API بيرجع { success, trip }
      } else {
        setError(data.error || "Failed to fetch trip");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ تحديث حقل معين داخل الرحلة
  const updateTripField = (field, value) => {
    setTripData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ✅ حفظ التعديلات
  const saveTrip = async () => {
    if (!tripData?.id) return { success: false, error: "No trip ID" };

    const tripPayload = {
      title: tripData.title,
      description: tripData.description,
      price: tripData.price,
      duration: tripData.duration,
      priceLevel: tripData.priceLevel,
      cover_image: tripData.cover_image,
      gallery_images: tripData.gallery_images,
    };

    try {
      const res = await fetch(`/api/trips/${tripData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripPayload),
      });
      const data = await res.json();

      if (data.success) {
        // ✅ بعد نجاح التعديل نفرغ الحقول
        setTripData(null);
      }

      return data;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchAllTrips();
  }, []);

  return (
    <TripIDContext.Provider
      value={{
        tripData,
        tripsList,
        setTripData,
        fetchTripById,
        fetchAllTrips,
        updateTripField,
        saveTrip,
        loading,
        error,
      }}
    >
      {children}
    </TripIDContext.Provider>
  );
}

// ✅ التصحيح هنا: استخدام TripIDContext بدل TripContext
export const useTripID = () => useContext(TripIDContext);
