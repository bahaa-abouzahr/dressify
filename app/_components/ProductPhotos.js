"use client"

import Image from "next/image"
import { useEffect, useState } from "react";
import { PRODUCTS_IMAGE_BASE } from "../_lib/constants";

function ProductPhotos({ photos, productName }) {

  const [activePhoto, setActivePhoto] = useState(0);

  function handleThumbnailClick(ind) {
    setActivePhoto(ind);
  }


  return (
    <div className="flex flex-col gap-4 ">
        <div className="relative w-full aspect-square md2:rounded-2xl overflow-hidden ">
          <Image
            src={`${PRODUCTS_IMAGE_BASE}${photos[activePhoto]}`}
            alt={productName}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
            priority
          />
        </div>

        {/* Thumbnails */}
        <div className={`flex gap-4 w-full max-w-full sm:max-w-[400px] md:max-w-[480px] min-w-[240px]`}>
          {photos.map((photo, ind) => (
            <div 
            key={photo}
            className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer 
              aspect-square hover:border-3 hover:border-(--orange-main) 
              ${activePhoto === ind ? "opacity-60" : ""}`}
            >
              <Image 
                src={`${PRODUCTS_IMAGE_BASE}${photo}`}
                fill
                sizes="80px"
                alt={productName}
                className="object-cover object-top"
                onClick={() => handleThumbnailClick(ind)}
                
              />
            </div>
          ))}
        </div>
      </div>
  )
}


export default ProductPhotos;
