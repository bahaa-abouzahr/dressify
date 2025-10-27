import Link from "next/link"
import { BsCheckLg } from "react-icons/bs"

function SideNavigation({ categoryFilter }) {
  const categories = ["all", "shoes", "shirts", "jackets"]

  const addCategory = categoryFilter !== "all" ? categoryFilter : "all";
  
  return (
    <div className="flex flex-col items-start gap-2">
      { categories.map(cat => (
          <Link 
            href={`/products/${cat}?category=${addCategory}`}
            key={cat}
            className="category-link" 
          >
            {cat}
          </Link>
        ))
      }

    </div>
  )
}

export default SideNavigation
