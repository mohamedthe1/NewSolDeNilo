/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import lightTheme from "@/constants/lightTheme";
import darkTheme from "@/constants/darkTheme";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

const ThemeContext = createContext();
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState("light");
  const [theme, setTheme] = useState(lightTheme);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    applyTheme(saved);
  }, []);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // Apply theme helper
  const applyTheme = (mode) => {
    setThemeName(mode);
    setTheme(mode === "dark" ? darkTheme : lightTheme);

    // Toggle class for Tailwind dark mode
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Update CSS variables for global usage
    document.documentElement.style.setProperty(
      "--color",
      mode === "dark" ? "#c9a34a" : "#ffffff"
    );
    document.documentElement.style.setProperty(
      "--foreground",
      mode === "dark" ? "#ededed" : "#171717"
    );
    document.documentElement.style.setProperty(
      "--background",
      mode === "dark" ? "#0a0a0a" : "#ffffff"
    );
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  // Toggle theme
  const toggleThemeFun = () => {
    const newTheme = themeName === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleThemeFun }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
