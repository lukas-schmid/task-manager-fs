import { NextRequest, NextResponse } from "next/server";
import { decryptSession } from "@/lib/session";
import { logout } from "@/actions/auth";

const protectedRoutes = ["/boards"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );
  const isPublicRoute =
    publicRoutes.some((route) => path.startsWith(route)) || path === "/";

  const jwtToken = await decryptSession("accessToken");

  // Redirect to home if user is not authenticated
  if (isProtectedRoute && !jwtToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Redirect to boards if the user is authenticated
  if (
    isPublicRoute &&
    jwtToken &&
    !req.nextUrl.pathname.startsWith("/boards")
  ) {
    return NextResponse.redirect(new URL("/boards", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
