"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaFemale, FaMale } from "react-icons/fa";
import { useData } from "@/context/DataContext";
import { useTheme } from "@/context/ThemeContext";
import { toast } from "react-toastify";
import { useSecurity } from "@/context/SecurityContext";
import { useTranslation } from "react-i18next";

export default function SignUpModal() {
  const { handleLoginOpen } = useData();
  const { themeName } = useTheme();
  const isDark = themeName === "dark";
  const { validateField } = useSecurity();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const { t } = useTranslation("home");

  const { register, loading, error, open, handleClose } = useAuth();

  // 🎨 ألوان واضحة للكتابة حسب الثيم
  const mainTextColor = isDark ? "#ffffff" : "#1a1a1a"; // النص الأساسي
  const placeholderColor = isDark ? "#FFD700" : "#3a2c0a"; // الـ placeholder
  const labelColor = isDark ? "#FFD700" : "#3a2c0a"; // الـ label
  const borderColor = isDark ? "#FFD700" : "#c9a34a"; // الإطار

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: borderColor },
      "&:hover fieldset": { borderColor: borderColor },
      "&.Mui-focused fieldset": { borderColor: borderColor },
      backgroundColor: isDark ? "rgba(0,0,0,0.6)" : "#fff",
    },
    "& .MuiInputLabel-root": {
      color: labelColor,
      fontWeight: "600",
      fontSize: "0.95rem",
      letterSpacing: "0.5px",
    },
    "& .MuiInputBase-input": {
      color: mainTextColor, // لون النص الأساسي
      fontWeight: "600",
      fontSize: "1rem",
      letterSpacing: "0.3px",
    },
    "& .MuiInputBase-input::placeholder": {
      color: placeholderColor, // لون الـ placeholder
      opacity: 0.8,
      fontStyle: "italic",
    },
  };

  const handleSubmit = async () => {
    const nameError = validateField("Full Name", fullName);
    const emailError = validateField("Email", email);
    const passwordError = validateField("Password", password);
    if (nameError || emailError || passwordError || !gender) {
      toast.error(
        nameError || emailError || passwordError || "Gender is required",
      );
      return;
    }
    try {
      await register(email, password, fullName, gender);

      toast.success("✅ Account created successfully!");

      // ✅ أغلق نافذة التسجيل وافتح نافذة تسجيل الدخول
      handleClose();
      handleLoginOpen();
    } catch (err) {
      toast.error("❌ Error: " + err.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: isDark
            ? "rgba(20,20,20,0.55)"
            : "linear-gradient(135deg, #ffffff, #fdf6e3)",
          backdropFilter: "blur(18px)",
          borderRadius: "24px",
          border: "1px solid #FF9800",
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          overflow: "hidden",
          overflowY:"scroll"
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", padding: "32px 0 20px" }}>
          <h1
          className="text-4xl lg:text-5xl"
            style={{
              fontFamily: "Cinzel, serif",
              fontWeight: "700",
              letterSpacing: "4px",
              textTransform: "uppercase",
              background: "linear-gradient(to right, #c9a34a, #b9972f)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            LUXOR & ASWAN
          </h1>
        </div>

        {/* Content */}
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "32px",
          }}
        >
          <TextField
            label={t("FullName")}
            variant="outlined"
            fullWidth
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdPerson color={"#FF9800"} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyle}
          />

          <TextField
            label={t("Email")}
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdEmail color={isDark ? "#FF9800" : "#FF9800"} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: isDark ? "#FF9800" : "#FF9800" },
                "&:hover fieldset": {
                  borderColor: isDark ? "#FF9800" : "#FF9800",
                },
                "&.Mui-focused fieldset": {
                  borderColor: isDark ? "#FF9800" : "#FF9800",
                },
                backgroundColor: isDark ? "rgba(0,0,0,0.6)" : "#aaf",
              },
              "& .MuiInputLabel-root": {
                color: isDark ? "#FF9800" : "#3a2c0a",
                fontWeight: "bold",
              },
              "& .MuiInputBase-input": {
                color: isDark ? "#ffffff" : "#1a1a1a", // لون الكتابة الأساسي
                fontWeight: "600",
              },
              "& .MuiInputBase-input::placeholder": {
                color: isDark ? "#FF9800" : "#3a2c0a", // لون الـ placeholder
                opacity: 0.9,
              },
            }}
          />

          <TextField
            label={t("Password")}
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdLock color={"#FF9800"} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyle}
          />

          <FormLabel
            component="legend"
            style={{ color: "#FF9800", fontWeight: "600" }}
          >
            {t("Gender")}
          </FormLabel>
          <RadioGroup
            row
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{ justifyContent: "center", gap: "20px" }}
          >
            <FormControlLabel
              value={t("male")}
              control={<Radio />}
              label={
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <FaMale color="#1e40af" /> {t("male")}
                </div>
              }
            />
            <FormControlLabel
              value={t("female")}
              control={<Radio />}
              label={
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <FaFemale color="#db2777" /> {t("female")}
                </div>
              }
            />
          </RadioGroup>

          {/* <Divider
            style={{ margin: "16px 0", color: "#FF9800" }}
            className="hidden lg:flex"
          >
            {t("orsignupwith")}
          </Divider> */}

          {/* Social Buttons */}
          {/* <div
            style={{ gap: "16px", justifyContent: "center" }}
            className="hidden lg:flex"
          >
            <IconButton
              onClick={() => {
                window.location.href = "/api/oauth/google";
              }}
            >
              {" "}
              <FcGoogle size={26} />{" "}
            </IconButton>
            <IconButton style={{ color: "#1877f2" }}>
              <FaFacebook size={26} />
            </IconButton>
          </div> */}

          {/* Sign Up Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{ marginTop: "16px" }}
          >
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background: "linear-gradient(to right, #FF9800, #FF9800)",
                color: "#fff",
                fontWeight: "700",
                padding: "14px",
                borderRadius: "14px",
              }}
            >
              {loading ? t("Creating") : t("SignUp")}
            </Button>
          </motion.div>

          {/* زر فتح نافذة تسجيل الدخول */}
          <Button
            variant="text"
            fullWidth
            onClick={handleLoginOpen}
            style={{
              marginTop: "8px",
              color: "#FF9800",
              fontWeight: "600",
              textTransform: "none",
            }}
          >
            {t("Alreadyhaveanaccount?Login")}
          </Button>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}
