import Image from "next/image"
import Link from "next/link"
import about1 from "@/public/About/about1.jpg"
import about2 from "@/public/About/about2.jpeg"

export const metadata = {
  title: "About",
}


function page() {
  return (
    <div className="flex flex-col gap-10">
       <div className="grid grid-cols-2 w-[90%] gap-10">
          <Image 
            src={about1} 
            alt="Shoes store"
            className="h-auto"
            />
          <div className="flex flex-col gap-3">
            <h1 className="text-xl text-gray-500 font-medium">
              Step into Comfort
            </h1>
            <p className="text-1xl text-gray-500">
              Our premium shoes are crafted to provide all-day comfort without
              sacrificing style. Whether you’re walking city streets or exploring new destinations, every step feels effortless.
            </p>
          </div>
       </div>

       <div className="grid grid-cols-2 w-[90%] gap-10">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl text-gray-500 font-medium">
              Style That Moves With You
            </h1>
            <p className="text-1xl text-gray-500">
              Designed for those who value both fashion and functionality, our shoes let you express
            yourself while keeping your feet supported and comfortable. Make every step a statement.
            </p>
          </div>
          <Image 
            src={about2} 
            alt="Shoes store" 
            className="h-auto"
          />
       </div>
    </div>
  )
}

export default page
