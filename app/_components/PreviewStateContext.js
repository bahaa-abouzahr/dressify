"use client"

import { createContext, useContext, useState } from "react"

const PreviewStateContext = createContext();

export function PreviewStateProvider({ children }) {
  const [profileToggle, setProfileToggle] = useState(false);
  const [cartToggle, setCartToggle] = useState(false);
  const [navigationToggle, setNavigationToggle] = useState(false);
  const [wishlistToggle, setWishlistToggle] = useState(false);
  const [openFilters, setOpenFilters] = useState(null);
  const [openCategory, setOpenCategory] = useState(null)

  function closeAll() {
    setProfileToggle(false);
    setCartToggle(false);
    setNavigationToggle(false);
    setWishlistToggle(false);
    setOpenFilters(false);
    setOpenCategory(false);
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
        openFilters,
        setOpenFilters,
        openCategory,
        setOpenCategory,
        closeAll
      }}>
      {children}
    </PreviewStateContext.Provider>
  )
}

export function usePreviewState() {
  return useContext(PreviewStateContext);
}