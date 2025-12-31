"use client"

import { redirect } from "next/navigation";
import { useCart } from "./CartContext";
import CartFinalPrice from "./CartFinalPrice";
import CheckoutForm from "./CheckoutForm";

function CheckoutPageComponent() {
  const { cart } = useCart();

  if(!cart.length) redirect("/");

  return (
    <div className="grid md2:grid-cols-[5fr_2fr] max-md2:mx-3 max-md2:gap-7 pb-10">
      <CheckoutForm  />
      <CartFinalPrice location="checkout" />
    </div>
  )
}

export default CheckoutPageComponent
