"use client";
import { Box, Button, StyledEngineProvider } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";
import { useData } from "@/context/DataContext";
import React from "react";
import { useTranslation } from "react-i18next";
import { useCitiesCategories } from "@/context/CitiesCategoriesContext";
import CalendarClient from "./CalendarWrapper";
import CitySelect from "./CitySelect";
import CategorySelect from "./CategorySelect";
import PriceSelect from "./PriceSelect";
import { useRouter } from "next/navigation";

const Content = () => {
  const { theme } = useTheme();
  const { setCity, city, setPrice, price, tripType, setTripType } = useData();

  const { i18n, t } = useTranslation("home");
  const currentLang = i18n.language || "en";
  const { cities: allCities, categories: allCategories } =
    useCitiesCategories();

  const router = useRouter();

  const isFormValid = city && price && tripType;
  const handleSearch = () => {
    // نبني الكويري مباشرة من القيم الحالية في الانبوتات
    const queryObj = {
      city: [city],
      category: [tripType],
      price: price,
      popular: false,
    };

    const encoded = btoa(JSON.stringify(queryObj));

    // التحويل إلى صفحة الرحلات مع الكويري الجديد
    router.push(`/trips?data=${encoded}`);
  };

  return (
    <div className=" hidden lg:flex flex-col items-center justify-center text-center px-6 z-30">
      <div className="w-[70%]">
        {/* Company Name */}
        <h1
          className={theme.title}
          style={{ fontSize: "4.4rem", opacity: "0" }}
        >
          LUXOR & ASWAN
        </h1>

        <p
          className={`text-xl md:text-2xl mt-6 leading-relaxed ${theme.subText} animate-slideUp`}
        ></p>

        {/* Trip Filter Form */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(5, 1fr)" },
            gap: 2,
            mt: 6,
            p: 3,
            borderRadius: 4,
            backdropFilter: "blur(12px)",
            backgroundColor: theme.inputBg,
            border: `1px solid ${theme.inputBorder}`,
            boxShadow: theme.shadow,
          }}
        >
          {/* Inputs Filter */}
          <CitySelect
            allCities={allCities}
            currentLang={currentLang}
            city={city}
            setCity={setCity}
            t={t}
            theme={theme}
          />

          <CategorySelect
            allCategories={allCategories}
            currentLang={currentLang}
            tripType={tripType}
            setTripType={setTripType}
            t={t}
          />

          <PriceSelect price={price} setPrice={setPrice} t={t} theme={theme} />

          {/* Calendar */}
          <StyledEngineProvider injectFirst>
            <CalendarClient />
          </StyledEngineProvider>

          {/* Search Button */}
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={!isFormValid}
            sx={{
              backgroundColor: "#FF9800",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "12px",
              px: 4,
              py: 1.5,
              textTransform: "uppercase",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              "&:hover": {
                backgroundColor: "#FF9800",
                boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
              },
            }}
          >
            {t("Search")}
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Content;
