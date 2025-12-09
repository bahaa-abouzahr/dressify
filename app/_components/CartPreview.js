"use client"

import Link from "next/link";
import CartPreviewItem from "./CartPreviewItem";

import { IoMdClose } from "react-icons/io";
import { usePreviewState } from "./PreviewStateContext";

function CartPreview({ cart, session }) {
const { cartToggle, setCartToggle } = usePreviewState();

  if (!cart.length) 
    return (
      <div className="flex flex-col text-center gap-1">
        <button 
          onClick={() => setCartToggle(false)}
          className="absolute top-3 right-0.5 text-[15px]"
        >
          <IoMdClose />
        </button>

        <span className="text-sm text-[var(--gray-text)] font-bold">
          Your Cart is Empty
        </span>
        <span className="text-xs">
          Check our <Link href="/products/all" onClick={() => setOpen(false)} className="underline">collection!</Link>
        </span>
      </div>
    )

  return (
    <div className="flex flex-col gap-5 px-2 py-2">
      {cartToggle && 
        <button 
          onClick={() => setCartToggle(false)}
          className="absolute top-5 right-5 text-lg"
        >
          <IoMdClose />
        </button>
      }
      
      <span className="flex items-center justify-center font-bold w-full border-b-2 py-2 text-base">Shopping Cart</span>
      <div className="flex flex-col justify-end items-center gap-3">
        {cart.map(product => {
          return product ? 
            <CartPreviewItem product={product} session={session} key={product.productName} /> 
            //: null
            : <div key={item.productId}>Loading...</div>
        })}
      </div>

      <Link 
        href="/Cart"
        className="flex justify-center font-semibold text-sm"
      
      >
        <span className="border-b-2 border-transparent hover:border-current transition-all">
          Go to Cart Page

        </span>
      </Link>

    </div>
  )
}

export default CartPreview


/* To Preview state value on the webpage for troubleshooting
<pre className="text-[10px] break-all">
  {JSON.stringify(cart, null, 2)}
</pre>
*/