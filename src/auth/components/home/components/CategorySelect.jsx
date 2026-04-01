"use client";
import React from "react";
import { TextField, MenuItem } from "@mui/material";

export default function CategorySelect({
  allCategories,
  currentLang,
  tripType,
  setTripType,
  t,
}) {
  return (
    <TextField
      select
      label={t("SelectCategory")}
      value={tripType}
      onChange={(e) => setTripType(e.target.value)}
      sx={{
        borderRadius: 3,
        "& .MuiOutlinedInput-root": {
          padding: "5px",
          color: "#2C2C2C",
          fontWeight: "600",
          letterSpacing: "0.5px",
          transition: "all 0.3s ease",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(8px)",
          "& fieldset": {
            borderColor: "#FF9800",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
          },
          "&:hover fieldset": {
            borderColor: "#FF9800",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            transform: "scale(1.01)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#FF9800",
            boxShadow: "0 0 0 3px rgba(201,163,74,0.25)",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#FF9800",
          fontWeight: "800",
          letterSpacing: "0.4px",
          fontSize: "1rem",
        },
        "& .MuiInputBase-input": {
          color: "#FF9800",
          padding: "12px 14px",
          fontSize: "1rem",
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
      {allCategories.map((cat) => {
        const categoryName =
          cat.name?.[currentLang] || cat.name?.["en"] || cat.name;
        return (
          <MenuItem key={cat.id} value={categoryName}>
            {categoryName}
          </MenuItem>
        );
      })}
    </TextField>
  );
}
