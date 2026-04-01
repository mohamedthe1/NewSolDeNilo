import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // ✅ أولاً: جلب الحجوزات
  const { data: purchases, error: purchaseError } = await supabase
    .from("purchases")
    .select(`
      id,
      created_at,
      arrival_date,
      departure_date,
      guide_languages,
      num_children,
      num_persons,
      pet_type,
      platform,
      has_children,
      has_guide,
      status,
      has_pets,
      user_id,
      trip_id
    `);

  if (purchaseError) {
    return new Response(JSON.stringify({ error: purchaseError.message }), { status: 400 });
  }

  // ✅ ثانياً: جلب الرحلات
  const tripIds = purchases.map(p => p.trip_id);
  const { data: trips, error: tripError } = await supabase
    .from("trips")
    .select("id, title")
    .in("id", tripIds);

  if (tripError) {
    return new Response(JSON.stringify({ error: tripError.message }), { status: 400 });
  }

  // ✅ ثالثاً: جلب المستخدمين من Supabase Auth
  // هنا بنستخدم admin API (لازم يكون عندك service_role key في السيرفر)
  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // ⚠️ مهم: مش الـ anon key
  );

  const userIds = purchases.map(p => p.user_id);
  const { data: users, error: userError } = await adminClient.auth.admin.listUsers({
    filter: { id: userIds }
  });

  if (userError) {
    return new Response(JSON.stringify({ error: userError.message }), { status: 400 });
  }

  // ✅ رابعاً: دمج البيانات يدويًا
  const enrichedPurchases = purchases.map(p => {
    const user = users?.users?.find(u => u.id === p.user_id);
    const trip = trips.find(t => t.id === p.trip_id);

    return {
      ...p,
      userName: user?.name || user?.email || "Unknown User",
      tripTitle: trip?.title?.en || "Unknown Trip"
    };
  });

  return new Response(JSON.stringify(enrichedPurchases), { status: 200 });
}
