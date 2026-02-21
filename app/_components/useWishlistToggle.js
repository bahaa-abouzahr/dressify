"use client";

import { useEffect, useState } from "react";
import { addToWishlist, deleteFromWishlist } from "../_lib/actions";
import { getWishlist, getWishlistItem } from "../_lib/data-service";
import { useWishlist } from "./WishlistContext";
import toast from "react-hot-toast";

export function useWishlistToggle(userId, productId) {
  const [inWishlist, setInWishlist] = useState(false);
  const { localWishlist, setLocalWishlist } = useWishlist();

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

  async function toggleWishlist() {
    if (!userId) return;

    if (inWishlist) {
      const res = await deleteFromWishlist(productId);
      if (res?.ok) {
        setInWishlist(false);
        toast.success("Removed from wishlist");
      } else {
        toast.error("Couldn't remove from wishlist");
        return;
      }
    } else {
      const res = await addToWishlist(productId);
      if (res?.ok) {
        setInWishlist(true);
        toast.success("Added to wishlist");
      } else {
        toast.error("Couldn't add to wishlist");
        return;
      }
    }

    const latest = await getWishlist(userId);
    setLocalWishlist(latest);
  }

  return { inWishlist, toggleWishlist };
}