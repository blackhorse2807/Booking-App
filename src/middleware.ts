import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for NextAuth routes and static files
  if (
    pathname.startsWith("/api/auth") || 
    pathname.startsWith("/") ||
    pathname === "/" ||
    pathname.startsWith("/_next") || 
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // Check for authentication token
  const token = await getToken({
    req,
    secret: "YQrhB4iVXsWkfYmdkCFq80JKEmPOfeN0JCipfa9DFMg=", // Use your secure secret
  });

  console.log("Middleware Token:", token); 

  const protectedRoutes = ["/placeorder", "/booking-overview"];
  const dynamicRoutePattern = /^\/details\/\d+$/;


  if (!token && (protectedRoutes.some(route => pathname.startsWith(route)) || dynamicRoutePattern.test(pathname))) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
    matcher: ["/home", "/placeorder", "/booking-overview", "/details/:id*"], 
  };
