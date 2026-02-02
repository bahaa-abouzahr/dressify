import Image from "next/image";
import Link from "next/link";
import { PRODUCTS_IMAGE_BASE } from "../_lib/constants";
import not_available from "@/public/images/product_not_available.jpg"

function ProductCard({ product }) {
  const {id, productName, photos, price, category, slug, product_variants} = product;
  const inStock = product_variants?.filter(variant => variant.stock > 0) || null;

  return (
    <Link 
      href={`/products/${category}/${slug}`} 
      className="relative aspect-square hover:border-2 hover:border-(--orange-main) overflow-hidden"
      
    >
      <div className="">
        <Image 
          src={`${PRODUCTS_IMAGE_BASE}${photos[0]}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          alt={productName}
          className="object-cover object-top transition-transform duration-200 hover:scale-110"
        /> 
        {!inStock.length &&

          <Image
            src={not_available}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="product_not_available"
            className="opacity-80 z-20"
          /> 
        }
      </div>
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
