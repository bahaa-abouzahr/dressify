import AddToCart from "@/app/_components/AddToCart";
import AddToWishlistButton from "@/app/_components/AddToWishlistButton";
import ProductPhotos from "@/app/_components/ProductPhotos";
import { createClient } from "@/app/_lib/supabase/server";

import { getProduct } from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const { productName } = await getProduct(productId);
  return {title: `${productName}`}
}

export default async function page({ params }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;
  const { productId } = await params;
  const {productName, photos, description, price, itemsize, quantity_available} = await getProduct(productId);

  // SIZE NOT ADDED YET!!!
  
  return (
    <div className="md2:grid md2:grid-cols-2 flex flex-col md2:gap-20 mx-auto mb-6 md2:items-center md2:w-[90%] w-full max-md2:-translate-y-10">
      
      {/* Left Column */}
      <ProductPhotos photos={photos} productName={productName} />

      {/* Right Column */}
      <div className="flex flex-col h-full md2:justify-around md:-translate-y-12 max-w-[800px] min-w-[350px] mx-2 text-center">

        <div className="flex flex-col py-6 lg:py-12 gap-5 text-left w-full">
          <p className="text-(--orange-main) font-bold text-xl text-md">Shopify</p>
          <h1 className="font-bold text-4xl ">{productName}</h1>
          <p className="text-2xl text-gray-500">{description}</p>
          <p className="font-bold text-2xl">${price}</p> 
        </div>

        <div className="flex flex-col gap-2">
          {userId ? <AddToWishlistButton productId={productId} userId={userId} location="products" /> : '' }
          <AddToCart userId={userId} productName={productName} productId={productId} price={price} photos={photos} />
        </div>
        
      </div>

    </div>
  )
}

