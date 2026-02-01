import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

const PROTECTED_PATHS = [
  "/dashboard(.*)",
  "/dashboard",
  "/dashboard/reviews",
  "/dashboard/repositories",
  "/dashboard/settings",
  "/"
];

const AUTH_PATHS = ["/sign-in"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isProtectedPath = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const isAuthPath = AUTH_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const isAuthenticated = !!session;

  if (isProtectedPath && !isAuthenticated) {
    const url = new URL("/sign-in", request.url);
    return NextResponse.redirect(url);
  }

  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
