"use client"

import { usePreviewState } from "./PreviewStateContext"

// to change between previews smoothly with one click and not letting overlays block the buttons
function ClientOverlay() {
  const { cartToggle, setCartToggle, profileToggle, setProfileToggle } = usePreviewState();

  return (
    <>
      {cartToggle && (
        <div className="fixed inset-0 z-20" onClick={() => setCartToggle(false)}></div>
      )}
      {profileToggle && (
        <div className="fixed inset-0 z-20" onClick={() => setProfileToggle(false)}></div>
      )}
    </>
  )
}

export default ClientOverlay