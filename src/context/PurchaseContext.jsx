"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const PurchaseContext = createContext();

export function PurchaseProvider({ children }) {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("USD");

  // ✅ جلب المشتريات من API
  const fetchPurchases = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/purchases", { withCredentials: true });
      setPurchases(res.data);
    } catch (err) {
      console.error("Error fetching purchases:", err);
    }
    setLoading(false);
  };

  // ✅ شراء رحلة جديدة
  const purchaseTrip = async (bookingData) => {
    try {
      const res = await axios.post("/api/purchase", bookingData, { withCredentials: true });
      if (res.status === 200) {
        await fetchPurchases();
        return { success: true };
      } else {
        return { error: res.data.error };
      }
    } catch (err) {
      return { error: err.response?.data?.error || "Server error" };
    }
  };

  // ✅ إلغاء رحلة
  const cancelTrip = async (tripId,userId) => {
    try {
      const res = await axios.post("/api/cancel", { tripId,userId }, { withCredentials: true });
      if (res.status === 200) {
        await fetchPurchases();
        return { success: true };
      } else {
        return { error: res.data.error };
      }
    } catch (err) {
      return { error: err.response?.data?.error || "Server error" };
    }
  };

  // ✅ تحميل العملة من localStorage
  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    if (savedCurrency) {
      setCurrency(savedCurrency);
    } else {
      setCurrency("USD");
      localStorage.setItem("currency", "USD");
    }
    fetchPurchases();
  }, []);

  // ✅ حفظ العملة في localStorage عند تغييرها
  useEffect(() => {
    if (currency) {
      localStorage.setItem("currency", currency);
    }
  }, [currency]);

  return (
    <PurchaseContext.Provider
      value={{
        purchases,
        loading,
        purchaseTrip,
        cancelTrip,   // ✅ أضفناها هنا
        fetchPurchases,
        currency,
        setCurrency,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
}

export const usePurchase = () => useContext(PurchaseContext);
