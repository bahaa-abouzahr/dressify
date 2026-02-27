import RegistrationForm from "@/app/_components/RegistrationForm"
import Link from "next/link"

export const metadata = {
  title: "Create Account",
  description:
    "Create your Dressify account to shop faster, track orders, and enjoy a seamless checkout experience.",
};

function page() {
  return (
    <div className="flex flex-col gap-6 items-center mx-auto py-5 max-w-lg">

      <div className="flex flex-col gap-6 items-center mx-auto py-5 xs:border border-(--gray-bg) xs:rounded-2xl xs:min-w-md max-w-lg">
        <div>
          <h2 className="text-lg font-semibold">
            Sign up to Dressify
          </h2>

        </div>

        <RegistrationForm />

      </div>

      <div className="flex justify-center gap-1 items-center mx-auto py-5 xs:border border-(--gray-bg) xs:rounded-2xl xs:min-w-md max-w-lg">
        <span>Have an account?</span>
        <Link
          className="font-semibold text-(--link-text) hover:text-(link-hover)"
          href="/account/login"
        >
          Log in
        </Link>
      </div> 

    </div>
  )
}

export default page
