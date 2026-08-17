// proxy.ts (or src/proxy.ts)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl;

  const hostname = request.headers.get("host") || "";
  if (hostname === "info.zanidev.site" && url.pathname === "/") {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = "/about";

    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

// Configure the proxy to ignore static files and API routes to save compute
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
