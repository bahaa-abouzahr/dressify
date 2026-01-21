import Image from "next/image"
import Link from "next/link"
import { FaRegTrashAlt } from "react-icons/fa";
import AnimatedTrashButton from "./AnimatedTrashButton";
import { PRODUCTS_IMAGE_BASE } from "../_lib/constants";


function WishlistPreviewItem({ item, ind, listLength, handleDelete, setWishlistToggle }) {

  return (
    <div className={`flex flex-row justify-around items-center gap-2 ${ind !== 2 && ind!==5 && ind !== (listLength - 1) ? "border-r pr-2" : "" }`}>
      <Link 
        href={`/products/all/${item["product_id"]}`}
        className="relative"
        onClick={() => setWishlistToggle(false)}
      >
        <Image 
          src={`${PRODUCTS_IMAGE_BASE}${item["wishlistItem"].photos[0]}`}
          alt={item.product_id}
          width={80}
          height={80}
          className="object-cover object-top w-20 h-20 hover:scale-120"
          />
      </Link>
      <AnimatedTrashButton handleDelete={handleDelete} id={item.product_id} />
    </div>

  )
}

export default WishlistPreviewItem
