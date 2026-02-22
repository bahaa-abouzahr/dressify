"use client"

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useWishlistToggle } from "./useWishlistToggle";

function ProductWishlistButton({ userId, productId, inStock }) {
  const { inWishlist, toggleWishlist } = useWishlistToggle(userId, productId);
  if (!userId) return null;

    const disabled = !inStock;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={toggleWishlist}
      className={`
        flex items-center justify-center gap-2 w-50 h-8 mb-2 rounded-md text-sm border text-(--button-secondary) 
        cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-semibold
      `}
    >
      <span>{inWishlist ? "Remove from wishlist" : "Add to your wishlist"}</span>
      {inWishlist ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}

export default ProductWishlistButton;