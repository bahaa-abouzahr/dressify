import Image from "next/image";
import Link from "next/link";

import { PRODUCTS_IMAGE_BASE } from "../_utils/constants";

import AnimatedTrashButton from "./AnimatedTrashButton";


function WishlistPreviewItem({ item, ind, listLength, handleDelete, setWishlistToggle }) {
  const { category, slug, id, photos} = item.wishlistItem;

  return (
    <div className={`flex flex-row justify-around items-center gap-2 ${ind !== 2 && ind!==5 && ind !== (listLength - 1) ? "border-r pr-2" : "" }`}>
      <Link 
        href={`/products/${category}/${slug}`}
        className="relative"
        onClick={() => setWishlistToggle(false)}
      >
        <Image 
          src={`${PRODUCTS_IMAGE_BASE}${photos[0]}`}
          alt={id}
          width={80}
          height={80}
          className="object-cover object-top w-20 h-20 hover:scale-120"
          />
      </Link>
      <AnimatedTrashButton handleDelete={handleDelete} id={id} />
    </div>

  )
}

export default WishlistPreviewItem
