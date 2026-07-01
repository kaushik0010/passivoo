import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define our route categories
const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/"];

// Define routes that require authentication
// We use prefixes so "/collections/123" is automatically protected
const PROTECTED_ROUTE_PREFIXES = [
  "/drops",
  "/collections",
  "/profile",
  "/store"
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check if the current route matches any protected prefix
  const isProtectedRoute = PROTECTED_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // If it's not a protected route, auth route, or the homepage, just let it pass
  if (!isProtectedRoute && !isAuthRoute && !isPublicRoute) {
    return NextResponse.next();
  }

  // 2. Fetch the session from Better Auth securely at the edge
  // We pass the cookie header exactly as it came from the client
  let session = null;
  try {
    const response = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      // Better Auth returns { session: {...}, user: {...} } if authenticated
      session = data?.session || null;
    }
  } catch (error) {
    console.error("Middleware session fetch error:", error);
  }

  const isAuthenticated = !!session;

  // 3. LOGIC: Authenticated users should not see auth pages or the marketing homepage
  if (isAuthenticated && (isAuthRoute || isPublicRoute)) {
    return NextResponse.redirect(new URL("/drops", request.url));
  }

  // 4. LOGIC: Unauthenticated users trying to access protected vaults
  if (!isAuthenticated && isProtectedRoute) {
    // Optional: Save the original URL they tried to visit so you can redirect them back after registration
    const redirectUrl = new URL("/register", request.url);
    redirectUrl.searchParams.set("callbackUrl", pathname);
    
    return NextResponse.redirect(redirectUrl);
  }

  // Allow the request to proceed if no redirect conditions were met
  return NextResponse.next();
}

// 5. THE EXCLUSION MATCHER
// This ensures middleware NEVER runs on static files, images, or API routes.
// It saves server costs and prevents infinite redirect loops.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes and Webhooks)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt / sitemap.xml (SEO files)
     * - .*\.(png|jpg|jpeg|svg|webp)$ (direct image asset requests)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|svg|webp)$).*)",
  ],
};