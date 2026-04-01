"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TripIDContext = createContext();

const emptyTrip = {
  title: { en: "", ar: "" },
  description: { en: "", ar: "" },
  price: 0,
  currency: "USD",
  duration: 0,
  duration_unit: "days",
  priceLevel: "",
  cover_image: "",
  gallery_images: [],
  cities: [], // ✅ IDs للمدن
  categories: [], // ✅ IDs للفئات
  includes: [],
  itinerary: [],
};

export function TripIDProvider({ children }) {
  const [tripData, setTripData] = useState(null);
  const [tripsList, setTripsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ جلب جميع الرحلات
  const fetchAllTrips = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/trips");
      const data = res.data;

      if (res.status === 200 && data.success) {
        const titles = (data.trips || []).map((trip) => ({
          id: trip.id,
          title: trip.title,
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

  // ✅ جلب رحلة واحدة بالـ ID مع تحويل المدن والفئات إلى IDs
  const fetchTripById = async (id) => {
    if (!id) {
      setError("No trip ID provided");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`/api/trips/${id}`);
      const data = res.data;

      if (res.status === 200 && data.success) {
        const trip = data.trip;

        // ✅ تحويل المدن والفئات إلى IDs فقط
        const categoriesIds = (trip.trip_categories || []).map(
          (c) => c.category_id,
        );
        const citiesIds = (trip.trip_cities || []).map((c) => c.city_id);

        setTripData({
          ...trip,
          categories: categoriesIds,
          cities: citiesIds,
        });
      } else {
        setError(data.error || "Failed to fetch trip");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ تحديث حقل معين
  const updateTripField = (field, value) => {
    setTripData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ حفظ التعديلات
  const saveTrip = async () => {
    if (!tripData?.id) {
      return { success: false, error: "No trip ID" };
    }

    // البيانات القديمة اللي جبتها من السيرفر
    const oldTrip = tripsList.find((t) => t.id === tripData.id);

    // بناء payload يحتوي فقط على الحقول اللي اتغيرت
    const tripPayload = {};
    const fieldsToCheck = [
      "title",
      "description",
      "price",
      "duration",
      "priceLevel",
      "cover_image",
      "gallery_images",
      "includes",
      "itinerary",
      "cities",
      "categories",
    ];

    fieldsToCheck.forEach((field) => {
      const oldValue = JSON.stringify(oldTrip?.[field] ?? null);
      const newValue = JSON.stringify(tripData?.[field] ?? null);

      if (oldValue !== newValue) {
        tripPayload[field] = tripData[field];
      }
    });

    // لو مفيش أي تغيير
    if (Object.keys(tripPayload).length === 0) {
      return { success: true, message: "No changes detected" };
    }

    try {
      const res = await axios.put(`/api/trips/${tripData.id}`, tripPayload);
      const data = res.data;

      if (data.success) {
        setTripData(emptyTrip); // تفريغ بعد الحفظ
      }
      return data;
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteTrip = async (id) => {
    try {
      const res = await axios.delete(`/api/trips/${id}`);
      const data = res.data;
      if (data.success) {
        setTripsList((prev) => prev.filter((trip) => trip.id !== id));
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
        deleteTrip,
        loading,
        error,
      }}
    >
      {children}
    </TripIDContext.Provider>
  );
}

export const useTripID = () => useContext(TripIDContext);
