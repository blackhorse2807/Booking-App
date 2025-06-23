import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check for authentication token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Public routes that don't require authentication
  const publicRoutes = ["/login", "/signup"];
  
  // Protected routes that require authentication
  const protectedRoutes = ["/home", "/placeorder", "/booking-overview"];
  const dynamicRoutePattern = /^\/details\/\d+$/;
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route)) || dynamicRoutePattern.test(pathname);

  // If user is not authenticated and tries to access protected route
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If user is authenticated and tries to access login/signup
  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // If user is not authenticated and tries to access root
  if (!token && pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If user is authenticated and tries to access root
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/ (API routes)
     * 2. /_next/ (Next.js internals)
     * 3. /favicon.ico (favicon file)
     * 4. /static (public static files)
     * 5. all files in the public folder
     */
    "/((?!api|_next|favicon.ico|static|public).*)",
  ],
};
