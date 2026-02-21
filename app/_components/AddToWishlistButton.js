"use client"

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { addToWishlist, deleteFromWishlist } from "../_lib/actions";
import { useEffect, useState } from "react";
import { getWishlist, getWishlistItem } from "../_lib/data-service";
import { useWishlist } from "./WishlistContext";
import toast from "react-hot-toast";

function AddToWishlistButton({ userId, productId, location }) {
  const [inWishlist, setInWishlist] = useState(false);
  const { localWishlist, setLocalWishlist} = useWishlist();

  // initial load to check if exists in wishlist
  useEffect(() => {
    async function load() {
      const exists = await getWishlistItem(userId, productId);

      setInWishlist(prev => {
        if(prev === exists) return prev; // to prevent re-renders
        return exists;
      });
    }

    if(userId) load();
  }, [userId, productId, localWishlist]);
  

  if(!userId) return null;


  async function handleclick() {
    if(inWishlist) {
      const res = await deleteFromWishlist(productId);
      if(res.ok) {
        setInWishlist(false);
        toast.success("Removed to Wishlist")
      }
      else {
        toast.error(`couldn't be Removed from Wishlist: , ${res}`)
      }
    } 
    else {
      const res = await addToWishlist(productId);
      if(res.ok) {
        setInWishlist(true)
        toast.success("Added to Wishlist")
      }
      else {
        toast.error(`couldn't be added to Wishlist: , ${res}`)
      }
    }

    // to sync wishlist state and re-render the component
    const latestDBWishlist = await getWishlist(userId)
    setLocalWishlist(latestDBWishlist);
  }

  return (
  "test"
    // <button 
    //   onClick={() => handleclick()}
    //   className=
    //     {`cursor-pointer ${location === "products" && "flex flex-row items-center justify-center gap-2 w-50 h-7 mb-2 rounded-md text-sm border-1 text-(--button-secondary)"}`}>
    //   {location ==="cart" ? <span className="link">{inWishlist ? "Remove from Wishlist" : "Save for later" }</span> : <span>{inWishlist ? "Remove from wishlist" : "Add to your wishlist"}</span> }
    //   {location === "products" ? (inWishlist ? <FaHeart /> : <FaRegHeart />) : null}
    // </button>
  )
}

export default AddToWishlistButton
