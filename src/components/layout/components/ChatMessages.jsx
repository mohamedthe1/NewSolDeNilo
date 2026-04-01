import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { saveAs } from "file-saver";
import { FaClock, FaDownload, FaExpand, FaComments } from "react-icons/fa";

export default function ChatMessages({ messages, adminTyping, themeName }) {
  const handleDownload = async (url, id) => {
    const response = await fetch(url);
    const blob = await response.blob();

    const img = new Image();
    img.src = URL.createObjectURL(blob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (newBlob) => {
          saveAs(newBlob, `chat-image-${id}.jpg`);
        },
        "image/jpeg",
        0.7,
      );
    };
  };

  return (
    <div className="flex-1 overflow-x-hidden p-4 overflow-y-scroll space-y-4">
      <AnimatePresence>
        {messages.length > 0 ? (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 max-w-[100%] ${
                msg.sender_type === "user"
                  ? "self-start"
                  : "self-end flex-row-reverse"
              }`}
            >
              <img
                src={
                  msg.user_image ||
                  "https://dxpbyrcbklqrjlytmkum.supabase.co/storage/v1/object/public/avatars/technical-writer-digital-avatar-generative-ai_934475-9098.webp"
                }
                alt={msg.user_name}
                className={`w-12 h-12 rounded-full border ${
                  msg.sender_type === "admin" ? "border-yellow-500" : ""
                } object-cover`}
              />
              <div
                className={`p-3 rounded-lg shadow-md max-w-[70%] flex flex-col ${
                  msg.sender_type === "user"
                    ? themeName === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-black"
                    : themeName === "dark"
                      ? "bg-yellow-500 text-black"
                      : "bg-yellow-400 text-white"
                }`}
              >
                <p className="text-sm font-semibold mb-1 capitalize">
                  {msg.sender_type === "admin" ? "👑 Admin" : msg.user_name}
                </p>

                {msg.content.startsWith("http") &&
                msg.content.match(/\.(jpeg|jpg|gif|png|webp)$/) ? (
                  <div className="relative group w-full max-w-xs">
                    <img
                      src={msg.content}
                      alt="uploaded"
                      className="w-full rounded-lg object-cover"
                    />
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleDownload(msg.content, msg.id)}
                        className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded shadow ${
                          themeName === "dark"
                            ? "bg-gray-700 text-white hover:bg-gray-600"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        } transition`}
                      >
                        <FaDownload className="text-sm" /> Download
                      </button>
                      <button
                        onClick={() => window.open(msg.content, "_blank")}
                        className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded shadow ${
                          themeName === "dark"
                            ? "bg-gray-700 text-white hover:bg-gray-600"
                            : "bg-green-500 text-white hover:bg-green-600"
                        } transition`}
                      >
                        <FaExpand className="text-sm" /> View
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}

                <div className="flex items-center gap-1 mt-1 text-xs opacity-70">
                  <FaClock className="text-xs" />
                  <span className="italic">
                    {msg.created_at
                      ? formatDistanceToNow(new Date(msg.created_at), {
                          addSuffix: true,
                          includeSeconds: true,
                        })
                      : ""}
                  </span>
                  {msg.status && (
                    <span className="ml-2">
                      {msg.status === "sent" ? "✅ Sent" : "👀 Seen"}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-80">
            <FaComments className="text-3xl mb-2 text-yellow-500" />
            <p className="font-semibold">No messages yet</p>
            <p className="text-sm">Start your conversation with us ✨🚘</p>
          </div>
        )}
      </AnimatePresence>

      {adminTyping && (
        <p className="text-xs italic opacity-70">Admin is typing...</p>
      )}
    </div>
  );
}
