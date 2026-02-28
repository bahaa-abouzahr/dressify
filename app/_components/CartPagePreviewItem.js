import Image from "next/image"
import Link from "next/link";
import toast from "react-hot-toast";

import { useCart } from "./CartContext";
import { adjustCartItemQuantity } from "../_lib/actions";
import { getProductVariants } from "../_lib/data-service";
import { PRODUCTS_IMAGE_BASE } from "../_utils/constants";

import { LuMinus, LuPlus } from "react-icons/lu";
import CartWishlistLink from "./CartWishlistLink";

function CartPagePreviewItem({ handleDeleteCartItem, item, userId}) {

  const {cart, setCart} = useCart();

  const {
    productName, 
    quantity, 
    price, 
    photos, 
    product_id, 
    product_variants, 
    category, 
    slug
  } = item;

  const {size, sale_percentage, sku, stock} = product_variants;

  const salePrice = sale_percentage ? price * (1 - sale_percentage/100) : price;

  const itemFinalPrice = (salePrice * quantity).toFixed(2)
  const after3days = new Date();
  after3days.setDate(after3days.getDate() + 3);

  const deliveryDate = after3days.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  })


  async function handleQuantity(action,) {
    // Get latest stock quantity
      const {stock} = await getProductVariants(sku);

    if(!userId) {
      const updatedCart = cart.map(cartItem => {
        if(cartItem.product_id === product_id && cartItem.product_variants.sku === sku && cartItem.quantity < stock && action === "inc") 
          return {...cartItem, quantity: quantity + 1}
        if(cartItem.product_id === product_id && cartItem.product_variants.sku === sku && cartItem.quantity > 1 && action === "dec") 
          return {...cartItem, quantity: quantity - 1}
        return cartItem
      })
      setCart(updatedCart);
    }
    else {
      const res = await adjustCartItemQuantity(product_id, sku, action);
      if(res.max || res.min) return;
      if (!res?.ok) return toast.error("Update failed");

      setCart(prev =>
        prev.map(ci =>
          ci.product_id === product_id && ci.product_variants.sku === sku
            ? { ...ci, quantity: res.quantity }
            : ci
        )
      );
    }
  }

  return (
    <div className={`
      grid md2:grid-cols-[8fr_2fr_1fr_1fr] grid-cols-[8fr_2fr_auto_auto] justify-around md2:gap-4 max-md2:text-xs
      
      border-b-2 border-(--gray-bg) pb-2 border-spacing-y-10
    `}>
      <div className="grid grid-cols-[1.2fr_3fr] md2:gap-5 gap-2 ">
        <Link href={`/products/${category}/${slug}`}>
          <Image 
            src={`${PRODUCTS_IMAGE_BASE}${photos[0]}`}
            alt={productName}
            height={300}
            width={300}
            className="rounded-lg md2:h-35 md2:w-35 h-20 w-20 object-contain p-2 bg-white"
          />
        </Link>

        <div className="flex flex-col gap-1">
          <Link 
            href={`/products/${category}/${slug}`} 
            className="font-semibold md2:text-lg text-base hover:text-gray-500">
              {productName}
          </Link>
          <span className="md2:text-xs text-[9px]">Expected Delivery: {deliveryDate}</span>
          <span className="text-sm">Size: <strong>{size}</strong></span>
          <div className="flex gap-3 text-xs w-fit">
            {userId !== null ? <CartWishlistLink userId={userId} productId={product_id} /> : ''}
            <button 
              className="cursor-pointer link"
              onClick={() => handleDeleteCartItem(product_id, sku)}
              aria-label="Delete Cart Item"
            >
              Delete
            </button>  
          </div>
        </div>

      </div>

      <div className="flex flex-col text-left gap-1 pt-1 pl-5">
        <span>Quantity</span>
        <div className="relative flex gap-2 items-center">
          <button 
            onClick={() => handleQuantity("dec")} 
            className="cursor-pointer hover:text-(--orange-secondary) text-base"
            aria-label="Decrease Item Quantity from Cart"
          >
            <LuMinus />
          </button>
          <span className="font-bold ">{quantity}</span>

          <button 
            onClick={() => handleQuantity("inc")} 
            className="cursor-pointer hover:text-(--orange-secondary) text-base"
            aria-label="Increase Item Quantity from Cart"
          >
            <LuPlus />
          </button>
          <div>
            {stock === quantity 
              ? 
                <span className=" absolute top-6 left-0 text-[8px] max-md2:w-30 text-red-500">
                  Stock limit reached
                </span> 
              : ''}

          </div>
        </div>
      </div>

      <div className="flex flex-col text-center gap-1 pt-1 pl-5 min-w-20">
        <span>Price</span>
        <span className={`font-bold ${sale_percentage ? "text-(--button-secondary)" : ""}`}>{itemFinalPrice}$</span>
      </div>
    </div>
  )
}

export default CartPagePreviewItem
