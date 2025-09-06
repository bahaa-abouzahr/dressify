
import ProductCard from "@/app/_components/ProductCard";
import { getAllProducts, getProducts } from "../_lib/data-service";

async function ProductsList({ searchParams }) {
  console.log(searchParams);


  const products = await getProducts("shoes");
  if(!products.length) return <p>No products found</p>;

  return (
    <div className="grid grid-cols-3 gap-7 max-md:grid-cols-2 max-md:gap-5 max-sm:grid-cols-1">
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}

export default ProductsList
