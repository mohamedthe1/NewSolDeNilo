// app/api/auth/logout/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  cookieStore.set("jwt_token", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });

  return NextResponse.json({ ok: true, message: "Logged out successfully" });
}
