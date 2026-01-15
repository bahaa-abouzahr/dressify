import { createClient } from "@/app/_lib/supabase/server";
import CartFinalPrice from "../_components/CartFinalPrice";
import CartPagePreview from "../_components/CartPagePreview";

export const metadata = {
  title: "Your Cart",
}

async function page() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
      <div className="grid md2:grid-cols-[5fr_2fr] max-md2:mx-3 max-md2:-translate-y-5">
        <CartPagePreview session={session} />
        <CartFinalPrice location="cart" />
      </div>
  )
}

export default page;
