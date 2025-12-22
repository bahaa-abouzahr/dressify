"use client"

import { useEffect, useState } from "react"
import { BsCart3 } from "react-icons/bs"
import { FaMinus, FaPlus } from "react-icons/fa"
import { useCart } from "./CartContext"
import { addCartItem, deleteDbCart } from "../_lib/actions"
import { auth } from "../_lib/auth"
import { useRouter } from "next/navigation"

function AddToCart({ session, productName, productId, price, photos }) {
  const { addToCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();
  const userId = session?.user?.userId;


  async function handleAddToCart(){
    setLoading(true);

    try {
      // Add cart to state/local storage
      if(!session)
        await addToCart(productName, productId, price, quantity, photos);
      // Logged-in: add Cart Item to DB
      else {
        await addCartItem(productId, quantity, userId)
        
      } 
    } catch(error) {
      console.error("Error adding to cart: ", error);
    } finally {
      setLoading(false);
    }
  }

  function handlePlus(){
    setQuantity(quantity + 1);
  }

  function handleMinus(){
    if(quantity > 1)
      setQuantity(quantity - 1)
  }
  

  return (
    <div className="grid grid-rows-2 lg:grid-cols-[1fr_2fr] items-center max-w-xs gap-2 text-l">
      <div className="flex items-center justify-between max-w-[13rem] bg-gray-300 p-2 rounded-md text-[var(--orange-main)] font-bold">
        <button onClick={() => handleMinus()} className="cursor-pointer hover:text-[var(--orange-secondary)]">
          <FaMinus />
        </button>
        <p className="text-black text-md">{quantity}</p>
        <button onClick={() => handlePlus()} className="cursor-pointer hover:text-[var(--orange-secondary)]">
          <FaPlus />
        </button>
      </div>
      <button 
        onClick={handleAddToCart} 
        disabled={loading} 
        className="cursor-pointer flex gap-3 items-center justify-center max-w-52 bg-(--orange-main) hover:bg-(--orange-secondary) 
          p-2 rounded-md text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {<BsCart3 />}{loading ? "Adding..." : " Add to Cart" }
      </button>
    </div>
  )
}

export default AddToCart
