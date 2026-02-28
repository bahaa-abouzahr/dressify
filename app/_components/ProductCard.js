import Image from "next/image";
import Link from "next/link";

import not_available from "@/public/images/product_not_available.jpg"
import { PRODUCTS_IMAGE_BASE } from "../_utils/constants";
import ProductsWishlistButton from "./ProductsWishlistButton";

function ProductCard({ product, userId }) {

  const {productName, photos, price, category, slug, product_variants, id:product_id} = product;

  const inStock = product_variants?.filter(variant => variant.stock > 0) || null;

  // getting highest sale percentage if not out-of-stock
  const highest_percentage = inStock?.reduce(
    (max, v) => v.sale_percentage > max ? v.sale_percentage : max
    , 0)

  const salePrice = highest_percentage ? Number(price * (1 - highest_percentage/100)).toFixed(2) : Number(price).toFixed(2);

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
      
      <div className="text-gray-500 border border-gray-200 rounded-lg p-2 bg-gray-50">
        <p className="font-bold text-xs line-clamp-1">{productName}</p>

        <div className="mt-1 flex items-center gap-1 justify-between">
          <div className="flex flex-row gap-1 items-center">
            <p className={`text-sm font-bold ${highest_percentage ?  " text-red-600" : "text-gray-900"}`}>{salePrice}$</p>
            {highest_percentage ? <p className="xs:text-xs text-[10px] line-through text-gray-500 font-semibold ">${price}</p> : ''}
          </div>

          {highest_percentage ? <p className="bg-gray-400 text-white rounded-sm w-fit xs:text-xs text-[10px] xs:px-2 p-0.5 px-1">%{highest_percentage} SALE</p> : ''}
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
