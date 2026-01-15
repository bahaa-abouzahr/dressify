"use client"

import Image from "next/image";
import Link from "next/link";

import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteCartItem } from "@/app/_lib/actions";
import { useCart } from "./CartContext";
import AnimatedTrashButton from "./AnimatedTrashButton";

function CartPreviewItem({ product, userId, setCartToggle }) {
  const {product_id, quantity, productName, price, photos} = product;
  const { cart, setCart } = useCart();

  async function handleDelete(product_id) {
    let res;
    if(!userId) {
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

      <AnimatedTrashButton handleDelete={handleDelete} id={product_id} />
    </div>
  )
}

export default CartPreviewItem
