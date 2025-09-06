import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }) {
  const {id, itemName, type, photos, price} = product;

  return (
    <Link href={`/products/${id}`} className="relative aspect-square hover:border-4 hover:border-[var(--orange-main)] overflow-hidden">
      <Image 
        src={photos[0]}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        alt={itemName}
        className="object-cover object-top transition-transform duration-200 hover:scale-115"
      />  
      <div className=
        "w-[80%] max-[638px]:w-[70%] absolute bottom-[10%] left-[5%] text-gray-500 text-[13px] max-[1040px]:text-[10px] max-md:text-[12px] max-[638px]:text-xs flex justify-between items-center border-3 border-gray-200 rounded-2xl px-1.5 py-1.5 bg-gray-50"
      >
        <p className="font-bold">{itemName}</p>
        <p className="bg-gray-400 text-gray-50 px-1.5 border-1 border-gray-200 rounded-2xl">{price}$</p>
      </div>
    </Link>
  )
}

export default ProductCard;
