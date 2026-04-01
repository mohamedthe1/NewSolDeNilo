/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/lib/supabaseClient";

const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // ✅ جلب رسائل المستخدم الحالي
  const fetchMessages = async (userId) => {
    const res = await fetch(`/api/messages?userId=${userId}`);
    const data = await res.json();
    setMessages(Array.isArray(data) ? data : []);
  };

  // ✅ إرسال رسالة جديدة (لا نضيفها يدويًا هنا، ننتظر Realtime)
const sendMessage = async ({
  user_id,
  content,
  sender_type,
  status = "sent",
}) => {
  const payload = {
    user_id,
    user_name: user?.name || "Unknown User",
    user_image: user?.avatar || "/default-avatar.png",
    content,
    sender_type,
    status,
  };

  const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (data.error) {
    console.error("❌ Error sending message:", data.error);
  } else {
    // ✅ أضف الرسالة مباشرةً للـ state علشان تظهر فورًا
    setMessages((prev) => [...prev, { ...payload, id: data.id }]);
  }

  return data;
};


  // ✅ تحديث حالة الرسالة إلى "seen"
  const markMessageSeen = async (messageId) => {

    const res = await fetch("/api/messages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messageId }),
    });

    const data = await res.json();

    if (!data.error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, status: "seen" } : msg
        )
      );
    } else {
      console.error("❌ Error marking message seen:", data.error);
    }

    return data;
  };

  // ✅ يجلب الرسائل مرة واحدة عند تحميل المستخدم
  useEffect(() => {
    if (user?.id) {
      fetchMessages(user.id);
    }
  }, [user?.id]);

  // ✅ Realtime Subscriptions
  useEffect(() => {
    const channel = supabase
      .channel("messages-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => {
            // فلترة لمنع التكرار
            if (prev.find((msg) => msg.id === payload.new.id)) {
              return prev;
            }
            return [...prev, payload.new];
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === payload.new.id ? payload.new : msg
            )
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <MessageContext.Provider
      value={{ messages, loading, fetchMessages, sendMessage, markMessageSeen }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export const useMessages = () => useContext(MessageContext);
