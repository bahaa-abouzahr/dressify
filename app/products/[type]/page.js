import ProductsList from "@/app/_components/ProductsList"
import SideNavigation from "@/app/_components/SideNavigation"
import CategoryFilter from "@/app/_components/CategoryFilter";
import ProductsSearchBar from "@/app/_components/ProductsSearchBar";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";

async function page({ params, searchParams }) {

  // filter for choosing category as Men, women, or kids, And for Search Feature
  const awaitedSearchParams = await searchParams;
  const search = awaitedSearchParams?.search ?? "";

  const categoryFilter = awaitedSearchParams?.category ?? "all";

  // filter for choosing type of items ex. shoes, shirts...
  const awaitedParams = await params;
  const typeFilter = awaitedParams.type;


  return (
    <div className="grid grid-cols-[4.5rem_1fr] max-[640px]:grid-cols-[4rem_1fr] h-full gap-4 px-2 mb-10">
      <SideNavigation categoryFilter={categoryFilter} typeFilter={typeFilter} />
      <div>
        <div className="grid xs:grid-cols-[1fr_auto] grid-rows-2 justify-between mb-6 gap-2 max-xs:h-17 h-10" >
          <div className="order-2 xs:order-1">
            <ProductsSearchBar />
          </div>
          <div className="order-1 xs:order-2">
            <CategoryFilter />
          </div>
        </div>
        <Suspense fallback={<Spinner />} key={typeFilter}>
          <ProductsList typeFilter={typeFilter} categoryFilter={categoryFilter} search={search} />
        </Suspense>

      </div>
    </div>
  )
}

export default page;