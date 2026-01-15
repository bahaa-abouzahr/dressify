import Image from "next/image"
import Link from "next/link";
import AddToWishlistButton from "./AddToWishlistButton";
import { useCart } from "./CartContext";
import { deleteCartItem } from "../_lib/actions";

function CartPagePreviewItem({ item, ind, session}) {
  const {cart, setCart} = useCart();
  const {productName, quantity, price, photos, product_id} = item;

  const deliveryDate = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  })

  function handleDeleteCartItem(product_id) {
    if(!session) {
      const updatedCart = cart.filter(cartItem => cartItem.product_id !== product_id);
      setCart(updatedCart)
    }
    else
      deleteCartItem(product_id);
  }

  return (
    <div className={`
      grid md2:grid-cols-[8fr_2fr_1fr] grid-cols-[8fr_2fr_auto] justify-around md2:gap-4 max-md2:text-xs
      
      border-b-2 border-(--gray-bg) pb-2 border-spacing-y-10
    `}>
      <div className="flex flex-row md2:gap-5 gap-2 ">
        <Link href={`/products/all/${product_id}`}>
          <Image 
            src={item.photos[0]}
            alt={item.productName}
            height={300}
            width={300}
            className="rounded-2xl md2:h-35 md2:w-35 h-20 w-20 object-cover object-top"
          />
        </Link>

        <div className="flex flex-col gap-1">
          <Link href={`/products/all/${product_id}`} className="font-semibold md2:text-lg text-base">{productName}</Link>
          <span className="text-xs">Expected Delivery - {deliveryDate}</span>
          <span className="text-sm">Size: <strong>L</strong></span>
          <div className="flex gap-3 text-xs text-blue-600">
            {session ? <AddToWishlistButton productId={product_id} session={session} location={"cart"} /> : '' }
            <button 
              className="cursor-pointer hover:underline underline-offset-2"
              onClick={() => handleDeleteCartItem(product_id)}
            >
              Delete
            </button>  
          </div>
        </div>

      </div>

      <div className="flex flex-col text-left gap-1 pt-1 pl-5">
        <span>Price</span>
        <span className="font-bold">${price}</span>
      </div>
    </div>
  )
}

export default CartPagePreviewItem
