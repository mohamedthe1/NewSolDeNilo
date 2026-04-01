"use client";

import { Box, Typography, CircularProgress } from "@mui/material";
import Image from "next/image";
// ? $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
export default function PharaonicLoader() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "#f5e6c8",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 20, // مسافة بين العناصر
        padding: 4,
      }}
    >
      {/* الهيروغليفية */}
      <Box
        sx={{
          writingMode: "vertical-rl",
          fontSize: "3rem",
          color: "#7c5e2a",
          opacity: 0.8,
        }}
      >
        𓂀𓃭𓏏𓆑𓂋𓏏𓅓𓏏
      </Box>

      {/* النص ودائرة التحميل */}
      <Box
        sx={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" sx={{ color: "#a67c00", fontWeight: "bold" }}>
          Please wait...
        </Typography>
        <CircularProgress
          size={80}
          thickness={5}
          sx={{ color: "#a67c00", mt: 3 }}
        />
      </Box>

      {/* صورة أنوبيس */}
      <Box
        sx={{
          width: "30%",
          maxWidth: "30vw",
        }}
      >
        <Image
          src="/assets/Copilot_20250926_193431.webp"
          alt="Anubis"
          width={650}
          height={650}
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
}
