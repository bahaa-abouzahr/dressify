import UploadProductForm from "@/app/_components/UploadProductForm";

export const metadata = {
  title: "Admin Dashboard",
  description: "Manage products, orders, and store settings.",
};

function page() {
  
  return (
    <div className="flex flex-col gap-2 pl-0.5 pr-1">
      <h1 className="xs:text-xl text-lg pl-2 mb-1">Upload New Product</h1>
      <UploadProductForm />
    </div>
  )
}

export default page
