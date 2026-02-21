"use client"
import Link from "next/link";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"

function TypeFilter() {
  const params = useParams().gender;
  const searchParams = useSearchParams();
  const category = searchParams.get('category') ?? "all";

  return (
    <div className="border border-(--orange-main) flex justify-around items-center lg2:min-w-lg ">
      <CustomLink gender='all' category={category} params={params}>All Categories</CustomLink>
      <CustomLink gender='women' category={category} params={params}>Women</CustomLink>
      <CustomLink gender='men' category={category} params={params}>Men</CustomLink>
      <CustomLink gender='kids' category={category} params={params}>Kids</CustomLink>
    </div>
  )
}

function CustomLink({ gender, category, params, children}) {

  return (
    <Link 
      href={`/products/${gender}?category=${category}`}
      className={`
        py-2 xs:px-2 text-xs sm:text-sm font-medium text-(--gray-text) 
        hover:bg-(--cream-secondary) cursor-pointer w-full text-center
        ${gender === params ? 'bg-(--cream-secondary) text-black' : ''}`}
    >
      {children}
    </Link>
  )
}

export default TypeFilter
