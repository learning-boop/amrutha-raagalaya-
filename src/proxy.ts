import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt, SESSION_COOKIE } from "@/lib/session-token";

/**
 * Optimistic gate for the admin area — it keeps signed-out visitors from ever
 * reaching an admin route. The authoritative check still happens in
 * `requireAdmin()` inside each page and Server Action.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const session = await decrypt(request.cookies.get(SESSION_COOKIE)?.value);

  if (!session && !isLogin) {
    const url = new URL("/admin/login", request.url);
    if (pathname !== "/admin") url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (session && isLogin) return NextResponse.redirect(new URL("/admin", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
