import { createClient } from '@/app/_lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next') ?? '/account/update-password';

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error) {
      // Redirect to password update page with session established
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // Redirect to error page
  return NextResponse.redirect(new URL('/auth/error', request.url));
}
