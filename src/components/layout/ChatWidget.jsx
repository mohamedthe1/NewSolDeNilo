"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useMessages } from "@/context/MessageContext";
import { FaComments } from "react-icons/fa";
import EgyptianBackground from "@/components/layout/EgyptianBackground";
import { useAuth } from "@/context/AuthContext";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import { supabase } from "@/lib/supabaseClient";

export default function ChatWidget({ setShowEmojiPicker, showEmojiPicker }) {
  const [open, setOpen] = useState(false);
  const { theme, themeName } = useTheme();
  const { messages, sendMessage, fetchMessages, markMessageSeen } = useMessages();
  const [text, setText] = useState("");
  const { user } = useAuth();
  const [adminTyping, setAdminTyping] = useState(false);

  const [bookingMode, setBookingMode] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // ✅ جلب رسائل المستخدم
  useEffect(() => {
    if (user?.id) {
      fetchMessages(user.id);
    }
  }, [user]);

  // ✅ تحديث حالة الرسائل إلى "seen"
  useEffect(() => {
    if (user?.id && messages.length > 0) {
      messages.forEach((msg) => {
        if (msg.sender_type === "admin" && msg.status === "sent") {
          markMessageSeen(msg.id);
        }
      });
    }
  }, [user, messages]);

  // ✅ استعلام حالة الكتابة للأدمن
  useEffect(() => {
    if (!user?.id) return;
    const interval = setInterval(async () => {
      const res = await fetch(`/api/typing?userId=${user.id}`);
      const data = await res.json();
      setAdminTyping(data.adminTyping || false);
    }, 2000);
    return () => clearInterval(interval);
  }, [user?.id]);

  const handleSend = async () => {
    if (text.trim() !== "") {
      await sendMessage({
        user_id: user.id,
        user_name: user?.name,
        user_image: user?.avatar,
        content: text,
        sender_type: "user",
        status: "sent",
      });
      setText("");
    }
  };

  // ✅ استقبال حدث من CarBookingSection
  useEffect(() => {
    const handler = () => {
      setOpen(true);
      sendMessage({
        user_id: user.id,
        user_name: "Admin",
        user_image: "https://dxpbyrcbklqrjlytmkum.supabase.co/storage/v1/object/public/avatars/technical-writer-digital-avatar-generative-ai_934475-9098.webp", // صورة افتراضية للأدمن
        content: "Welcome to our premium transfer service ✨🚘",
        sender_type: "admin",
        status: "sent",
      });
      setBookingMode(true);
    };
    window.addEventListener("openCarBookingChat", handler);
    return () => window.removeEventListener("openCarBookingChat", handler);
  }, [user]);

  const isAdmin = user?.role === "ADMIN";

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
      user_id: user.id,
      user_name: user?.name,
      user_image: user?.avatar,
      content: uploadedUrl,
      sender_type: "user",
      status: "sent",
    });
  };

  return (
    <>
      {!isAdmin && (
        <motion.button
          style={{ cursor: "pointer" }}
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`fixed bottom-6 right-6 p-4 rounded-full z-50 shadow-lg flex items-center justify-center ${theme.buttonPrimary}`}
        >
          <FaComments size={22} color="#fff" />
        </motion.button>
      )}

      <AnimatePresence>
        {open && !isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed overflow-hidden bottom-20 right-6 w-110 h-125 rounded-xl shadow-xl flex flex-col z-50 ${theme.card} ${theme.text}`}
          >
            <EgyptianBackground />
            <ChatHeader onClose={() => setOpen(false)} theme={theme} />
            <ChatMessages
              messages={messages}
              adminTyping={adminTyping}
              themeName={themeName}
            />

            {bookingMode && (
              <div className="p-6 border-t bg-opacity-50">
                <p className="mb-4 text-lg font-semibold text-center">
                  Please enter your trip details:
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">From</label>
                    <input
                      type="text"
                      placeholder="Enter pickup location"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">To</label>
                    <input
                      type="text"
                      placeholder="Enter destination"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={async () => {
                    await sendMessage({
                      user_id: user.id,
                      user_name: user?.name,
                      user_image: user?.avatar,
                      content: `Car booking request: from ${from} to ${to}`,
                      sender_type: "user",
                      status: "sent",
                    });
                    setBookingMode(false);
                  }}
                  className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-lg shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <span>Send Request</span> 🚘
                </button>
              </div>
            )}

            {!bookingMode && (
              <ChatInput
                text={text}
                setText={setText}
                handleSend={handleSend}
                handleSendImage={handleSendImage}
                theme={theme}
                themeName={themeName}
                user={user}
                setShowEmojiPicker={setShowEmojiPicker}
                showEmojiPicker={showEmojiPicker}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
