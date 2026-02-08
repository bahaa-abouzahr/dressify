import { createClient } from '@/app/_lib/supabase/client';
import { PAGE_SIZE } from '../_utils/constants';


export async function getProducts({page = 1, type = "all", category = "all", latest=false}) {

  const supabase = createClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("products")
    .select(`*, product_variants(*)`, { count: "exact"});
    
  // if Type specified, query based on type
  if (type !== "all") query = query.eq("type", type);
  if(category !== "all") query = query.eq("category", category);

  // get latest products
  if(latest) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 1);

    query = query
     .gte("created_at", oneWeekAgo.toISOString()) 
      .order('created_at', {ascending: false});
  }

  let { data, error, count } = await query.range(from, to);

  if (latest && (!data || data.length === 0)) {
    // fallback: same filters, just remove the last-week restriction
    let fallbackQuery = supabase
      .from("products")
      .select(`*, product_variants(*)`, { count: "exact" });

    if (type !== "all") fallbackQuery = fallbackQuery.eq("type", type);
    if (category !== "all") fallbackQuery = fallbackQuery.eq("category", category); 

    fallbackQuery = fallbackQuery.order("created_at", { ascending: false });

    const fallback = await fallbackQuery.range(from, to);

    if (fallback.error) {
      console.error(fallback.error);
      return { products: [], total: 0, totalPages: 0 };
    }

    data = fallback.data;
    count = fallback.count;
    error = null;
  }

  if(error) {
    console.error(error);
    return {products: data || [], total: count || 0 , totalPages: 0}
  }
  const totalPages = Math.ceil((count || 0) / PAGE_SIZE);


  return {
    products: data || [], 
    total: count || 0, totalPages
  };
}



export async function getProduct(slug) {
  const supabase = createClient();

  const {data, error } = await supabase
    .from("products")
    .select(`
      *,
      product_variants(*)
    `)
    .eq('slug', slug)
    .order("size_order", { referencedTable: "product_variants", ascending: true })
    .single();

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
      product:products ( productName, price, photos ),
      product_variants(*)
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
      photos: item.product.photos,
      product_variants:item.product_variants
    }))

    return flattened;
}

export async function getCartProduct(userId, sku) {
  if(!userId) return null;

  const supabase = createClient();

  const { data: quantity, error } = await supabase
    .from('cart_items')
    .select(`quantity`)
    .eq('user_id', userId)
    .eq('sku', sku)
    .single();

    if(error) {
      console.error(error);
    }

    return quantity;
}
export async function getProductVariants(sku) {
  if(!sku) return;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("product_variants")
    .select(`
        product_id,
        size,
        stock,
        sale_percentage,
        product_details: products(productName, photos, price)
      `)
    .eq("sku", sku)
    .single();

    if(error) return {ok: false};

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


