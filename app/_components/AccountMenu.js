"use client"

import Image from "next/image"

import { useRouter } from "next/navigation"
import AccountPreview from "./AccountPreview"
import Preview from "./Preview"
import { usePreviewState } from "./PreviewStateContext"

import { RxAvatar } from "react-icons/rx"
import { getAvatar } from "../_lib/data-service"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

function AccountMenu({ user, is_admin }) {
  const { profileToggle, setProfileToggle, setNavigationToggle, setCartToggle, setWishlistToggle } = usePreviewState();
  const [avatar, setAvatar] = useState("");
 
  const router = useRouter(); // App Router

  function toggleOpen() {
    setProfileToggle(!profileToggle)
    setCartToggle(false);
    setNavigationToggle(false);
    setWishlistToggle(false);
  }

useEffect(() => {
  if(!user) return; // guard not to load avatar if not logged in

  async function loadAvatar() {
    const image = await getAvatar(user?.id);

    if (image) setAvatar(image);
    else if (user.user_metadata?.avatar_url)
      setAvatar(user.user_metadata.avatar_url);
  }
  loadAvatar();
}, [user]);

if(!user) 
  return (
    <Link 
      className="nav text-gray-500 z-30"
      href="/account/login"
      onClick={toggleOpen}
    >
      Login
    </Link>
)

  return (
    <div className="relative z-30 flex">
      <button onClick={() => toggleOpen()}>
        {avatar ? 
          <Image 
            src={`${avatar}?v=${Date.now()}`} 
            width={100}
            height={100}
            alt={user.user_metadata.full_name}
            onDoubleClick={() => router.push('/profile')}
            className='hover:border-[1.5px] hover:scale-120 rounded-full border-(--orange-secondary) w-8 h-8'
            referrerPolicy="no-referrer"
          />
          : 
          <div className="transition-transform duration-300 hover:scale-140 text-(--gray-text) z-30 text-xl">
            <RxAvatar />
          </div>
        }
      </button>
      {profileToggle && 
        <div className="absolute top-full right-8 mt-1 z-50"> 
          <Preview width={6} zIndex={60}>
            <AccountPreview is_admin={is_admin} />
          </Preview>
        </div>
      }
    </div>
  )
}

export default AccountMenu
