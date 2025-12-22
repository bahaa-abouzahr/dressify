import CartFinalPrice from "../_components/CartFinalPrice"
import CheckoutForm from "../_components/CheckoutForm"

function page() {
  
  return (
    <div className="grid md2:grid-cols-[5fr_2fr] max-md2:mx-3 max-md2:gap-7 pb-10">
      <CheckoutForm  />
      <CartFinalPrice location="checkout" />
    </div>
  )
}

export default page
