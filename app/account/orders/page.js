import OrderHistoryPreview from "@/app/_components/OrderHistoryPreview";
import { auth } from "@/app/_lib/auth";
import { getOrders } from "@/app/_lib/data-service";

async function page() {
  const session = await auth();

  const orders = await getOrders(session);
  const length = orders.length

  const sortedOrders = [...orders].sort(
    (a,b) => new Date(b.created_at) - new Date(a.created_at)
  )
  console.log(orders);
  console.log("sorted orders: ", sortedOrders);


  return (
    <div className="flex flex-col gap-3 mb-10 mr-2">
      <h1 className="text-xl">Your Orders</h1>
      {length ? <span><strong>{orders.length} order{length === 1 ? '' : 's'}</strong> placed in total</span> : ""}
      {length ?
        orders.map(order => {
          return <OrderHistoryPreview order={order} key={order.id} />
        }) : ''
      
      }
    </div>
  )
}

export default page;
