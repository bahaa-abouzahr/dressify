import AddToCart from "@/app/_components/AddToCart";
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

  const {itemName, description, itemsize, photos, price, quantity_available} = await getProduct(productId);

  // SIZE NOT ADDED YET!!!
  
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

        <AddToCart productId={productId} price={price} />

      </div>
    </div>
  )
}

