import Link from "next/link"
import { getProducts } from "../_lib/data-service"
import HorizontalProductRow from "./HorizontalProductRow";

async function ProductPreviewRow({ title, sort="", onSale=false, limit }) {

  const {products} = await getProducts({sort, onSale, limit});

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline gap-2">
        <h1 className="font-medium text-(--gray-text) text-xl">{title}</h1>
        <Link 
          href={`/products/all?${sort ? `sort=${sort}` : ""}`}
          className="link text-xs"
          aria-label={`Check ${sort} products `}
        >
          See More
        </Link>
      </div>

      <HorizontalProductRow products={products} />

    </div>
  )
}

export default ProductPreviewRow
