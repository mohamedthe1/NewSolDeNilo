"use client";
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ جلب جميع المستخدمين
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/users");

      if (res.data.success) {
        setUsers(res.data.users);
      } else {
        setError(res.data.error || "Failed to fetch users");
      }
    } catch (err) {
      console.error("❌ Error fetching users:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ users, setUsers, loading, error, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUsers = () => useContext(UserContext);
