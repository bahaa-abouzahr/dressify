import ProductsList from "../_components/ProductsList"
import SideNavigation from "../_components/SideNavigation"

function page({ searchParams }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] h-full gap-4">
      <SideNavigation />
      <ProductsList searchParams={searchParams}/>
    </div>
  )
}

export default page
