import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// For debugging purposes
const logWithTimestamp = (message: string, data?: unknown) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`, data ? data : '');
};

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

  logWithTimestamp(`Middleware processing: ${pathname}`);

  try {
    // Check for authentication token
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET || "your-fallback-secret-key",
    });

    logWithTimestamp(`Auth token:`, token ? 'Present' : 'Not present');

    // Define public and protected routes
    const publicRoutes = ["/login", "/signup"];
    const protectedRoutes = ["/home", "/placeorder", "/booking-overview", "/details"];
    
    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route)) || 
                            /^\/details\/\d+$/.test(pathname);
    
    // Check if the current path is a public route
    const isPublicRoute = publicRoutes.some(route => pathname === route);
    
    logWithTimestamp(`Path: ${pathname}, Protected: ${isProtectedRoute}, Public: ${isPublicRoute}`);

    // Handle RSC (React Server Component) requests differently
    if (pathname.includes('_rsc')) {
      logWithTimestamp('RSC request detected, allowing through');
      return NextResponse.next();
    }

    // If user is not authenticated and tries to access protected route
    if (!token && isProtectedRoute) {
      logWithTimestamp(`Redirecting unauthenticated user from ${pathname} to /login`);
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If user is authenticated and tries to access login/signup
    if (token && isPublicRoute) {
      logWithTimestamp(`Redirecting authenticated user from ${pathname} to /home`);
      return NextResponse.redirect(new URL("/home", req.url));
    }

    // If user is not authenticated and tries to access root
    if (!token && pathname === "/") {
      logWithTimestamp(`Redirecting unauthenticated user from root to /login`);
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If user is authenticated and tries to access root
    if (token && pathname === "/") {
      logWithTimestamp(`Redirecting authenticated user from root to /home`);
      return NextResponse.redirect(new URL("/home", req.url));
    }

    logWithTimestamp(`Allowing access to ${pathname}`);
    return NextResponse.next();
  } catch (error) {
    logWithTimestamp(`Middleware error:`, error);
    // In case of error, allow the request to proceed
    return NextResponse.next();
  }
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
