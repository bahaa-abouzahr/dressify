import Link from "next/link";

function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-5 text-center mr-12 md2:mr-50">
      <div className="mb-4 text-6xl">🤍</div>

      <h2 className="text-xl font-semibold mb-2">
        Your wishlist is empty
      </h2>

      <p className="text-gray-500 mb-6 max-w-sm">
        Save items you like to your wishlist so you can easily find them later.
      </p>

      <Link
        href="/products"
        className="inline-flex items-center rounded-xl bg-black px-6 py-3 text-white hover:bg-gray-600 transition"
      >
        Start shopping
      </Link>
    </div>
  );
}

export default EmptyWishlist;
