import { createClient } from '@/app/_lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    let next = searchParams.get('next') ?? '/profile';
    
    // Security: ensure 'next' is a relative URL
    if (!next.startsWith('/')) {
      next = '/profile';
    }

    if (code) {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      console.log('Exchange result:', { data, error });
      
      if (error) {
        console.error('Exchange error:', error);
        return NextResponse.redirect(`${origin}/auth/error?message=${error.message}`);
      }
      
      if (data?.session) {
        console.log('Session created successfully');
        return NextResponse.redirect(`${origin}${next}`);
      }
    }

    // No code provided
    return NextResponse.redirect(`${origin}/auth/error?message=No code provided`);
    
  } catch (error) {
    console.error('Callback route error:', error);
    return NextResponse.redirect(`${request.headers.get('origin') || 'http://localhost:3000'}/auth/error?message=${error.message}`);
  }
}