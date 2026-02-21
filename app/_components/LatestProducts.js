import Link from "next/link"
import { getProducts } from "../_lib/data-service"
import Image from "next/image";
import { PRODUCTS_IMAGE_BASE } from "../_utils/constants";
import HorizontalProductRow from "./HorizontalProductRow";

async function LatestProducts() {
  const {products} = await getProducts({ latest: true, limit:12});

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline gap-2">
        <h1 className="font-medium text-(--gray-text) text-xl">Recently Added</h1>
        <Link 
          href="/products/all?sort=latest" 
          className="link text-[11px]"
        >
          See More
        </Link>
      </div>

      <HorizontalProductRow products={products} />

    </div>
  )
}

export default LatestProducts
