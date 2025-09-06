import Link from "next/link"

function SideNavigation() {
  
  return (
    <div className="flex flex-col items-start">
      <Link href="/products" className="category-button">All Items</Link>
      <Link href="/products/tshirts" className="category-button">Tshirts</Link>
      <Link href="/products/pants" className="category-button">Pants</Link>
      <Link href="/products/shoes" className="category-button">Shoes</Link>
    </div>
  )
}

export default SideNavigation
