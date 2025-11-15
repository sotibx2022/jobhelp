export const runtime = "nodejs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateUserToken } from "./app/functions/middlewareFunctions/validateUserToken";
export const config = {
  matcher: ["/login", "/register", "/reset", "/profile"],
};
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // Define exact auth paths and restricted paths
  const authPaths = ["/login", "/register", "/reset"];
  const restrictedPaths = ["/profile"];
  // Validate token
  const isTokenValid = validateUserToken(request);
  // If user is logged in and trying to access auth pages, redirect to profile
  if (isTokenValid && authPaths.includes(path)) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
  // If user is NOT logged in and trying to access restricted pages, redirect to login
  if (!isTokenValid && restrictedPaths.some((p) => path.startsWith(p))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Otherwise, continue as normal
  return NextResponse.next();
}
