import { supabase } from "@/lib/supabaseClient";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📥 Request body:", JSON.stringify(body, null, 2));

    // ✅ إدخال الرحلة في جدول trips
    console.log("➡️ Inserting trip...");
    const { data: trip, error: tripError } = await supabase
      .from("trips")
      .insert({
        title: body.title,
        description: body.description,
        price: body.price,
        currency: body.currency,
        duration: body.duration,
        duration_unit: body.duration_unit,
        cover_image: body.cover_image,
        gallery_images: body.gallery_images,
        priceLevel: body.priceLevel,
      })
      .select()
      .single();

    if (tripError) throw tripError;
    console.log("✅ Trip inserted:", trip);

    // ✅ إدخال الـ includes
    if (body.includes?.length > 0) {
      console.log("➡️ Inserting includes:", body.includes);
      const includesData = body.includes.map((inc) => ({
        trip_id: trip.id,
        include_translations: {
          en: inc.en,
          es: inc.es,
          fr: inc.fr,
          de: inc.de,
          it: inc.it,
          zh: inc.zh,
        },
      }));
      const { error: includesError } = await supabase
        .from("includes")
        .insert(includesData);
      if (includesError) throw includesError;
      console.log("✅ Includes inserted");
    }

    // ✅ إدخال المدن (باستخدام IDs مباشرة)
    if (body.cities?.length > 0) {
      console.log("➡️ Linking cities:", body.cities);
      const citiesData = body.cities.map((cityId) => ({
        trip_id: trip.id,
        city_id: cityId,
      }));
      const { error: citiesError } = await supabase
        .from("trip_cities")
        .insert(citiesData);
      if (citiesError) throw citiesError;
      console.log("✅ Cities linked to trip");
    }

    // ✅ إدخال التصنيفات (باستخدام IDs مباشرة)
    if (body.categories?.length > 0) {
      console.log("➡️ Linking categories:", body.categories);
      const categoriesData = body.categories.map((catId) => ({
        trip_id: trip.id,
        category_id: catId,
      }));
      const { error: categoriesError } = await supabase
        .from("trip_categories")
        .insert(categoriesData);
      if (categoriesError) throw categoriesError;
      console.log("✅ Categories linked to trip");
    }

    // ✅ إدخال الأيام والأنشطة
    if (body.itinerary?.length > 0) {
      console.log("➡️ Inserting days:", body.itinerary);
      const daysData = body.itinerary.map((day, index) => ({
        trip_id: trip.id,
        day_number: day.day || index + 1,
      }));

      const { data: insertedDays, error: daysError } = await supabase
        .from("trip_days")
        .insert(daysData)
        .select();

      if (daysError) throw daysError;
      console.log("✅ Days inserted:", insertedDays);

      const activitiesData = [];
      insertedDays.forEach((dayRow, index) => {
        const activities = body.itinerary[index].activities || [];
        console.log(`➡️ Activities for day ${dayRow.day_number}:`, activities);
        activities.forEach((act) => {
          activitiesData.push({
            day_id: dayRow.id,
            time: act.time,
            activity_translations: act.activity || {
              en: act.en || null,
              es: act.es || null,
              fr: act.fr || null,
              de: act.de || null,
              it: act.it || null,
              zh: act.zh || null,
            },
          });
        });
      });

      console.log("📦 Final activities payload:", activitiesData);

      if (activitiesData.length > 0) {
        const { error: activitiesError } = await supabase
          .from("day_activities")
          .insert(activitiesData);
        if (activitiesError) throw activitiesError;
        console.log("✅ Activities inserted");
      }
    }

    return new Response(JSON.stringify({ success: true, trip }), {
      status: 201,
    });
  } catch (err) {
    console.error("❌ API Error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const { data: trips, error } = await supabase.from("trips").select(`
      id,
      title,
      description,
      price,
      currency,
      duration,
      duration_unit,
      priceLevel,
      cover_image,
      gallery_images,
      trip_cities (
        city_id,
        cities ( id, name )
      ),
      trip_categories (
        category_id,
        categories ( id, name )
      ),
      includes (
        id,
        include_translations
      ),
      trip_days (
        id,
        day_number,
        day_activities (
          id,
          time,
          activity_translations
        )
      ),
       reviews (
          id,
          user_id,
          trip_id,
          rating,
          comment,
          created_at
        )
    `);

    if (error) {
      console.error("Trips fetch error:", error);
      throw error;
    }

    return new Response(JSON.stringify({ success: true, trips }), {
      status: 200,
    });
  } catch (err) {
    console.error("GET /api/trips error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 },
    );
  }
}
