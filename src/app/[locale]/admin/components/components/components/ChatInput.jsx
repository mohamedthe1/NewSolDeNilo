/* eslint-disable react-hooks/rules-of-hooks */
import { FaPaperPlane, FaImage, FaSmile } from "react-icons/fa";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useState } from "react";

<Picker onSelect={(emoji) => setNewMessage(newMessage + emoji.native)} />;

export default function ChatInput({
  activeUser,
  newMessage,
  setNewMessage,
  handleSend,
  setIsTyping,
  theme,
  themeName,
  handleSendImage,
}) {
  if (!activeUser) return null;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    handleSendImage(file); // ✅ نرسل الملف نفسه
  };

  return (
    <div className={`p-3 border-t ${theme.border} flex flex-col gap-2`}>
      <div className="flex gap-2 items-center">
        {/* زر رفع صورة كأيقونة */}
        <label
          className={`flex items-center justify-center w-10 h-10 rounded-md cursor-pointer transition-all duration-300
    ${
      themeName === "dark"
        ? "bg-gray-700 text-white hover:bg-gray-600"
        : "bg-gray-200 text-black hover:bg-gray-300"
    }
    ${theme.border} ${theme.shadow}`}
        >
          <FaImage className={`text-lg ${theme.icon}`} />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {/* إدخال النص */}
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            setIsTyping(e.target.value.length > 0);
            fetch("/api/typing", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: activeUser.id,
                adminTyping: e.target.value.length > 0,
              }),
            });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          className={`flex-1 rounded px-2 py-1 border ${theme.border} ${
            themeName === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-black"
          }`}
        />
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={`flex items-center justify-center w-10 h-10 rounded-md transition-all duration-300 ${
            themeName === "dark"
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-200 text-black hover:bg-gray-300"
          }`}
        >
          <FaSmile className="text-lg" />
        </button>
        {showEmojiPicker && (
          <div className="mt-2">
            <Picker
              data={data}
              onEmojiSelect={(emoji) =>
                setNewMessage(newMessage + emoji.native)
              }
              theme={themeName === "dark" ? "dark" : "light"}
            />
          </div>
        )}
        {/* زر إرسال النص مع أيقونة */}
        <button
          onClick={handleSend}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-300 ${
            themeName === "dark"
              ? "bg-yellow-500 text-black hover:bg-yellow-400"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          <FaPaperPlane className="text-sm" /> Send
        </button>
      </div>
    </div>
  );
}
