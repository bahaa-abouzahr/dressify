import Image from "next/image";
import Link from "next/link";

import bg1 from "@/public/Home/bg-1.webp"
import women from "@/public/Home/women.avif"
import kids from "@/public/Home/kids.avif"
import men from "@/public/Home/men.avif"
import ProductPreviewRow from "./_components/ProductPreviewRow";

export default async function Page() {
  
  return (
    <>
      <div className="flex flex-col xs:gap-20 gap-7 max-w-7xl mx-auto">
        <div className="relative  bg-cover bg-center bg-red-200">
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

        <div className="md2:px-20">
          <h1 className="text-center text-2xl font-medium text-gray-500 xs:mb-10 mb-6">
            Start Shopping!
          </h1>
          
          <div className="grid grid-cols-3 gap-4 place-items-center">
            <Link 
              href="/products/women?category=all" 
              className="relative h-[140px] xs:h-[400px] max-w-2xs w-full"
              scroll={false}
            >
              <Image 
                src={women}
                alt="Home-page photo"
                className="object-cover"
                fill
                sizes="(max-width: 768px) 33vw, 50vw"
              />
                <h3 className="absolute inset-0 flex items-center justify-center text-white font-bold xs:text-2xl">
                  Women
                </h3>
            </Link>

            <Link 
              href="/products/kids?category=all" 
              className="relative h-[140px] xs:h-[400px] max-w-2xs w-full"
              scroll={false}
            >
              <Image 
                src={kids}
                alt="Home-page kids"
                className="object-cover"
                fill
                sizes="(max-width: 768px) 33vw, 50vw"
              />
                <h3 className="absolute inset-0 flex items-center justify-center text-white font-bold xs:text-2xl">
                  Kids
                </h3>
            </Link>

            <Link 
              href="/products/men?category=all" 
              className="relative h-[140px] xs:h-[400px] max-w-2xs w-full"
              scroll={true}
            >
              <Image 
                src={men}
                alt="Home-page men"
                className="object-cover"
                fill
                sizes="(max-width: 768px) 33vw, 50vw"
              />
                <h3 className="absolute inset-0 flex items-center justify-center text-white font-bold xs:text-2xl">
                  Men
                </h3>
            </Link>
          </div>
        </div>

        <ProductPreviewRow title="Newest Collection!" sort={"newest"} limit={12} />
        <ProductPreviewRow title="ON SALE!" sort={"onSale"} limit={12} />

      </div>
    </>
  )
}
