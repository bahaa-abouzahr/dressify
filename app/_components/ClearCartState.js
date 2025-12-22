"use client"

import { useEffect } from "react";
import { useCart } from "./CartContext"

function ClearCartState() {
  const {cart, setCart} = useCart();

  useEffect(() => {
    if(cart.length) setCart([])
  }, [setCart] )

  return null
}

export default ClearCartState
