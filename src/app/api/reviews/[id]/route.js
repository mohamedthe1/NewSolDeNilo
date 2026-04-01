// src/app/api/reviews/[id]/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ✅ استخراج المستخدم من كوكيز Supabase
async function getUserFromCookies() {
  console.log("➡️ Reading cookies...");
  const cookieStore = cookies();
  const token = cookieStore.get("sb-access")?.value;

  console.log("📥 Token from cookies:", token);

  if (!token) {
    console.log("⚠️ No token found in cookies");
    return null;
  }

  const { data, error } = await supabase.auth.getUser(token);
  console.log("📥 Supabase auth.getUser result:", data, error);

  if (error || !data?.user) {
    console.error("❌ Error getting user from Supabase:", error?.message);
    return null;
  }
  console.log("✅ User fetched from Supabase:", data.user);
  return data.user;
}

// ✅ GET: جلب تعليق واحد
export async function GET(req, { params }) {
  console.log("➡️ GET request for review id:", params.id);
  const reviewId = params.id;

  const { data: review, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("id", reviewId)
    .single();

  console.log("📥 Supabase GET result:", review, error);

  if (error) {
    console.error("❌ Supabase error in GET:", error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }
  console.log("✅ Review fetched successfully:", review);
  return NextResponse.json({ ok: true, review });
}

// ✅ DELETE: حذف تعليق
export async function DELETE(req, { params }) {
  console.log("➡️ DELETE request for review id:", params.id);
  const user = await getUserFromCookies();
  console.log("👤 Current user:", user);

  if (!user) {
    console.log("⚠️ Unauthorized delete attempt");
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const reviewId = params.id;
  console.log("➡️ Fetching review to delete:", reviewId);

  const { data: review, error: fetchError } = await supabase
    .from("reviews")
    .select("id, user_id")
    .eq("id", reviewId)
    .single();

  console.log("📥 Review fetched for delete:", review, fetchError);

  if (fetchError || !review) {
    console.log("⚠️ Review not found");
    return NextResponse.json({ ok: false, error: "Review not found" }, { status: 404 });
  }

  if (user.role !== "ADMIN" && user.id !== review.user_id) {
    console.log("⚠️ Forbidden delete attempt by user:", user.id);
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const { error } = await supabase.from("reviews").delete().eq("id", reviewId);
  console.log("📥 Supabase delete result:", error);

  if (error) {
    console.error("❌ Supabase error in DELETE:", error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  console.log("✅ Review deleted successfully");
  return NextResponse.json({ ok: true, message: "Review deleted successfully" });
}

// ✅ PUT: تعديل تعليق
export async function PUT(req, { params }) {
  console.log("➡️ PUT request for review id:", params.id);
  const user = await getUserFromCookies();
  console.log("👤 Current user:", user);

  if (!user) {
    console.log("⚠️ Unauthorized update attempt");
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const reviewId = params.id;
  const body = await req.json();
  console.log("📥 Incoming PUT body:", body);

  const { comment, rating } = body;

  const { data: review, error: fetchError } = await supabase
    .from("reviews")
    .select("id, user_id")
    .eq("id", reviewId)
    .single();

  console.log("📥 Review fetched for update:", review, fetchError);

  if (fetchError || !review) {
    console.log("⚠️ Review not found for update");
    return NextResponse.json({ ok: false, error: "Review not found" }, { status: 404 });
  }

  if (user.id !== review.user_id) {
    console.log("⚠️ Forbidden update attempt by user:", user.id);
    return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
  }

  const { error } = await supabase
    .from("reviews")
    .update({ comment, rating })
    .eq("id", reviewId);

  console.log("📥 Supabase update result:", error);

  if (error) {
    console.error("❌ Supabase error in PUT:", error.message);
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  console.log("✅ Review updated successfully");
  return NextResponse.json({ ok: true, message: "Review updated successfully" });
}
