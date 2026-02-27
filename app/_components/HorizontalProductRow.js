"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS_IMAGE_BASE } from "../_utils/constants";

import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

export default function HorizontalProductRow({ products }) {
  const ref = useRef(null);
  console.log(products[0]);

  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.9 * dir, behavior: "smooth" });
  };

  return (
    <div className="relative w-full group">
      {/* Left arrow */}
      <button
        type="button"
        onClick={() => scroll(-1)}
        className="
          absolute left-0 top-1/2 -translate-y-1/2 z-10
          h-15 w-5 rounded-sm
          bg-(--gray-bg) text-(--gray-main) text-3xl
          flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
        aria-label="Scroll left"
      >
        <HiChevronLeft />
      </button>

      {/* Scroll container */}
      <div
        ref={ref}
        className="flex overflow-x-auto scroll-smooth custom-scrollbar"
      >
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/products/p.category/${p.slug}`}
            className="relative shrink-0 h-40 w-30 mx-1"
            aria-label={`Go to ${p.productName} Page`}
          >
            <Image
              src={`${PRODUCTS_IMAGE_BASE}${p.photos[0]}`} // adjust field name
              alt=""
              fill
              className="object-contain p-1 bg-white rounded-2xl gap-2"
              sizes="260px"
            />
          </Link>
        ))}
      </div>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => scroll(1)}
        className="
          absolute right-0 top-1/2 -translate-y-1/2 z-10
          h-15 w-5 rounded-sm
          bg-(--gray-bg) text-(--gray-main) text-3xl
          flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        "
        aria-label="Scroll right"
      >
        <HiChevronRight />
      </button>
    </div>
  );
}
