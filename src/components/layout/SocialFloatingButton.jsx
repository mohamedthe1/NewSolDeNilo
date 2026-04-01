"use client";
import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ShareIcon from "@mui/icons-material/Share";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { SiTiktok, SiGmail } from "react-icons/si";

const boxVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SocialFloatingButton = () => {
  const muiTheme = useTheme();
  const [open, setOpen] = useState(false);

  const MideaIcon = [
    {
      titleIcon: "Facebook",
      path: "https://facebook.com",
      Icon: <FaFacebookF />,
      color: "#1877F2",
    },
    {
      titleIcon: "Instagram",
      path: "https://instagram.com",
      Icon: <FaInstagram />,
      gradient: "linear-gradient(45deg, #feda75, #d62976, #962fbf, #4f5bd5)",
    },
    {
      titleIcon: "TikTok",
      path: "https://tiktok.com",
      Icon: <SiTiktok />,
      color: "#25F4EE",
    },
    {
      titleIcon: "WhatsApp",
      path: "https://wa.me",
      Icon: <FaWhatsapp />,
      color: "#25D366",
    },
    {
      titleIcon: "Gmail",
      path: "https://mail.google.com",
      Icon: <SiGmail />,
      color: "#D14836",
    },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        left: 20,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 1,
      }}
    >
      {/* ✅ زر رئيسي */}
      <Tooltip title="Social Media">
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{
            backgroundColor: muiTheme.palette.primary.main,
            color: muiTheme.palette.getContrastText(muiTheme.palette.primary.main),
            "&:hover": {
              backgroundColor: muiTheme.palette.primary.light,
            },
          }}
        >
          <ShareIcon />
        </IconButton>
      </Tooltip>

      {/* ✅ أيقونات السوشيال ميديا تظهر عند الضغط */}
      {open && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {MideaIcon.map((i, index) => (
            <motion.a
              href={i.path}
              target="_blank"
              rel="noopener noreferrer"
              title={i.titleIcon}
              key={index}
              variants={boxVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: index * 0.2,
                duration: 0.5,
              }}
              style={{
                background: i.gradient || i.color,
                color: "white",
              }}
              className="SocialMediaIcon p-3 rounded-full shadow-md hover:scale-110 transition"
            >
              {i.Icon}
            </motion.a>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SocialFloatingButton;
