"use client"

import { usePreviewState } from "./PreviewStateContext"

// to close all previews when click on the background
function ClientOverlay() {
  const { cartToggle, profileToggle, wishlistToggle, openKey, closeAll } = usePreviewState();

  return (
    <>
      {(cartToggle || profileToggle || wishlistToggle || openKey) && (
        <div className="fixed inset-0 z-20" onClick={closeAll} />
      )}
    </>
  )
}

export default ClientOverlay