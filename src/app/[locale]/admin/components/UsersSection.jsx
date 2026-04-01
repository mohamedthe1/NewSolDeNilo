/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import { useUsers } from "../context/UserContext";
import { useTheme } from "@/context/ThemeContext";
import UserCard from "./components/UserCard";
import UserActions from "./components/UserActions";
import UserDetails from "./components/UserDetails";
import EgyptianBackground from "@/components/layout/EgyptianBackground";

const UsersSection = () => {
  const { users, fetchUsers, setUsers } = useUsers(); // ✅ تأكد أن context يسمح بتحديث users
  const { theme } = useTheme();
  const [activeUser, setActiveUser] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  const handleToggle = (userId, tab) => {
    if (activeUser === userId && activeTab === tab) {
      setActiveUser(null);
      setActiveTab(null);
    } else {
      setActiveUser(userId);
      setActiveTab(tab);
    }
  };

  // ✅ تغيير الدور (USER ⇄ ADMIN)
 const handleToggleRole = async (user) => {
  const newRole = user?.role === "ADMIN" ? "USER" : "ADMIN";

  const res = await fetch("/api/updateRole", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: user.id, newRole }),
  });

  if (!res.ok) {
    console.error("❌ Server error:", res.status);
    return;
  }

  let data;
  try {
    data = await res.json();
  } catch (err) {
    console.error("❌ Failed to parse JSON:", err);
    return;
  }

  if (data.error) {
    console.error("❌ Error updating role:", data.error);
  } else {
    console.log(`✅ Role updated to ${data.role} for user ${user.id}`);

    // تحديث محلي سريع
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id
          ? { ...u, user_metadata: { ...u.user_metadata, role: data.role } }
          : u
      )
    );

    // إعادة تحميل للتأكد من التزامن مع Supabase
    fetchUsers();
  }
};

  return (
    <motion.div
      className={`p-6 rounded-lg shadow-lg ${theme.card} ${theme.text}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <EgyptianBackground />

      {/* ✅ العنوان وعدد المستخدمين */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-6"
      >
        <h2
          className={`text-2xl font-bold flex items-center gap-2 ${theme.textAccent}`}
        >
          <FaUsers /> Users Management
        </h2>
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md ${theme.border}`}
        >
          <FaUsers />
          <span className="font-semibold">Total: {users.length}</span>
        </div>
      </motion.div>

      <ul className={`mt-6 divide-y ${theme.border}`}>
        {users.map((user) => (
          <motion.li
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`py-4 px-4`}
          >
            <UserCard user={user} />

            {/* ✅ عرض الدور الحالي */}
            <p className="text-sm font-medium mt-2">
              Role: {user?.role || "USER"}
            </p>

            {/* ✅ زر لتغيير الدور */}
            <button
              onClick={() => handleToggleRole(user)}
              className="mt-2 px-3 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              {user?.user_metadata?.role === "ADMIN"
                ? "Make User"
                : "Make Admin"}
            </button>

            <UserActions user={user} handleToggle={handleToggle} />
            {activeUser === user.id && (
              <UserDetails user={user} activeTab={activeTab} />
            )}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default UsersSection;
