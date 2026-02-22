"use client"

import { usePreviewState } from "./PreviewStateContext"

// to close all previews when click on the background
function ClientOverlay() {
  const { cartToggle, profileToggle, wishlistToggle, openFilters, openCategory, closeAll } = usePreviewState();

  return (
    <>
      {(cartToggle || profileToggle || wishlistToggle || openFilters || openCategory) && (
        <div className="fixed inset-0 z-20" onClick={closeAll} />
      )}
    </>
  )
}

export default ClientOverlay