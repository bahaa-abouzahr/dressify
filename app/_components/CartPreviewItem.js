"use client"

import Image from "next/image";
import Link from "next/link"

import { FaRegTrashAlt } from "react-icons/fa";
import { deleteCartItem } from "../_lib/actions";
import { auth } from "../_lib/auth";
import { useCart } from "./CartContext";
import toast from "react-hot-toast";

function CartPreviewItem({ product, session, setCartToggle }) {
  const {product_id, quantity, productName, price, photos} = product;
  const { cart, setCart } = useCart();

  async function handleDeleteCartItem(product_id) {
    let res;
    if(!session) {
      const updatedCart = cart.filter(cartItem => cartItem.product_id !== product_id);
      setCart(updatedCart)
      toast.success("Removed from Cart")
    }
    else {
      res = await deleteCartItem(product_id);
      if(res.ok) toast.success("Removed from Cart")
      else toast.error(`Remove Unsuccessfull: ${res}`)
    }
  }
  
  return (
    <div className="grid grid-cols-[1fr_2fr_1fr_auto] items-center w-full">
      <Link 
        className="relative w-10 h-10 md2:w-12 md2:h-12"
        href={`/products/all/${product_id}`} 
        onClick={() => setCartToggle(false)}
      >
        <Image
          src={photos[0]} 
          alt={productName}
          width={40}
          height={40}
          className="object-cover object-top w-10 h-10 hover:scale-120"
        />
      </Link>

      <Link href={`/products/all/${product_id}`} 
        className="font-medium"
        onClick={() => setCartToggle(false)}
      >
        {productName}
      </Link>


      <span>{price}$ x {quantity}</span>

      <button className="cursor-pointer" onClick={() => handleDeleteCartItem(product_id)}><FaRegTrashAlt /></button>
    </div>
  )
}

export default CartPreviewItem
