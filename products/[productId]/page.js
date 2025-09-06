import { getProduct } from "@/app/_lib/data-service";
import Image from "next/image";

import { BsCart3 } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";

// export async function generateMetadata({ params }) {
//   const { productId } = params;
//   const { name } = await getProduct(productId);
//   return {title: `Product ${name}`}
// }

export default async function page({ params }) {

  const { productId } = await params;
  const {itemName, description, itemsize, photos, price, quantity_available} = await getProduct(productId);

  return (
    <div className="lg:grid lg:grid-cols-2 flex flex-col lg:gap-20 mx-auto lg:items-center lg:w-[90%] w-[50%]">
      
      {/* Left Column */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
          <Image
            src={photos[0]}
            alt={itemName}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4">
          {photos.map(photo => (
            <div 
              key={photo}
              className="relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer aspect-square"
            >
              <Image 
                src={photo}
                fill
                sizes="80px"
                alt={itemName}
                className="object-cover object-top hover:border-2 hover:border-[var(--orange-main)]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col h-full justify-around lg:-translate-y-12">

        <div className="flex flex-col py-6 lg:py-12 gap-5 text-left">
          <p className="text-[var(--orange-main)] font-bold lg:text-xl text-md">Shopify</p>
          <h1 className="font-bold lg:text-4xl text-2xl">{itemName}</h1>
          <p className="text-1xl text-gray-500">{description}</p>
          <p className="font-bold text-2xl">${price}</p> 
        </div>

        <div className="grid grid-rows-2 lg:grid-cols-[1fr_2fr] items-center lg:w-[70%] gap-2 text-l">
          <div className="flex items-center justify-between bg-gray-300 p-2 rounded-md text-[var(--orange-main)] font-bold">
            <button className="hover:text-[var(--orange-secondary)]">
              <FaMinus />
            </button>
            <p className="text-black text-md">0</p>
            <button className="hover:text-[var(--orange-secondary)]">
              <FaPlus />
            </button>
          </div>
          <button className="flex gap-3 items-center justify-center bg-[var(--orange-main)] 
            p-2 rounded-md text-white font-bold 
            shadow-[0_10px_20px_-5px_rgba(255,125,26,0.8)] 
            ">
            {<BsCart3 />} Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

