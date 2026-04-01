"use client";
import React from "react";
import Image from "next/image";
import { FaImage, FaTrash } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";
import { useTripID } from "../../context/TripIDContext";

const EditTripGalleryUpload = () => {
  const { themeName } = useTheme();
  const { tripData, updateTripField } = useTripID();

const handleGalleryImages = async (e) => {
  const files = Array.from(e.target.files);

  const uploadedImages = await Promise.all(
    files.map(async (file) => {
      const { data, error } = await supabase.storage
        .from("trip-gallery")
        .upload(`images/${Date.now()}-${file.name}`, file);

      if (error) {
        console.error("Upload error:", error);
        return null;
      }

      const publicUrl = supabase.storage
        .from("trip-gallery")
        .getPublicUrl(data.path).publicUrl;

      return {
        url: publicUrl,
        name: {
          en: file.name,
          es: "",
          fr: "",
          de: "",
          it: "",
          zh: "",
        },
      };
    })
  );

  updateTripField("gallery_images", [
    ...(tripData?.gallery_images || []),
    ...uploadedImages.filter(Boolean),
  ]);
};


  // ✅ تحديث اسم صورة معينة بلغة محددة
  const updateImageName = (index, lang, newName) => {
    const updatedImages = [...(tripData?.gallery_images || [])];
    updatedImages[index] = {
      ...updatedImages[index],
      name: { ...updatedImages[index].name, [lang]: newName },
    };
    updateTripField("gallery_images", updatedImages);
  };

  // ✅ حذف صورة من المعرض
  const removeImage = (index) => {
    const updatedImages = (tripData?.gallery_images || []).filter(
      (_, i) => i !== index
    );
    updateTripField("gallery_images", updatedImages);
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

      {/* زر إضافة الصور */}
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

      {/* عرض الصور */}
      {tripData?.gallery_images?.length > 0 && (
        <div className="grid grid-cols-4 gap-3 mt-3">
          {tripData.gallery_images.map((img, i) => (
            <div key={i} className="flex flex-col items-center">
              <Image
                src={img.url}
                alt={`Gallery ${i}`}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded-lg shadow"
              />
              {["en", "es", "fr", "de", "it", "zh"].map((lang) => (
                <input
                  key={lang}
                  type="text"
                  value={img.name?.[lang] || ""}
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
                className={`mt-1 flex items-center gap-1 text-sm font-bold px-2 py-1 rounded ${
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
};

export default EditTripGalleryUpload;
