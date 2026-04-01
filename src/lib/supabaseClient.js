// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// القيم من ملف .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ✅ Frontend client (للاستخدام في المتصفح)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ✅ Admin client (للاستخدام في الـ backend فقط)
export const supabaseAdmin = () => {
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseServiceRoleKey) {
    throw new Error("Supabase service role key is required.");
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey);
};
