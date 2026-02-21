import Image from "next/image";
import Link from "next/link";

import not_available from "@/public/images/product_not_available.jpg"
import { PRODUCTS_IMAGE_BASE } from "../_utils/constants";
import ProductsWishlistButton from "./ProductsWishlistButton";


function ProductCard({ product, userId }) {

  const {productName, photos, price, category, slug, product_variants, id:product_id} = product;

  const inStock = product_variants?.filter(variant => variant.stock > 0) || null;

  return (
    <div className="flex flex-col gap-3 w-full">
      <Link 
        href={`/products/${category}/${slug}`} 
        className="relative aspect-square hover:border-2 hover:border-(--orange-main) overflow-hidden"
      >
        <Image 
          src={`${PRODUCTS_IMAGE_BASE}${photos[0]}`}
          priority
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          alt={productName}
          className="object-contain p-4 bg-white transition-transform duration-200 hover:scale-110"
        />
        {userId ? <ProductsWishlistButton userId={userId} productId={product_id} /> : ""}
        

        {/* image not available overlay if out of stock */}
        {!inStock.length &&
          <Image
              src={not_available}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              alt="product_not_available"
              className="opacity-80 z-20"
          /> 
        }

      </Link>
      
      <div className="text-gray-500 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
        <p className="font-bold text-xs line-clamp-1">{productName}</p>

        <div className="mt-1 flex items-center justify-between">
          <p className="text-sm font-bold text-gray-900">
            {price}$
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
