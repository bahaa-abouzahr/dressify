import AddToCart from "@/app/_components/AddToCart";
import AddToWishlistButton from "@/app/_components/AddToWishlistButton";
import ProductPhotos from "@/app/_components/ProductPhotos";
import { createClient } from "@/app/_lib/supabase/server";

import { getProduct, getProductVariants } from "@/app/_lib/data-service";
import ProductVariants from "@/app/_components/ProductVariants";
import { deleteProduct, isAdmin } from "@/app/_lib/actions";
import DeleteProductButton from "@/app/_components/DeleteProductButton";

// export async function generateMetadata({ params }) {
//   const { product_id } = await params;
//   const { productName } = await getProduct(product_id);
//   return {title: `${productName}`}
// }

export default async function page({ params, searchParams }) {
 
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;
  const is_admin = await isAdmin(userId)
  console.log("ADMIN?? ", is_admin);
  const { slug } = await params;
  const awaitedSearchParams = await searchParams;
  
  const {id: product_id, productName, photos, description, price, category, product_variants } = await getProduct(slug);
  const variants = product_variants ?? []

  const selectedSku = awaitedSearchParams.sku;
 
  const selectedVariant = variants.find(v => v.sku === selectedSku) ??
    variants.find(v => v.stock > 0) ??
    variants[0];

  const salePercentage = selectedVariant["sale_percentage"]

  const salePrice = salePercentage ? price * (1 - salePercentage/100) : price;

  return (
    <div className="md2:grid md2:grid-cols-2 flex flex-col md2:gap-20 mx-auto mb-6 md2:items-center md2:w-[90%] w-full max-md2:-translate-y-10">
      
      {/* Left Column */}
      <ProductPhotos photos={photos} productName={productName} />

      {/* Right Column */}
      <div className="flex flex-col h-full md2:justify-around md:-translate-y-12 max-w-[800px] min-w-[350px] mx-2 text-center">

        <div className="flex flex-col py-6 lg:pt-12 gap-5 text-left w-full">
          <p className="text-(--orange-main) font-bold text-xl text-md">Shopify</p>
          <h1 className="font-bold text-4xl ">{productName}</h1>
          <p className="text-2xl text-gray-500">{description}</p>
          <div>
            {salePercentage 
              ?
              <p className="font-bold text-2xl text-red-600">${salePrice} <span className="line-through text-gray-400 text-lg">${price}</span></p> 
              :
              <p className="font-bold text-2xl">${price}</p> 
            }
            {salePercentage ? <p className="bg-gray-400 w-fit px-1.5">%{salePercentage} SALE</p> : ''}
          </div>
        </div>

        <div className="text-left flex flex-col gap-2">
          <span className="">Size: <strong>{selectedVariant.size}</strong></span>
          <ProductVariants variants={variants} selectedVariant={selectedVariant} />
        </div>

        <div className="flex flex-col gap-2">
          {userId ? <AddToWishlistButton productId={product_id} userId={userId} location="products" /> : '' }
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

