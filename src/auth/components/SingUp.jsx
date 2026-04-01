"use client";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import { motion } from "framer-motion";

const SingUp = () => {
  const { setOpen } = useAppContext();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-[90%] max-w-md bg-white/10 dark:bg-neutral-900/50 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl px-8 py-10"
      >
        {/* زر الإغلاق */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-300 hover:text-red-400 text-xl transition"
        >
          ✕
        </button>

        {/* العنوان */}
        <h2 className="text-3xl font-bold text-yellow-400 text-center mb-8 tracking-wide">
          Create Account
        </h2>

        {/* ✅ حقول الإدخال */}
        <div className="space-y-6">
          {/* الاسم */}
          <div className="relative">
            <input
              type="text"
              id="name"
              placeholder=" "
              className="peer w-full px-4 py-3 rounded-xl bg-white/20 dark:bg-neutral-800/60 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />
            <label
              htmlFor="name"
              className="absolute left-4 top-3 text-gray-300 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-yellow-400"
            >
              Full Name
            </label>
          </div>

          {/* الإيميل */}
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder=" "
              className="peer w-full px-4 py-3 rounded-xl bg-white/20 dark:bg-neutral-800/60 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-3 text-gray-300 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-yellow-400"
            >
              Email Address
            </label>
          </div>

          {/* الباسورد */}
          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder=" "
              className="peer w-full px-4 py-3 rounded-xl bg-white/20 dark:bg-neutral-800/60 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-3 text-gray-300 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-yellow-400"
            >
              Password
            </label>
          </div>
        </div>

        {/* ✅ الأزرار */}
        <div className="mt-8 space-y-4">
          <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-full shadow-lg hover:scale-[1.03] transition">
            Create Account
          </button>

          <button className="w-full py-3 bg-white text-black border border-gray-300 rounded-full shadow hover:bg-gray-100 transition">
            Sign in with Google
          </button>

          <button className="w-full py-3 bg-neutral-800 text-white rounded-full hover:bg-neutral-700 transition shadow">
            Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SingUp;
