"use client"

import { useEffect, useRef } from "react";
import { useCart } from "./CartContext"
import { auth } from "../_lib/auth";
import { syncCartAfterSignIn } from "../_lib/actions";

// used to sync guest cart(state) with dbCart
function SyncGuest() {
  const { cart, setCart, } = useCart();

  // prevents duplicate effect runs in React Strict Mode
  const syncedRef = useRef(false);


  useEffect(() => {
    if(syncedRef.current) return;
    syncedRef.current = true;
    if(cart.length === 0) {
      return;
    }

    async function synconce() {
      
      const mergedCart = await syncCartAfterSignIn(cart);
      if(mergedCart) setCart(mergedCart);

    }

    synconce();
  },[])

  return null;
}

export default SyncGuest
