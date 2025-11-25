import AddToCart from "@/app/_components/AddToCart";
import ProductPhotos from "@/app/_components/ProductPhotos";

import { getProduct } from "@/app/_lib/data-service";
import Image from "next/image";
import { BsCart3 } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const { itemName } = await getProduct(productId);
  return {title: `${itemName}`}
}

export default async function page({ params }) {
  const { productId } = await params;
  const {productName, photos, description, price, itemsize, quantity_available} = await getProduct(productId);

  console.log(productName);

  // SIZE NOT ADDED YET!!!
  
  return (
    <div className="md2:grid md2:grid-cols-2 flex flex-col md2:gap-20 mx-auto md2:items-center md2:w-[90%] w-[50%]">
      
      {/* Left Column */}
      <ProductPhotos photos={photos} productName={productName} />

      {/* Right Column */}
      <div className="flex flex-col h-full justify-around md:-translate-y-12">

        <div className="flex flex-col py-6 lg:py-12 gap-5 text-left">
          <p className="text-[var(--orange-main)] font-bold text-xl text-md">Shopify</p>
          <h1 className="font-bold text-4xl ">{productName}</h1>
          <p className="text-2xl text-gray-500">{description}</p>
          <p className="font-bold text-2xl">${price}</p> 
        </div>

        <AddToCart productName={productName} productId={productId} price={price} photoThumbnail={photos[0]} />

      </div>
    </div>
  )
}

