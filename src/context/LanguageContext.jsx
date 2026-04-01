/* eslint-disable react-hooks/set-state-in-effect */
// context/LanguageContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en"); // الافتراضي

  useEffect(() => {
    // قراءة لغة المتصفح
    const browserLang = navigator.language.split("-")[0]; // مثال: "en-US" → "en"
    setLang(browserLang);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
