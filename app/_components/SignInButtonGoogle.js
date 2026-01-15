"use client"

import Image from "next/image"
import { createClient } from '@/app/_lib/supabase/client';

function SignInButtonGoogle() {
  const supabase = createClient();

  async function signInGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/profile`
      },
    })
  }
  
  return (
        <button 
          onClick={signInGoogle}
          className="border px-5 py-2 rounded-2xl flex items-center gap-2 text-xs font-medium cursor-pointer"
        >
          <Image
            src='https://authjs.dev/img/providers/google.svg'
            alt="Google Logo"
            height="15"
            width="15"
            className="border-black rounded-full"
          />

          <span>Continue with Google</span>
        </button>
  )
}

export default SignInButtonGoogle
