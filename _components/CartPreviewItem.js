import Link from "next/link"

async function CartPreviewItem({ product, item }) {
  console.log(product);

  return (
    <div>
      <Link href={`/products/all/${item.productId}`} 
        className="category-link"
      >
        {product.name} : {product.price}$ x {item.quantity}
      </Link>
    </div>
  )
}

export default CartPreviewItem
