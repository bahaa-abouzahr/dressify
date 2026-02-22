"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { usePreviewState } from "./PreviewStateContext";

function ProductsNavigation() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = sp.get('category') ?? "All Products";
  const activeMobile = sp.get("category")?.length > 0 && sp.get("category") !== "all";

  const categories = ["All Products",  "jackets", "pants", "shirts", "shoes", "bags"]

  const {openCategory, setOpenCategory} = usePreviewState()
  const selectedCategory = sp.get("category") ?? "All Products";


  function handleFilter(filter) {
    const params = new URLSearchParams(sp);

    params.set("category", filter === "All Products" ? "all" : filter);
    router.replace(`${pathname}?${params.toString()}`, {scroll: false})
  }

  return (
    <div className="w-full">
      {/* Mobile dropdown */}
      <div className="sm:hidden relative">
        <button
          type="button"
          onClick={() => setOpenCategory(!openCategory)}
          className={`w-full border border-(--orange-main) px-3 py-2 text-sm text-left ${activeMobile ? "bg-(--cream-secondary)" : ""}`}
        >
          Category: {activeFilter === "all" ? "All Products" : activeFilter}
        </button>
        {openCategory && (
          <div className="absolute bg-(--cream-main) top-full left-0 w-full border border-(--orange-main) z-50">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    handleFilter(cat);
                    setOpenCategory(false);
                  }}
                  className={`
                    h-10 w-full text-left p-3 hover:bg-(--cream-secondary) 
                    ${selectedCategory === cat || (selectedCategory === "all" && cat === "All Products") ? "font-semibold" : ""}
                  `}
                    >
                  {cat}
                </button>
              ))}
            </div>
          )}
      </div>

      {/* Desktop Display */}
      <div className="hidden sm:flex sm:flex-col justify-between w-full max-sm:border max-sm:border-(--orange-main)">
        { categories.map(cat => (
          <Button 
            filter={cat} 
            handleFilter={handleFilter} 
            activeFilter={activeFilter} 
            key={cat}
          >
            {cat}
          </Button>
          ))
        }
      </div>
    </div>
  )
}

function Button({ filter, handleFilter, activeFilter, children}) {
  return (
    <button 
      onClick={() => handleFilter(filter)}
      className={`
        px-1 py-2 text-xs sm:text-base font-medium text-(--gray-text) w-full   
        hover:text-blue-600 rounded-lg cursor-pointer 
        ${filter === activeFilter || (filter === "All Products" && activeFilter === "all") ? 'bg-(--cream-secondary) text-black' : ''}`}
    >
      {children}
    </button>
  )
}

export default ProductsNavigation
