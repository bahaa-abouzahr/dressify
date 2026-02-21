import OrderHistoryPreview from "@/app/_components/OrderHistoryPreview";
import Spinner from "@/app/_components/Spinner";
import { getOrders } from "@/app/_lib/data-service";

import EmptyOrdersHistory from "@/app/_components/EmptyOrdersHistory";
import { createClient } from "@/app/_lib/supabase/server";
import { Suspense } from "react";

export const metadata = {
  title: "Order History",
  description: "View your past orders and track their status.",
};

async function page() {
  const supabase = await createClient();
  const {data: { user }} = await supabase.auth.getUser();

  const orders = await getOrders(user.id);
  if(orders.length < 1) return <EmptyOrdersHistory />

  const length = orders.length

  const sortedOrders = [...orders].sort(
    (a,b) => new Date(b.created_at) - new Date(a.created_at)
  )
 
  return (
    <div className="flex flex-col gap-3 mb-10 mr-2">
      <h1 className="text-xl">Your Orders</h1>
      {length ? <span><strong>{orders.length} order{length === 1 ? '' : 's'}</strong> placed in total</span> : ""}
 
      <Suspense fallback={<Spinner />} >
        {length ?
          orders.map(order => {
            return (
              <OrderHistoryPreview order={order} key={order.id} />
            )
          }) : ''
        }
      </Suspense>
      
    </div>
  )
}

export default page;
