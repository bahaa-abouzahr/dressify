import Link from "next/link"

import SignInButtonGoogle from "@/app/_components/SignInButtonGoogle"
import SignInForm from "@/app/_components/SignInForm"

export const metadata = {
  title: "Login",
  description:
    "Sign in to your Dressify account to manage orders, view your cart, and access your personal profile.",
};

function page() {
  return (
    <div className="flex flex-col gap-6 items-center mx-auto py-5 max-w-lg ">

      <div className="flex flex-col gap-6 items-center mx-auto py-5 xs:border border-(--gray-bg) xs:rounded-2xl xs:min-w-md max-w-lg">
        <h2 className="text-lg font-semibold">
          Sign in to Dressify
        </h2>

        <SignInForm />

        <div className="flex items-center w-[250px]">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <SignInButtonGoogle />

        <div className="text-gray-500 hover:underline font-semibold">
          <Link href="/account/forgot-password">
            Forgot password?
          </Link>
        </div>
      </div>

      <div className="flex justify-center gap-2 items-center mx-auto py-5 xs:border border-(--gray-bg) xs:rounded-2xl xs:min-w-md max-w-lg">
        <span>Don&apos;t have an account?</span>
        <Link
          className="font-semibold text-blue-600 hover:text-blue-400"
          href="/account/register"
        >
          Sign Up
        </Link>
      </div> 

    </div>
  )
}

export default page
