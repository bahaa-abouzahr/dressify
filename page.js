import Image from "next/image";
import Link from "next/link";

import bg1 from "@/public/Home/bg-1.webp"
import women from "@/public/Home/women.avif"
import kids from "@/public/Home/kids.avif"
import men from "@/public/Home/men.avif"


export default function Page() {
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="relative h-[350px] bg-cover bg-center">
          <Image 
            src={bg1}
            alt="Home-page photo"
            className="w-[full] h-[350px] object-cover"
          />

          <div className="absolute inset-y-20 left-10 flex justify-start items-center">
            <div className="text-white text-4xl font-bold">
              <h1>Built for Fighters.</h1>
              <h1>Made to Last.</h1>
            </div>
          </div>

        </div>

        <div>
          <h1 className="text-center text-2xl font-medium text-gray-500 mb-6">
            Who do you want to shop for
          </h1>
          
          <div className="grid grid-cols-3 max-md2:grid-cols-1 gap-4">
            <Link href="/women" className="relative w-full h-[450px] max-md2:h-[600px]">
              <Image 
                src={women}
                alt="Home-page photo"
                className="w-[full] object-cover"
                fill
                />
                <h3 className="absolute inset-x-[40%] inset-y-[50%] text-white font-bold text-2xl">
                  Women
                </h3>
            </Link>

            <Link href="/kids" className="relative w-full h-[450px] max-md2:h-[600px]">
              <Image 
                src={kids}
                alt="Home-page kids"
                className="w-[full]  object-cover"
                fill
                />
                <h3 className="absolute inset-x-[40%] inset-y-[50%] text-white font-bold text-2xl">
                  Kids
                </h3>
            </Link>

            <Link href="/men" className="relative w-full h-[450px] max-md2:h-[600px]">
              <Image 
                src={men}
                alt="Home-page men"
                className="w-[full] object-cover"
                fill
                />
                <h3 className="absolute inset-x-[40%] inset-y-[50%] text-white font-bold text-2xl">
                  Men
                </h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
