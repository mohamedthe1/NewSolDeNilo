"use client";
import Footer from "@/components/layout/FooterSection";
import Header from "@/auth/components/header/Header";
import CarBookingSection from "@/auth/components/home/CarBookingSection";
import CategoriesSection from "@/auth/components/home/CategoriesSection";
import CitiesSection from "@/auth/components/home/CitiesSection";
import HeroSection from "@/auth/components/home/HeroSection";
import OurSection from "@/auth/components/home/OurSection";
import TopTripsSection from "@/auth/components/home/TopTripsSection";
import LoginModal from "@/auth/components/home/components/LoginModal";
import SignUpButton from "@/auth/components/home/components/SignUpButton";
import TopReviewsSection from "@/auth/components/home/components/TopReviewsSection";
import ChatWidget from "@/components/layout/ChatWidget";
import { useAuth } from "@/context/AuthContext"; // ✅ استدعاء الـ Auth
import Head from "next/head";
import { useLanguage } from "@/context/LanguageContext";
// import { homeMetadata } from "@/lib/metadata/home";
// import { useQueryFilters } from "@/context/QueryContext";
export default function Home() {
  const { user } = useAuth(); // ✅ جلب المستخدم الحالي
  const { lang } = useLanguage();
  // const meta = homeMetadata[lang] || homeMetadata.en;
  return (
    <>
      {/* <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
      </Head> */}
      <main
        className={`
        w-full
        flex
        flex-col
        items-center
        justify-center
        min-h-screen font-sans
        bg-white
        transition-colors duration-300
        overflow-hidden
      `}
      >
        <Header />

        {/* ================= HERO SECTION ================= */}
        <HeroSection />

        {/* ================= CATEGORIES SECTION ================= */}
        <CategoriesSection />

        {/* ================= TOP TRIPS SECTION ================= */}
        <TopTripsSection />

        {/* ================= CITIES SECTION ================= */}
        <CitiesSection />

        <OurSection />
        <TopReviewsSection />

        <CarBookingSection />

        {/* ================= FOOTER ================= */}
        <Footer />

        <SignUpButton />
        <LoginModal />

        {/* نافذة الدردشة تظهر فقط لو المستخدم مسجل دخول */}
        {user && <ChatWidget />}
      </main>
    </>
  );
}
