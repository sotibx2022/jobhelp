export const runtime = "nodejs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateUserToken } from "./app/functions/middlewareFunctions/validateUserToken";
export const config = {
  matcher: ["/login", "/register", "/reset", "/profile"],
};
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // Check if the path is an auth path
  const authPath = ["login", "register", "reset"].some((p) => path.includes(p));
  const restrictedPath = path.includes("profile");
  // Validate token
  const isTokenValid = validateUserToken(request);
  if (isTokenValid && authPath && path !== "/profile") {
    return NextResponse.redirect(new URL("/profile", request.url));
  } else if (!isTokenValid && restrictedPath && path !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    return NextResponse.next();
  }
}
