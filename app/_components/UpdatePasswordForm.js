"use client"
import { useEffect, useState } from "react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SignButton from "./SignButton";
import { useRouter, useSearchParams } from "next/navigation";

import { createClient } from "../_lib/supabase/client";


function UpdatePasswordForm() {

  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [passInput, setPassInput] = useState("");
  const [passRevealed, setPassRevealed] = useState(false);
  const [confirmPassInput, setConfirmPassInput] = useState("");
  const [confirmPassRevealed, setConfirmPassRevealed] = useState("");
  
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Check if user has a valid session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setReady(true);
      } else {
        setError("Session expired. Please request a new reset link.");
      }
    });
    }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget
    const pass1 = form.password;
    const pass2 = form.password2;

    if (!ready) {
      setError("Reset link is not ready yet. Refresh and try again.");
      return;
    }

    // validation
    if(pass1.value !== pass2.value) {
      e.preventDefault();
      pass2.setCustomValidity("Passwords do not match");
      pass2.reportValidity();
      return;
    } 
    
    pass2.setCustomValidity(""); // clear error

    // Update Password in Supabase
    const { error: updateError } = await supabase.auth.updateUser({
      password: pass1.value
    })

    if (updateError) {
      setError(updateError.message)
    } else {
      // Sign out after password change
      await supabase.auth.signOut();
      
      // success - redirect to login
      router.replace("/account/login");
    }
  }

  return (
    <form id="passwordUpdate-form" onSubmit={handleSubmit} >
      <div className="flex flex-col gap-3">
        {error && (
          <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        {!ready && !error && (
          <p className="text-gray-500 text-sm text-center">
            Verifying reset link...
          </p>
        )}

        <div className="signin">
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
            disabled={!ready}
          />
          <label htmlFor="password1">
            Enter New Password
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

        <div className="signin">
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
            disabled={!ready}
          />
          <label htmlFor="password2">
            Confirm Password
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

        <div className="flex justify-center">
          <SignButton buttonAction={"passwordUpdate-form"}>
            Change Password
          </SignButton>
        </div>

      </div>
    </form>
  )
}

export default UpdatePasswordForm;
