import React from "react";
import { FaImage, FaTrash } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { useTrip } from "../../context/TripContext";

export default function GalleryUpload() {
  const { themeName } = useTheme();
  const { tripData, updateTripField } = useTrip();

  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      name: {
        en: file.name,
        ar: "",
        fr: "",
        de: "",
        it: "",
        zh: ""
      },
    }));
    updateTripField("gallery_images", [
      ...(tripData.gallery_images || []),
      ...newImages,
    ]);
  };

  const updateImageName = (index, lang, value) => {
    const updated = [...tripData.gallery_images];
    updated[index].name[lang] = value;
    updateTripField("gallery_images", updated);
  };

  const removeImage = (index) => {
    const updated = tripData.gallery_images.filter((_, i) => i !== index);
    updateTripField("gallery_images", updated);
  };

  return (
    <div>
      <h3
        className={`text-xl font-bold mb-3 ${
          themeName === "dark" ? "text-gold" : "text-[#3a2c0a]"
        }`}
      >
        Gallery Images
      </h3>

      <label
        className={`flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg font-bold w-fit ${
          themeName === "dark"
            ? "bg-[#c9a34a] text-black hover:bg-yellow-500"
            : "bg-[#c9a34a] text-white hover:bg-[#b5892e]"
        }`}
      >
        <FaImage /> Add Gallery Images
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryImages}
          className="hidden"
        />
      </label>

      {tripData.gallery_images?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
          {tripData.gallery_images.map((img, i) => (
            <div key={i} className="flex flex-col items-center">
              {img.preview && (
                <Image
                  src={img.preview}
                  alt={`Gallery ${i}`}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-lg shadow"
                />
              )}

              {/* حقول إدخال متعددة اللغات */}
              {["en","es","fr","de","it","zh"].map((lang) => (
                <input
                  key={lang}
                  type="text"
                  value={img.name[lang] || ""}
                  onChange={(e) => updateImageName(i, lang, e.target.value)}
                  placeholder={`Name (${lang.toUpperCase()})`}
                  className={`mt-1 w-full p-2 rounded-lg border text-sm outline-none ${
                    themeName === "dark"
                      ? "bg-[#0f0f0f] border-gold/30 text-white"
                      : "bg-[#fdf6e3] border-[#c9a34a]/40 text-[#3a2c0a]"
                  }`}
                />
              ))}

              <button
                type="button"
                onClick={() => removeImage(i)}
                className={`mt-2 flex items-center gap-2 px-3 py-1 rounded-lg font-bold text-sm ${
                  themeName === "dark"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                <FaTrash /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
