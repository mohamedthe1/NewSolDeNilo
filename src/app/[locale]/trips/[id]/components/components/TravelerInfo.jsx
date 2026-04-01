"use client";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function TravelerInfo() {
  const { user } = useAuth();
  const { themeName } = useTheme();

  return (
    <div className="mb-6 border-b border-gray-300/30 pb-4">
      <h3
        className={`text-lg font-semibold mb-2 capitalize ${
          themeName === "dark" ? "text-[#c9a34a]" : "text-[#11111194]"
        }`}
      >
        Traveler Information
      </h3>
    <div className="flex flex-row p-2.5 gap-4.5">
        <p
        className={`mb-1 flex items-center gap-2 capitalize ${
          themeName === "dark" ? "text-white" : "text-[#11111186]"
        }`}
      >
        <FaUser
          className={`${
            themeName === "dark" ? "text-yellow-300" : "text-[#c9a34a]"
          }`}
        />{" "}
        {user?.name}
      </p>
      <p
        className={`mb-1 flex items-center gap-2 ${
          themeName === "dark" ? "text-white" : "text-[#11111186]"
        }`}
      >
        <FaEnvelope
          className={`${
            themeName === "dark" ? "text-yellow-300" : "text-[#c9a34a]"
          }`}
        />{" "}
        {user?.email}
      </p>
    </div>
    </div>
  );
}
