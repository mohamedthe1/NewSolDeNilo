"use client";
import EmojiPicker from "emoji-picker-react";

export default function ReviewForm({
  comment,
  setComment,
  showEmojiPicker,
  setShowEmojiPicker,
  onEmojiClick,
  onSubmit,
  placeholder,
  submitLabel,
  themeName,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="w-[100%] flex items-center gap-2">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={placeholder}
          className={`w-[70%] p-3 rounded-lg border focus:outline-none ${
            themeName === "dark"
              ? "bg-black/60 border-gold/50 text-gold"
              : "bg-[#fdf6e3] border-[#c9a34a]/50 text-[#3a2c0a]"
          }`}
          rows={3}
        />

        <button
          type="button"
          style={{ cursor: "pointer" }}
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={`px-3 py-2 rounded-lg hover:bg-gray-300 ${themeName === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
        >
          😀
        </button>
        {showEmojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} theme={themeName === "dark" ? "dark" : "light"}/>}
      </div>

      <button
        type="submit"
        style={{ cursor: "pointer" }}
        className={`px-6 py-2 rounded-lg font-semibold transition bg-[#c9a34a] text-white ${
          themeName === "dark"
            ? "hover:bg-yellow-300"
            : "hover:bg-[#a67c00]"
        }`}
      >
        {submitLabel}
      </button>
    </form>
  );
}
