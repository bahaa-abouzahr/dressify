import { useSearchParams } from "next/navigation";

function ProductsFilterDropdown({ label, isOpen, onToggle, children}) {
  const sp = useSearchParams();

  // type of window to make sure we are rendering on the Browser not on Server
  const width = typeof window !== "undefined" ? window.innerWidth : 0;

  const active = 
    (label === "Sort by" && sp.get("sort")?.length > 0 && sp.get("sort") !== "popular")
    || (label === "s" )
    ||(label === "Price" && (sp.get("min")?.length > 0 || sp.get("max")?.length > 0))

  return (
    <div className="relative ">
      <button
        type="button"
        onClick={onToggle}
        className={`xs:px-4 px-2 py-2 flex items-center gap-2 text-xs xs:text-sm pointer-cursor border border-(--orange-main) ${active ? "bg-(--cream-secondary)" : ""}`}
      >
        {label}
        <span className="text-xs">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className={`absolute ${label === "Price" && width < 1050 ? "right-[-80]" : "left-0"} top-8 mt-2 border border-(--orange-main) `}>
          <div className={` relative bg-(--cream-main) ${label === "Price" ? "w-60" : "w-45"} 
          `}>
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsFilterDropdown
