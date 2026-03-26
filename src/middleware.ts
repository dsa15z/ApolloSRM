import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret-change-me");
const AUTH_COOKIE = "apollo-auth";

const AUTH_ROUTES = ["/dashboard"];
const ADMIN_ROUTES = ["/admin"];
const GUEST_ONLY = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  let payload: { sub: string; role: string } | null = null;

  if (token) {
    try {
      const { payload: p } = await jwtVerify(token, SECRET);
      payload = p as { sub: string; role: string };
    } catch {
      // Invalid/expired token
    }
  }

  const { pathname } = request.nextUrl;

  // Redirect logged-in users away from login/register
  if (payload && GUEST_ONLY.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Auth-required routes
  if (AUTH_ROUTES.some((r) => pathname.startsWith(r)) && !payload) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin routes
  if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!payload) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (payload.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login", "/register"],
};
