import Link from "next/link"
import { signOutAction } from "../_lib/actions"

function AccountPreview() {
  return (
    <>
      <div className="flex flex-col">
        <Link href="/account" className="category-link">Your Profile</Link>
        <Link href="/account/orders" className="category-link">Orders</Link>
      </div>
      <form action={signOutAction}>
        <button type="submit" className="category-link">Sign Out</button>
      </form>
    </>
  )
}

export default AccountPreview
