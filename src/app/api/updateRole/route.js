import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";


export async function POST(req) {
  try {
    const { userId, newRole } = await req.json();

    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: { role: newRole },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, role: newRole }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
