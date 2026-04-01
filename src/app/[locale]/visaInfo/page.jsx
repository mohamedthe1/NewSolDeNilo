"use client";
import Header from "@/auth/components/header/Header";
import ImageSection from "@/auth/components/VISA/ImageSection";
import ContentSection from "@/auth/components/VISA/ContentSection";
import GeneralAdvice from "@/auth/components/VISA/GeneralAdvice";
import SocialFloatingButton from "@/components/layout/SocialFloatingButton";
import ChatWidget from "@/components/layout/ChatWidget";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext"; // ✅ استدعاء الثيم

export default function EgyptVisaPage() {
  const { user } = useAuth();
  const { theme } = useTheme(); // ✅ جلب الثيم الحالي

  return (
    <main
      className={`w-full flex flex-col items-center justify-center font-sans animate-fadeIn ${theme.background} ${theme.text}`}
    >
      <Header user={user || ""} />
      <ImageSection />
      <ContentSection />
      <GeneralAdvice />
      <SocialFloatingButton />
      {user && <ChatWidget user={user || ""} />}
    </main>
  );
}
