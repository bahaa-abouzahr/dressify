import AddToCart from "@/app/_components/AddToCart";
import ProductPhotos from "@/app/_components/ProductPhotos";
import { auth } from "@/app/_lib/auth";

import { getProduct } from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const { productName } = await getProduct(productId);
  return {title: `${productName}`}
}

export default async function page({ params }) {
  const session = await auth();
  const { productId } = await params;
  const {productName, photos, description, price, itemsize, quantity_available} = await getProduct(productId);

  // SIZE NOT ADDED YET!!!
  
  return (
    <div className="md2:grid md2:grid-cols-2 flex flex-col md2:gap-20 mx-auto md2:items-center md2:w-[90%] w-full">
      
      {/* Left Column */}
      <ProductPhotos photos={photos} productName={productName} />

      {/* Right Column */}
      <div className="flex flex-col h-full md2:justify-around md:-translate-y-12 max-w-[800px] min-w-[380px] max-md2:mx-auto text-center">

        <div className="flex flex-col py-6 lg:py-12 gap-5 text-left w-full">
          <p className="text-[var(--orange-main)] font-bold text-xl text-md">Shopify</p>
          <h1 className="font-bold text-4xl ">{productName}</h1>
          <p className="text-2xl text-gray-500">{description}</p>
          <p className="font-bold text-2xl">${price}</p> 
        </div>

        <AddToCart session={session} productName={productName} productId={productId} price={price} photos={photos} />

      </div>
    </div>
  )
}

