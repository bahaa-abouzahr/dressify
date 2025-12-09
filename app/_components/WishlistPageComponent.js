"use client"

import WishlistItemDetails from "@/app/_components/WishlistItemDetails"
import { deleteFromWishlist } from "../_lib/actions"
import { useWishlist } from "./WishlistContext"
import { useEffect } from "react";

function WishlistPageComponent({ wishlist }) {
  const {localWishlist, setLocalWishlist} = useWishlist();

  useEffect(() => {
    setLocalWishlist(wishlist);
  }, [])

  async function handleDelete(productId){
    await deleteFromWishlist(productId)
    setLocalWishlist(w => w.filter(item => item.product_id !== productId))
  }

  if(!localWishlist.length)
    return (
    <div>
      <span className="text-md text-(--gray-text) font-bold">
        Your Wishlist is empty
      </span>
    </div>)

  return (
    <div className="flex flex-col gap-4">
      {localWishlist.map(item => {
        return <WishlistItemDetails product={item.wishlistItem} key={item.wishlistItem.productName} handleDelete={handleDelete} />
      })}
    </div>
  )
}

export default WishlistPageComponent
