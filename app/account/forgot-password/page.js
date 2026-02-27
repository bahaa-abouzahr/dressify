import Link from "next/link"

import PasswordResetForm from "@/app/_components/PasswordResetForm";

export const metadata = {
  title: "Password Reset",
  description:
    "Sign in to your Dressify account to manage orders, view your cart, and access your personal profile.",
};

function page() {


  return (
    <div className="flex flex-col gap-6 items-center mx-auto py-5 max-w-lg">

      <div className="flex flex-col gap-6 items-center mx-auto py-5 xs:border border-(--gray-bg) xs:rounded-2xl xs:min-w-md max-w-lg min-h-60">
        <h2 className="text-lg font-semibold">
          Reset your Password
        </h2>

        <PasswordResetForm />

      </div>

      <div className="flex justify-center gap-1 items-center mx-auto py-5 xs:border border-(--gray-bg) xs:rounded-2xl xs:min-w-md max-w-lg">
        <span>Go to Login Page?</span>
        <Link
          className="font-semibold text-blue-600 hover:text-blue-400"
          href="/account/login"
        >
          Sign In
        </Link>
      </div> 

    </div>
  )
}

export default page
