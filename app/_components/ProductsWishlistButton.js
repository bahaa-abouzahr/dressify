"use client"

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlistToggle } from "./useWishlistToggle";

function ProductsWishlistButton({ userId, productId }) {
  const { inWishlist, toggleWishlist } = useWishlistToggle(userId, productId);
  if (!userId) return null;

  return (
    <button 
      type="button" 
      onClick={(e) => {
        e.preventDefault();   // prevents Link navigation
        e.stopPropagation();  // stops bubbling to Link
        toggleWishlist();
      }}
      className="absolute right-1 top-1 z-20 text-xl text-(--button-secondary)"
    >
      {inWishlist ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}

export default ProductsWishlistButton;