import Spinner from "@/app/_components/Spinner";
import WishlistPageComponent from "@/app/_components/WishlistPageComponent";
import { getWishlist } from "@/app/_lib/data-service";
import { createClient } from "@/app/_lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "Your Wishlist",
}

export default async function page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if(!user) redirect('/account/login');

  const wishlist = await getWishlist(user.id);

  return (
    <Suspense fallback={<Spinner />} >
      <WishlistPageComponent wishlist={wishlist} />
    </Suspense>
  )
  
}
