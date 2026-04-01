"use client";

import React, { createContext, useContext, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const TripContext = createContext();

const emptyTrip = {
  title: { en: "", es: "", fr: "", de: "", it: "", zh: "" },
  description: { en: "", es: "", fr: "", de: "", it: "", zh: "" },
  price: 0,
  currency: "USD",
  duration: 0,
  duration_unit: "days",
  priceLevel: "",
  cover_image: "",
  gallery_images: [],
  cities: [],       // ✅ IDs للمدن
  categories: [],   // ✅ IDs للفئات
  includes: [],
  itinerary: [],    // كل يوم فيه activities
};

export function TripProvider({ children }) {
  const [tripData, setTripData] = useState(emptyTrip);
  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(false);

  const updateTripField = (field, value) => {
    setTripData((prev) => ({ ...prev, [field]: value }));
  };

  const addInclude = (include) => {
    setTripData((prev) => ({
      ...prev,
      includes: [...prev.includes, include],
    }));
  };

  const addDay = (day) => {
    setTripData((prev) => ({
      ...prev,
      itinerary: [...prev.itinerary, { ...day, activities: [] }],
    }));
  };

  // ✅ إضافة نشاط ليوم معين
  const addActivity = (dayIndex, activity) => {
    setTripData((prev) => {
      const updatedItinerary = [...prev.itinerary];
      if (!updatedItinerary[dayIndex].activities) {
        updatedItinerary[dayIndex].activities = [];
      }
      updatedItinerary[dayIndex].activities.push({
        time: activity.time || "",
        activity_translations: activity.activity_translations || {
          en: "",
          es: "",
          fr: "",
          de: "",
          it: "",
          zh: "",
        },
      });
      return { ...prev, itinerary: updatedItinerary };
    });
  };

  // ✅ تحديث نشاط معين داخل يوم
  const updateActivity = (dayIndex, activityIndex, updatedActivity) => {
    setTripData((prev) => {
      const updatedItinerary = [...prev.itinerary];
      updatedItinerary[dayIndex].activities[activityIndex] = {
        ...updatedItinerary[dayIndex].activities[activityIndex],
        ...updatedActivity,
      };
      return { ...prev, itinerary: updatedItinerary };
    });
  };

  // ✅ إضافة مدينة (ID)
  const addCity = (cityId) => {
    setTripData((prev) => ({
      ...prev,
      cities: [...prev.cities, cityId],
    }));
  };

  // ✅ إضافة فئة (ID)
  const addCategory = (categoryId) => {
    setTripData((prev) => ({
      ...prev,
      categories: [...prev.categories, categoryId],
    }));
  };

  // ✅ رفع ملف إلى Supabase Storage
  const uploadFileToSupabase = async (file, folder = "gallery") => {
    const fileName = `${folder}_${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("trips-bucket")
      .upload(fileName, file, { contentType: file.type });

    if (error) throw error;

    const { data } = supabase.storage
      .from("trips-bucket")
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  const saveTrip = async () => {
    try {
      // ✅ رفع صورة الغلاف
      let coverImageUrl = "";
      if (tripData.cover_file) {
        coverImageUrl = await uploadFileToSupabase(tripData.cover_file, "cover");
      }

      // ✅ رفع صور المعرض
      const galleryUrls = await Promise.all(
        tripData.gallery_images.map(async (img, i) => {
          const url = await uploadFileToSupabase(img.file, `gallery_${i}`);
          return { url, name: img.name };
        })
      );

      const payload = {
        ...tripData,
        cover_image: coverImageUrl,
        gallery_images: galleryUrls,
      };


      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setTripData(emptyTrip);
      }

      return data;
    } catch (err) {
      console.error("Error saving trip:", err);
      return { success: false, error: err.message };
    }
  };

  const fetchTrips = async () => {
    setLoadingTrips(true);
    try {
      const res = await fetch("/api/trips", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      if (result.success) {
        setTrips(result.trips);
      }
    } catch (err) {
      console.error("Error fetching trips:", err);
    } finally {
      setLoadingTrips(false);
    }
  };

  return (
    <TripContext.Provider
      value={{
        tripData,
        updateTripField,
        addInclude,
        addDay,
        addActivity,
        updateActivity,
        addCity,        // ✅ متاح الآن
        addCategory,    // ✅ متاح الآن
        saveTrip,
        setTripData,
        trips,
        fetchTrips,
        loadingTrips,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export const useTrip = () => useContext(TripContext);
