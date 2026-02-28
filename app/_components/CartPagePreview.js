"use client"

import Link from "next/link";
import { useCart } from "./CartContext"
import CartPagePreviewItem from "./CartPagePreviewItem";
import Image from "next/image";

import empty_cart from "@/public/images/empty_cart.svg"
import { CgSmileSad } from "react-icons/cg";
import toast from "react-hot-toast";
import { deleteCartItem } from "../_lib/actions";

function CartPagePreview({userId}) {
  const {cart, setCart} = useCart();


  async function handleDeleteCartItem(product_id, sku) {
    if(!userId) {
      const updatedCart = cart.filter(cartItem => 
        cartItem.product_id !== product_id || 
        (cartItem.product_id === product_id && cartItem.product_variants.sku !== sku) );
      setCart(updatedCart)
      toast.success("Removed from Cart")
    }
    else{
      const res = await deleteCartItem(product_id, sku);
      if(res.ok) toast.success("Removed from Cart")
      else toast.error(`Remove Unsuccessfull: ${res}`)
    }
  }

  if(!cart.length)
    return (
      <div 
        className="
          md2:grid md2:grid-cols-[1fr_auto] flex flex-col items-center md2:justify-between 
          md2:gap-20 md2:px-6 
        ">
        <Image 
          src={empty_cart}
          alt="Empty Cart"
          height={400}
          width={400}
          className="h-90 w-90"
        />

        <div className="flex flex-col h-full justify-center items-center gap-5">
          <div className="flex gap-1 items-center text-xl">
            <span>Your Cart is empty</span>
            <CgSmileSad />
          </div>
          <span className="text-md">
            Check our <Link href="/products/all" onClick={() => setOpen(false)} className="underline font-bold text-gray-500">collection!</Link>
          </span>
        </div>
      </div>
    )

  return (
    <div className="flex flex-col md2:gap-10 gap-5 bg-(--cream-main) max-md2:mb-5 md2:pt-10 md2:border-r-4 border-(--gray-bg) md2:-translate-y-10 ">
      <h1 className="text-center text-2xl font-bold text-(--gray-text)">
        Items in your Cart
      </h1>
      <div className="flex flex-col gap-5 mt-2">
        {cart.map((item) => {
          return <CartPagePreviewItem item={item} handleDeleteCartItem={handleDeleteCartItem} key={item.product_variants.sku} userId={userId} />
        })}

      </div>
    </div>
  )
}

export default CartPagePreview
