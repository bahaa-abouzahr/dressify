"use client"

import Image from "next/image";
import { updateProfileAction } from "@/app/_lib/actions";
import UpdateProfileButton from "./UpdateProfileButton";

import toast from "react-hot-toast";
import { CiFlag1 } from "react-icons/ci";
import { useState } from "react";
import { IoMdCheckmark } from "react-icons/io";

function UpdateProfileForm({ profileUser, children }) {
  
  const {full_name: fullName, email, nationality, countryFlag } = profileUser;

  const [fileName, setFileName] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);


  // compress to ~512px wide jpeg
  function compressAvatar(file) {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = () => {
        const maxW = 400;
        const scale = Math.min(1, maxW / img.width);

        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if(!blob) return reject(new Error("Compression failed"));
            resolve(new File([blob], "avatar.jpeg", {type: "image/jpeg"}));
          },
          "image/jpeg",
          0.7
        );
      }
      img.onerror = reject;
      img.src = URL.createObjectURL(file)
    });
  }

  async function clientAction(formData) {
    // replace original file with compressed one
    if (avatarFile) {
      formData.set("avatar", avatarFile);
    }

    const res = await updateProfileAction(formData)

    if(res?.ok) 
      toast.success("Profile Updated");
    else if(res === "no change")
      toast(`No Changed Data`);
    else
      toast.error(`Profile Update Unsuccessfull: ", ${res}`);

    setFileName(false);
    setAvatarFile(null);
  }

  return (
    <>
    <form
      id="updateProfile-form"
      action={clientAction}
      className="bg-(--cream-secondary) py-4 px-6 flex flex-col md2:gap-6 gap-3 max-w-130 mb-10 rounded-2xl text-base"
      >
      <h3 className="text-lg font-semibold mb-4">Update your Profile</h3>
      
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


      <div className="max-w-120 flex flex-col gap-1 mt-1">
        <label 
          htmlFor="avatar"
          role="button"
          tabIndex={0}
          className="profileFormInput shadow-sm md2:text-base text-sm disabled:cursor-not-allowed disabled:bg-gray-600"
          >
          {!fileName ? "Upload Profile Image" : (
            <div className="flex gap-2 items-center">
              <span className="truncate max-w-[180px]">{fileName}</span>
              <span className="text-green-600 text-xl">
                <IoMdCheckmark />
              </span>
            </div>
          )}
        </label>
        <input 
          id="avatar" type="file" name="avatar" accept="image/*" hidden 
          onChange={async (e) => {
            
            const file = e.target.files?.[0];
            if (!file) return;
            
            const compressed = await compressAvatar(file);
            const dt = new DataTransfer();
            dt.items.add(compressed);
            e.target.files = dt.files
            setFileName(`${file.name}`)
          }}
          />
      </div> 
      
      <div className="flex justify-end">
        <UpdateProfileButton>
          Update Profile
        </UpdateProfileButton>
      </div>
    </form>
  </>
  )
}



export default UpdateProfileForm
