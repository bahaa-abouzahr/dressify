"use client"

import { createContext, useContext, useState } from "react"

const PreviewStateContext = createContext();

export function PreviewStateProvider({ children }) {
  const [profileToggle, setProfileToggle] = useState(false);
  const [cartToggle, setCartToggle] = useState(false);
  const [navigationToggle, setNavigationToggle] = useState(false);
  const [wishlistToggle, setWishlistToggle] = useState(false);

  function closeAll() {
    setProfileToggle(false);
    setCartToggle(false);
    setNavigationToggle(false);
    setWishlistToggle(false);
  }

  return (
    <PreviewStateContext.Provider 
      value={{ 
        profileToggle, 
        setProfileToggle, 
        cartToggle, 
        setCartToggle, 
        navigationToggle, 
        setNavigationToggle,
        wishlistToggle,
        setWishlistToggle,
        closeAll
      }}>
      {children}
    </PreviewStateContext.Provider>
  )
}

export function usePreviewState() {
  return useContext(PreviewStateContext);
}