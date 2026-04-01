"use client";
import React, { createContext, useContext } from "react";

// دوال التحقق
const validateNotEmpty = (value) => {
  return value.trim().length > 0;
};

const validateNoArabic = (value) => {
  // يمنع الحروف العربية
  const arabicRegex = /[\u0600-\u06FF]/;
  return !arabicRegex.test(value);
};

const validateNoSymbols = (value) => {
  // يسمح فقط بالحروف الإنجليزية والأرقام والمسافات
  const regex = /^[a-zA-Z0-9\s@.]+$/;
  return regex.test(value);
};

const validateEmail = (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};

const SecurityContext = createContext();

export const SecurityProvider = ({ children }) => {
  const validateField = (fieldName, value) => {
    if (!validateNotEmpty(value)) {
      return `${fieldName} cannot be empty`;
    }
    if (!validateNoArabic(value)) {
      return `${fieldName} cannot contain Arabic letters`;
    }
    if (!validateNoSymbols(value)) {
      return `${fieldName} cannot contain special symbols`;
    }
    if (fieldName === "Email" && !validateEmail(value)) {
      return "Invalid email format";
    }
    return null; // لا يوجد خطأ
  };

  return (
    <SecurityContext.Provider value={{ validateField }}>
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => useContext(SecurityContext);
