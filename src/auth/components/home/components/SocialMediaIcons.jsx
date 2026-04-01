"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGooglePlay, FaApple, FaTripadvisor } from "react-icons/fa";
import { MdTravelExplore } from "react-icons/md";
import { useTheme } from "@/context/ThemeContext";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

const SocialMediaIcons = () => {
  const { theme } = useTheme();
  // ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="hidden absolute right-10 top-1/2 -translate-y-1/2 md:flex flex-col gap-6 z-30"
    >
      {[
        { Icon: FaGooglePlay, link: "https://play.google.com" },
        { Icon: FaApple, link: "https://apple.com" },
        {
          Icon: FaTripadvisor,
          link: "https://www.tripadvisor.com/Profile/YourPage",
        },
        { Icon: MdTravelExplore, link: "https://supplier.viator.com" },
      ].map(({ Icon, link }, i) => (
        <motion.a
          whileHover={{ scale: 1.2, rotate: 5 }}
          key={i}
          href={link}
          target="_blank"
          className={`p-3 rounded-full ${theme.card} ${theme.shadow}`}
        >
          <Icon size={22} className={theme.icon} />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialMediaIcons;
