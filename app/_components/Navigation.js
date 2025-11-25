// to get fresh data from Server and not from cache

import Link from "next/link";

import { auth } from "../_lib/auth";
import { getCartProducts, getProductsWithIds } from "../_lib/data-service";

import AccountMenu from "./AccountMenu";
import CartMenu from "./CartMenu";
import MenuToggle from "./MenuToggle";

async function Navigation() {

  const session = await auth();
  const cart = await getCartProducts(session?.user.userId)


  return (
    <nav className='flex justify-between items-center my-4 border-b border-gray-200 pb-2 px-4'>
      <div className="flex gap-12 items-center">
        <MenuToggle />
        <h3 className="font-medium text-gray-500 max-md2:font-bold max-md2:text-xl">Fashion is Here!</h3>
        <div className='flex justify-between gap-8 text-gray-500 max-md2:hidden'>
          <Link className='nav' href="/">Home</Link>
          <Link className='nav' href="/products/all">Collection</Link>
          <Link className='nav' href="/about">About</Link>
          <Link className='nav' href="/contact">Contact</Link>
        </div>
      </div>

      <div className='flex justify-between items-center gap-8 '>
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
