"use client"

import Image from "next/image";
import Link from "next/link";

import { format } from "date-fns";

import { FaRegTrashAlt } from "react-icons/fa";

function WishlistItemDetails({ product, handleDelete, created_at }) {
  const {id, description, photos, price, productName} = product;

  const date = new Date(created_at);


  return (
    <div className="grid grid-cols-[1fr_3fr_1fr_1fr] md2:grid-cols-[1fr_3fr_2fr_2fr_1fr] items-center gap-2 w-full md:w-[80%] h-20 border border-(--cream-secondary) rounded-2xl">
      <Link 
        className="relative w-15 h-15 ml-2"
        href={`/products/all/${id}`} 
      >
        <Image
          src={photos[0]} 
          alt={productName}
          width={60}
          height={60}
          className="object-cover object-top w-15 h-15 hover:scale-120 focus:scale-120 rounded-lg "
          
        />
      </Link>

      <Link href={`/products/all/${id}`} 
        className="md2: text-xs text-md md2:font-medium border-b-2 border-transparent hover:border-current transition-all w-fit"
      >
        {productName}
      </Link>


      <span className="flex justify-center xs:text-sm text-xs px-1"><span className="hidden md2:block">Price: </span> {price}$</span>

      <div className="hidden xs:flex flex-col xs:text-xs text-[10px] ">
        <span>Added Date</span>
        <span>{format(date, "dd MMM yy")}</span>

      </div>

      <button className="cursor-pointer flex justify-center" onClick={() => handleDelete(id)}><FaRegTrashAlt /></button>
    </div>
  )
}

export default WishlistItemDetails;
