import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { publicPaths_Client } from "./lib/utils";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (
    !sessionCookie &&
    !publicPaths_Client.some((e) => e === request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
