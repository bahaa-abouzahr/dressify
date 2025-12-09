import { notFound } from "next/navigation";
import { supabase } from "./supabase";
import { auth } from "./auth";

export async function getUser(email) {
  const {data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

    return data;
}

export async function createUser(newUser) {
  const { data, error } = await supabase.from('users').insert([newUser]);

  if(error) {
    console.error(error);
    throw new Error('User could not be created');
  }

  return data;
}

// get all products
export async function getAllProducts() {
  const {data, error } = await supabase.from("products").select('*')

  if(error) {
    console.error(error);
    notFound();
  }

  return data;
}

// get products filtered by type (like shoes, jackets...)
export async function getProducts(type) {

  const {data, error } = await supabase
    .from("products")
    .select('*')
    .eq('type', type)

  if(error) {
    console.error(error);
    notFound();
  }

  return data;
}

// getCartProducts for logged in user
export async function getCartProducts(userId) {
  if(!userId) return null;

  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      product_id,
      quantity,
      product:products ( productName, price, photos )
    `)
    .eq('user_id', userId);

    if(error) {
      console.error(error);
      notFound();
    }

    // flattening data structure to be consistent with state structure
    const flattened = data.map(item => ({
      product_id:item.product_id,
      quantity: item.quantity,
      productName: item.product.productName,
      price: item.product.price,
      photos: item.product.photos
    }))

    return flattened;
}



export async function getProduct(id) {
  const {data, error } = await supabase
    .from("products")
    .select('*')
    .eq('id', id)
    .single();

    if(error) {
      console.error(error);
      notFound();
    }

    return data;
}


export async function getWishlist(session) {
  const userId = session.user.userId;
  if(!session) throw new Error('You must be logged in')

  const { data, error } = await supabase
    .from("wishlist")
    .select(`
        product_id,
        wishlistItem:products (id, created_at, photos, price, productName)
      `)
    .eq('user_id', userId)

    if(error) {
      console.error(error);
      notFound();
    }

    return data;
}

export async function getWishlistItem(session, productId) {
  const userId = session.user.userId;
  if(!session) throw new Error('You must be logged in')

  const { data, error } = await supabase
    .from("wishlist")
    .select('*')
    .eq('product_id', productId)
    .eq('user_id', userId)
    .maybeSingle();

    if(error) {
      console.error(error);
      notFound();
    }

    return data;
}