// app/api/auth/users/route.js
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    // ✅ جلب كل المستخدمين من جدول user
    const { data: users, error } = await supabase
      .from("user")
      .select("id, name, email, gender, role, avatar");

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, users },
      { status: 200 }
    );
  } catch (e) {
    console.error("❌ خطأ داخلي:", e);
    return NextResponse.json(
      { success: false, error: "خطأ داخلي" },
      { status: 500 }
    );
  }
}
