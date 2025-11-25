"use client"

import Link from "next/link";
import { useState } from "react";
import { IoClose, IoMenuSharp } from "react-icons/io5";

function MenuToggle() {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <div className="relative md2:hidden h-full">
      {/* Toggle Button (hamburger) */}
      <button
        onClick={() => setMenuActive(true)}
        className="text-gray-600 z-30 relative"
      >
        <IoMenuSharp className="size-8" />
      </button>

      {menuActive && (
        <>
          {/* Background blur */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20"
            onClick={() => setMenuActive(false)}
          >
          </div>

          {/* Side Menu */}
          <div className="fixed top-0 left-0 z-30 h-full w-[50%] bg-white shadow-lg p-8 ">
            {/* Close Button */}
            <button
              onClick={() => setMenuActive(false)}
              className="self-start mb-8 text-gray-600"
              aria-label="Close menu"
            >
              <IoClose className="size-8" />
            </button>
            <nav className="flex flex-col gap-6 text-lg font-semibold">
              <Link onClick={() => setMenuActive(false)} className='' href="/">Home</Link>
              <Link onClick={() => setMenuActive(false)} className='' href="/products/all">Collection</Link>
              <Link onClick={() => setMenuActive(false)} className='' href="/about">About</Link>
              <Link onClick={() => setMenuActive(false)} className='' href="/contact">Contact</Link>

            </nav>
  
          </div>
        
        </>

      )}

    </div>
  )
}

export default MenuToggle
