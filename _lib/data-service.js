import { notFound } from "next/navigation";
import { supabase } from "./supabase";


export async function getAllProducts() {
  const {data, error } = await supabase.from("products").select('*')

  if(error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getProducts(category) {

  const {data, error } = await supabase
    .from("products")
    .select('*')
    .eq('type', category)

  if(error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getCartProducts(ids) {
  const {data, error } = await supabase
    .from("products")
    .select("*")
    .in("id", ids)

    if(error) {
      console.error(error);
      notFound();
    }

    return data;
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