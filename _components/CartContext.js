"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { getCartProducts } from "../_lib/data-service";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [initialized, setInitialized] = useState(false);

  
  // Load Cart from Local Storage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if(stored) setCart(JSON.parse(stored));
    setInitialized(true);
  }, [])


  // Save Cart to local storage on change
  useEffect(() => {
    if(initialized)
      localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart, initialized]);

  function addToCart(productName, productId, price, quantity = 1, photoThumbnail) {
    setCart(prev => {
      // check if item already in cart, if yes add the quantity
      console.log(prev);
      const existing = prev.find(item => item.productId === productId);
      console.log("existing: ", existing);
      if(existing) {
        return prev.map(item => 
          item.productId === productId ? {...item, quantity: item.quantity + quantity}
          : item)
      }
      else
        return [...prev, {productName, productId, price, quantity, photoThumbnail}]
    })
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  function clearCart() {
    setCart([]);
    localStorage.removeItem("cart");
  }

  if (!initialized) return null;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext)
}