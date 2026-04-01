/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { addDays } from "date-fns";
import { useTheme } from "@/context/ThemeContext";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CelebrationIcon from "@mui/icons-material/Celebration";
import StarIcon from "@mui/icons-material/Star";
import { Box } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers";
import { desktopImages, mobileImages } from "@/constants/images";
import { useTranslation } from "react-i18next";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const DataContext = createContext();
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export function DataProvider({ children }) {
    const { i18n, t } = useTranslation("home");

  const { themeName, theme } = useTheme(); // theme يحتوي على خصائص من lightTheme أو darkTheme
  const [city, setCity] = useState(t("Luxor"));
  const [price, setPrice] = useState("Economy");
  const [tripType, setTripType] = useState(t("OneDayTrips"));
  const [arrival, setArrival] = useState(addDays(new Date(), 2));
  const [departure, setDeparture] = useState(addDays(new Date(), 9));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [images, setImages] = useState(desktopImages);
  const [index, setIndex] = useState(0);
  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => {setLoginOpen(true) ,setOpen(false)};
  const handleLoginClose = () => setLoginOpen(false);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  const handleSearch = () => {
    console.log({ city, price, tripType, arrival, departure });
  };
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  const specialDatesBase = [
    {
      date: new Date(2026, 11, 25),
      type: "Holiday",
      iconType: "celebration",
      discount: 0.3,
    },
    {
      date: new Date(2026, 0, 1),
      type: "Newyear",
      iconType: "star",
      discount: 0.2,
    },
  ];
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  const specialDates = specialDatesBase.map((item) => {
    let icon;
    switch (item.iconType) {
      case "celebration":
        icon = <CelebrationIcon sx={{ color: "#e6c200", fontSize: 18 }} />;
        break;
      case "star":
        icon = <StarIcon sx={{ color: "#C9A34A", fontSize: 18 }} />;
        break;
      case "offer":
        icon = <LocalOfferIcon sx={{ color: "#B9972F", fontSize: 18 }} />;
        break;
      case "calendar":
        icon = (
          <CalendarMonthIcon
            sx={{
              color: themeName === "dark" ? "#fff" : "#C9A34A",
              fontSize: 18,
            }}
          />
        );
        break;
    }
    return { ...item, icon };
  });
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  function DayWithIcon(props) {
    const { day } = props;

    // البحث عن اليوم في المصفوفة
    const special = specialDates.find(
      (item) => item.date.toDateString() === day.toDateString()
    );

    return (
      <Box sx={{ position: "relative" }}>
        <PickersDay {...props} />
        {special && (
          <Box
            sx={{
              position: "absolute",
              right: -6,
              top: -6,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {special.icon}
          </Box>
        )}
      </Box>
    );
  }
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setImages(mobileImages);
      } else {
        setImages(desktopImages);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  return (
    <DataContext.Provider
      value={{
        city,
        setCity,
        addDays,
        price,
        setPrice,
        tripType,
        setTripType,
        arrival,
        setArrival,
        departure,
        setDeparture,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        handleSearch,
        specialDates,
        DayWithIcon,
        images,
        setImages,
        index,
        loginOpen,
        setLoginOpen,
        handleLoginClose,
        handleLoginOpen,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
