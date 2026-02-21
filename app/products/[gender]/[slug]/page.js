import AddToCart from "@/app/_components/AddToCart";
import AddToWishlistButton from "@/app/_components/AddToWishlistButton";
import ProductPhotos from "@/app/_components/ProductPhotos";
import { createClient } from "@/app/_lib/supabase/server";

import { getProduct } from "@/app/_lib/data-service";
import ProductVariants from "@/app/_components/ProductVariants";
import { isAdmin } from "@/app/_lib/actions";
import DeleteProductButton from "@/app/_components/DeleteProductButton";
import { SIZE_LABEL_BY_VALUE } from "@/app/_utils/constants";
import ProductWishlistButton from "@/app/_components/ProductWishlistButton";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { productName } = await getProduct(slug);
  return {title: `${productName}`}
}

export default async function page({ params, searchParams }) {
 
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;
  const is_admin = await isAdmin(userId)

  const { slug } = await params;
  const awaitedSearchParams = await searchParams;
  
  const {id: product_id, productName, photos, description, price, category, product_variants } = await getProduct(slug);
  const variants = product_variants ?? []

  const selectedSku = awaitedSearchParams.sku;
 
  const selectedVariant = variants.find(v => v.sku === selectedSku) ??
    variants.find(v => v.stock > 0) ??
    variants[0];

  const salePercentage = selectedVariant["sale_percentage"]

  const salePrice = salePercentage ? Number(price * (1 - salePercentage/100)).toFixed(2) : Number(price).toFixed(2);
  
  // convert size value to a better displayed size label
  const label = SIZE_LABEL_BY_VALUE[selectedVariant.size] ?? selectedVariant.size;

  return (
    <div className="md2:grid md2:grid-cols-2 flex flex-col md2:gap-20 mx-auto mb-6 md2:items-center md2:w-[90%] w-full max-md2:-translate-y-10">
      
      {/* Left Column */}
      <ProductPhotos photos={photos} productName={productName} />

      {/* Right Column */}
      <div className="flex flex-col h-full md2:justify-around md:-translate-y-12 max-w-[800px] min-w-[350px] mx-2 text-center">

        <div className="flex flex-col py-6 lg:pt-12 gap-5 text-left w-full">
          <p className="text-(--orange-main) font-bold text-xl text-md">Dressify</p>
          <h1 className="font-bold text-4xl ">{productName}</h1>
          <p className="text-2xl text-gray-500">{description}</p>
          <div className="h-10">
            {salePercentage 
              ?
              <p className="font-bold text-2xl text-red-600">
                <span>${salePrice} </span>
                <span className="line-through text-gray-400 text-base">${price}</span>
              </p> 
              :
              <p className="font-bold text-2xl">${price}</p> 
            }
            {salePercentage ? <p className="bg-gray-400 w-fit px-1.5">%{salePercentage} SALE</p> : ''}
          </div>
        </div>

        <div className="text-left flex flex-col gap-2">
          <span className="">Size: <strong>{label}</strong></span>
          <ProductVariants variants={variants} selectedVariant={selectedVariant} />
        </div>

        <div className="flex flex-col gap-2">
          {userId ? <ProductWishlistButton userId={userId} productId={product_id} /> : '' }

          <AddToCart 
            userId={userId} 
            productId={product_id}
            selectedVariant={selectedVariant} 
            awaitedSearchParams={awaitedSearchParams} 
            category={category} 
            slug={slug}
          />
        </div>

        {is_admin && 
          <DeleteProductButton product_id={product_id} />
        }
      </div>

    </div>
  )
}

