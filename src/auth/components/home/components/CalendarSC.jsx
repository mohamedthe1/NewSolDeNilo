/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/display-name */
"use client";
import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useData } from "@/context/DataContext.jsx";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { MdDateRange } from "react-icons/md"; // أيقونة احترافية للتقويم
// Custom Input Component
const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <button className="luxury-input w-full text-left" onClick={onClick} ref={ref}>
    <span className={`luxury-label ${value ? "active" : ""}`}>
      {placeholder}
    </span>
    <span className="luxury-value">{value || ""}</span>
    <MdDateRange size={20} />
  </button>
));

const CalendarSC = () => {
  const {
    setArrival,
    arrival,
    departure,
    setDeparture,
    addDays,
    startDate,
    specialDates,
  } = useData();
  const { themeName } = useTheme();
  const { t } = useTranslation("home");

  return (
    <div className="flex gap-6">
      {/* Arrival */}
      <div className="flex-1 max-w-[120px] xl:min-w-[210px] flex flex-col">
        <DatePicker
          selected={arrival}
          onChange={(date) => setArrival(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText={t("Checkin")}
          customInput={<CustomInput />}
          minDate={addDays(new Date(), 2)}
          dayClassName={(day) => {
            const special = specialDates.find(
              (item) => item.date.toDateString() === day.toDateString()
            );
            return special ? "special-day" : "";
          }}
        />
      </div>

      {/* Departure */}
      <div className="flex-1 max-w-[120px] xl:min-w-[210px] flex flex-col">
        <DatePicker
          selected={departure}
          onChange={(date) => setDeparture(date)}
          minDate={startDate ? addDays(startDate, 7) : addDays(new Date(), 4)}
          dateFormat="dd/MM/yyyy"
          placeholderText={t("Checkout")}
          customInput={<CustomInput />}
        />
      </div>
    </div>
  );
};

export default CalendarSC;
