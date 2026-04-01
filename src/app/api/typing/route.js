import { NextResponse } from "next/server";

let typingStatus = {}; // تخزين مؤقت في الذاكرة

export async function POST(req) {
  const { userId, isTyping, adminTyping } = await req.json();
  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  // تحديث حالة الكتابة للمستخدم أو الأدمن
  typingStatus[userId] = {
    isTyping: isTyping ?? typingStatus[userId]?.isTyping ?? false,
    adminTyping: adminTyping ?? typingStatus[userId]?.adminTyping ?? false,
  };

  return NextResponse.json({ success: true, userId, ...typingStatus[userId] });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  return NextResponse.json({ userId, ...typingStatus[userId] });
}
