"use client"

import { useEffect, useState } from "react"
import { BsCart3 } from "react-icons/bs";
import Preview from "./Preview";
import CartPreview from "./CartPreview";
import { useCart } from "./CartContext";
import { usePreviewState } from "./PreviewStateContext";
import { usePathname } from "next/navigation";

function CartMenu({ userId, dbCart }) {
  const [width, setWidth] = useState(null)
  const pathname = usePathname();
  const isProfilePage = pathname === '/profile';
  
  const { cart, setCart, syncComplete } = useCart();
  const { cartToggle, setCartToggle, setNavigationToggle, setProfileToggle, setWishlistToggle } = usePreviewState();

  // setting react cart to cart from db
  useEffect(() => {
    // to prevent setting cart which is occuring before Cart Merge on Sign In
    if(isProfilePage && !syncComplete.current){
      dbCart = [];
    } 
    else if (userId && dbCart) {
      setCart(dbCart)
    }
  }, [userId, dbCart, setCart])
  
  // cart menu size for empty or non-empty cart
  useEffect(() => {
    if(!cart.length)
      setWidth(10)
    else
      setWidth(20)
  }, [cart])

 
  function toggleOpen() {
    setCartToggle(!cartToggle);
    setProfileToggle(false);
    setNavigationToggle(false);
    setWishlistToggle(false);
  }

  return (
    <div className="relative z-30">
      <button onClick={() => toggleOpen()} className='transition-transform duration-300 hover:scale-140 text-(--gray-text) z-30'>
        <BsCart3 />
      </button>
      {cartToggle && ( 

          <div className="absolute top-full mt-1">
            <Preview width={width} translate={75} zIndex={60}>
              <CartPreview cart={cart} userId={userId} />
            </Preview>
          </div>

      )}
    </div>
  )
}

export default CartMenu
