"use client"

import { redirect, useRouter } from "next/navigation"
import { deleteProduct } from "../_lib/actions"
import { Router } from "next/router";
import toast from "react-hot-toast";

function DeleteProductButton({product_id}) {
  const router = useRouter();

  async function handleDeleteProduct() {
    const ok = window.confirm("Delete this propduct? This cannot be undone.")
    if(!ok) return;

    const res = await deleteProduct(product_id)

    if(!res.ok) {
      toast.error("Product Deletion Failed", res.message);
      return;
    }

      toast.success("Product Deleted Successfully");
      router.push("/products/all");
  }

  return (
    <button 
      className="px-4 py-3 w-fit bg-red-500 hover:bg-red-400 text-[#252324] text-lg font-bold cursor-pointer"
      onClick={handleDeleteProduct}
    >
      Delete Product
    </button>
        
  )
}

export default DeleteProductButton
