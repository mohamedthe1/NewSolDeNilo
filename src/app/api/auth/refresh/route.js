// // src/api/auth/refresh/route.ts
// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { refresh } from "@/services/auth.service";
// import { setSessionCookies } from "@/lib/Cookies";
// import { signAppJwt } from "@/lib/AppJWT";

// export async function POST() {
//   try {
//     const rt = cookies().get("sb_refresh")?.value;
//     if (!rt) return NextResponse.json({ ok: false }, { status: 401 });

//     const { session, user } = await refresh(rt);
//     setSessionCookies(session.access_token, session.refresh_token);

//     const appJwt = signAppJwt({ sub: user.id, email: user.email, name: user.user_metadata?.name });
//     const res = NextResponse.json({ ok: true });
//     res.cookies.set("app_jwt", appJwt, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 15 });
//     return res;
//   } catch {
//     return NextResponse.json({ ok: false }, { status: 401 });
//   }
// }
