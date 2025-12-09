"use client"

import { useEffect, useState } from "react"
import { BsCart3 } from "react-icons/bs";
import Preview from "./Preview";
import CartPreview from "./CartPreview";
import { useCart } from "./CartContext";
import { usePreviewState } from "./PreviewStateContext";

function CartMenu({ session, dbCart }) {
  
  const [width, setWidth] = useState(null)

  const { cart, setCart } = useCart();
  const { cartToggle, setCartToggle, setNavigationToggle, setProfileToggle, setWishlistToggle } = usePreviewState();

  // setting react cart to cart from db
  useEffect(() => {
    if(session && dbCart)
      setCart(dbCart)
  }, [session, dbCart, setCart ])
  
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
      <button onClick={() => toggleOpen()} className='transition-transform duration-300 hover:scale-140 text-gray-500 z-30'>
        <BsCart3 />
      </button>
      {cartToggle && ( 
        <>
          { /* To close when clicking elswhere than the Menu */}
          {/* <div className="fixed inset-0 z-10" onClick={() => setCartToggle(false)}></div> */}
          
          <div className="absolute">
            <Preview width={width} translate={75} zIndex={60}>
              <CartPreview cart={cart} session={session} />
            </Preview>

          </div>
        </>
      )}
    </div>
  )
}

export default CartMenu
