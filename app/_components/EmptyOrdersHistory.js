import Link from "next/link"

function EmptyOrdersHistory() {
  return (
    <div className="flex flex-col items-center justify-center py-5 text-center">
      <div className="mb-4 text-6xl">📦</div>

      <h2 className="text-xl font-semibold mb-2">
        No orders yet
      </h2>

      <p className="text-gray-500 mb-6 max-w-sm">
        Looks like you haven’t placed any orders yet.  
        When you do, they’ll appear here.
      </p>

      <Link
        href="/products"
        className="inline-flex items-center rounded-xl bg-black px-6 py-3 text-white hover:opacity-90 transition"
      >
        Start shopping
      </Link>
    </div>
  )}

export default EmptyOrdersHistory
