"use client"
import { useState } from "react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SignButton from "./SignButton";
import { singupAction } from "../_lib/actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


function SignInForm() {
  const router = useRouter();

  const [passInput, setPassInput] = useState("");
  const [passRevealed, setPassRevealed] = useState(false);

  const [confirmPassInput, setConfirmPassInput] = useState("");
  const [confirmPassRevealed, setConfirmPassRevealed] = useState("");

  const [registrationError, setRegistrationError] = useState(null);

  async function handleSignUp(formData) {
    const res = await singupAction(formData);

    if(!res.ok) {
      setRegistrationError(res.error);
      return;
    }
    setRegistrationError(null);
    toast.success("Registration Successfull!");
    router.push("/profile");
  }

  return (
    <form
      id="signup-form"
      action={handleSignUp}
      onSubmit={(e) => {
        const pass1 = e.currentTarget.password;
        const pass2 = e.currentTarget.password2;

        if(pass1.value !== pass2.value) {
          e.preventDefault(); // stops server action
          pass2.setCustomValidity("Passwords do not match");
          pass2.reportValidity();
        } else {
          pass2.setCustomValidity(""); // clear error
        }
      }}
    >
      <div className="flex flex-col items-center gap-3">

        <div className="signin w-2xs">
          <input
            name="fullName"
            id="fullName"
            required
            placeholder=" "
          />
          <label htmlFor="fullName">
            Full Name
          </label>
        </div>

        <div className="signin w-2xs">
          <input
            name="username"
            id="username"
            required
            placeholder=" "
          />
          <label htmlFor="username">
            Username
          </label>
        </div>

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

        <div className="signin w-2xs">
          <input
            name="password"
            id="password1"
            type={passRevealed ? "text" : "password"}
            required
            placeholder=" "
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}"
            title="8+ chars, upper/lowercase, number required"
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
          />
          <label htmlFor="password1">
            Create Password
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

        <div className="signin w-2xs">
          <input
            name="password2"
            id="password2"
            type={confirmPassRevealed ? "text" : "password"}
            required
            placeholder=" "
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}"
            title="8+ chars, upper/lowercase, number required"
            value={confirmPassInput}
            onChange={(e) => {
              setConfirmPassInput(e.target.value);
              e.target.setCustomValidity("");
            }} 
          />
          <label htmlFor="password2">
            Re-enter Password
          </label>
          {confirmPassInput ? 
            <div 
              className="absolute top-3.5 right-2 "
              onClick={() => setConfirmPassRevealed(!confirmPassRevealed)}
            >
              {confirmPassRevealed ? <FaRegEye /> : <FaRegEyeSlash />}
            </div> 
          : ""}
        </div>

        {/* if registration fails display error message */}
        <p className="text-red-500 text-[10px] h-3 px-1  text-center">
          {registrationError ?? ""}
        </p>

        <div className="flex text-center w-[150px]">
          <SignButton buttonAction={"signup-form"}>
            Sign up
          </SignButton>
        </div>

      </div>
    </form>
  )
}

export default SignInForm
