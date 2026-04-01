import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export async function POST(req, { params }) {
  console.log("➡️ API POST called with params:", params);

  // قراءة البيانات من الـ body
  const body = await req.json();
  const { user_id,reviewId } = body;

  console.log("📥 User ID from frontend:", user_id);
  console.log("📥 rev ID from frontend:", reviewId);



  if (!reviewId || !user_id ) {
    console.log("⚠️ Missing required fields");
    return NextResponse.json({ ok: false, error: "Missing reviewId, user_id or trip_id" }, { status: 400 });
  }

  const { error: insertError } = await supabase
    .from("review_likes")
    .insert([{ review_id: reviewId, user_id, created_at: new Date().toISOString()}]);

  if (insertError) {
    console.error("❌ Supabase error (POST):", insertError.message);
    return NextResponse.json({ ok: false, error: insertError.message }, { status: 400 });
  }

  console.log("✅ Like added successfully by user:", user_id);
  return NextResponse.json({ ok: true, message: "Like added successfully" });
}


// 🔴 إزالة لايك
export async function DELETE(req, { params }) {
  console.log("➡️ API DELETE called with params:", params);

  const body = await req.json();
  const { user_id ,reviewId} = body;

  console.log("📥 User ID from frontend:", user_id);



  if (!reviewId || !user_id ) {
    console.log("⚠️ Missing required fields");
    return NextResponse.json({ ok: false, error: "Missing reviewId, user_id or trip_id" }, { status: 400 });
  }

  const { error: deleteError } = await supabase
    .from("review_likes")
    .delete()
    .eq("review_id", reviewId)
    .eq("user_id", user_id)

  if (deleteError) {
    console.error("❌ Supabase error (DELETE):", deleteError.message);
    return NextResponse.json({ ok: false, error: deleteError.message }, { status: 400 });
  }

  console.log("✅ Like removed successfully by user:", user_id);
  return NextResponse.json({ ok: true, message: "Like removed successfully" });
}


// 📊 جلب عدد اللايكات
export async function GET(req, { params }) {
  const reviewId = params.id;
  if (!reviewId) {
    return NextResponse.json({ ok: false, error: "Missing reviewId" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("review_likes")
    .select("user_id")
    .eq("review_id", reviewId);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    count: data?.length || 0,
    users: data?.map((d) => d.user_id) || [],
  });
}
