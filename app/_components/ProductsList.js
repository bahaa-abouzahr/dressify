import ProductCard from "@/app/_components/ProductCard";
import { getAllProducts, getProducts } from "../_lib/data-service";

async function ProductsList({ typeFilter, categoryFilter }) {

  const products = typeFilter === "all" ? await getAllProducts() : await getProducts(typeFilter);
 
  const displayedProducts = categoryFilter === "all" ? products : products.filter(item => item.category === categoryFilter)

  // break when there are no products
  if(!products.length || !displayedProducts.length) return <p>No products found</p>;

  return (
    <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3">
      {displayedProducts.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}

export default ProductsList
