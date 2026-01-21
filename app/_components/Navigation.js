// to get fresh data from Server and not from cache

import Link from "next/link";

import { getCartProducts, getWishlist } from "@/app/_lib/data-service";

import AccountMenu from "./AccountMenu";
import CartMenu from "./CartMenu";
import MenuToggle from "./MenuToggle";
import WishlistMenu from "./WishlistMenu";

import { createClient } from '@/app/_lib/supabase/server';

async function Navigation() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;
  const cart = user ? await getCartProducts(userId) : []

  let wishlist;
  if(user) wishlist = await getWishlist(userId);

  return (
    <nav className='flex justify-between items-center border-b border-gray-200 px-4 max-md2:sticky max-md2:top-0 max-md2:z-100 max-md2:bg-(--cream-secondary) h-16 '>
      <div className="flex gap-12 items-center max-md2:gap-6">
        <MenuToggle />
        <h3 id="logo" className="font-medium text-(--gray-text) max-md2:font-bold max-md2:text-md text-3xl">Dressify</h3>
        <div className='flex justify-between gap-8 text-(--gray-text) max-md2:hidden text-lg'>
          <Link className='nav' href="/">Home</Link>
          <Link className='nav' href="/products/all">Collection</Link>
          <Link className='nav' href="/about">About</Link>
        </div>
      </div>

      <div className='flex justify-between items-center gap-8 '>

        {user && <WishlistMenu userId={userId} wishlist={wishlist} />}

        <CartMenu userId={userId} dbCart={cart} />Ö

        <AccountMenu user={user} />
        
      </div>

    </nav>
  )
}

export default Navigation
