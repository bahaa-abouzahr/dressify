"use client"

import { useEffect, useState } from "react"
import { BsCart3 } from "react-icons/bs"
import { FaMinus, FaPlus } from "react-icons/fa"

function AddToCart({ productId, price }) {
  const [cart, setCart] = useState([])
  const [sessionLoaded, setSessionLoaded] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Retrieving from Session Storage
  useEffect(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) 
      setCart(JSON.parse(savedCart));

    setSessionLoaded(true); // marking loaded from storage
  }, [])

  // Saving to Session Storage
  useEffect(() => {
    if(!sessionLoaded) return; // skip writing on first render

    sessionStorage.setItem('cart', JSON.stringify(cart));
  }, [cart, sessionLoaded]);

  function handlePlus(){
    setQuantity(quantity + 1);
  }

  function handleMinus(){
    if(quantity > 0)
      setQuantity(quantity - 1)
  }

  function handleAddToCart() {
    setLoading(true);

    // Adding item to Cart
    const AddedItem= {
      productId,
      price,
      quantity,
    }

    setCart(prevCart => {
      // check if already in cart NEED TO ADD SIZE CHECK AS WELL LATER
      const existing = prevCart?.find(item => item.productId === productId); // && item.size === size
      console.log(existing);
      if(existing) {
        return prevCart.map(item => 
          item.productId === productId ? {...item, quantity: item.quantity + quantity} : item
        );
      }
      return [...prevCart, AddedItem]
    })
    console.log(cart);
    setLoading(false);
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
      <button onClick={handleAddToCart} disabled={loading} className="cursor-pointer flex gap-3 items-center justify-center bg-[var(--orange-main)] 
        p-2 rounded-md text-white font-bold 
        shadow-[0_10px_20px_-5px_rgba(255,125,26,0.8)] disabled:opacity-50 disabled:cursor-not-allowed
        ">
        {<BsCart3 />} Add to Cart
      </button>
    </div>
  )
}

export default AddToCart
