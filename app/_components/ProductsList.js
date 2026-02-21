import ProductCard from "@/app/_components/ProductCard";
import { getAllProducts, getProducts } from "@/app/_lib/data-service";

async function ProductsList({ products, search, userId }) {

  const displayedProducts = products.filter(product => product["productName"].toLowerCase().includes(search))

  // break when there are no products
  if(!products.length || !displayedProducts.length) 
    return (
      <p className="text-xl text-(--gray-text) text-center py-10">
        Sorry! No products with this filter currently available
      </p>
    )

  return (
    <div className="grid gap-5 sm:grid-cols-[repeat(auto-fill,minmax(150px,200px))] grid-cols-2 sm:justify-between">
      {displayedProducts.map(product => (
        <ProductCard product={product} userId={userId} key={product.id} />
      ))}
    </div>
  )
}

export default ProductsList
