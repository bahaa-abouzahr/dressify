"use client"

import Image from "next/image";
import { updateProfileAction } from "../_lib/actions";
import UpdateProfileButton from "./UpdateProfileButton";

import toast from "react-hot-toast";
import { CiFlag1 } from "react-icons/ci";

function UpdateProfileForm({ session, children }) {
  const {name: fullName, email, nationality, countryFlag } = session.user;

  async function clientAction(formData) {
    const res = await updateProfileAction(formData)

    if(res?.ok) 
      toast.success("Profile Updated");
    else if(res === "no change")
      toast(`No Changed Data`);
    else
      toast.error(`Profile Update Unsuccessfull: ", ${res}`);
  }

  return (
    <form
      id="updateProfile-form"
      action={clientAction}
      // action={updateProfileAction}
      className="bg-(--cream-secondary) py-4 px-6 flex flex-col md2:gap-6 gap-3 max-w-130 mb-10 rounded-2xl text-base"
    >
      <div className="max-w-120 flex flex-col gap-1">
        <label className="md2:text-base text-sm pl-1">Full Name</label>
        <input 
          defaultValue={fullName}
          name="fullName"
          className="profileFormInput shadow-sm md2:text-base text-sm"
        />
      </div>

      <div className="max-w-120">
        <label className="md2:text-base text-sm pl-1">Email</label>
        <input 
          defaultValue={email}
          name="email"
          className="profileFormInput shadow-sm md2:text-base text-sm disabled:cursor-not-allowed disabled:bg-gray-600"
          disabled
        />
      </div>
      

      <div className="max-w-120">
        <div className="flex items-center justify-between">
          <label className="md2:text-base text-sm pl-1">Nationality</label>
          {countryFlag ? <Image 
            src={countryFlag}
            alt="Country flag"
            width={30}
            height={20}
            className="h-5 mb-1"
          /> : <CiFlag1 />}
        </div>
        {children}
      </div>
      
      <div className="flex justify-end">
        <UpdateProfileButton>
          Update Profile
        </UpdateProfileButton>
      </div>
    </form>
  )
}



export default UpdateProfileForm
