import Link from "next/link"
import { signOutAction } from "../_lib/actions"

function AccountPreview() {
  return (
    <>
      <div>
        <Link href="/account" className="category-link">Your Profile</Link>
      </div>
      <form action={signOutAction}>
        <button type="submit" className="category-link">Sign Out</button>

      </form>
    </>
  )
}

export default AccountPreview
