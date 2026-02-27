"use client"
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { createClient } from "../_lib/supabase/client";
import toast from "react-hot-toast";
import UpdateProfileButton from "./UpdateProfileButton";

function ChangePasswordForm({ googleAccount }) {
  const supabase = createClient();
  
  const [currentPass, setCurrentPass] = useState("");
  const [currentPassRevealed, setCurrentPassRevealed] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [newPassRevealed, setNewPassRevealed] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [confirmPassRevealed, setConfirmPassRevealed] = useState(false);
  
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const currentPassword = form.currentPassword.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    // Validation
    if (newPassword !== confirmPassword) {
      form.confirmPassword.setCustomValidity("Passwords do not match");
      form.confirmPassword.reportValidity();
      setLoading(false);
      return;
    }

    form.confirmPassword.setCustomValidity("");

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user?.email) {
      toast.error("User not found");
      setLoading(false);
      return;
    }

    // Verify current password
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (signInError) {
      toast.error("Current password is incorrect");
      setLoading(false);
      return;
    }

    // Update to new password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (updateError) {
      toast.error(updateError.message);
    } else {
      toast.success("Password changed successfully!");
      // Clear form
      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
    }

    setLoading(false);
  }

  if(googleAccount) return (
    <div className="bg-(--cream-secondary) py-4 px-6 flex flex-col gap-4 max-w-130 mb-10 rounded-2xl">
      <h3 className="text-lg font-semibold mb-2">Change Password</h3>
      <p>You are logged in with your google account. Note that you can&apos;t change your password from here</p>
      <div className="flex flex-row gap-1">
        <span>Please go to your</span>
        <a 
          href="https://accounts.google.com/" 
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          google account
        </a> 
        <span>to change your password</span>
      </div>
    </div>
  )

  return (
    <form
      id="changePassword-form"
      onSubmit={handleSubmit}
      className="bg-(--cream-secondary) py-4 px-6 flex flex-col gap-4 max-w-130 mb-10 rounded-2xl"
    >
      <h3 className="text-lg font-semibold mb-2">Change Password</h3>

      {/* Current Password */}
      <div className="signin bg-(--cream-input)">
        <input
          name="currentPassword"
          id="currentPassword"
          type={currentPassRevealed ? "text" : "password"}
          required
          placeholder=" "
          value={currentPass}
          onChange={(e) => setCurrentPass(e.target.value)}
          disabled={loading}
        />
        <label htmlFor="currentPassword">Current Password</label>
        {currentPass && (
          <div 
            className="absolute top-3.5 right-2 cursor-pointer"
            onClick={() => setCurrentPassRevealed(!currentPassRevealed)}
          >
            {currentPassRevealed ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        )}
      </div>

      {/* New Password */}
      <div className="signin bg-(--cream-input)">
        <input
          name="newPassword"
          id="newPassword"
          type={newPassRevealed ? "text" : "password"}
          required
          placeholder=" "
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}"
          title="8+ chars, upper/lowercase, number required"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          disabled={loading}
        />
        <label htmlFor="newPassword">New Password</label>
        {newPass && (
          <div 
            className="absolute top-3.5 right-2 cursor-pointer"
            onClick={() => setNewPassRevealed(!newPassRevealed)}
          >
            {newPassRevealed ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        )}
      </div>

      {/* Confirm New Password */}
      <div className="signin bg-(--cream-input)">
        <input
          name="confirmPassword"
          id="confirmPassword"
          type={confirmPassRevealed ? "text" : "password"}
          required
          placeholder=" "
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}"
          title="8+ chars, upper/lowercase, number required"
          value={confirmPass}
          onChange={(e) => {
            setConfirmPass(e.target.value);
            e.target.setCustomValidity("");
          }}
          disabled={loading}
        />
        <label htmlFor="confirmPassword">Confirm New Password</label>
        {confirmPass && (
          <div 
            className="absolute top-3.5 right-2 cursor-pointer"
            onClick={() => setConfirmPassRevealed(!confirmPassRevealed)}
          >
            {confirmPassRevealed ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-2">
        <UpdateProfileButton disabled={loading}>
          {loading ? "Changing..." : "Change Password"}
        </UpdateProfileButton>
      </div>
    </form>
  );
}

export default ChangePasswordForm;