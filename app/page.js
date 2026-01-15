import Image from "next/image";
import Link from "next/link";

import bg1 from "@/public/Home/bg-1.webp"
import women from "@/public/Home/women.avif"
import kids from "@/public/Home/kids.avif"
import men from "@/public/Home/men.avif"

export default async function Page() {
  
  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="relative h-[350px] bg-cover bg-center">
          <Image 
            src={bg1}
            alt="Home-page photo"
            className="w-[full] md:h-[350px] h-[300px] object-cover"
          />

          <div className="absolute inset-y-[20] left-10 flex justify-start items-center">
            <div className="text-white xs:text-4xl text-2xl font-bold">
              <h1>Built for Fighters.</h1>
              <h1>Made to Last.</h1>
            </div>
          </div>

        </div>

        <div>
          <h1 className="text-center text-2xl font-medium text-gray-500 mb-6">
            Who do you want to shop for
          </h1>
          
          <div className="grid grid-cols-3 max-xs:grid-cols-1 gap-4">
            <Link 
              href="/products/all?category=women" 
              className="relative w-full h-[450px]"
              scroll={false}
            >
              <Image 
                src={women}
                alt="Home-page photo"
                className="max-h-100 xs:object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
                <h3 className="absolute inset-x-[40%] inset-y-[50%] text-white font-bold text-2xl">
                  Women
                </h3>
            </Link>

            <Link 
              href="/products/all?category=kids" 
              className="relative w-full h-[450px]"
              scroll={false}
            >
              <Image 
                src={kids}
                alt="Home-page kids"
                className="w-full max-h-100 xs:object-cover"
                fill
                sizes="(max-width: 768px) 80vw, 50vw"
              />
                <h3 className="absolute inset-x-[40%] inset-y-[50%] text-white font-bold text-2xl">
                  Kids
                </h3>
            </Link>

            <Link 
              href="/products/all?category=men" 
              className="relative w-full h-[450px]"
              scroll={true}
            >
              <Image 
                src={men}
                alt="Home-page men"
                className="w-full max-h-100 xs:object-cover"
                fill
                sizes="(max-width: 768px) 80vw, 50vw"
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
