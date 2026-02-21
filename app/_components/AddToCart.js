"use client"

import { useEffect, useState } from "react"
import { BsCart3 } from "react-icons/bs"
import { FaMinus, FaPlus } from "react-icons/fa"
import { addCartItem } from "../_lib/actions"
import { useCart } from "./CartContext"

import toast from "react-hot-toast"
import { getProductVariants } from "../_lib/data-service"

function AddToCart({ userId, productId, selectedVariant, awaitedSearchParams, category, slug }) {
  const { size, stock, sku } = selectedVariant;
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1)
  }, [awaitedSearchParams])

  async function handleAddToCart(){
    setLoading(true);

    try {
      // Add cart to state/local storage
      if(!userId){
        // Get latest product_variants, Product Price, and Name 
        const {sale_percentage, stock, product_details: {price, photos, productName}} = await getProductVariants(sku);

        const res = await addToCart(productName, productId, quantity, sku, size, price, stock, sale_percentage, photos, category, slug);
        if(res.max)
          toast(`Already added all available in stock!`);
        else 
          toast.success("Added Successfully")
      }
      // Logged-in: add Cart Item to DB
      else {
        const res = await addCartItem(productId, quantity, sku, category, slug)

        if(res.ok) toast.success("Added Successfully")
        else if(res.max) toast(`Already added all available in stock!`);
        else {
          toast.error(`Adding to Cart Failed: ${res}`)
          throw new Error(`Adding to Cart Failed: ${res}`)
        }
      } 
    } catch(error) {
      console.error("Error adding to cart: ", error);
    } finally {
      setLoading(false);
    }
  }

  function handlePlus(){
    if(stock > quantity)
    setQuantity(quantity + 1);
  }

  function handleMinus(){
    if(quantity > 1)
      setQuantity(quantity - 1)
  }
  

  return (
    <div className="grid grid-rows-2 lg:grid-cols-[1fr_2fr] items-center max-w-xs gap-2 text-l">
      <div className="relative flex items-center justify-between max-w-52 bg-gray-300 p-2 rounded-md text-(--orange-main) font-bold">
        <button onClick={() => handleMinus()} className="cursor-pointer hover:text-(--orange-secondary)">
          <FaMinus />
        </button>
        <p className="text-black text-md">{quantity}</p>
        <button onClick={() => handlePlus()} className="cursor-pointer hover:text-(--orange-secondary)">
          <FaPlus />
        </button>
        {stock === quantity ? <span className="absolute md2:top-10 max-md2:left-50 text-[9px] max-md2:w-30 text-red-500">Stock limit reached</span> : ''}
      </div>
      <button 
        onClick={handleAddToCart} 
        disabled={loading || stock === 0} 
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
