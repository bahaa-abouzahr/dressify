import Image from "next/image";
import Link from "next/link";
import { PRODUCTS_IMAGE_BASE } from "../_lib/constants";

function ProductCard({ product }) {
  const {id, productName, photos, price, category} = product;
  

  return (
    <Link 
      // href={typeFilter === 'all' ? `/products/all/${id}` : `/products/${typeFilter}/${id}`} 
      href={`/products/${category}/${id}`} 
      className="relative aspect-square hover:border-2 hover:border-(--orange-main) overflow-hidden "
    >
      <Image 
        src={`${PRODUCTS_IMAGE_BASE}${photos[0]}`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        alt={productName}
        className="object-cover object-top transition-transform duration-200 hover:scale-110"
      />  
      <div className=
        "w-[80%] max-[638px]:w-[70%] absolute bottom-[10%] left-[5%] text-gray-500 text-[13px] max-[1040px]:text-[10px] max-md:text-[12px] max-[638px]:text-xs flex justify-between items-center border-3 border-gray-200 rounded-2xl px-1.5 py-1.5 bg-gray-50"
      >
        <p className="font-bold md:text-xs sm:text-[10px] xs:text-[8px]">{productName}</p>
        <p className="bg-gray-400 text-gray-50 px-1.5 border-2 border-gray-200 rounded-2xl">{price}$</p>
      </div>
    </Link>
  )
}

export default ProductCard;
