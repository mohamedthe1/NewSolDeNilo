"use client";
import React from "react";
import { TextField, MenuItem, InputAdornment } from "@mui/material";
import { FaCity } from "react-icons/fa";

export default function CitySelect({
  allCities,
  currentLang,
  city,
  setCity,
  t,
  theme,
}) {
  return (
    <TextField
      select
      label={t("SelectCity")}
      value={city}
      onChange={(e) => setCity(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FaCity
              className={theme.icon}
              style={{
                paddingLeft: "15px",
                color: "#FF9800",
                fontSize: "35px",
              }}
            />
          </InputAdornment>
        ),
      }}
      sx={{
        borderRadius: 3,
        "& .MuiOutlinedInput-root": {
          padding: "5px",
          color: "#2C2C2C",
          fontWeight: "800",
          letterSpacing: "0.5px",
          transition: "all 0.3s ease",
          "& fieldset": {
            borderColor: "#FF9800",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
          },
          "&:hover fieldset": {
            borderColor: "#FF9800",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#FF9800",
            boxShadow: "0 0 0 2px rgba(201,163,74,0.25)",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#FF9800",
          fontWeight: "600",
          letterSpacing: "0.4px",
        },
        "& .MuiInputBase-input": {
          color: "#FF9800",
          padding: "12px 14px",
        },
        "& .MuiMenuItem-root": {
          fontWeight: "500",
          color: "#2C2C2C",
          borderRadius: "8px",
          margin: "4px 8px",
          padding: "10px 14px",
          transition: "all 0.3s ease",
          "&:hover": {
            background: "linear-gradient(to right, #FFF3E0, #FFE0B2)",
            color: "#FF9800",
            transform: "scale(1.02)",
          },
          "&.Mui-selected": {
            background: "linear-gradient(to right, #C9A34A, #B9972F)",
            color: "#fff",
            fontWeight: "600",
          },
          "&.Mui-selected:hover": {
            background: "linear-gradient(to right, #B9972F, #A67C00)",
          },
        },
      }}
    >
      {allCities.map((c) => {
        const cityName = c.name?.[currentLang] || c.name?.["en"] || c.name;
        return (
          <MenuItem key={c.id} value={cityName}>
            {cityName}
          </MenuItem>
        );
      })}
    </TextField>
  );
}
