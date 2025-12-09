import WishlistPageComponent from "@/app/_components/WishlistPageComponent";
import { auth } from "@/app/_lib/auth";
import { getProduct, getWishlist, } from "@/app/_lib/data-service";

async function page() {
  const session = await auth();
  const wishlist = await getWishlist(session);


  // const fullWishlist = await Promise.all(
  //   wishlist.map(async item => {
  //     const data =  await getProduct(item.product_id);
  //     return data;
  //   })
  // );

  return <WishlistPageComponent wishlist={wishlist} />
  
}

export default page
