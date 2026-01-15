"use client"

import { useEffect, useState } from "react";
import { usePreviewState } from "./PreviewStateContext";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import Preview from "./Preview";
import WishlistPreview from "./WishlistPreview";
import { useWishlist } from "./WishlistContext";
import { getWishlist } from "@/app/_lib/data-service";

function WishlistMenu({ userId, wishlist}) {
  const [width, setWidth] = useState(null);

  const { wishlistToggle, setWishlistToggle, setCartToggle, setNavigationToggle, setProfileToggle} = usePreviewState();

  const { localWishlist, setLocalWishlist} = useWishlist();

  function toggleOpen() {
    setWishlistToggle(!wishlistToggle)
    setProfileToggle(false)
    setCartToggle(false);
    setNavigationToggle(false);
  }

  // to sync wishlist state and re-render the component
  useEffect(() =>{
    async function fetchWishlist() {
      const latestDbWishlist = await getWishlist(userId);

      setLocalWishlist(latestDbWishlist)
    }
    fetchWishlist();
  }, [])

  // to adjust preview size when list length changes
  useEffect(() => {
    if(userId && localWishlist.length)
      setWidth(22)
    else
      setWidth(14)
  }, [userId, wishlist, localWishlist, setLocalWishlist])

  return (
    <div className="relative z-30">
      <button onClick={() => toggleOpen()} className="transition-transform duration-300 hover:scale-140 text-(--gray-text) z-30">
        <span>{wishlistToggle ? <FaHeart /> : <FaRegHeart />}</span>
      </button>
      
      {wishlistToggle && (
        <div className="absolute top-full mt-1">
          <Preview width={width} translate={62} >
            <WishlistPreview />
          </Preview>
        </div>
      )}
    </div>
  )
}

export default WishlistMenu;
