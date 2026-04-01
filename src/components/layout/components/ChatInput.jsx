import { motion } from "framer-motion";
import { FaImage, FaPaperPlane, FaSmile } from "react-icons/fa";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useState } from "react";
<Picker onSelect={(emoji) => setNewMessage(newMessage + emoji.native)} />;

export default function ChatInput({
  text,
  setText,
  handleSend,
  handleSendImage,
  theme,
  themeName,
  user,
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <div className={`p-3 border-t flex gap-2 items-center ${theme.border}`}>
      <label className="cursor-pointer">
        <FaImage size={20} className={theme.icon} />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => { const file = e.target.files[0]; if (file) { handleSendImage(file); } }}
          className="hidden"
        />
      </label>
      <input
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          fetch("/api/typing", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: user.id,
              isTyping: e.target.value.length > 0,
            }),
          });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }
        }}
        className={`flex-1 rounded px-2 py-1 border ${theme.border}`}
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
        <div
          className="absolute right-30 bottom-25 z-50 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg"
          style={{ width: "300px", height: "400px" }}
        >
          <Picker
            data={data}
            onEmojiSelect={(emoji) => setText(text + emoji.native)}
            theme={themeName === "dark" ? "dark" : "light"}
          />
        </div>
      )}

      <motion.button
        style={{ cursor: "pointer" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSend}
        className={`${theme.buttonPrimary} text-white flex items-center gap-1`}
      >
        <FaPaperPlane /> Send
      </motion.button>
    </div>
  );
}
