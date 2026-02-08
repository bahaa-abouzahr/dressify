"use server"

import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { getCartProduct, getCartProducts, getProductVariants } from "./data-service";

import { createClient } from "@/app/_lib/supabase/server";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function addCartItem(productId, quantity, sku) {
  // 1) Authentication
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if(!session) throw new Error("You must be logged in");

  const userId = session?.user?.id;
  
  const newCartItem = {
    product_id:productId,
    quantity,
    user_id:userId,
    sku,
  }

  // 2) getting latest stock availability update
  const {data: { stock }, error} = await supabase
    .from("product_variants")
    .select("stock")
    .eq("sku", sku)
    .single()

  // 3) Checking if Product already in the DB Cart

  const {data: existingItem, existingItemError} = await supabase
    .from("cart_items")
    .select(`
      quantity,
      product_variants(*)
      `)
    .eq("product_id", productId)
    .eq("user_id", userId)
    .eq("sku", sku)
    .single();

    if (existingItem && existingItem?.quantity === stock) return {max: true}

    if(existingItem && existingItem.product_variants.sku === sku) {

      // 4) Update Quantity
      const {error} = await supabase
        .from("cart_items")
        // to not allow to add to cart more that what is available in stock
        .update({quantity: Math.min(existingItem.quantity + quantity, stock)})
        .eq("product_id", productId)
        .eq("sku", sku)
      
    } else {
      
      // 5) Insert new Cart Item
      const { error:insertError } = await supabase
        .from("cart_items")
        .insert([newCartItem]);
      if(insertError) return insertError.message

    }

    revalidatePath('/')
    return {ok: true}
}

// Delete one item from Cart
export async function deleteCartItem(productId, sku) {
  const supabase = await createClient();
  const {data: { session }} = await supabase.auth.getSession();

  if(!session) throw new Error('You must be logged in')

  const userId = session?.user?.id

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("product_id", productId)
    .eq("user_id", userId)
    .eq("sku", sku)

    if(error) return error.message;

    revalidatePath('/');
    return {ok: true};
}

// Delete all Cart items
export async function deleteDbCart() {
  const supabase = await createClient();
  const {data: { session }} = await supabase.auth.getSession();
  const userId = session.user.id

  if(!session) throw new Error('You must be logged in');
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId)

  if(error) throw new Error("DB Cart couldn't be deleted: ", + error.message)
}

export async function isAdmin(userId) {

  if(!userId) return false;

  const supabase = await createClient();

  const {data: is_admin, error } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", userId)
    .maybeSingle()

  if(error) {
    console.log("isAdmin() supabase error:", error); 
    return error;
  }

  return is_admin.is_admin ? true : false;
}


export async function deleteProduct(product_id){
  // 1) Authentication
  const supabase = await createClient();
  const {data: { user }} = await supabase.auth.getUser();
  if(!user) 
    return {
      ok: false,
      code: "NOT_AUTHENTICATED",
      message: "You must be logged in",
    };
  
  const userId = user.id
 

  // 2) Check Authorization
  const is_admin = await isAdmin(userId);
  if(!is_admin) 
    return {
      ok: false,
      code: "NOT_AUTHORIZED",
      message: "You don't have admin rights",
    };

  // 3) Deleting Product images from supabase Storage
  const { data: files, error: listError } = await supabase.storage
    .from("products")
    .list(String(product_id), { limit: 100, offset: 0 });
  console.log("FILES: ", files);
  if (listError) {
    return { ok: false, code: "STORAGE_LIST_ERROR", message: listError.message };
  }
  console.log("FILES:", files);

  if ((files?.length ?? 0) > 0) {
    const paths = files.map(file => `${product_id}/${file.name}`);
    console.log("PATH:", paths);
    const { error: deleteError } = await supabase.storage
      .from("products")
      .remove(paths);

    if (deleteError) {
      return { ok: false, code: "STORAGE_DELETE_ERROR", message: deleteError.message };
    }
  }

  // 4) Deleting Product
  
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", product_id)
  
  if(error) 
     return {
      ok: false,
      code: "DB_ERROR",
      message: error.message,
    };


  return { ok: true}
}

export async function adjustCartItemQuantity(product_id, sku, action) {
  console.log("ACTION", action);
  // 1) Authentication
  const supabase = await createClient();
  const {data: { session }} = await supabase.auth.getSession();

  if(!session) throw new Error('You must be logged in')
  const userId = session.user.id

  // 2) Getting Quantity from DB
  const {quantity} = await getCartProduct(userId, sku);

  // 3) Checking Stock Limit
  const {stock} = await getProductVariants(sku);

  // 4) getting nextQuantity value
  let nextQty = quantity;
  if (action === "inc") {
    if (quantity >= stock) return { max: true };
    nextQty = quantity + 1;
  }

  if (action === "dec") {
    if (quantity <= 1) return { min: true };
    nextQty = quantity - 1;
  }

  // 5) updating quantity
  const { data: updated, error } = await supabase
    .from("cart_items")
    .update({ quantity: nextQty })
    .eq("user_id", userId)
    .eq("product_id", product_id)
    .eq("sku", sku)
    .select("quantity")     
    .single();

     
  return {ok: true, quantity: updated.quantity};
}


export async function syncCartAfterSignIn(reactCart) {

  const supabase = await createClient();
  const {data: { session }} = await supabase.auth.getSession();

  const userId = session.user.id
  if(!session) throw new Error('You must be logged in')

  // 1) Fetch the current DB cart
  const dbCartBefore = await getCartProducts(userId);

  for (const item of reactCart){

    const {
      quantity, 
      product_id: productId, 
      product_variants: {sku}} = item;
    
    // 2) only add if not already in the db cart
    const exists = dbCartBefore.find(dbItem => dbItem.product_id === productId && dbItem.product_variants.sku === sku)

    if(!exists)
      await addCartItem(productId, quantity, sku)
  }
  
  // 3) fetch the latest db cart
  const dbCartAfter = await getCartProducts(userId);

  return dbCartAfter;
}


export async function addToWishlist(productId) {
  const supabase = await createClient();
  const {data: { session }} = await supabase.auth.getSession();

  const userId = session.user.id
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
  const supabase = await createClient();
  const {data: { session }} = await supabase.auth.getSession();

  const userId = session.user.id
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
  const supabase = await createClient();
  const {data: { session }} = await supabase.auth.getSession();

  if(!session) throw new Error('You must be logged in');

  const { error } = await supabase
    .from("order_items")
    .insert(orderItems)

  return error;
}

export async function checkoutAction(formData) {
  const supabase = await createClient();
  const {data: { session }} = await supabase.auth.getSession();

  if(!session) throw new Error('You must be logged in');

  // 1) get needed Data
  const userId = session.user.id
  const cart = await getCartProducts(userId)

  const {firstName, lastName, number, ...shipping_address} =  Object.fromEntries(formData);

  const totalItemsPrice = Number(cart.reduce((acc, cur) => acc + cur.price , 0).toFixed(2));
  const freeDelivery = totalItemsPrice >= 50;
  const finalPrice = freeDelivery ? Number(totalItemsPrice).toFixed(2) : Number(totalItemsPrice + 3.5).toFixed(2);

  const fullName = firstName + " " + lastName

  // 2) create order in orders table + retrieve order id
  const { data, error } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      total_price:finalPrice,
      shipping_address,
    })
    .select("id")
    .single();

    if(error) throw new Error("Order couldn't be made")
    
    const order_id = data.id

  // 3) insert cart items to order_items table
  const orderItems = cart.map(cartItem => {
    const {
      product_id, 
      quantity, 
      productName: product_name_at_purchase, 
      price: price_at_purchase, 
      photos, 
      product_variants: {size} } = cartItem;

    const item = {
      order_id,
      quantity,
      product_name_at_purchase,
      price_at_purchase,
      size_at_purchase: size,
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

export async function getProfile(userId) {
  if(!userId) return null;
  const supabase = await createClient();

  const {data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if(error) {
    console.error(error);
    throw new Error("User data couldn't be retrieved");
  }

  return data;
}

export async function updateProfileAction(formData){
  // 1) check Authentication
  const supabase = await createClient();
  const {data: { user }} = await supabase.auth.getUser();

  if(!user) throw new Error('You must be logged in');

  // 2) get Form Data
  const profileUser = await getProfile(user.id);

  const full_name = formData.get('fullName');
  let [nationality, countryFlag] = formData.get('nationality').split('%');
  const avatar = formData.get('avatar');
  // 3) validate data for any change or if an image was uploaded
  if(profileUser.full_name === full_name && profileUser.nationality === nationality && (avatar.size === 0 || avatar.name === "undefined"))
    return "no change";
  
  // 4) upload to supabase
  // 4.1) upload avatar
  const filePath = `${user.id}/avatar.jpeg`;
  
  // if statement to not break avatar if nothing no image uploaded
  if(avatar.name && avatar.size > 0 ) {
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatar, {
        upsert: true, // replace if already exists
      });
  
    if (uploadError) return uploadError.message;

  }

  // 4.2) upload profile data
  if(nationality === "") countryFlag = "";
  const updateData = {full_name, nationality, countryFlag};
 
  const { error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq('id', user.id)

  if (error) return error.message;


  // on success revalidate path, and return true
  revalidatePath('/profile')
  return { ok: true};
}

export async function uploadProductAction(formData){

  // 1) check Authentication
  const supabase = await createClient();
  const {data: { user }} = await supabase.auth.getUser();

  if(!user) throw new Error('You must be logged in');

  // 2) check Authorization 
  const is_admin = await isAdmin(user.id);
  if(!is_admin) return null;

  // 3) get Form Data

  // 3.1) get product details + variant details
  const { 
    productName, 
    slug, 
    description,  
    price, 
    type, 
    category ,
    variants
  } = Object.fromEntries(formData);

  // 3.2) get Variants
  let parsedVariants;
  try {
    parsedVariants = JSON.parse(variants || "[]");
  } catch {
    return { ok: false, error: "Invalid variants JSON" };
  }
  
  // 3.3) get photos
  const photos = formData.getAll("photos");
  const photoFiles = photos.filter((f) => f instanceof File && f.size > 0);

  // 4) data Guard

  if (!productName || !slug || !description || photoFiles.length === 0 || parsedVariants.length === 0)
    return "Missing Data";

  // 3.2) create object for products table
  // photos will be added later after upload and id retrieval
  const priceNum = Number(price);
  if (!Number.isFinite(priceNum) || priceNum <= 0) return "Invalid price";

  const product = { productName, slug, description,  price: priceNum, type, category };

  // 5) Upload Product Details

  const { data,  error: detailsUploadError} = await supabase
    .from("products")
    .insert(product)
    .select("id")
    .single()
  
  if(detailsUploadError) {
    console.log("Upload ERROR:", detailsUploadError);
    return { ok: false, error: detailsUploadError.message };
  }

  // 6) Upload Photos
  const productId = data.id;
  let photosPath = [];

  // 6.1) upload photos
  for (let i = 0; i < photoFiles.length; i++) {
    const photo = photoFiles[i];
    const ext = photo.name?.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `${productId}/image${i+1}.${ext}`;

    const { error: photoUploadError } = await supabase.storage
      .from("products")
      .upload(filePath, photo, { upsert: true});
    
    if(photoUploadError) {
      console.log("Photo Upload ERROR:", photoUploadError);
      return {ok: false, error: photoUploadError.message};
    }
    photosPath.push(filePath)
  }

  console.log("PATTHS:", photosPath);

  // 6.2) update photos column in products table

  const {error: photosColumnUpdateError } = await supabase
    .from("products")
    .update({ photos: photosPath})
    .eq("id", productId)

  if (photosColumnUpdateError) {
    return { ok: false, error: photosColumnUpdateError.message };
  }

  // 7) upload variants
  const variantsToInsert = parsedVariants.map((v) => ({
    product_id: productId,
    size_order: Number(v.size_order),
    size: v.size,
    sku: v.sku,
    stock: Number(v.stock),
    sale_percentage: Number(v.sale_percentage || 0),
  }));

  const { error: variantsErr } = await supabase
    .from("product_variants")
    .insert(variantsToInsert);

  if (variantsErr) return { ok: false, error: variantsErr.message };

  // on success revalidate path, and return true
  revalidatePath('/profile/admin')
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

}

export async function signinAction(formData) {
  console.log(formData);
  const account = String(formData.get('account') || "").trim();
  const password = String(formData.get("password") || "");
  
  if(!account || !password) {
    return {ok: false, error: "Email and password are required"};
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ 
    email: account, 
    password
  })
   if (error) {
     console.log("SIGNIN ERROR:", error);
      
      return { 
        ok: false, 
        message: "Email or password is incorrect" };
  }

  return { ok:true };
}
export async function singupAction(formData) {
  console.log(formData);
  const email = String(formData.get('email') || "").trim();
  const password = String(formData.get("password") || "");
  const fullName = String(formData.get('fullName') || "").trim();
  const username = String(formData.get('username') || "").trim();

  if(!email || !password) {
    return {ok: false, error: "Email and password are required"};
  }
  if(password.length < 8 ||
    !/[a-z]/.test(password) ||   // lowercase
    !/[A-Z]/.test(password) ||   // uppercase
    !/[0-9]/.test(password)      // number
  ) {
    return {
      ok: false, 
      error: "Password must be 8+ chars with upper, lower, and a number.",
    }
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: {
      data: {
        full_name: fullName,
        username: username,
      }
    }
  })

  if (error) {
    console.log("SIGNUP ERROR:", error);
    return { ok: false, error: error.message };
  }
  // Debug: see what came back
  console.log("SIGNUP OK:", {
    userId: data.user?.id,
    email: data.user?.email,
    meta: data.user?.user_metadata,
    hasSession: !!data.session,
  });

  return { ok: true}
}
