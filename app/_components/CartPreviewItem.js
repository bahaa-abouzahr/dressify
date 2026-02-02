"use client"

import Image from "next/image";
import Link from "next/link";

import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteCartItem } from "@/app/_lib/actions";
import { useCart } from "./CartContext";
import AnimatedTrashButton from "./AnimatedTrashButton";
import { PRODUCTS_IMAGE_BASE } from "../_lib/constants";

function CartPreviewItem({ product, userId, setCartToggle }) {
  const { cart, setCart } = useCart();
  const {product_id, quantity, productName, price, photos, category, product_variants, slug} = product;
  const {size, sale_percentage, sku} = product_variants;
  const salePrice = sale_percentage ? price * (1 - sale_percentage/100) : price;

  async function handleDelete(product_id, sku) {

    if(!userId) {

      const updatedCart = cart.filter((cartItem) => 
        // keep different products + same products with different size
        cartItem.product_id !== product_id || (cartItem.product_id === product_id && cartItem.product_variants.sku !== sku)
      )
      setCart(updatedCart);
      toast.success("Removed from Cart")
    }
    else {
      const res = await deleteCartItem(product_id, sku);
      if(res.ok) toast.success("Removed from Cart")
      else toast.error(`Remove Unsuccessfull: ${res}`)
    }
  }
  
  return (
    <div className="grid grid-cols-[1fr_2fr_1fr_1fr_auto] items-center w-full">
      <Link 
        className="relative w-10 h-10 md2:w-12 md2:h-12"
        href={`/products/${category}/${slug}`} 
        onClick={() => setCartToggle(false)}
      >
        <Image
          src={`${PRODUCTS_IMAGE_BASE}${photos[0]}`} 
          alt={productName}
          width={40}
          height={40}
          className="object-cover object-top w-10 h-10 hover:scale-120"
        />
      </Link>

      <Link href={`/products/${category}/${slug}`} 
        className="font-medium pr-2"
        onClick={() => setCartToggle(false)}
      >
        {productName}
      </Link>

      <span>Size: <strong>{size}</strong></span>


      <p className="md2:text-[11px] text-[10px]"><span className={`${sale_percentage ? "text-red-600 font-bold" : ""}`}>{salePrice}$</span> x {quantity}</p>

      <AnimatedTrashButton handleDelete={handleDelete} id={product_id} sku={sku} />
    </div>
  )
}

export default CartPreviewItem
