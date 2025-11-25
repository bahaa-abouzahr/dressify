"use client"

import CartPreviewItem from "./CartPreviewItem";
import { useCart } from "./CartContext";

function CartPreview() {
  const { cart } = useCart();

  if (!cart.length) return <span> Cart is Empty</span>;

  return (
    <div className="flex flex-col gap-5 px-2 py-1">
      <span className="flex items-center justify-center font-bold w-full border-b-2 border-o">Shopping Cart</span>
      <div className="flex flex-col justify-end items-center gap-3">
        {cart.map(product => {

          return product ? 
            <CartPreviewItem product={product} key={product.productId} /> 
            //: null
            : <div key={item.productId}>Loading...</div>
        })}
      </div>

    </div>
  )
}

export default CartPreview
