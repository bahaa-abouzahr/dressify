"use client"

import { useFormStatus } from "react-dom"

function UploadProductButton({ children}) {

  const { pending } = useFormStatus();
  
  return (
    <button 
      disabled={pending}
      className="text-end bg-(--cream-input) px-6 xs:py-3 py-2 hover:bg-(--cream-main) disabled:cursor-not-allowed cursor-pointer rounded-2xl">
      {pending ? "Uploading..." : children}
    </button>
  )
}

export default UploadProductButton
