"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null)

  // prevents duplicate effect runs in React Strict Mode, and flag for Cart Merge and Signin
  const syncComplete = useRef(false);
  
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

  function addToCart(productName, productId, quantity = 1, sku, size, price, stock, sale_percentage, photos, category, slug) {

    // check if currently added product reached the stock limit
    const currentProduct = cart.find(item => 
      item.product_id === productId && item.product_variants.sku === sku
    )
    if(currentProduct?.quantity === stock) return {max: true}

    setCart(prev => {
      // check if item already in cart, if yes add the quantity

      const existing = prev.find(item => item.product_id === productId && item.product_variants.size === size);
      
      if(existing) {
        return prev.map(item => 
          item.product_id === productId && item.product_variants.size === size 
            // to not allow to add to cart more that what is available in stock
            ? {...item, quantity: Math.min(item.quantity + quantity, stock)} 
          : item)
      }
      else
        return [...prev, {
          productName, 
          product_id:productId, 
          price, 
          photos, 
          quantity,  
          category,
          slug,
          product_variants: {sale_percentage, size, sku}}
      ]})
      return {max: false}
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
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart, totalPrice, setTotalPrice, syncComplete }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext)
}