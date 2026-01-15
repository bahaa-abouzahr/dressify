"use client"

import toast from "react-hot-toast";
import { checkoutAction } from "../_lib/actions"
import { useCart } from "./CartContext";
import { redirect } from "next/navigation";

function form() {

  async function clientAction(formData) {
    const res = await checkoutAction(formData);

    if(res?.ok) {
      toast.success("Purchase Successful");
      redirect(`order-success/${res.order_id}`)
    }
    else
      toast.error("Purchase wasn't Successful, Please try again or contact our Support")
  }
  
  return (
    <form 
    id="checkout-form"
    action={clientAction}
    >
      <h1 className="font-bold">Personal Info</h1>
      <div className="text-base grid gap-2 sm:grid-cols-2 grid-cols-1 mt-3">
        <div className="flex flex-col sm:max-w-90 gap-1">
          <label>First Name *</label>
          <input
              name="firstName"
              required
              className="formInput shadow-sm"
              />
        </div>

        <div className="flex flex-col sm:max-w-90 gap-1">
          <label>Last Name *</label>
          <input
              name="lastName"
              required
              className="formInput shadow-sm"
              />
        </div>


        <div className="flex flex-col sm:max-w-90 gap-1">
          <label>Phone Number</label>
          <input
              name="number"
              type="text"
              inputMode="numeric"
              placeholder="+49 123 4567"
              pattern="^\+?[0-9 ]+$"
              className="formInput shadow-sm"
              />
        </div>
      </div>

      <h1 className="mt-6 font-bold">Address</h1>
      <div className="text-base grid gap-2 sm:grid-cols-2 grid-cols-1 mt-3">
        <div className="flex flex-col sm:max-w-90 gap-1">
          <label>Street *</label>
          <input
              name="street"
              required
              className="formInput shadow-sm"
              />
        </div>

        <div className="flex flex-col sm:max-w-90 gap-1">
          <label>Additional delivery info</label>
          <input
              name="additionalInfo"
              className="formInput shadow-sm"
              />
        </div>

        <div className="flex flex-col sm:max-w-90 gap-1">
          <label>Postcode *</label>
          <input
              name="postcode"
              required
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="54321"
              className="formInput shadow-sm"
              onInvalid={(e) => {
                e.currentTarget.setCustomValidity("Please enter numbers only");
              }}
              onInput={(e) => {
                e.currentTarget.setCustomValidity(""); // reset message on input
              }}
              />
        </div>

        <div className="flex flex-col sm:max-w-90 gap-1">
          <label>City *</label>
          <input
              name="city"
              required
              className="formInput shadow-sm"
              />
        </div>
      </div>

    </form>
  )
}

export default form
