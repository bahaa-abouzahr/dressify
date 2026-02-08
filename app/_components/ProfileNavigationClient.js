"use client"

import { usePathname } from "next/navigation"
import Link from "next/link";

import SignOutProfileButton from "./SignOutProfileButton";
import AccountNavItem from "./AccountNavItem";
import SignOutComponent from "./SignOutComponent";

import { UserIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { RiAdminLine } from "react-icons/ri";

const navLinks = [
  {
    name: 'Profile',
    href: '/profile',
    icon: <UserIcon className='h-5 w-5' />,
  },
  
  {
    name: 'Orders History',
    href: '/profile/orders',
    icon: <ShoppingBagIcon className='h-5 w-5' />,
  },
  
  {
    name: 'Wishlist',
    href: '/profile/wishlist',
    icon: <HeartIcon className="h-5 w-5" />
  },
]

function ProfileNavigationClient({isAdmin}) {
  const pathName = usePathname();

  return (
    <nav>
      <ul className="flex flex-col gap-4 font-semibold w-full px-2 ">
        {navLinks.map((link) => (
          <AccountNavItem key={link.name} pathName={pathName} href={link.href} >
            <Link 
              href={link.href}
              className={`group flex gap-3 hover:text-(--hover-buttons-text) `}
            >
              {link.icon}
              <span className="hidden md2:block">{link.name}</span>
            </Link>
          </AccountNavItem>
        ))}

        {isAdmin && 
          <AccountNavItem>
            <Link 
              href="/profile/admin"
              className={`group flex gap-3 hover:text-(--hover-buttons-text) `}
            >
              <RiAdminLine />
              <span className="hidden md2:block">Admin</span>
            </Link>

          </AccountNavItem>
        }

        <AccountNavItem>
          <SignOutComponent>
            <SignOutProfileButton />
          </SignOutComponent>
        </AccountNavItem>

      </ul>
    </nav>
  )
}

export default ProfileNavigationClient
