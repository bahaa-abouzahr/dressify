import WishlistPageComponent from "@/app/_components/WishlistPageComponent";
import { auth } from "@/app/_lib/auth";
import { getProduct, getWishlist, } from "@/app/_lib/data-service";

async function page() {
  const session = await auth();
  const wishlist = await getWishlist(session);

  return <WishlistPageComponent wishlist={wishlist} />
  
}

export default page
