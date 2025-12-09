"use server"

import { auth, signIn, signOut } from "@/app/_lib/auth"
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getCartProducts } from "./data-service";

export async function addCartItem(productId, quantity, userId) {
  // 1) Authentication
  const session = await auth();
  if(!session) throw new Error("You must be logged in");

  const newCartItem = {
    product_id:productId,
    quantity,
    user_id:userId
  }

  // 2) Checking if Product already in the DB Cart

  const {data: existingItem, existingItemError} = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("product_id", productId)
    .eq("user_id", userId)
    .single();

    if(existingItem) {

      // 3) Update Quantity
      await supabase
      .from("cart_items")
      .update({quantity: existingItem.quantity + quantity})
      .eq("product_id", productId)
    } else {
      
      // 4) Insert new Cart Item
      const { insertError } = await supabase
        .from("cart_items")
        .insert([newCartItem]);
      if(insertError) throw new Error('Item could not be added to your cart')

    }

    revalidatePath('/')
}

// Delete one item from Cart
export async function deleteCartItem(productId) {

  const session = await auth();
  if(!session) throw new Error('You must be logged in')

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("product_id", productId)
    .eq("user_id", session.user.userId)

    if(error) throw new Error('Cart item could not be deleted from your cart')

    revalidatePath('/');
}

// Delete all Cart items
export async function deleteDbCart() {
  const session = await auth();
  console.log(session.user);

  if(!session) throw new Error('You must be logged in');
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", session.user.userId)
}

export async function syncCartAfterSignIn(reactCart) {
  const session = await auth();
  const userId = session.user.userId
  if(!session) throw new Error('You must be logged in')

  // 1) Fetch the current DB cart
  const dbCartBefore = await getCartProducts(userId);

  for (const item of reactCart){
    const {quantity, product_id: productId} = item;

    // 2) only add if not already in the db cart
    const exists = dbCartBefore.find(dbItem => dbItem.product_id === productId)
    if(!exists)
      await addCartItem(productId, quantity, userId)
  }
  
  // 3) fetch the latest db cart
  const dbCartAfter = await getCartProducts(userId);
  return dbCartAfter;
}


export async function addToWishlist(productId) {
  const session = await auth();
  const userId = session.user.userId
  if(!session) throw new Error('You must be logged in')

  const wishlistItem = {
    product_id:productId,
    user_id:userId
  }

  const { error } = await supabase
    .from('wishlist')
    .insert([wishlistItem])

  if (error) throw new Error('Item could not be added to your wishlist')
}

export async function deleteFromWishlist(productId) {
  const session = await auth();
  const userId = session.user.userId
  if(!session) throw new Error('You must be logged in')

  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId)

  if (error) throw new Error('Item could not be deleted from your wishlist')
}

export async function signInAction() {
  await signIn('google', {redirectTo: '/account'});
}

export async function signOutAction() {
  await signOut({redirectTo: '/'});
}