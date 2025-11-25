import { NextResponse } from "next/server";
import { auth } from "./app/_lib/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Redirect products -> products/all
  if(pathname === '/products') {
    return NextResponse.redirect(
      new URL('/products/all', request.url)
    )
  }

  // Protect account route
  if(pathname.startsWith("/account")) {
    const session = await auth();

    if(!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow everything else
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/products', 
    "/account/:path*"
  ]
}