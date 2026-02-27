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

  const [loginError, setLoginError] = useState(null);
  

  async function handlePasswordReset(formData){
    // get URL Path
    const origin = window.location.origin;
    
    const res = await passwordResetAction(formData, origin);

    // if(!res.ok) {
    //   setLoginError(res.message);
    //   setPassInput("");
    //   return;
    // }

    setLoginError(null);
    // router.push("/account/login")
    toast.success("Reset Password Link sent to your email address if it exists!")
  }
  
  return (
    <form
      id="resetPassword-form"
      action={handlePasswordReset}
    >
      <div className="flex flex-col gap-3">

        <div className="signin">
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


        <div className="flex justify-center">
          <SignButton buttonAction="resetPassword-form">
            Submit Request
          </SignButton>
        </div>

      </div>
    </form>
  )
}

export default PasswordResetForm;
