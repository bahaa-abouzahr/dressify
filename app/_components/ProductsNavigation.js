"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function ProductsNavigation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('category') ?? "all";
  
  const categories = ["all",  "jackets", "pants", "shirts", "shoes", "bags"]

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("category", filter);
    router.replace(`${pathname}?${params.toString()}`, {scroll: false})
  }

  return (
    <div className="flex sm:flex-col justify-between w-full max-sm:border max-sm:border-(--orange-main)">
      { categories.map(cat => (
          <Button filter={cat} handleFilter={handleFilter} activeFilter={activeFilter} key={cat}>
            {cat}
          </Button>
        ))
      }
    </div>
  )
}

function Button({ filter, handleFilter, activeFilter, children}) {
  return (
    <button 
      onClick={() => handleFilter(filter)}
      className={`
        px-1 py-2 text-xs sm:text-base font-medium text-(--gray-text) w-full   
        hover:bg-(--cream-secondary) cursor-pointer 
        ${filter === activeFilter ? 'bg-(--cream-secondary) text-black' : ''}`}
    >
      {children}
    </button>
  )
}

export default ProductsNavigation
