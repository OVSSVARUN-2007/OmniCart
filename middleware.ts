import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { securityHeaders } from "@/lib/security";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  for (const header of securityHeaders) {
    response.headers.set(header.key, header.value);
  }

  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "img-src 'self' https: data: blob:",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "connect-src 'self' https://fakestoreapi.com https://dummyjson.com https://login.microsoftonline.com https://accounts.google.com"
    ].join("; ")
  );

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
