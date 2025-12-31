"use client"

import { useCart } from "./CartContext"
import Link from "next/link";

function CartFinalPrice({ location }) {
  const {cart} = useCart();

  const totalItemsPrice = Number(cart.reduce((acc, cur) => acc + cur.price , 0).toFixed(2));
  const freeDelivery = totalItemsPrice >= 50;
  const finalPrice = freeDelivery ? totalItemsPrice : Number(totalItemsPrice + 3.5).toFixed(2);

  if(!cart.length) return;


  return (
    <div className="flex flex-col gap-3 p-2 md2:mt-10 md2:ml-5 bg-gray-300 w-fit h-fit rounded-xl">
   {/* <div className="flex flex-col gap-3 items-start pl-3 md2:pt-10 md2:border-l-4 max-md2:border-t-4 border-(--gray-bg) md2:-translate-y-10 "> */}
      <div className="md:text-base md2:text-sm flex flex-col gap-1 mt-4 ">
        <span>Subtotal ({cart.length} items): <strong>€{totalItemsPrice}</strong></span>
        <span className="text-xs italic">{freeDelivery ? "Eligible for free Delivery" : "Delivery fee €3.5"}</span>
        <span>Final Price: <strong>€{finalPrice}</strong></span>
      </div>

      {location === "cart" ? ( 
        <Link href="/checkout" className="flex justify-center h-fit mt-2">
          <button 
            className="h-fit max-w-40 w-full text-[13px] bg-yellow-400 hover:bg-yellow-300 rounded-2xl py-1 px-3 cursor-pointer"
          >
            {location === "cart" ? "Proceed to Checkout" : "Buy now"}
          </button>
        </Link>
      ) : ""}

        {location === "checkout" ? (
          <div className="flex justify-center h-fit mt-2">
            <button 
              type="submit"
              form="checkout-form"
              className="h-fit max-w-40 w-full text-[13px] bg-yellow-400 hover:bg-yellow-300 rounded-2xl py-1 px-3 cursor-pointer"
            >
              Buy now
            </button>
          </div>
        ) : ""}
    </div>
 
  )
}

export default CartFinalPrice
