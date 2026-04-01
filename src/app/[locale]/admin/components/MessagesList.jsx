"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useUsers } from "../context/UserContext";
import { useAuth } from "@/context/AuthContext";
import UsersSidebar from "./components/UsersSidebar";
import ChatSection from "./components/ChatSection";
import { useMessages } from "@/context/MessageContext";
import { supabase } from "@/lib/supabaseClient";

export default function MessagesPage() {
  const { theme, themeName } = useTheme();
  const { users } = useUsers();
  const { user } = useAuth(); // ✅ المستخدم الحالي من التوكين
  const { messages, setMessages, markMessageSeen } = useMessages();

  const [activeUser, setActiveUser] = useState(null);

  // ✅ التسميع اللحظي للرسائل الجديدة
  useEffect(() => {
    const channel = supabase
      .channel("messages-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMessage = payload.new;
          if (newMessage.sender_type === "user") {
            setMessages((prev) => [...prev, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setMessages]);

  return (
    <main className={`flex h-[99%] ${theme.background} ${theme.text}`}>
      <UsersSidebar
        users={users}
        activeUser={activeUser}
        setActiveUser={setActiveUser}
        theme={theme}
        themeName={themeName}
        markMessageSeen={markMessageSeen}
        messages={messages}
      />
      <ChatSection
        activeUser={activeUser}
        setActiveUser={setActiveUser}
        theme={theme}
        themeName={themeName}
      />
    </main>
  );
}
