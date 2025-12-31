import Link from "next/link";
import { signOutAction } from "../_lib/actions";
import { useCart } from "./CartContext";
import { usePreviewState } from "./PreviewStateContext";


function AccountPreview() {
  const { setCart } = useCart();
  const {setProfileToggle} = usePreviewState();

  function handleSignOut() {
    setCart([]);
  }

  function handleCloseToggle() {
    setProfileToggle(false)
  }


  return (
    <>
      <div className="flex flex-col gap-1">
        <Link href="/account" className="category-link" onClick={() => handleCloseToggle()}>Your Profile</Link>
        <Link href="/account/orders" className="category-link" onClick={() => handleCloseToggle()}>Orders</Link>
        <Link href="/account/wishlist" className="category-link" onClick={() => handleCloseToggle()}>Wishlist</Link>

        <form action={signOutAction}>
          <button type="submit" onClick={() => handleSignOut()} className="category-link">Sign Out</button>
        </form>
      </div>
    </>
  )
}

export default AccountPreview
