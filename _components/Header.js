import Image from "next/image"
import Link from "next/link"

import { BsCart3 } from "react-icons/bs"
import avatar from "@/public/image-avatar.png"

function Header() {
  return (
    <header className='flex justify-between my-4 border-b border-gray-200 pb-2'>
          <div className="flex gap-12">
            <h3 className="font-medium text-gray-500">Fashion is Here!</h3>
            <div className='flex justify-between gap-8 md:gap-6 text-gray-500'>
              <Link className='nav' href="/">Home</Link>
              <Link className='nav' href="/products">Collection</Link>
              <Link className='nav' href="/about">About</Link>
              <Link className='nav' href="/contact">Contact</Link>
            </div>
          </div>

          <div className='flex justify-between items-center gap-8 '>
            <button className='transition-transform duration-300 hover:scale-140'>
              <BsCart3 />
            </button>
            <button>
              <Image 
                src={avatar} 
                width={30}
                height={30}
                alt="avatar"
                className='hover:border-[1.5px] hover:scale-120 rounded-full border-[var(--orange-secondary)]'
              />
            </button>
          </div>

        </header>
  )
}

export default Header
