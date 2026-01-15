"use server"

import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { getCartProducts } from "./data-service";


import { createClient } from "@/app/lib/supabase/server";


const resend = new Resend(process.env.RESEND_API_KEY)

export async function addCartItem(productId, quantity, session) {
  // 1) Authentication
  
  if(!session) throw new Error("You must be logged in");
  const userId = session?.user?.id;
  
  const newCartItem = {
    product_id:productId,
    quantity,
    user_id:userId
  }
  
  // 2) Checking if Product already in the DB Cart
  
  const supabase = await createClient();
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
      const { error:insertError } = await supabase
        .from("cart_items")
        .insert([newCartItem]);
      if(insertError) return insertError.message

    }

    revalidatePath('/')
    return {ok: true}
}

// Delete one item from Cart
export async function deleteCartItem(productId) {

  // const session = await auth();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if(!session) throw new Error('You must be logged in')

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("product_id", productId)
    .eq("user_id", session.user.userId)

    if(error) return error.message;

    revalidatePath('/');
    return {ok: true};
}

// Delete all Cart items
export async function deleteDbCart() {
  // const session = await auth();
  const {
    data: { session },
  } = await supabase.auth.getSession();


  if(!session) throw new Error('You must be logged in');
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", session.user.userId)

  if(error) throw new Error("DB Cart couldn't be deleted: ", + error.message)
}

export async function syncCartAfterSignIn(reactCart) {
  // const session = await auth();
  const {
    data: { session },
  } = await supabase.auth.getSession();

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
  // const session = await auth();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session.user.userId
  if(!session) throw new Error('You must be logged in')

  const wishlistItem = {
    product_id:productId,
    user_id:userId
  }

  const { error } = await supabase
    .from('wishlist')
    .insert([wishlistItem])

  if (error) return error.message;
  return {ok: true};
}

export async function deleteFromWishlist(productId) {
  // const session = await auth();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = session.user.userId
  if(!session) throw new Error('You must be logged in')

  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId)

  if (error) return error.message;
  
  return { ok: true};
}

export async function addOrder_items(orderItems) {
  // const session = await auth();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if(!session) throw new Error('You must be logged in');

  const { error } = await supabase
    .from("order_items")
    .insert(orderItems)

  return error;
}

export async function checkoutAction(formData) {
  // const session = await auth();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if(!session) throw new Error('You must be logged in');

  // 1) get needed Data
  const user_id = session.user.userId
  const cart = await getCartProducts(session?.user.userId)

  const {firstName, lastName, number, ...shipping_address} =  Object.fromEntries(formData);

  const totalItemsPrice = Number(cart.reduce((acc, cur) => acc + cur.price , 0).toFixed(2));
  const freeDelivery = totalItemsPrice >= 50;
  const finalPrice = freeDelivery ? Number(totalItemsPrice).toFixed(2) : Number(totalItemsPrice + 3.5).toFixed(2);

  const fullName = firstName + " " + lastName

  // 2) create order in orders table + retrieve order id
  const { data, error } = await supabase
    .from("orders")
    .insert({
      user_id,
      total_price:finalPrice,
      shipping_address,
    })
    .select("id")
    .single();

    if(error) throw new Error("Order couldn't be made")
    
    const order_id = data.id

  // 3) insert cart items to order_items table
  const orderItems = cart.map(cartItem => {
    const {product_id, quantity, productName: product_name_at_purchase, price: price_at_purchase, photos } = cartItem;

    const item = {
      order_id,
      quantity,
      product_name_at_purchase,
      price_at_purchase,
      product_id,
      photo:photos[0]
    }

    return item;
  })

  const addItemsError = await addOrder_items(orderItems)

  if(addItemsError) {
    // rollback
    const{error: rollbackError} = await supabase
      .from("orders")
      .delete()
      .eq("id", order_id)
  
    if(rollbackError) 
      throw new Error("Order items faild AND rollback failed: " + rollbackError.message);
    
    // rollback succeeded -> throw original error
    throw new Error("Order was not successfull: ", + addItemsError.message)
  } 

  // 4) on success clear cart + redirect
  
  await deleteDbCart();
  revalidatePath(`/order-success/${order_id}`);

  return { ok: true, order_id }

}

export async function updateProfileAction(formData){
  // const session = await auth();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if(!session) throw new Error('You must be logged in');
  const user = session.user;

  console.log(session);
  const fullName = formData.get('fullName');
  let [nationality, countryFlag] = formData.get('nationality').split('%');
  
  // if updated data
  if(user.name === fullName && user.nationality === nationality)
    return "no change";

  console.log(user.name, " ", fullName);
  if(nationality === "") countryFlag = "";
  const updateData = {fullName, nationality, countryFlag};
 
  const { error } = await supabase
    .from("users")
    .update(updateData)
    .eq('id', session.user.userId)
  
  // if (error) throw new Error("User Profile couldn't be updated");
  if (error) return error.message;

  // on success revalidate path, and return true
  revalidatePath('/account')
  return { ok: true};
}

export async function sendContactEmail(formData) {
  const { name, email, number, message } = Object.fromEntries(formData);
  
  if(!name || !email || !message) throw new Error("Missing required fields");

  const res = await resend.emails.send({
    from: "Contact Form <onboarding@resend.dev>",
    to: ["dressify.bahaaabouzahr@gmail.com"],
    subject:"New contact form submission",
    text: `
      Name: ${name}
      Email: ${email}
      ${number ? `Number: ${number}` : ""}

      Message:
      ${message}
    `,
  });

  console.log(res);
}

export async function signinAction() {
  console.log("signin");
}
export async function singupAction() {
  console.log("signup");
}

/*
export async function signInGoogle() {
  await signIn('google', {redirectTo: '/account'});
}

export async function signOutAction() {
  await signOut({redirectTo: '/'});
}
  */