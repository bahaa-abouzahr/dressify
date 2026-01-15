import { format } from "date-fns";

import { getOrderItems } from "@/app/_lib/data-service";
import OrderHistoryPreviewItem from "./OrderHistoryPreviewItem";

import { createClient } from '@/app/_lib/supabase/server';

async function OrderHistoryPreview({ order }) {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { id:orderId, created_at, total_price } = order;
  const orderItems = await getOrderItems(user.id, orderId);

  // Temporary delivery state, if 3 days passed, set as delivered
  const currentDate = new Date();
  const created_at_date = new Date(created_at);
  const THREE_DAYS_MS = 3*24*60*60*1000;
  const threeDaysPassed = currentDate - created_at_date >= THREE_DAYS_MS
  const deliveryDate = new Date(created_at_date.getTime() + THREE_DAYS_MS)


  return (
    <div className="flex flex-col xs:w-[80%]">
      <header className="grid xs:grid-cols-[1fr_auto] grid-cols-[1fr_auto] justify-between text-(--gray-text) bg-(--cream-secondary) px-3 py-2 rounded-t-xl xs:text-sm text-xs">
        <div className="flex gap-10 justify-start pr-3">
          <div className="flex flex-col">
            <span>Order Placed</span>
            <span>{format(created_at, "dd MMM yy")}</span>
          </div>

          <div className="flex flex-col">
            <span>TOTAL</span>
            <span>€{total_price}</span>
          </div>

        </div>

        <div className="flex flex-col xs:text-start text-end">
          <span>Order # {orderId}</span>
        </div>
      </header>

      <div className="border-x border-b rounded-b-xl border-(--cream-secondary) pt-2 pb-7 px-2">
        <span className="text-sm font-semibold mb-5">
          {threeDaysPassed ? 
            `Delivered ${format(deliveryDate, "dd MMM yy")}` 
          : 
            `Estimated Delivery Date: ${format(deliveryDate, "dd MMM yy")}`}
        </span>
        
        <div className="flex flex-col gap-5 mt-3">
          {orderItems.map(item => {
            return <OrderHistoryPreviewItem item={item} deliveryDate={deliveryDate} key={item.id} />
          })}
        </div>

      </div>
    </div>
  )
}

export default OrderHistoryPreview
