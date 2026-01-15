"use client"

import Image from "next/image"

import { useRouter } from "next/navigation"
import AccountPreview from "./AccountPreview"
import Preview from "./Preview"
import { usePreviewState } from "./PreviewStateContext"

import { RxAvatar } from "react-icons/rx"

function AccountMenu({ user }) {
  const { profileToggle, setProfileToggle, setNavigationToggle, setCartToggle, setWishlistToggle } = usePreviewState();
  const avatar = user.user_metadata.avatar_url;
  // const navigate = useNavigate(); // React Router
  const router = useRouter(); // App Router

  function toggleOpen() {
    setProfileToggle(!profileToggle)
    setCartToggle(false);
    setNavigationToggle(false);
    setWishlistToggle(false);
  }
  
  return (
    <div className="relative z-30 flex">
      <button onClick={() => toggleOpen()}>
        {avatar ? 
          <Image 
            src={user.user_metadata.avatar_url} 
            width={30}
            height={30}
            alt={user.user_metadata.full_name}
            onDoubleClick={() => router.push('/profile')}
            className='hover:border-[1.5px] hover:scale-120 rounded-full border-(--orange-secondary)'
            referrerPolicy="no-referrer"
          />
          : 
          <div className="transition-transform duration-300 hover:scale-140 text-(--gray-text) z-30 text-xl">
            <RxAvatar />
          </div>
        }
      </button>
      {profileToggle && 
        <div className="absolute top-full mt-1 z-50"> 
          <Preview width={5} zIndex={60}>
            <AccountPreview />
          </Preview>
        </div>
      }
    </div>
  )
}

export default AccountMenu
