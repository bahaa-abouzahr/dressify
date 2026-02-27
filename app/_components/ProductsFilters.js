"use client"


import { useState } from "react";
import ProductsFilterDropdown from "./ProductsFilterDropdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { IoCheckmark } from "react-icons/io5";
import { useEffect } from "react";
import ApplyResetButtons from "./ApplyResetButtons";
import { SIZE_OPTIONS } from "../_utils/constants";
import { usePreviewState } from "./PreviewStateContext";

const FILTER_DEFS = [
  {
    key: "sort",
    label: "Sort by",
    kind: "single",
    param: "sort",
    options: [
      { value: "popular", label: "Most Popular" },
      { value: "newest", label: "Newest" },
      { value: "price_asc", label: "Lowest Price" },
      { value: "price_desc", label: "Highest Price" },
      { value: "onSale", label:"On Sale"}
    ],
  },
  {
    key: "size",
    label: "Size",
    kind: "multi",
    param: "size",
  },
  {
    key: "price",
    label: "Price",
    kind: "range",
    paramMin: "min",
    paramMax: "max",
  },

];

function ProductsFilters({ products_sizes }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const {openFilters, setOpenFilters} = usePreviewState();
  const [pendingSizes, setPendingSizes] = useState([]);
  const [minRange, setMinRange] = useState(sp.get("min") ?? "");
  const [maxRange, setMaxRange] = useState(sp.get("max") ?? "");

  // --- read current selections from URL ---
  const selectedSort = sp.get("sort") ?? "popular";
  const selectedSizes = sp.get("s")?.split("_").filter(Boolean) ?? [];;

  // to get updated size options based on filters
  FILTER_DEFS[1]["options"] = products_sizes.map((v) => ({ value: v, label: v }));

  useEffect(() => {
    setMinRange(sp.get("min") ?? "")
    setMaxRange(sp.get("max") ?? "")
  }, [sp])

  useEffect(() => {
    setPendingSizes(selectedSizes);
  }, [sp.get("s")]);

  
  // URL helpers
  function pushParams(params) {
    params.set("page", "1"); // reset pagination on any filter change
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  
  function setSingle(param, value) {
    const params = new URLSearchParams(sp.toString());
    if(!value) params.delete(param);
    else params.set(param, value);
    pushParams(params);
  }
  
  // toggle sizes state, add if not existing, remove if already in pendingSizes
  function toggleMulti(param, value) {
    setPendingSizes(prev =>
      prev.includes(value) ? prev.filter(s => s !== value) : [...prev, value]
  );
  }

  function applySizes() {
    const params = new URLSearchParams(sp.toString());
    params.delete("size")
    const finalSizes = pendingSizes.join("_")

    params.set("s", finalSizes)
    pushParams(params);
    setOpenFilters(null)
  }
  
  function resetSizes(){
    const params = new URLSearchParams(sp.toString());
    params.delete("s")
    pushParams(params);
    
    setOpenFilters(null)
    setPendingSizes([])
  }
  
  // set price range to URL
  function applyPrice() {
    const params = new URLSearchParams(sp.toString());

    if (minRange === "") params.delete("min");
    else params.set("min", String(minRange));

    if (maxRange === "") params.delete("max");
    else params.set("max", String(maxRange));

    params.set("page", "1");
    setOpenFilters(null)
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // remove all prices range from URL
  function resetPrice() {
    const params = new URLSearchParams(sp.toString());

    setMinRange("");
    setMaxRange("");

    params.delete("min");
    params.delete("max");

    setOpenFilters(null)
    pushParams(params);
  }

  function resetAll() {
    // confirmation
    const ok = window.confirm("Remove all filters? Sort/S")
    if(!ok) return;

    // reset local state
    setPendingSizes([]);
    setMinRange("");
    setMaxRange("");
    setOpenFilters(null);

    // reset URL
    const params = new URLSearchParams(sp.toString());
    params.delete("s");
    params.delete("min");
    params.delete("max");
    params.delete("sort");
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // To submit price range when Enter is clicked
  function onPriceEnterKey(e) {
    if(e.key === "Enter") {
      e.preventDefault();
      applyPrice();
    }
  }
  
  return (
    <div className="flex flex-wrap xs:gap-3 sm:justify-start justify-between z-40 bg-red ">
      {FILTER_DEFS.map((def) => (
        <ProductsFilterDropdown 
          key={def.key}
          label={def.label}
          isOpen={openFilters === def.key}
          onToggle={() => setOpenFilters(openFilters === def.key ? null : def.key)}
        >
            {def.kind === "single" && (
              <div>
                <ul className="">
                  {def.options.map((opt) => (
                    <li key={opt.value}>
                      <button 
                        type="button" 
                        className={
                          `h-10 w-full text-left p-3 hover:bg-(--cream-secondary) cursor-pointer
                          ${selectedSort === opt.value ? "font-semibold" : ""}
                        `}
                        onClick={() => {
                          setSingle(def.param, opt.value);
                          setOpenFilters(null);
                        }}
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {def.kind === "multi" && (
              <div className="flex flex-col">
              <div className="max-h-70 overflow-y-auto ">
                <ul className="">
                  {def.options.map((opt) => {
                    const checked = pendingSizes.includes(opt.value);
                    const label = SIZE_OPTIONS.find(s => s.value === opt.value)?.label ?? opt.label;

                    return (
                      <li 
                        key={opt.value} 
                        className={`
                          flex items-center justify-between m border-b border-(--gray-bg) h-10 text-left 
                           hover:bg-(--cream-secondary) ${checked && "font-bold"}
                        `}
                      >
                        <button 
                          type="button" 
                          onClick={() => toggleMulti(def.param, opt.value)}
                          className={`w-full h-full text-left text-sm mx-2 cursor-pointer`}
                        >
                          {label}
                        </button>
                        {checked && <IoCheckmark  />}
                      </li>
                    )})}
                  </ul>
                </div>

                <ApplyResetButtons apply={applySizes} onPriceEnterKey={onPriceEnterKey} reset={resetSizes} />
              </div>
            )}
            {/* <ApplyResetButtons apply={applyPrice} reset={resetPrice} /> */}

            {def.kind === "range" && (
              <div className="space-y-3 p-2">
                <div className="flex gap-2 items-center">
                {/* Min Range input */}
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Min"
                      className="max-w-25 border px-2 py-1"
                      value={minRange}
                      onChange={(e) => setMinRange(e.target.value)}
                      onKeyDown={onPriceEnterKey}
                      />
                    <span className="absolute right-2 top-1.5 text-sm">$</span>
                  </div>
                  <span>-</span>
                  {/* Max Range input */}
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Max"
                      className="max-w-25 border px-2 py-1"
                      value={maxRange}
                      onChange={(e) => setMaxRange(e.target.value)}
                      onKeyDown={onPriceEnterKey}
                    />
                    <span className="absolute right-2 top-1.5 text-sm">$</span>
                  </div>
                </div>

                <ApplyResetButtons apply={applyPrice} reset={resetPrice} />
              </div>

              // Reset All Button
            )}

        </ProductsFilterDropdown>

      ))}
      <button
        className={`border px-4 py-2 flex items-center gap-2 xs:text-sm text-xs cursor-pointer border-(--orange-main) hover:bg-(--cream-secondary)`}
        onClick={resetAll}
      >
        Reset All
      </button>
    </div>

  )
}

export default ProductsFilters
