// file: app/api/cities/route.js
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("cities")
      .select(`id, name, images`)
      .order("id", { ascending: true }); // الترتيب حسب id أو أي عمود ثابت

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, cities: data }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
    });
  }
}
