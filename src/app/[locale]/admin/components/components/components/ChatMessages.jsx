import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaDownload, FaExpand } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { saveAs } from "file-saver";
import EgyptianBackground from "@/components/layout/EgyptianBackground";

export default function ChatMessages({ messages, userTyping, themeName }) {
  const handleDownload = async (url, id) => {
    const response = await fetch(url);
    const blob = await response.blob();

    // نحول الصورة لـ object URL
    const img = new Image();
    img.src = URL.createObjectURL(blob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // نحدد أبعاد الصورة
      canvas.width = img.width;
      canvas.height = img.height;

      // نرسم الصورة على الـ canvas
      ctx.drawImage(img, 0, 0);

      // نحولها لـ Blob بجودة محددة (0.5 = 50%)
      canvas.toBlob(
        (newBlob) => {
          saveAs(newBlob, `chat-image-${id}.jpg`);
        },
        "image/jpeg",
        0.7, // هنا تتحكم في الجودة (من 0 إلى 1)
      );
    };
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4">
      <EgyptianBackground />
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
                src={msg.user_image}
                alt={msg.user_name}
                className={`w-12 h-12 rounded-full border ${
                  msg.sender_type === "admin" ? "border-yellow-500" : ""
                } object-cover`}
              />
              <div
                className={`p-3 rounded-lg shadow-md max-w-[70%] ${
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
                  {msg.sender_type === "admin" ? "👑 admin" : msg.user_name}
                </p>

                {/* عرض الصور أو الروابط أو النصوص */}
                {msg.content.startsWith("http") &&
                msg.content.match(/\.(jpeg|jpg|gif|png|webp)$/) ? (
                  <div className="relative group w-full max-w-xs">
                    {" "}
                    {/* الصورة */}{" "}
                    <img
                      src={msg.content}
                      alt="uploaded"
                      className="w-full rounded-lg object-cover"
                    />{" "}
                    {/* الأزرار تظهر أسفل الصورة عند hover */}{" "}
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {" "}
                      {/* زر تنزيل باستخدام FileSaver */}{" "}
                      <button
                        onClick={() => handleDownload(msg.content, msg.id)}
                        className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded shadow ${themeName === "dark" ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-blue-500 text-white hover:bg-blue-600"} transition`}
                      >
                        {" "}
                        <FaDownload className="text-sm" /> Download{" "}
                      </button>
                      {/* زر عرض الصورة */}{" "}
                      <button
                        onClick={() => window.open(msg.content, "_blank")}
                        className={`flex items-center gap-2 px-3 py-1 text-xs font-medium rounded shadow ${themeName === "dark" ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-green-500 text-white hover:bg-green-600"} transition`}
                      >
                        {" "}
                        <FaExpand className="text-sm" /> View{" "}
                      </button>{" "}
                    </div>{" "}
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}

                <div className="flex items-center gap-1 mt-1">
                  <FaClock className="text-xs opacity-70" />
                  <span className="text-xs italic opacity-70">
                    {msg.created_at
                      ? formatDistanceToNow(new Date(msg.created_at), {
                          addSuffix: true,
                        })
                      : ""}
                  </span>
                  {msg.status && (
                    <span className="text-xs ml-2 opacity-70">
                      {msg.status === "sent" ? "✅ Sent" : "👀 Seen"}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-sm opacity-70">No messages yet...</p>
        )}
      </AnimatePresence>

      {userTyping && (
        <p className="text-xs italic opacity-70">User is typing...</p>
      )}
    </div>
  );
}
