"use client"
import { useState } from "react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SignButton from "./SignButton";
import { signIn } from "@/app/_lib/auth";
import { passwordResetAction, signinAction } from "@/app/_lib/actions";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";


function PasswordResetForm() {
  const router = useRouter();

  const [resetError, setResetError] = useState(null);

  async function handlePasswordReset(formData){
    // get URL Path
    const origin = window.location.origin;
    
    const res = await passwordResetAction(formData, origin);

    if(!res.ok) {
      setResetError(res.message);
      return;
    }

    setResetError(null);
    // router.push("/account/login")
    toast.success("Reset Password Link sent to your email address if it exists!")
  }
  
  return (
    <form
      id="resetPassword-form"
      action={handlePasswordReset}
    >
      <div className="flex flex-col items-center gap-3 ">

        <div className="signin w-2xs">
          <input
            name="email"
            id="email"
            type="email"
            required
            placeholder=" "
          />
          <label htmlFor="email">
            Email
          </label>
        </div>

        {/* if registration fails display error message */}
        <p className="text-red-500 text-[10px] h-3 px-1  text-center">
          {resetError ?? ""}
        </p>

        <div className="flex w-[150px]">
          <SignButton buttonAction="resetPassword-form">
            Submit Request
          </SignButton>
        </div>

      </div>
    </form>
  )
}

export default PasswordResetForm;
