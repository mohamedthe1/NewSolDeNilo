import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );


  const { tripId ,userId} = await req.json();

  // ✅ تحديث حالة الحجز إلى Cancelled
  const { error } = await supabase
    .from("purchases")
    .update({ status: "Cancelled" })
    .eq("trip_id", tripId)
    .eq("user_id", userId);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
