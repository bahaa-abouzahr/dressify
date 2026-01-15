import RegistrationForm from "@/app/_components/RegistrationForm"
import Link from "next/link"

function page() {
  return (
    <div className="flex flex-col gap-6 items-center mx-auto py-5  max-w-lg">

      <div className="flex flex-col gap-6 items-center mx-auto py-5  xs:border border-(--gray-bg) xs:rounded-2xl xs:min-w-md max-w-lg">
        <div>
          <h2 className="text-lg font-semibold">
            Sign up to Dressify
          </h2>

        </div>

        <RegistrationForm />

      </div>

      <div className="flex justify-center gap-1 items-center mx-auto py-5  xs:border border-(--gray-bg) xs:rounded-2xl xs:min-w-md  max-w-lg">
        <span>Have an account?</span>
        <Link
          className="font-semibold text-blue-600 hover:text-blue-400"
          href="/account/login"
        >
          Log in
        </Link>
      </div> 

    </div>
  )
}

export default page
