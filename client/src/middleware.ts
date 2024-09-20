import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/session";

const protectedRoutes = ["/boards"];
const publicRoutes = ["/login", "/register", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get("accessToken")?.value;
  const jwtToken = await decrypt(cookie);

  // Redirect to home if user is not authenticated
  if (isProtectedRoute && !jwtToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 6. Redirect to boards if the user is authenticated
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
