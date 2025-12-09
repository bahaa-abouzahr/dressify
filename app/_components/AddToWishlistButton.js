"use client"

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { addToWishlist, deleteFromWishlist } from "../_lib/actions";
import { useEffect, useState } from "react";
import { getWishlist, getWishlistItem } from "../_lib/data-service";
import { useWishlist } from "./WishlistContext";

function AddToWishlistButton({ session, productId }) {

  const [inWishlist, setInWishlist] = useState(false);
  const { localWishlist, setLocalWishlist} = useWishlist();

  
  // initial load to check if exists in wishlist
  useEffect(() => {
    async function load() {
      const exists = await getWishlistItem(session, productId);

      setInWishlist(prev => {
        if(prev === exists) return prev; // to prevent re-renders
        return exists;
      });
    }

    if(session) load();
  }, [session, productId, localWishlist]);
  

  if(!session) return null;


  async function handleclick() {
    if(inWishlist) {
      await deleteFromWishlist(productId);
      setInWishlist(false);
    } 
    else {
      await addToWishlist(productId);
      setInWishlist(true)
    }

    // to sync wishlist state and re-render the component
    const latestDBWishlist = await getWishlist(session)
    setLocalWishlist(latestDBWishlist);
  }


  
  return (
    <button 
      onClick={() => handleclick()}
      className=
        "flex flex-row items-center justify-center gap-2 cursor-pointer w-50 h-7 mb-2 rounded-md text-sm border-1 text-[var(--button-secondary)]">
      <span>{inWishlist ? "Remove from wishlist" : "Add to your wishlist"}</span>
      {inWishlist ? <FaHeart /> : <FaRegHeart />}
    </button>
  )
}

export default AddToWishlistButton
