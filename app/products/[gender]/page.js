import { getProducts, getProductSizes } from "@/app/_lib/data-service";
import { createClient } from "@/app/_lib/supabase/server";
import { Suspense } from "react";

import CategoryFilter from "@/app/_components/CategoryFilter";
import ProductsFilters from "@/app/_components/ProductsFilters";
import ProductsList from "@/app/_components/ProductsList";
import ProductsNavigation from "@/app/_components/ProductsNavigation";
import ProductsPagination from "@/app/_components/ProductsPagination";
import ProductsSearchBar from "@/app/_components/ProductsSearchBar";
import Spinner from "@/app/_components/Spinner";

export const metadata = {
  title: "Our Collection",
  description: 
  "Explore our latest collection of high-quality clothing for men, women, and kids. Discover stylish pieces designed for comfort, durability, and everyday confidence.",
}

async function page({ params, searchParams }) {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  // filter for choosing category as Men, women, or kids, And for Search Feature
  const awaitedSearchParams = await searchParams;
  const search = awaitedSearchParams?.search ?? "";
  const category = awaitedSearchParams?.category ?? "all";
  const sort = awaitedSearchParams?.sort ?? "";
  const selectedSizes = awaitedSearchParams?.s?.split("_") ?? [];// converting to array
  const minPrice = awaitedSearchParams?.min ?? "";
  const maxPrice = awaitedSearchParams?.max ?? "";

  // filter for choosing type of items ex. shoes, shirts...
  const gender = (await params).gender;

  const currentPage = Number(awaitedSearchParams?.page ?? 1);

  const latest = awaitedSearchParams?.sort == "latest" ? true : false

  const {products, totalPages} = 
    await getProducts({
      page: currentPage, 
      gender, 
      category, 
      latest, 
      search,
      sort,
      selectedSizes,
      minPrice,
      maxPrice
    }) 
 
  // getting current products sizes available based on choosed category and type
  const products_sizes = await getProductSizes(category, gender) ;

  const sizes = (products_sizes ?? [])
    .sort((a, b) => a.size_order - b.size_order)   // sort based on size order
    .filter((item, index, arr) =>                  // remove duplicates
      arr.findIndex((r) => r.size === item.size) === index
    )
    .map((r) => r.size);                          
  
  return (
    <div className="grid sm:grid-cols-[8rem_1fr] h-full w-full gap-4 px-2 mb-10">
      <div className="hidden sm:block">
        <ProductsNavigation />
      </div>

      <div className="flex flex-col gap-2">

        <div className="gap-2 xs:gap-4 flex max-lg2:flex-col flex-row">
          <CategoryFilter />

          <div className="sm:hidden">
            <ProductsNavigation />
          </div>

          <ProductsFilters products_sizes={sizes} />
        </div>

        {/* Search: full width on mobile, fixed size on desktop */}
        <div className="w-full sm:max-w-xl">
          <ProductsSearchBar />
        </div>

        <Suspense fallback={<Spinner />} key={gender}>
          <ProductsList 
            products={products}
            search={search} 
            userId={userId}
          />
        </Suspense>
        {totalPages ? 
          <ProductsPagination 
            products_number={products.length} 
            currentPage={currentPage} 
            totalPages={totalPages} 
          />
          : ''
        }
      </div>
    </div>
  )
}

export default page;