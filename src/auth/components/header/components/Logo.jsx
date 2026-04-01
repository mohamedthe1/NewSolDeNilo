"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Logo({ scrolled }) {
  const { themeName } = useTheme();
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);
  const isHome =
    segments.length === 0 ||
    (segments.length === 1 &&
      ["en", "fr", "de", "it", "es", "pt"].includes(segments[0]));

  const imageSrc =
    themeName === "dark"
      ? "/HomePageImage/Copilot_20260309_150019.png"
      : !isHome
      ? "/HomePageImage/Copilot_20260309_150019.png"
      : scrolled
      ? "/HomePageImage/Copilot_20260309_150339.png"
      : "/HomePageImage/Copilot_20260309_150019.png";

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image
          src={imageSrc}
          alt="Luxor Aswan Logo"
          width={140}
          height={50}
          priority
        />
      </Link>
    </motion.div>
  );
}
