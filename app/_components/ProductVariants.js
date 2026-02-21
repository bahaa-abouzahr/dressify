"use client"
import { useRouter } from "next/navigation";
import { SIZE_LABEL_BY_VALUE, SIZE_OPTIONS } from "../_utils/constants";


function ProductVariants({ variants, selectedVariant }) {
  const router = useRouter();

  return (
    <div className="xs:flex gap-1 grid grid-cols-[repeat(auto-fill,minmax(50px,80px))] ">
      {variants.map(variant => {
        const label = SIZE_LABEL_BY_VALUE[variant.size] ?? variant.size;
        
        return (
          <button 
            key={variant.id}
            disabled={!variant.stock}
            className=
              {`${selectedVariant.sku === variant.sku && variant.stock ? 'bg-(--orange-main) border-0' : ''} 
              cursor-pointer flex flex-row items-center justify-center gap-2 
              ${variant.size.length > 5 ? "w-20" : "w-15"} h-5 mb-2 rounded-md text-xs border hover:border-(--orange-secondary) 
              ${variant.stock === 0 ? "bg-gray-200 opacity-40 cursor-not-allowed pointer-events-none" : ""}`}
            onClick={() => router.replace(`?sku=${variant.sku}`, { scroll: false })}
          >
            {label}
            {variant.stock === 0 && (
              <span className="absolute text-red-800 text-xl font-bold">✕</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default ProductVariants
