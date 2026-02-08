import { NextResponse } from "next/server";
import { createServerClient } from '@supabase/ssr';

export async function proxy(request) {
  const { pathname } = request.nextUrl
  
  // Create a response object
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  
  // Redirect products -> products/all
  if(pathname === '/products') {
    return NextResponse.redirect(new URL('/products/all', request.url))
  }

  // Redirect logged-in users away from login/Registration page
  if (pathname.startsWith("/account")) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_KEY,
      {
        cookies: {
          get: (name) => request.cookies.get(name)?.value,
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }

    return response;
  }
  
  // Protect /profile route
  const isProtected =
    pathname.startsWith("/profile") || pathname.startsWith("/checkout");

  if (isProtected) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_KEY,
      {
        cookies: {
          get(name) {
            return request.cookies.get(name)?.value;
          },
          set(name, value, options) {
            request.cookies.set({
              name,
              value,
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name, options) {
            request.cookies.set({
              name,
              value: '',
              ...options,
            });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({
              name,
              value: '',
              ...options,
            });
          },
        },
      }
    );

    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.redirect(new URL('/account/login', request.url));
    }
  }

  // Allow everything else
  return response;
}

export const config = {
  matcher: [
    '/products', 
    "/profile/:path*",
    '/checkout',
    '/account/:path'
  ]
}
