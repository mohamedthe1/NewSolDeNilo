"use client";
import dynamic from "next/dynamic";
const CalendarClient = dynamic(() => import("./CalendarSC"), { ssr: false });
export default CalendarClient;
