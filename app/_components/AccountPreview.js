import Link from "next/link";
import { signOutAction } from "../_lib/actions";
import { useCart } from "./CartContext";


function AccountPreview() {
  const { setCart } = useCart();

  function handleSignOut() {
    setCart([]);
  }


  return (
    <>
      <div className="flex flex-col gap-1">
        <Link href="/account" className="category-link">Your Profile</Link>
        <Link href="/account/orders" className="category-link">Orders</Link>

        <form action={signOutAction}>
          <button type="submit" onClick={() => handleSignOut()} className="category-link">Sign Out</button>
        </form>
      </div>
    </>
  )
}

export default AccountPreview
