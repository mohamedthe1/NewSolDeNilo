"use client";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import PurchaseModal from "./components/PurchaseModal";
import { useTheme } from "@/context/ThemeContext";

export default function PurchaseButton({ trip }) {
  const [open, setOpen] = useState(false);
  const { themeName } = useTheme();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2 transition transform hover:scale-105 hover:shadow-2xl z-40 text-white bg-gradient-to-r from-green-500 to-green-600"
      >
        <FaShoppingCart className="w-5 h-5 animate-bounce" />
        Buy Trip
      </button>

      {open && <PurchaseModal trip={trip} onClose={() => setOpen(false)} />}
    </>
  );
}
