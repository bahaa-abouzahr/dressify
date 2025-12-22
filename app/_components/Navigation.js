// to get fresh data from Server and not from cache

import Link from "next/link";

import { auth } from "../_lib/auth";
import { getCartProducts, getProductsWithIds, getWishlist } from "../_lib/data-service";

import AccountMenu from "./AccountMenu";
import CartMenu from "./CartMenu";
import MenuToggle from "./MenuToggle";
import WishlistMenu from "./WishlistMenu";
import { WishlistProvider } from "./WishlistContext";

async function Navigation() {

  const session = await auth();
  const cart = await getCartProducts(session?.user.userId)
  let wishlist;
  if(session) wishlist = await getWishlist(session);

  return (
    <nav className='flex justify-between items-center border-b border-gray-200 px-4 max-md2:sticky max-md2:top-0 max-md2:z-100 max-md2:bg-(--cream-secondary) h-16 '>
      <div className="flex gap-12 items-center max-md2:gap-6">
        <MenuToggle />
        <h3 className="font-medium text-gray-500 max-md2:font-bold max-md2:text-md">Fashion is Here!</h3>
        <div className='flex justify-between gap-8 text-gray-500 max-md2:hidden'>
          <Link className='nav' href="/">Home</Link>
          <Link className='nav' href="/products/all">Collection</Link>
          <Link className='nav' href="/about">About</Link>
          <Link className='nav' href="/contact">Contact</Link>
        </div>
      </div>

      <div className='flex justify-between items-center gap-8 '>

        {session && <WishlistMenu session={session} wishlist={wishlist} />}


        <CartMenu session={session} dbCart={cart} />

        {session?.user?.image ? (
          <AccountMenu session={session} />
        ) :
          <Link 
            className="nav text-gray-500"
            href="/api/auth/signin"
          >
            Login
          </Link>
          }
      </div>

    </nav>
  )
}

export default Navigation
