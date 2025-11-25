"use client"

import Link from "next/link";
import { useState } from "react";
import { IoClose, IoMenuSharp } from "react-icons/io5";
import { usePreviewState } from "./PreviewStateContext";

function MenuToggle() {
  const {navigationToggle, setNavigationToggle, setCartToggle, setProfileToggle} = usePreviewState();

  function handleHamburger() {
    setNavigationToggle(true);
    setCartToggle(false);
    setProfileToggle(false);
  }

  return (
    <div className="relative md2:hidden h-full">
      {/* Toggle Button (hamburger) */}
      <button
        onClick={() => handleHamburger(true)}
        className="text-gray-600 z-40 relative"
      >
        <IoMenuSharp className="size-8" />
      </button>

      {navigationToggle && (
        <>
          {/* Background blur */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60"
            onClick={() => setNavigationToggle(false)}
          >
          </div>

          {/* Side Menu */}
          <div className="fixed top-0 left-0 z-70 h-full w-[40%] bg-white shadow-lg p-8 ">
            {/* Close Button */}
            <button
              onClick={() => setNavigationToggle(false)}
              className="self-start mb-8 text-gray-600"
              aria-label="Close menu"
            >
              <IoClose className="size-8" />
            </button>
            <nav className="flex flex-col gap-6 text-lg font-semibold">
              <Link onClick={() => setNavigationToggle(false)} className='' href="/">Home</Link>
              <Link onClick={() => setNavigationToggle(false)} className='' href="/products/all">Collection</Link>
              <Link onClick={() => setNavigationToggle(false)} className='' href="/about">About</Link>
              <Link onClick={() => setNavigationToggle(false)} className='' href="/contact">Contact</Link>

            </nav>
  
          </div>
        
        </>

      )}

    </div>
  )
}

export default MenuToggle
