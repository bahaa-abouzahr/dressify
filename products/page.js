import { usePathname, useRouter } from "next/navigation"


function page() {
  const pathName = usePathname();
  const router = useRouter();
 
  console.log(pathName);
  return (
    <div>
      
    </div>
  )
}

export default page
