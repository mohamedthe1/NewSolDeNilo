"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { MdEmail, MdLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useData } from "@/context/DataContext";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useSecurity } from "@/context/SecurityContext"; // ✅ استدعاء الكونتكست
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabaseClient";

export default function LoginModal() {
  const { loginOpen, handleLoginClose, handleOpen } = useData();
  const { themeName } = useTheme();
  const isDark = themeName === "dark";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation("home");

  // من الـ AuthContext
  const { login, loading, error, handleClose } = useAuth();

  // من SecurityContext
  const { validateField } = useSecurity();

  const handleSubmit = async () => {
    // ✅ تحقق من الحقول قبل تسجيل الدخول
    const emailError = validateField("Email", email);
    const passwordError = validateField("Password", password);

    if (emailError || passwordError) {
      toast.error(emailError || passwordError);
      return;
    }

    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      handleLoginClose();
      handleClose();
    } catch (err) {
      toast.error("❌ Error: The email or password is incorrect.");
    }
  };
const loginWithGoogle = async () => {
  console.log("🚀 بدء تسجيل الدخول عبر Google...");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/callback/google",
    },
  });

  console.log("📌 نتيجة Supabase:", { data, error });

  if (error) {
    console.error("❌ خطأ أثناء تسجيل الدخول عبر Google:", error.message);
  } else {
    console.log("✅ تم إرسال طلب تسجيل الدخول بنجاح.");
  }
};

  return (
    <Dialog open={loginOpen} onClose={handleLoginClose} fullWidth maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: isDark
            ? "rgba(20,20,20,0.55)"
            : "linear-gradient(135deg, #ffffff, #fdf6e3)",
          backdropFilter: "blur(12px)",
          borderRadius: "24px",
          border: "1px solid rgba(201,163,74,0.3)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", padding: "28px 0 16px" }}>
          <h2
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "40px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              background: "linear-gradient(to right, #c9a34a, #b9972f)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 12px rgba(201,163,74,0.25)",
            }}
          >
            {t("Login")}
          </h2>
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
            label={t("Email")}
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdEmail color="#FF9800" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label={t("Password")}
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdLock color="#FF9800" />
                </InputAdornment>
              ),
            }}
          />

          {/* <Divider style={{ margin: "16px 0", color: "#FF9800" }}>
            {t("orcontinuewith")}
          </Divider>

          {/* Social Buttons */}
          {/* <div
            style={{  gap: "16px", justifyContent: "center" }}
            className="hidden lg:flex"
          >
            <IconButton onClick={loginWithGoogle}>
              <FcGoogle size={26} />
            </IconButton>

            <IconButton style={{ color: "#1877f2" }}>
              <FaFacebook size={26} />
            </IconButton>
          </div> */} 

          {/* Login Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
              style={{
                marginTop: "12px",
                background: "linear-gradient(to right, #FF9800, #FF9800)",
                color: "#fff",
                fontWeight: "700",
                padding: "14px",
                borderRadius: "14px",
                boxShadow: "0 6px 24px rgba(201,163,74,0.4)",
              }}
            >
              {loading ? t("Loggingin") : t("Login")}
            </Button>
          </motion.div>

          {/* زر العودة إلى إنشاء حساب */}
          <Button
            variant="text"
            fullWidth
            onClick={() => {
              handleLoginClose();
              handleOpen();
            }}
            style={{
              marginTop: "8px",
              color: "#FF9800",
              fontWeight: "600",
              textTransform: "none",
            }}
          >
            {t("Don’thaveanaccount?SignUp")}
          </Button>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}
