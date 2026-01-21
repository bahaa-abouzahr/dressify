"use client"

import { useState } from "react"
import { BsCart3 } from "react-icons/bs"
import { FaMinus, FaPlus } from "react-icons/fa"
import { addCartItem } from "../_lib/actions"
import { useCart } from "./CartContext"

import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

function AddToCart({ userId, productName, productId, price, photos }) {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  async function handleAddToCart(){
    setLoading(true);

    try {
      // Add cart to state/local storage
      if(!userId){
        await addToCart(productName, productId, price, quantity, photos);
        toast.success("Added Successfully")
      }
      // Logged-in: add Cart Item to DB
      else {
        const res = await addCartItem(productId, quantity)
        if(res.ok) toast.success("Added Successfully")
        else toast.error(`Adding to Cart Failed: ${res}`)
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
      <div className="flex items-center justify-between max-w-52 bg-gray-300 p-2 rounded-md text-(--orange-main) font-bold">
        <button onClick={() => handleMinus()} className="cursor-pointer hover:text-(--orange-secondary)">
          <FaMinus />
        </button>
        <p className="text-black text-md">{quantity}</p>
        <button onClick={() => handlePlus()} className="cursor-pointer hover:text-(--orange-secondary)">
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
