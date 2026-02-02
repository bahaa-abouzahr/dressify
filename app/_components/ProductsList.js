import ProductCard from "@/app/_components/ProductCard";
import { getAllProducts, getProducts } from "@/app/_lib/data-service";

async function ProductsList({ typeFilter, products, categoryFilter, search }) {
 
  const filteredProducts = categoryFilter === "all" ? products : products.filter(item => item.category === categoryFilter)

  const displayedProducts = filteredProducts.filter(product => product["productName"].toLowerCase().includes(search))

  // break when there are no products
  if(!products.length || !displayedProducts.length) return <p className="text-xl text-(--gray-text)">No products found</p>;

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 gap-5 md3:grid-cols-3 md:grid-cols-4">
      {displayedProducts.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}

export default ProductsList
