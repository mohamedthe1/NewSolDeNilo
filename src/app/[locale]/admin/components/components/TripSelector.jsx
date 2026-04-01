"use client";
import React, { useEffect } from "react";
import { useTrip } from "../../context/TripContext";
import { useTripID } from "../../context/TripIDContext";

const TripSelector = () => {
  const { trips, fetchTrips } = useTrip();
  const { fetchTripById } = useTripID();

  // ✅ جلب جميع الرحلات عند تحميل الكومبوننت
  useEffect(() => {
    fetchTrips();
  }, []);

  const handleSelect = (e) => {
    const selectedId = e.target.value;
    if (selectedId) {
      fetchTripById(selectedId)
    }
  };

  return (
    <div className="mb-6">
      <label className="block font-bold mb-2">اختر رحلة للتعديل:</label>
      <select
        onChange={handleSelect}
        className="w-full p-3 rounded-lg border outline-none"
      >
        <option value="">-- اختر رحلة --</option>
        {trips.map((trip) => (
          <option key={trip.id} value={trip.id}>
            {typeof trip.title === "object" ? trip.title.en : trip.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TripSelector;
