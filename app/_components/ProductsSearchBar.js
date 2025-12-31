"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

function ProductsSearchBar() {

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // const categoryParams = searchParams.get("category") ?? "all"
  const initialSearch = searchParams.get("search") ?? "";

  const [searchedValue, setSearchedValue] = useState(initialSearch);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if(searchedValue) {
      params.set("search", searchedValue);
    }
    else {
      params.delete("search");
    }

    const timeout = setTimeout(() => {
      router.replace(`?${params.toString()}`);
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [searchedValue])

  return (
      <input
        type="search"
        placeholder="Search products..."
        value={searchedValue}
        onChange={(e) => setSearchedValue(e.target.value)}
        className="max-[640px]:text-xs text-(--gray-text) grid-cols-2 px-3 py-2 w-full max-w-sm rounded border border-(--orange-main) focus:outline-(--orange-main)"
      />  
      
  )
}

export default ProductsSearchBar
