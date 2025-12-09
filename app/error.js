"use client"

export default function Error({ error, reset }) {
  return(
    <main className="">
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>

      <button 
        className=""
        onClick={reset}
      >
        Try again
      </button>
    </main>
  )
}