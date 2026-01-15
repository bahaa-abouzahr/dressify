"use client"

import { useEffect, useRef } from "react";
import { syncCartAfterSignIn } from "@/app/_lib/actions";
import { useCart } from "./CartContext";

// used to sync guest cart(state) with dbCart
function SyncGuest() {
  const { cart, setCart, syncComplete } = useCart();

  useEffect(() => {
    if(syncComplete.current) return;
    syncComplete.current = true;

    async function syncOrLoad() {
      // If user hast Guest cart items, merge them
      const mergedCart = await syncCartAfterSignIn(cart);

      if(mergedCart) {
        setCart(mergedCart);
        syncComplete.current = true
      }
    }
    syncOrLoad();
  },[])

  return null;
}

export default SyncGuest
