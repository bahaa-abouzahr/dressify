
import ProductsList from "@/app/_components/ProductsList"
import SideNavigation from "@/app/_components/SideNavigation"
import CategoryFilter from "@/app/_components/CategoryFilter";

async function page({ params, searchParams }) {
  // filter for choosing category as Men, women, or kids
  const categoryFilter = searchParams?.category ?? "all";

  // filter for choosing type of items ex. shoes, shirts...
  const typeFilter = await(params).type;

  return (
    <div className="grid grid-cols-[4.5rem_1fr] h-full gap-4">
      <SideNavigation categoryFilter={categoryFilter} typeFilter={typeFilter} />
      <div className="ml-2">
        <div className="flex justify-end mb-8" >
          <CategoryFilter />
        </div>
        <ProductsList typeFilter={typeFilter} categoryFilter={categoryFilter} />

      </div>
    </div>
  )
}

export default page
