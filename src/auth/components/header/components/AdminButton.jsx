"use client";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "@/context/AuthContext";

const AdminButton = () => {
  const router = useRouter();
  const muiTheme = useTheme();
  const { user } = useAuth();

  const goToAdmin = () => {
    router.push("/admin"); // ✅ مسار لوحة التحكم
  };
  const isAdmin = user?.role === "ADMIN"; // غيّر الإيميل لإيميل الأدمن الحقيقي

  return (
    <>
      {isAdmin && (
        <Button
          variant="contained"
          onClick={goToAdmin}
          sx={{
            fontWeight: "600",
            textTransform: "capitalize",
            borderRadius: "8px",
            backgroundColor: muiTheme.palette.secondary.main,
            "&:hover": {
              backgroundColor: muiTheme.palette.secondary.dark,
            },
          }}
        >
          Admin Dashboard
        </Button>
      )}
    </>
  );
};

export default AdminButton;
