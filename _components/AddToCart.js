"use client"

import { useEffect, useState } from "react"
import { BsCart3 } from "react-icons/bs"
import { FaMinus, FaPlus } from "react-icons/fa"
import { useCart } from "./CartContext"

function AddToCart({ productName, productId, price, photoThumbnail }) {
  const { cart, addToCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  async function handleAddToCart(){
    setLoading(true);

    await addToCart(productName, productId, price, quantity, photoThumbnail)

    setLoading(false);
    console.log(cart);
  }

  function handlePlus(){
    setQuantity(quantity + 1);
  }

  function handleMinus(){
    if(quantity > 1)
      setQuantity(quantity - 1)
  }
  

  return (
    <div className="grid grid-rows-2 lg:grid-cols-[1fr_2fr] items-center lg:w-[70%] gap-2 text-l">
      <div className="flex items-center justify-between bg-gray-300 p-2 rounded-md text-[var(--orange-main)] font-bold">
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
        className="cursor-pointer flex gap-3 items-center justify-center bg-[var(--orange-main)] 
          p-2 rounded-md text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {<BsCart3 />} Add to Cart
      </button>
      <button onClick={() => clearCart()}>Clear Cart</button>
    </div>
  )
}

export default AddToCart
