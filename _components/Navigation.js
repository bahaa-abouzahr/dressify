import Image from "next/image"
import Link from "next/link"

import { BsCart3 } from "react-icons/bs"
import { auth } from "../_lib/auth"
import Preview from "./Preview";
import AccountPreview from "./AccountPreview";
import CartPreview from "./CartPreview";

async function Navigation() {
  const session = await auth();

  return (
    <nav className='flex justify-between items-center my-4 border-b border-gray-200 pb-2'>
          <div className="flex gap-12">
            <h3 className="font-medium text-gray-500">Fashion is Here!</h3>
            <div className='flex justify-between gap-8 md:gap-6 text-gray-500'>
              <Link className='nav' href="/">Home</Link>
              <Link className='nav' href="/products/all">Collection</Link>
              <Link className='nav' href="/about">About</Link>
              <Link className='nav' href="/contact">Contact</Link>
            </div>
          </div>

          <div className='flex justify-between items-center gap-8 '>
            <div className="relative group">

              <Link href="/cart" className='transition-transform duration-300 hover:scale-140 text-gray-500'>
                <BsCart3 />
              </Link>
              <Preview width={40}>
                <CartPreview />
              </Preview>
            </div>

            {session?.user?.image ? (
              <div className="relative group">
                <Link 
                  href="/"
                >
                  <Image 
                    src={session.user.image} 
                    width={30}
                    height={30}
                    alt={session.user.name}
                    className='hover:border-[1.5px] hover:scale-120 rounded-full border-[var(--orange-secondary)]'
                    referrerPolicy="no-referrer"
                    />
                </Link>
                <Preview width={20}>
                  <AccountPreview />
                </Preview>
              </div>
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
