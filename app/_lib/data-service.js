import { createClient } from '@/app/_lib/supabase/client';


// export async function createUser(newUser) {
//   const supabase = createClient();
//   const { data, error } = await supabase.from('users').insert([newUser]);

//   if(error) {
//     console.error(error);
//     throw new Error('User could not be created');
//   }

//   return data;
// }


export async function getAllProducts() {
  const supabase = createClient();
  const {data, error } = await supabase.from("products").select('*')

  if(error) {
    console.error(error);
  }

  return data;
}

// get products filtered by type (like shoes, jackets...)
export async function getProducts(type) {
  const supabase = createClient();

  const {data, error } = await supabase
    .from("products")
    .select('*')
    .eq('type', type)

  if(error) {
    console.error(error);
  }
  return data;
}

// getCartProducts for logged in user
export async function getCartProducts(userId) {
  if(!userId) return null;

  const supabase = createClient();

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
  const supabase = createClient();

  const {data, error } = await supabase
    .from("products")
    .select('*')
    .eq('id', id)
    .single();

    if(error) {
      console.error(error);
    }

    return data;
}


export async function getWishlist(userId) {
 
  if(!userId) throw new Error('You must be logged in')

  const supabase = createClient();

  const { data, error } = await supabase
    .from("wishlist")
    .select(`
        product_id,
        created_at,
        wishlistItem:products (id, photos, price, productName)
      `)
    .eq('user_id', userId)
    .order('created_at', {ascending: false})

    if(error) {
      console.error(error);
    }

    return data;
}

export async function getWishlistItem(userId, productId) {
  if(!userId) throw new Error('You must be logged in')

  const supabase = createClient();

  const { data, error } = await supabase
    .from("wishlist")
    .select('*')
    .eq('product_id', productId)
    .eq('user_id', userId)
    .maybeSingle();

    if(error) {
      console.error(error);
    }

    return data;
}

export async function getOrders(userId) {
  if(!userId) throw new Error('You must be logged in')

  const supabase = createClient();

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', {ascending: false})

    if(error) {
      console.error(error);
      
    }

    return data;
}

export async function getOrderItems(userId, orderId) {
  if(!userId) throw new Error('You must be logged in')

  const supabase = createClient();

  const { data, error } = await supabase
    .from("order_items")
    .select('*')
    .eq('order_id', orderId)
    
  if(error) {
    console.error(error);
    
  }

  return data;
}

export async function getCountries(){
  try {
    const res = await fetch('https://restcountries.com/v2/all?fields=name,flag');
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

export async function getFaqQuestions() {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("faq")
    .select("*")

    if(error) throw new Error("FAQ's couldn't be fetched");

    return data;
}

export async function getAvatar(userId) {
  if(!userId) throw new Error('You must be logged in')

    const supabase = createClient();

    const filePath = `${userId}/avatar.jpeg`;

    const { data, error } = await supabase
      .storage
      .from("avatars")
      .getPublicUrl(filePath);


      return data.publicUrl;
}

