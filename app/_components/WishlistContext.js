"use client"

import { createContext, useContext, useState} from "react"

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [localWishlist, setLocalWishlist] = useState([]);

  return (
    <WishlistContext.Provider value={{ localWishlist, setLocalWishlist}}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}