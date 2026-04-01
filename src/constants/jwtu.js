import { cookies } from "next/headers";
import { vrefyTokenForPage } from "@/lib/utils/veryfyToken";

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwttoken")?.value;
  return await vrefyTokenForPage(token);
}
