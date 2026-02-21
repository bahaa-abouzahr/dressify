"use client"

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useWishlistToggle } from "./useWishlistToggle";

function ProductWishlistButton({ userId, productId }) {
  const { inWishlist, toggleWishlist } = useWishlistToggle(userId, productId);
  if (!userId) return null;

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      className="flex items-center justify-center gap-2 w-50 h-7 mb-2 rounded-md text-sm border text-(--button-secondary)"
    >
      <span>{inWishlist ? "Remove from wishlist" : "Add to your wishlist"}</span>
      {inWishlist ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}

export default ProductWishlistButton;