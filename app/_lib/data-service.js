import { createClient } from '@/app/_lib/supabase/client';
import { PAGE_SIZE } from '../_utils/constants';


export async function getProducts({
  page = 1, 
  gender = "all", 
  category = "all", 
  limit = null,
  search = "",
  sort = "",
  selectedSizes = [],
  minPrice = 0,
  maxPrice = 9999,
  // onSale = false
}) {

  const supabase = createClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  
  let query = supabase
    .from("products")
    .select(`*, product_variants!inner(*)`, { count: "exact"});
    
  // if Type specified, query based on type
  if (gender !== "all") query = query.eq("gender", gender);
  if (category !== "all") query = query.eq("category", category);
  if (search && search.length > 0) {
    query = query.ilike("productName", `%${search}%`);
  }
  // if (sort === "onSale")
  //   query = query.gt("product_variants.sale_percentage", 0);
  
  // Get products Sorted based on newest/price
  if(sort.length > 0) {
    if(sort === "newest") {
      query = query.order('created_at', {ascending: false});
    } else if (sort === "onSale"){
      query = query.gt("product_variants.sale_percentage", 0);
    } else {
      const [value, direction] = sort.split("_");
      query = query.order('price', {ascending: direction === "asc" ? true : false})
    }
  }

  // get products based on size filter
  if(selectedSizes.length > 0) {
    query = query.in("product_variants.size", selectedSizes)
  }
  if(minPrice)
    query = query.gte("price", minPrice);
  if(maxPrice)
    query = query.lte("price", maxPrice);

  // get limited number of products
  if (limit != null) {
    query = query.limit(Number(limit));
  } else {
    query = query.range(from, to)
  }

  let { data, error, count } = await query;

  if(error) {
    console.error(error);
    return {products: data || [], total: count || 0 , totalPages: 0}
  }
  const totalPages = 
    limit != null ? 1 : Math.ceil((count || 0) / PAGE_SIZE);


  return {
    products: data || [], 
    total: count || 0, totalPages
  };
}

export async function getProductsRow({ latest=false, limit=10}) {
  const supabase = createClient();
  
  let query = supabase
    .from("products")
    .select(`*, product_variants(*)`, { count: "exact"})
    .order('created_at', {ascending: false})
    .limit(limit);

  // get latest products
  if(latest) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 1);

    query = query.gte("created_at", oneWeekAgo.toISOString()) ;
  }

  let { data, error, count } = await query;

  if(error) {
    console.error(error);
    return {products: data || [], total: count || 0 }
  }

  if (latest && (!data || data.length === 0)) {
    // fallback: same filters, just remove the last-week restriction
    let fallbackQuery = supabase
      .from("products")
      .select(`*, product_variants(*)`, { count: "exact" });

    if (limit) fallbackQuery = fallbackQuery.limit(limit);

    fallbackQuery = fallbackQuery.order("created_at", { ascending: false });

    const fallback = await fallbackQuery

    if (fallback.error) {
      console.error(fallback.error);
      return { products: [], total: 0 };
    }

    data = fallback.data;
    count = fallback.count;
  }


  return {
    products: data || [], 
    total: count || 0
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

export async function getProductSizes(category= "all", gender="all") {
  const supabase = createClient();

  let query = supabase
    .from("product_variants")
    .select("size, size_order, products!inner(category, gender)")

  if (category !== "all") query = query.eq("products.category", category);
  if (gender !== "all") query = query.eq("products.gender", gender);

  const { data , error } = await query;
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
      category,
      slug,
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
      category: item.category,
      slug: item.slug,
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
        wishlistItem:products (id, photos, price, productName, category, slug)
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


