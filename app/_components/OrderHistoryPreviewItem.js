"use client"

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS_IMAGE_BASE } from "../_lib/constants";

function OrderHistoryPreviewItem({ item, deliveryDate }) {
  const currentDate = new Date();
  
  const FOURTEEN_DAYS_MS = 14*24*60*60*1000;
  const returnDate = new Date(deliveryDate.getTime() + FOURTEEN_DAYS_MS)

  const { product_id, photo, product_name_at_purchase, quantity, selectedOptions } = item;
  console.log(photo);
  return (
    <div className="grid grid-cols-[1fr_6fr_auto_auto] gap-5 md2:text-base xs:text-sm text-xs">
      <Link 
        className="relative w-14 h-14 md2:w-18 md2:h-20"
        href={`/products/all/${product_id}`} 
        onClick={() => setCartToggle(false)}
      >
        <Image
          src={`${PRODUCTS_IMAGE_BASE}${photo}`} 
          alt={product_name_at_purchase}
          width={80}
          height={80}
          className="object-cover object-top w-20 md2:h-18 h-15"
        />
      </Link>

      <div className="flex flex-col">
        <Link
          href={`/products/all/${product_id}`}  
          className="cursor-pointer hover:underline font-semibold w-fit">
            {product_name_at_purchase}
        </Link>
        <div className="flex flex-col gap xs:text-[11px] text-[9px]">
          <span className="italic">Return Item before:</span>
          <span className="italic ">{format(returnDate, "dd MMM yy")}</span>

        </div>


      </div>

      <div className="flex flex-col text-center md2:text-sm xs:text-xs text-[9px]">
        <span>Quantity:</span>
        <strong>{quantity}</strong>
      </div>

      <div>
        <span>{selectedOptions}</span>
      </div>
    </div>
  )
}

export default OrderHistoryPreviewItem
