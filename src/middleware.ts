import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { toast } from "sonner";

const publicPaths = ["/sign-in", "/sign-up"];
const authPaths = ["/auth/signin"];

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("authjs.session-token")?.value;
  const currentPath = req.nextUrl.pathname;
  // console.log(sessionToken);

  let isAuthenticated = false;
  if (sessionToken) {
    try {
      const decodedToken = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
      });
      // console.log(decodedToken);
      isAuthenticated = !!decodedToken;
    } catch (error) {
      toast.error("Failed to decode session token.");
      console.error("Failed to decode session token:", error);
    }
  }

  // console.log(isAuthenticated);

  if (!publicPaths.includes(currentPath)) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  if (isAuthenticated && authPaths.includes(currentPath)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    {
      source:
        "/((?!api|webhook|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp3)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
