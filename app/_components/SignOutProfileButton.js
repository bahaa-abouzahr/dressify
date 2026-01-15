import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline"


function SignOutProfileButton() {
  return (
      <button type="submit" className="flex gap-3 hover:text-(--hover-buttons-text) transition-colors ">
        <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
        <span className="hidden md2:block">Sign Out</span>
      </button>

  )
}

export default SignOutProfileButton
