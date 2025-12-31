import Link from "next/link"

function SideNavigation({ categoryFilter, typeFilter }) {
  const categories = ["all",  "jackets", "pants", "shirts", "shoes", ]

  const addCategory = categoryFilter !== "all" ? categoryFilter : "all";
  
  return (
    <div className="flex flex-col items-start gap-2 border-r-2 border-(--orange-secondary)">
      { categories.map(cat => (
          <Link 
            href={`/products/${cat}?category=${addCategory}`}
            key={cat}
            className={`category-link text-(--gray-text)  ${cat === typeFilter ? 'underline font-bold' : ''}`} 
          >
            {cat}
          </Link>
        ))
      }

    </div>
  )
}

export default SideNavigation
