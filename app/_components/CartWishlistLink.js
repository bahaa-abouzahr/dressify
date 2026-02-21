import { useWishlistToggle } from "./useWishlistToggle";

function CartWishlistLink({ userId, productId }) {
  const { inWishlist, toggleWishlist } = useWishlistToggle(userId, productId);
  if (!userId) return null;

  return (
    <button type="button" onClick={toggleWishlist} className="link">
      {inWishlist ? "Remove from Wishlist" : "Save for later"}
    </button>
  );
}

export default CartWishlistLink;