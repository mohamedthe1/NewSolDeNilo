"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { decodeJwt } from "@/lib/utils/JWToken";
import { toast } from "react-toastify";
import { useQueryFilters } from "./QueryContext";
import { useRouter } from "next/navigation"; // ✅ لإدارة التنقل
import { supabase } from "@/lib/supabaseClient";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ من QueryContext
  const { updateValue, getEncodedQuery } = useQueryFilters();

  const saveToken = (token) => {
    localStorage.setItem("sb_access", token);
    document.cookie = `sb_access=${token}; path=/; max-age=${2 * 24 * 60 * 60}`;
  };

  const removeToken = () => {
    localStorage.removeItem("sb_access");
    document.cookie = "sb_access=; path=/; max-age=0";
  };

  const getToken = () => {
    const lsToken = localStorage.getItem("sb_access");
    if (lsToken) return lsToken;
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sb_access="))
      ?.split("=")[1];
    return cookieToken || null;
  };
  const loginWithGoogle = async () => {
    console.log("🚀 بدء تسجيل الدخول عبر Google...");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/callback/google",
      },
    });
    console.log("📌 نتيجة Supabase:", { data, error });
  };
  // ✅ عند تحميل الصفحة تحقق من الجلسة عبر API /auth/me
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        const data = res.data;
        if (data.user) {
          setUser(data.user);
          setIsLoggedIn(true);
          updateValue("id", data.user.id);
          updateValue("email", data.user.email);
          updateValue("role", data.user.role);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch {
        setUser(null);
        setIsLoggedIn(false);
      }
    };
    checkUser();
  }, []);


const register = async (email, password, name, gender) => {
  setLoading(true);
  setError(null);

  // ✅ تحويل الـ gender إلى الإنجليزية قبل الإرسال
  const normalizeGender = (g) => {
    if (!g) return "other";
    const val = g.toLowerCase();
    if (["male", "hombre","männlich", "男","uomo","homme"].includes(g)) return "male";
  if (["female", "mujer","weiblich","女","donna","femme"].includes(g)) return "female";
    return "other";
  };

  try {
    const res = await axios.post("/api/auth/register", {
      name,
      email,
      password,
      gender: normalizeGender(gender),
    });

    const data = res.data;
    if (!data.user) throw new Error(data.error || "Registration failed");

    toast.success("✅ Account created successfully!");
    return data.user;
  } catch (err) {
    setError(err.message);
    toast.error("❌ Error: " + err.message);
  } finally {
    setLoading(false);
  }
};


  const login = async (email, password, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/auth/login", { email, password }, { withCredentials: true });
      const data = res.data;
      if (!data.user) throw new Error(data.error || "Login failed");
      setUser(data.user);
      setIsLoggedIn(true);
      updateValue("id", data.user.id);
      updateValue("email", data.user.email);
      updateValue("role", data.user.role);
      if (onSuccess) onSuccess();
      const encodedQuery = getEncodedQuery();
      router.push(`/?data=${encodedQuery}`);
      return data.user;
    } catch (err) {
      setError(err.message);
      toast.error("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("❌ Error clearing cookies on server:", err);
    }
    setUser(null);
    setIsLoggedIn(false);
    toast.info("🚪 Logged out successfully");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        loading,
        error,
        isLoggedIn,
        open,
        setOpen,
        handleOpen,
        handleClose,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
