// app/api/auth/register/route.js
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { UserSchema } from "@/lib/schemas/userSchema";
import { maleAvatars, femaleAvatars } from "@/constants/images";
import bcrypt from "bcryptjs";

// ✅ دالة لتحويل الـ gender إلى الإنجليزية
function normalizeGender(gender) {
  if (!gender) return "other";
  const g = gender.toLowerCase();
  if (["male", "hombre","männlich", "男","uomo","homme"].includes(g)) return "male";
  if (["female", "mujer","weiblich","女","donna","femme"].includes(g)) return "female";
  return "other";
}

function getAvatarByGender(gender) {
  let randomFile;
  if (gender === "male") {
    randomFile = maleAvatars[Math.floor(Math.random() * maleAvatars.length)];
  } else if (gender === "female") {
    randomFile = femaleAvatars[Math.floor(Math.random() * femaleAvatars.length)];
  } else {
    randomFile = "default.webp";
  }
  const { data } = supabase.storage.from("avatars").getPublicUrl(randomFile);
  return data.publicUrl;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = UserSchema.safeParse(body);
console.log(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "البيانات غير صالحة" }, { status: 400 });
    }

    let { name, email, password, gender } = parsed.data;

    // ✅ تحويل الـ gender إلى الإنجليزية
    gender = normalizeGender(gender);

    const avatarUrl = getAvatarByGender(gender);

    // ✅ تشفير الباسورد
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ إدخال المستخدم في جدول user
    const { data, error } = await supabase
      .from("user")
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          gender,
          role: "USER",
          avatar: avatarUrl,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "تم إنشاء الحساب بنجاح", user: data });
  } catch (e) {
    console.error("❌ خطأ داخلي:", e);
    return NextResponse.json({ error: "خطأ داخلي" }, { status: 500 });
  }
}
