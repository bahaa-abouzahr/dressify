"use client"

import { usePathname } from "next/navigation"

import { UserIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import AccountNavItem from "./AccountNavItem";

const navLinks = [
  {
    name: 'Profile',
    href: '/account',
    icon: <UserIcon className='h-5 w-5' />,
  },
  
  {
    name: 'Orders History',
    href: '/account/orders',
    icon: <ShoppingBagIcon className='h-5 w-5' />,
  },
  
  {
    name: 'Whishlist',
    href: '/account/wishlist',
    icon: <HeartIcon className="h-5 w-5" />
  },
]

function ProfileNavigation() {
  const pathName = usePathname();

  return (
    <nav>
      <ul className="flex flex-col gap-4 font-semibold w-full px-2 ">
        {navLinks.map((link) => (
          <AccountNavItem key={link.name} pathName={pathName} href={link.href} >
            <Link 
              href={link.href}
              className={`group flex gap-3 hover:text-[var(--hover-buttons-text)] `}
            >
              {link.icon}
              <span className="hidden md2:block">{link.name}</span>
            </Link>
          </AccountNavItem>
        ))}

        <AccountNavItem>
          <SignOutButton />
        </AccountNavItem>

      </ul>
    </nav>
  )
}

export default ProfileNavigation
