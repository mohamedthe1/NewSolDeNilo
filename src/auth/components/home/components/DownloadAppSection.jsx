"use client";
import { FaGooglePlay, FaApple, FaGlobe, FaMapMarkedAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function DownloadAppSection() {
    const { t } = useTranslation("home");
  
  return (
    <section className="w-full hidden flex-col items-center justify-center gap-6 py-12 backdrop-blur-[2px] rounded-xl shadow-lg">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 tracking-wide">
        {t("DownloadOurAppNow")}
      </h2>
      <p className="text-gray-600 text-center max-w-md">
        {t("pPhone")}
      </p>

      {/* Store Links */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {/* Google Play Button */}
        <a
          href="https://play.google.com/store/apps/details?id=your_app_id"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-[280px] gap-2 px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
        >
          <FaGooglePlay size={22} />
          <span>{t("GooglePlay")}</span>
        </a>

        {/* Apple App Store Button */}
        <a
          href="https://apps.apple.com/app/your_app_id"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-[280px] gap-2 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-all"
        >
          <FaApple size={22} />
          <span>{t("AppStore")}</span>
        </a>

        {/* Viator Button */}
        <a
          href="https://www.viator.com/your_page_link"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-[280px] gap-2 px-6 py-3 bg-[#c9a34a] text-white font-semibold rounded-lg shadow-md hover:bg-[#FF9800] transition-all"
        >
          <FaGlobe size={22} />
          <span>{t("Viator")}</span>
        </a>

        {/* Tripadvisor Button */}
        <a
          href="https://www.tripadvisor.com/your_page_link"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-[280px] text-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-all"
        >
          <FaMapMarkedAlt size={22} />
          <span>{t("Tripadvisor")}</span>
        </a>
      </div>
    </section>
  );
}
