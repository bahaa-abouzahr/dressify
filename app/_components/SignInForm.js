"use client"
import { useState } from "react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SignButton from "./SignButton";
import { signIn } from "@/app/_lib/auth";
import { signinAction } from "@/app/_lib/actions";
import { useRouter } from "next/navigation";


function SignInForm() {
  const router = useRouter();

  const [passInput, setPassInput] = useState("");
  const [passRevealed, setPassRevealed] = useState(false);
  const [loginError, setLoginError] = useState(null);

  async function handleSignIn(formData){
    const res = await signinAction(formData);

    if(!res.ok) {
      setLoginError(res.message);
      setPassInput("");
      return;
    }

    setLoginError(null);
    router.push("/profile")
  }
  
  return (
    <form
      id="signin-form"
      action={handleSignIn}
    >
      <div className="flex flex-col items-center gap-3">

        <div className="signin w-2xs">
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

        <div className="signin w-2xs">
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

        {/* if login fails display error message */}
        <p className="text-red-500 text-xs h-3 px-1 text-center">
          {loginError ?? ""}
        </p>

        <div className="flex justify-center w-[150px]">
          <SignButton buttonAction="signin-form">
            Sign in
          </SignButton>
        </div>

      </div>
    </form>
  )
}

export default SignInForm
