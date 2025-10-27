import Link from "next/link"
import { BsCheckLg } from "react-icons/bs"

function SideNavigation({ categoryFilter, typeFilter }) {
  const categories = ["all", "shoes", "shirts", "jackets"]

  const addCategory = categoryFilter !== "all" ? categoryFilter : "all";
  
  return (
    <div className="flex flex-col items-start gap-2 border-r-2 border-[var(--orange-secondary)]">
      { categories.map(cat => (
          <Link 
            href={`/products/${cat}?category=${addCategory}`}
            key={cat}
            className={`category-link text-[var(--gray-text)] ${cat === typeFilter ? 'underline font-bold' : ''}`} 
          >
            {cat}
          </Link>
        ))
      }

    </div>
  )
}

export default SideNavigation
