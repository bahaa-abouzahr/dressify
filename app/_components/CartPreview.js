"use client"

import Link from "next/link";
import CartPreviewItem from "./CartPreviewItem";

import { IoMdClose } from "react-icons/io";
import { usePreviewState } from "./PreviewStateContext";
import { calcCartPrices } from "./calcCartPrices";

function CartPreview({ cart, userId }) {

  const { cartToggle, setCartToggle } = usePreviewState();
  const { freeDelivery, finalPrice} = calcCartPrices(cart);

  if (!cart.length) 
    return (
      <div className="flex flex-col text-center gap-1">
        <button 
          onClick={() => setCartToggle(false)}
          className="absolute top-3 right-0.5 text-[15px]"
        >
          <IoMdClose />
        </button>

        <span className="text-sm text-(--gray-text) font-bold">
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
          aria-label="Close Cart Preview"
        >
          <IoMdClose />
        </button>
      }
      
      <span className="flex items-center justify-center font-bold w-full border-b-2 py-2 text-base">Shopping Cart</span>
      <div className="flex flex-col justify-end items-center gap-3">
        {cart.map(product => {
          return product ? 
            <CartPreviewItem product={product} userId={userId} setCartToggle={setCartToggle} key={product.product_variants.sku} /> 
            //: null
            : <div key={item.productId}>Loading...</div>
        })}
      </div>

      <div className="flex flex-col justify-around items-center">
        {freeDelivery 
        ? <span className="text-xs italic">Eligible for free Delivery</span>
        : <span>Delivery fee €3.5</span>
        }
        <span className="font-semibold">Final Price: ${finalPrice}</span>
      </div>
  

      <Link 
        href="/cart"
        className="flex justify-center font-semibold text-sm"
        onClick={() => setCartToggle(false)}
      >
        <span className="link">
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
