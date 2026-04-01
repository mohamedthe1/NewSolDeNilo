"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const encodeData = (obj) => btoa(JSON.stringify(obj));
const decodeData = (encoded) => {
  try {
    return JSON.parse(atob(encoded));
  } catch {
    return null;
  }
};

const QueryContext = createContext();

export function QueryProvider({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [queryState, setQueryState] = useState({
    city: "all",
    category: "all",
    price: "Economy",
    popular: false,
  });

  const updateValue = (key, value) => {
    setQueryState((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setQueryState({
      city: "all",
      category: "all",
      price: "Economy",
      popular: false,
    });
  };

  const getEncodedQuery = () => encodeData(queryState);

  const loadFromQuery = (encoded) => {
    const decoded = decodeData(encoded);
    if (decoded) {
      setQueryState((prev) => ({
        ...prev,
        ...decoded, // ✅ نقرأ القيم من الكويري
      }));
    }
  };

  useEffect(() => {
    const current = searchParams.get("data");
    if (current) {
      loadFromQuery(current);
    } else if (pathname.includes("/trips")) {
      // ✅ لو دخلت على trips بدون كويري → نعرض كل الرحلات
      resetFilters();
    }
  }, [pathname, searchParams]);

  const filterTrips = (trips, allCategories, lang) => {
    return trips.filter((trip) => {
      if (queryState.city !== "all" && Array.isArray(queryState.city)) {
        const tripCities = trip.trip_cities?.map(
          (c) => c.cities?.name?.[lang] || c.city?.name?.[lang] || c.city_name
        ) || [];
        if (!tripCities.some((c) => queryState.city.includes(c))) return false;
      }

      if (queryState.category !== "all" && Array.isArray(queryState.category)) {
        const tripCategories = trip.trip_categories?.map((cat) => {
          const catObj = allCategories.find((c) => c.id === cat.category_id);
          return catObj?.name?.[lang] || catObj?.name?.en || catObj?.name;
        }) || [];
        if (!tripCategories.some((c) => queryState.category.includes(c))) return false;
      }

      if (queryState.price === "Economy" && !(trip.price <= 900)) return false;
      if (queryState.price === "Standard" && !(trip.price > 900 && trip.price <= 1500)) return false;
      if (queryState.price === "Luxury" && !(trip.price > 1500)) return false;

      if (queryState.popular === true && !trip.isPopular) return false;

      return true;
    });
  };

  return (
    <QueryContext.Provider
      value={{
        ...queryState,
        updateValue,
        resetFilters,
        getEncodedQuery,
        loadFromQuery,
        filterTrips,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}

export const useQueryFilters = () => useContext(QueryContext);
