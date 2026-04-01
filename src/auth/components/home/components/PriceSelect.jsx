"use client";
import React from "react";
import { TextField, MenuItem, InputAdornment } from "@mui/material";
import { FaDollarSign, FaEuroSign } from "react-icons/fa";
import { usePurchase } from "@/context/PurchaseContext";

export default function PriceSelect({ price, setPrice, t, theme }) {
  const { currency } = usePurchase();

  // ✅ أسعار بالدولار كـ base
  const rangesUSD = [
    { label: "0 - 900", value: "Economy", min: 0, max: 900 },
    { label: "901 - 1500", value: "Standard", min: 901, max: 1500 },
    { label: "1500+", value: "Luxury", min: 1501, max: Infinity },
  ];

  // ✅ معدل التحويل (مثال: 1 USD = 0.85 EUR)
  const conversionRate = 0.85;

  // ✅ تحويل الأسعار حسب العملة
  const priceRanges =
    currency === "EUR"
      ? rangesUSD.map((r) => ({
          ...r,
          label:
            r.max === Infinity
              ? `${(r.min * conversionRate).toFixed(0)}+ €`
              : `${(r.min * conversionRate).toFixed(0)} - ${(r.max * conversionRate).toFixed(0)} €`,
        }))
      : rangesUSD.map((r) => ({
          ...r,
          label:
            r.max === Infinity
              ? `${r.min}+ $`
              : `${r.min} - ${r.max} $`,
        }));

  return (
    <TextField
      select
      label={currency === "USD" ? t("MaxPrice") : t("MaxPrice2")}
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {currency === "USD" ? (
              <FaDollarSign
                className={theme.icon}
                style={{ color: "#FF9800", fontSize: "30px" }}
              />
            ) : (
              <FaEuroSign
                className={theme.icon}
                style={{ color: "#FF9800", fontSize: "30px" }}
              />
            )}
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
      {priceRanges.map((range) => (
        <MenuItem key={range.value} value={range.value}>
          {range.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
