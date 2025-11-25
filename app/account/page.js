import SyncGuest from "../_components/SyncGuest";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Settings",
};

async function page() {
  const session = await auth();
  if(!session) return;
  
  return (
    <div>
      Signed In
      <SyncGuest session={session} />
    </div>
  )
}

export default page

/*
'use client';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/context/cart';
import { syncCartOnSignIn } from '@/actions';

export default function AccountPage() {
  const { cart, setCart } = useCart();

  useEffect(() => {
    async function syncOnce() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const mergedCart = await syncCartOnSignIn(session.user.id, cart);
      setCart(mergedCart);
    }

    syncOnce();
  }, []); // empty deps → runs only once after page load
}
  */