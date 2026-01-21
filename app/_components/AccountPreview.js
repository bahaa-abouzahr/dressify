import Link from "next/link";
// import { signOutAction } from "../_lib/actions";

import { usePreviewState } from "./PreviewStateContext";
import SignOutComponent from "./SignOutComponent";
import SignOutMenuButton from "./SignOutMenuButton";
import { useCart } from "./CartContext";


function AccountPreview() {
  const {setCart} = useCart();
  const {setProfileToggle} = usePreviewState();

  function handleCloseToggle() {
    setProfileToggle(false)
  }

  return (
    <>
      <div className="flex flex-col gap-1.5 text-[13px]">
        <Link href="/profile" className="category-link" onClick={() => handleCloseToggle()}>Your Profile</Link>
        <Link href="/profile/orders" className="category-link" onClick={() => handleCloseToggle()}>Orders</Link>
        <Link href="/profile/wishlist" className="category-link" onClick={() => handleCloseToggle()}>Wishlist</Link>

        <SignOutComponent setCart={setCart}>
          <SignOutMenuButton />
        </SignOutComponent>

      </div>
    </>
  )
}

export default AccountPreview
