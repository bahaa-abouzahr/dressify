"use client"

import { usePathname, useRouter } from "next/navigation";

const sortOptions = [
  { value: "default", label: "Default"},
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Lowest Price" },
  { value: "price_desc", label: "Highest Price" },

];

export default function SortFilter({current}) {
  const router = useRouter();
  const pathname = usePathname();
  
  function setSort(value) {
    const params = new URLSearchParams();

    params.set("sort", value);
    params.set("page", "1"); // reset pagination on sort change
    router.replace(`${pathname}?${params.toString()}`, {scroll: false})
  }

  return (
    <div className="relative">
      <label className="mr-2">Sort by</label>
      <select value={current} onChange={(e) => setSort(e.target.value)}>
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}

