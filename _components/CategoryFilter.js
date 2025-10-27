"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

function TypeFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('category') ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("category", filter);
    router.replace(`${pathname}?${params.toString()}`, {scroll: false})
  }

  return (
    <div className="border border-[var(--orange-main)]">
      <Button filter='all' handleFilter={handleFilter} activeFilter={activeFilter}>All Categories</Button>
      <Button filter='men' handleFilter={handleFilter} activeFilter={activeFilter}>Men</Button>
      <Button filter='women' handleFilter={handleFilter} activeFilter={activeFilter}>Women</Button>
      <Button filter='kids' handleFilter={handleFilter} activeFilter={activeFilter}>Kids</Button>
    </div>
  )
}

function Button({ filter, handleFilter, activeFilter, children}) {
  return (
    <button 
      className={`px-5 py-2 text-[var(--gray-text)] hover:bg-[var(--cream-secondary)] ${filter === activeFilter ? 'bg-[var(--cream-secondary)]' : ''}`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  )
}

export default TypeFilter
