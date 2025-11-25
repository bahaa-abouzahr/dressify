import SignInButton from "../_components/SignInButton"

export const metdata = {
  title: 'Login'
}

function page() {
  return (
    <div className="flex flex-col gap-15 mt-20 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your account
      </h2>

      <SignInButton />
    </div>
  )
}

export default page
