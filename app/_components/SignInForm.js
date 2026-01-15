"use client"
import { useState } from "react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SignButton from "./SignButton";
import { signIn } from "@/app/_lib/auth";
import { signinAction } from "@/app/_lib/actions";


function SignInForm() {

  const [passInput, setPassInput] = useState("");
  const [passRevealed, setPassRevealed] = useState(false);
  
  return (
    <form
      id="signin-form"
      action={signinAction}
    >
      <div className="flex flex-col gap-3">

        <div className="signin">
          <input
            name="account"
            id="account"
            required
            placeholder=" "
          />
          <label htmlFor="account">
            Username or email
          </label>
        </div>

        <div className="signin">
          <input
            name="password"
            id="password"
            type={passRevealed ? "text" : "password"}
            required
            placeholder=" "
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
          />
          <label htmlFor="password">
            Password
          </label>
          {passInput ? 
            <div 
              className="absolute top-3.5 right-2 "
              onClick={() => setPassRevealed(!passRevealed)}
            >
              {passRevealed ? <FaRegEye /> : <FaRegEyeSlash />}
            </div> 
          : ""}
        
        </div>

        <div className="flex justify-center">
          <SignButton buttonAction="signin-form">
            Sign in
          </SignButton>
        </div>

      </div>
    </form>
  )
}

export default SignInForm
