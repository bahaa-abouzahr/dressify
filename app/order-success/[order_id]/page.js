import ClearCartState from "../../_components/ClearCartState"

import { FaCheck } from "react-icons/fa";

async function page({ params }) {
  const { order_id } = await params;

  return (
    <>
      <ClearCartState />
      <div className="flex flex-col gap-4 justify-center items-center px-4">
        <span className="bg-green-700 text-white w-10 h-10 rounded-full flex items-center justify-center">
          <FaCheck />
        </span>
        <span className="xs:text-2xl text-xl font-semibold">Thank you for your purchase</span>
        <span className="text-(--gray-text) text-center xs:text-lg text-base">We&apos;ve received your order, and it will be delivered in approximately 3 days</span>

        <span className="text-(--gray-text) text-center xs:text-lg text-base">Your order number is <strong className="text-black">{order_id}</strong></span>

        <button className="h-11 w-45 rounded-2xl bg-(--orange-main) hover:bg-(--orange-secondary) focus:bg-(--orange-secondary) text-white">
          Back to Homepage
        </button>
      </div>
    </>
  )
}

export default page
