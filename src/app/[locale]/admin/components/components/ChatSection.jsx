/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { useMessages } from "../../context/MessageContext";
import { useAuth } from "@/context/AuthContext";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import { supabase } from "@/lib/supabaseClient";
import EgyptianBackground from "@/components/layout/EgyptianBackground";

const ChatSection = ({ activeUser, theme, themeName }) => {
  const { messages, fetchMessages, sendMessage, markMessageSeen } = useMessages();
  const { user } = useAuth(); // الأدمن الحالي من التوكين
  const [newMessage, setNewMessage] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);

  // ✅ جلب رسائل المستخدم
  useEffect(() => {
    if (activeUser) {
      fetchMessages(activeUser.id);
    }
  }, [activeUser]);

  // ✅ تحديث حالة الرسائل إلى "seen"
  useEffect(() => {
    if (activeUser && messages.length > 0) {
      messages.forEach((msg) => {
        if (msg.sender_type === "user" && msg.status === "sent") {
          markMessageSeen(msg.id);
        }
      });
    }
  }, [activeUser, messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    await sendMessage({
      user_id: activeUser.id,
      user_name: user?.name || "Admin",
      user_image: "https://dxpbyrcbklqrjlytmkum.supabase.co/storage/v1/object/public/avatars/technical-writer-digital-avatar-generative-ai_934475-9098.webp",
      content: newMessage,
      sender_type: "admin",
      reply_to: replyTo ? replyTo.id : null,
      admin_id: user.id,
      status: "sent",
    });

    setNewMessage("");
    setReplyTo(null);
    setIsTyping(false);

    await fetch("/api/typing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: activeUser.id, adminTyping: false }),
    });
  };

  // ✅ استعلام حالة الكتابة للمستخدم
  useEffect(() => {
    if (!activeUser) return;
    const interval = setInterval(async () => {
      const res = await fetch(`/api/typing?userId=${activeUser.id}`);
      const data = await res.json();
      setUserTyping(data.isTyping);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeUser]);

  const handleSendImage = async (file) => {
    const fileName = `${user.id}-${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("chat-images")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("chat-images")
      .getPublicUrl(fileName);

    const uploadedUrl = publicUrlData.publicUrl;

    await sendMessage({
      user_id: activeUser.id,
      user_name: user?.name || "Admin",
      user_image: user?.avatar || "https://dxpbyrcbklqrjlytmkum.supabase.co/storage/v1/object/public/avatars/technical-writer-digital-avatar-generative-ai_934475-9098.webp",
      content: uploadedUrl,
      sender_type: "admin",
      admin_id: user.id,
      status: "sent",
    });
  };

  return (
    <section className="flex-1 flex flex-col">
      <EgyptianBackground />
      <ChatHeader activeUser={activeUser} theme={theme} themeName={themeName} />

      <ChatMessages
        messages={messages}
        userTyping={userTyping}
        themeName={themeName}
      />

      <ChatInput
        handleSendImage={handleSendImage}
        activeUser={activeUser}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSend={handleSend}
        setIsTyping={setIsTyping}
        theme={theme}
        themeName={themeName}
      />
    </section>
  );
};

export default ChatSection;
