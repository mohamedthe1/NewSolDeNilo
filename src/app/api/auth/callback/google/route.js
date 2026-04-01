import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import { createSessionCookie } from "@/lib/utils/JWToken";

export async function GET(request) {
  console.log("🚀 بدء معالجة Google OAuth Callback...");

  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  console.log("📌 الكود المستلم من Google:", code);

  if (!code) {
    return NextResponse.json({ error: "code مفقود" }, { status: 400 });
  }

  const redirectUri = process.env.OAUTH_REDIRECT_URL;
  console.log("📌 redirectUri المستخدم:", redirectUri);

  // تبادل الكود مع Google
  const tokenResp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const token = await tokenResp.json();
  console.log("📌 نتيجة تبادل الكود:", token);

  if (!token.access_token) {
    return NextResponse.json({ error: "فشل تبديل رمز جوجل" }, { status: 400 });
  }

  // جلب بيانات المستخدم من Google
  const userResp = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${token.access_token}` },
  });
  const profile = await userResp.json();
  console.log("📌 بيانات المستخدم من Google:", profile);

  // تخزين أو تحديث المستخدم في Supabase
  const { data: users, error } = await supabaseAdmin
    .from("user")
    .upsert(
      {
        name: profile.name,
        email: profile.email,
        role: "USER",
        isActive: true,
        provider: "google",
        provider_id: profile.id,
        avatar_url: profile.picture,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "provider,provider_id" }
    )
    .select("id, name, email, role, isActive, provider, avatar_url");

  console.log("📌 نتيجة upsert:", users, error);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const user = users[0];
  console.log("✅ المستخدم النهائي:", user);

  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    isActive: user.isActive,
    provider: user.provider,
    avatar_url: user.avatar_url,
  };

  const { cookie } = await createSessionCookie(payload);
  console.log("📌 الكوكي الذي تم إنشاؤه:", cookie);

  const res = NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + "/");
  res.headers.set("Set-Cookie", cookie);
  console.log("✅ إعادة التوجيه إلى:", process.env.NEXT_PUBLIC_BASE_URL + "/");
  return res;
}
