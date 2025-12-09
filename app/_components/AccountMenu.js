"use client"

import Image from "next/image"
import { useState } from "react"

import AccountPreview from "./AccountPreview"
import Preview from "./Preview"
import { usePreviewState } from "./PreviewStateContext"
import { useRouter } from "next/navigation"

// import { useNavigate } from "react-router-dom"

function AccountMenu({ session }) {
  const { profileToggle, setProfileToggle, setNavigationToggle, setCartToggle, setWishlistToggle } = usePreviewState();

  // const navigate = useNavigate(); // React Router
  const router = useRouter(); // App Router

  function toggleOpen() {
    setProfileToggle(!profileToggle)
    setCartToggle(false);
    setNavigationToggle(false);
    setWishlistToggle(false);
  }
  
  return (
    <div className="relative z-30">
      <button onClick={() => toggleOpen()}>
        <Image 
          src={session.user.image} 
          width={30}
          height={30}
          alt={session.user.name}
          onDoubleClick={() => router.push('/account')}
          className='hover:border-[1.5px] hover:scale-120 rounded-full border-[var(--orange-secondary)]'
          referrerPolicy="no-referrer"
        />
      </button>
      {profileToggle && 
        <>
          { /* To close when clicking elswhere than the Menu */}
          {/* <div className="fixed inset-0 z-10" onClick={() => setProfileToggle(false)}></div> */}

          <div className="max-md2:fixed absolute z-50">
            
            <Preview width={5} zIndex={60}>
              <AccountPreview />
            </Preview>
          </div>
        </>

      }
    </div>
  )
}

export default AccountMenu
