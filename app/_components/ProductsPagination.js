"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { PAGE_SIZE } from "../_utils/constants";
function ProductsPagination({products_number, currentPage, totalPages}) {
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handlepagination(action) {

    const params = new URLSearchParams(searchParams);
    if(action === "next" && currentPage < totalPages) {
      params.set("page",  Number(currentPage) + 1);
      router.replace(`${pathname}?${params.toString()}`, {scroll: false})
    }
      if(action === "prev" && currentPage > 1) {
        params.set("page", Number(currentPage) - 1);
        router.replace(`${pathname}?${params.toString()}`, {scroll: false})
      }
  }

  return (
    <div className="flex justify-center items-center mt-5 gap-6">
      <button 
        disabled={currentPage === 1}
        onClick={()=>handlepagination("prev")}
        className={`cursor-pointer text-2xl rounded-2xl 
          enabled:hover:bg-(--orange-main) enabled:hover:text-white
          disabled:opacity-40 disabled:cursor-default
        `}
        aria-label="Go to previous page"
      >
        <RiArrowLeftSLine />
      </button>

      <span className="text-xl leading-none">
        Page {currentPage} of {totalPages}
      </span>

      <button 
        disabled={currentPage === totalPages}
        onClick={() => handlepagination("next")}
        className={`cursor-pointer text-2xl rounded-2xl 
          enabled:hover:bg-(--orange-main) enabled:hover:text-white
          disabled:opacity-40 disabled:cursor-default
        `}
        aria-label="Go to next page"
      >
        <RiArrowRightSLine />
      </button>

    </div>
  )
}

export default ProductsPagination
