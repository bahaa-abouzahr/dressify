"use client"
import { useRouter } from "next/navigation";


function ProductVariants({ variants, selectedVariant }) {
  const router = useRouter();

  return (
    <div className="flex gap-1">
      {variants.map(variant => {
        return (
          <button 
            key={variant.id}
            disabled={!variant.stock}
            className=
              {`${selectedVariant.sku === variant.sku && variant.stock ? 'bg-(--orange-main) border-0' : ''} 
              cursor-pointer flex flex-row items-center justify-center gap-2 
              w-10 h-5 mb-2 rounded-md text-xs border hover:border-(--orange-secondary) 
              ${variant.stock === 0 ? "bg-gray-200 opacity-40 cursor-not-allowed pointer-events-none" : ""}`}
            onClick={() => router.replace(`?sku=${variant.sku}`, { scroll: false })}
          >
            {variant.size}
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
