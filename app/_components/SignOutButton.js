import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { signOutAction } from "../_lib/actions"


function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="flex gap-3 hover:text-[var(--hover-buttons-text)] transition-colors ">
        <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
        <span className="hidden md2:block">Sign Out</span>
      </button>
    </form>
  )
}

export default SignOutButton
