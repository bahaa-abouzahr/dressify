import Image from "next/image";
import Link from "next/link"

import { FaRegTrashAlt } from "react-icons/fa";

function CartPreviewItem({ product }) {
  const {productName, productId, price, quantity, photoThumbnail} = product;
  
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_auto] items-center w-full">
      <Link href={`/products/all/${product.productId}`} 
        className="font-medium"
      >
        {productName}
      </Link>
      <Image
        src={photoThumbnail} 
        alt={productName}
        width="40"
        height="40"
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover object-top"
      />
      <span>{price}$ x {quantity}</span>
      <button><FaRegTrashAlt /></button>
    </div>
  )
}

export default CartPreviewItem
