import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const {
    tripId,
    numPersons,
    hasChildren,
    numChildren,
    hasPets,
    petTypes,
    hasGuide,
    selectedLanguages,
    arrivalDate,
    userId,
    status,
    departureDate,
    platform
  } = await req.json();

  // تحقق إذا كان فيه حجز سابق
  const { data: existing, error: selectError } = await supabase
    .from("purchases")
    .select("*")
    .eq("user_id", userId)
    .eq("trip_id", tripId);

  if (selectError) {
    return new Response(JSON.stringify({ error: selectError.message }), { status: 400 });
  }

if (existing && existing.length > 0) {
  const oldPurchase = existing[0];

  if (oldPurchase.status === "Cancelled") {
    // ✅ تحديث الحجز الملغي
    const { error: updateError } = await supabase
      .from("purchases")
      .update({
        num_persons: numPersons,
        has_children: hasChildren,
        num_children: numChildren,
        has_pets: hasPets,
        pet_type: petTypes,
        has_guide: hasGuide,
        guide_languages: selectedLanguages,
        arrival_date: arrivalDate,
        departure_date: departureDate,
        platform,
        status,
        updated_at: new Date()
      })
      .eq("id", oldPurchase.id);

    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ message: "Trip re-purchased successfully!" }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "You already purchased this trip" }), { status: 400 });
}

  // ✅ إضافة عملية شراء جديدة لو مفيش أي حجز سابق
  const { error: insertError } = await supabase
    .from("purchases")
    .insert([{
      user_id: userId,
      trip_id: tripId,
      num_persons: numPersons,
      has_children: hasChildren,
      num_children: numChildren,
      has_pets: hasPets,
      pet_type: petTypes,
      has_guide: hasGuide,
      guide_languages: selectedLanguages,
      arrival_date: arrivalDate,
      departure_date: departureDate,
      platform,
      status,
      created_at: new Date()
    }]);

  if (insertError) {
    return new Response(JSON.stringify({ error: insertError.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ message: "Trip purchased successfully!" }), { status: 200 });
}
