"use client";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import Header from "@/auth/components/header/Header";
import Footer from "@/components/layout/FooterSection";
import EgyptianBackground from "@/components/layout/EgyptianBackground";
import LoginModal from "@/auth/components/home/components/LoginModal";
import SignUpButton from "@/auth/components/home/components/SignUpButton";

// استدعاء الأقسام الجديدة
import AboutHero from "@/auth/components/about/AboutHero";
import MissionValues from "@/auth/components/about/MissionValues";
import StatsSection from "@/auth/components/about/StatsSection";
import HeritageSection from "@/auth/components/about/HeritageSection";
import CTASection from "@/auth/components/about/CTASection";
import ChatWidget from "@/components/layout/ChatWidget";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";
import { useLanguage } from "@/context/LanguageContext";
import { aboutMetadata } from "@/lib/metadata/about";
export default function AboutPage() {
  const { theme } = useTheme();
  const { user } = useAuth(); // ✅ جلب المستخدم الحالي
  const { lang } = useLanguage();
  const meta = aboutMetadata[lang] || aboutMetadata.en;
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
      </Head>
      <main
        className={`relative w-full min-h-screen ${theme.background} ${theme.text} overflow-hidden pt-10`}
      >
        <Header />
        <EgyptianBackground />

        {/* الأقسام */}
        <AboutHero />
        <MissionValues />
        <StatsSection />
        <HeritageSection />
        <CTASection />

        <Footer />
        <SignUpButton />
        <LoginModal />
        {user && <ChatWidget />}
      </main>
    </>
  );
}
