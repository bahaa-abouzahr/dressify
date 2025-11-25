"use client"

import { createContext, useContext, useState } from "react"

const PreviewStateContext = createContext();

export function PreviewStateProvider({ children }) {
  const [profileToggle, setProfileToggle] = useState(false);
  const [cartToggle, setCartToggle] = useState(false);
  const [navigationToggle, setNavigationToggle] = useState(false);

  return (
    <PreviewStateContext.Provider 
      value={{ 
        profileToggle, 
        setProfileToggle, 
        cartToggle, 
        setCartToggle, 
        navigationToggle, 
        setNavigationToggle,
      }}>
      {children}
    </PreviewStateContext.Provider>
  )
}

export function usePreviewState() {
  return useContext(PreviewStateContext);
}