"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

function ProductsSearchBar() {

  const router = useRouter();
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
      onChange={(e) => setSearchedValue(e.target.value.toLocaleLowerCase())}
      className="w-full px-3 py-2 rounded border border-(--orange-main) text-(--gray-text) focus:outline-(--orange-main) text-xs sm:text-sm"
    />  
  )
}

export default ProductsSearchBar
