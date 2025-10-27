"use client"

import { useEffect, useState } from "react";
import CartPreviewItem from "./CartPreviewItem";
import { getCartProducts } from "../_lib/data-service";

function CartPreview() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);


  // Retrieving from Session Storage
  useEffect(() => {
    const fetchCartProducts = async () => {

      const savedCart = sessionStorage.getItem("cart");
      if (!savedCart) return;
      
      const cartData = JSON.parse(savedCart)
      setCart(cartData);
      
      // Fetching Product details for all items
      const ids = cartData.map(item => item.productId);
      
      if(ids.length) {
        const data = await getCartProducts(ids)
        setProducts(data);
      }
    };

    fetchCartProducts();
  }, [])

  if (!cart.length) return <span> Cart is Empty</span>;

  return (
    <div className="flex flex-col w-20">
      {cart.map(item => {

        const product = products.find(product => product.id === item.productId);
        console.log(product);
        return product ? <CartPreviewItem product={product} item={item} key={item.productId} /> : null
      })}
    </div>
  )
}

export default CartPreview
