"use client";
import React from "react";
import EditTripBasicInfo from "./components/EditTripBasicInfo";
import EditTripCoverImageUpload from "./components/EditTripCoverImageUpload";
import EditTripGalleryUpload from "./components/EditTripGalleryUpload";
import EditTripClassification from "./components/EditTripClassification";
import EditTripIncludes from "./components/EditTripIncludes";
import EditTripDailyItinerary from "./components/EditTripDailyItinerary";
import EditTripSaveButton from "./components/EditTripSaveButton";
import TripSelector from "./components/TripSelector";

export default function EditTripFull({ themeName }) {
  return (
    <div
      className={`p-6 ${
        themeName === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } rounded-lg`}
    >
      <h2 className="text-2xl font-bold mb-6">✏️ Edit Trip</h2>
      <TripSelector />
      {/* المعلومات الأساسية */}
      <EditTripBasicInfo />

      {/* صورة الغلاف */}
      <EditTripCoverImageUpload />

      {/* معرض الصور */}
      <EditTripGalleryUpload />

      {/* التصنيفات والمدن */}
      <EditTripClassification />

      {/* المتضمنات */}
      <EditTripIncludes />

      {/* الجدول اليومي */}
      <EditTripDailyItinerary />

      {/* زر الحفظ */}
      <EditTripSaveButton />
    </div>
  );
}
