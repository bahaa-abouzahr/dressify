import Link from "next/link"

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4 px-8 text-[var(--gray-text)]">
      <h1 className="text-lg sm:text-3xl xs:text-2xl font-semibold">
        This page could not be found - 404
      </h1>
      <Link 
        href='/'
        className='text-sm sm:text-xl xs:text-lg  font-bold category-link px-4 py-3'
      >
        Go back to home page
      </Link>
    </main>
  )
}

export default NotFound
