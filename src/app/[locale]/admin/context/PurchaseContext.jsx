"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const PurchaseContext = createContext();

export function PurchaseProvider({ children }) {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("");
  const [error, setError] = useState(null);
  const fetchPurchases = async () => {
  setLoading(true);
  setError(null);
  try {
    const res = await axios.get("/api/purchases", { withCredentials: true }); // ✅ مهم
    setPurchases(res.data || []);
  } catch (err) {
    setError(err.message);
  }
  setLoading(false);
};

const purchaseTrip = async (tripId) => {
  try {
    const res = await axios.post("/api/purchase", { tripId }, { withCredentials: true }); // ✅ مهم
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
const handleStatusChange = async (purchaseId, newStatus) => {
  try {
    const res = await axios.post("/api/update-status", {
      purchaseId,
      status: newStatus,
    });

    if (res.status === 200) {
      // تحديث القائمة بعد التغيير
      await fetchPurchases();
    } else {
      alert("❌ Error updating status");
    }
  } catch (err) {
    alert("❌ " + (err.response?.data?.error || "Server error"));
  }
};

  return (
    <PurchaseContext.Provider
      value={{
        purchases,
        loading,
        error,
        purchaseTrip,
        fetchPurchases,
        currency,
        setCurrency,
        handleStatusChange,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
}

export const usePurchase = () => useContext(PurchaseContext);
