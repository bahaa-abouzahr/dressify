"use client"

import WishlistItemDetails from "@/app/_components/WishlistItemDetails"
import { deleteFromWishlist } from "../_lib/actions"
import { useWishlist } from "./WishlistContext"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function WishlistPageComponent({ wishlist }) {
  const {localWishlist, setLocalWishlist} = useWishlist();
  const {animating, setAnimating} = useState(false)

  useEffect(() => {
    setLocalWishlist(wishlist);
  }, [])

  async function handleDelete(productId){
    const res = await deleteFromWishlist(productId)
    
    if(res.ok) {
      setLocalWishlist(w => w.filter(item => item.product_id !== productId))
      toast.success("Removed from Wishlist")
    }
    else
      toast.error(`Deletion was unsuccessfull: , ${res}`)
  }

  if(!localWishlist.length)
    return (
    <div>
      <span className="text-md text-(--gray-text) font-bold">
        Your Wishlist is empty
      </span>
    </div>)

  return (
    <div className="flex flex-col gap-4 mr-2">
      {localWishlist.map(item => {
        return (
          <WishlistItemDetails 
            product={item.wishlistItem} 
            created_at={item.created_at} 
            key={item.wishlistItem.productName} 
            handleDelete={handleDelete} 
          />
        )
      })}
    </div>
  )
}

export default WishlistPageComponent
