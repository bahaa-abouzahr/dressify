"use client"

import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { deleteFromWishlist } from "@/app/_lib/actions";
import { usePreviewState } from "./PreviewStateContext";
import { useWishlist } from "./WishlistContext";
import WishlistPreviewItem from "./WishlistPreviewItem";
import toast from "react-hot-toast";


function WishlistPreview() {
const { wishlistToggle, setWishlistToggle } = usePreviewState();
const { localWishlist, setLocalWishlist} = useWishlist();

const listLength = localWishlist.length;


async function handleDelete(productId) {
  const res = await deleteFromWishlist(productId);
  if(res.ok) {
    setLocalWishlist(w => w.filter(item => item.product_id !== productId));
    toast.success("Removed from Wishlist")
  }
  else toast.error(`Couldn't remove from Wishlist: , ${res}`)
}

if (!localWishlist.length) 
  return (
    <div className="flex flex-col text-center gap-1">
      <button 
        onClick={() => setWishlistToggle(false)}
        className="absolute top-2.5 right-2 text-lg"
      >
        <IoMdClose />
      </button>
      <span className="text-sm text-(--gray-text) font-bold">
        Your Wishlist is Empty
      </span>
      <span className="text-xs">
        Check our <Link href="/products/all" onClick={() => setOpen(false)} className="underline">collection!</Link>
      </span>
    </div>
  )

  return (
    <div className="flex flex-col gap-5 px-2 py-2">
      {wishlistToggle && 
        <button 
          onClick={() => setWishlistToggle(false)}
          className="absolute top-5 right-5 text-lg"
        >
          <IoMdClose />
        </button>
      }

      <span 
        className="flex items-center justify-center font-bold w-full border-b-2 py-2 text-base">
          Wishlist
      </span>

      <div className="grid grid-cols-3 gap-4">
        {localWishlist.slice(0, 6).map((item, ind) => {
          return (
            <WishlistPreviewItem 
              item={item} 
              key={item.product_id} 
              ind={ind} 
              listLength={listLength} 
              handleDelete={handleDelete} 
              setWishlistToggle={setWishlistToggle} 
            />
          )
        })}
      </div>

      <Link 
        href="/account/wishlist"
        className="flex justify-center font-semibold text-sm"
        onClick={() => setWishlistToggle(false)}
      >
        <span className="border-b-2 border-transparent hover:border-current transition-all">
          Check all Items in your wishlist
        </span>
      </Link>
    </div>
  )
}

export default WishlistPreview
