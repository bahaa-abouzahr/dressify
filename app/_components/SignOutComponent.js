import { useRouter } from "next/navigation";
import { createClient } from "../_lib/supabase/client";
import toast from "react-hot-toast";
import { useCart } from "./CartContext";

function SignOutComponent({children}) {
  const { setCart, syncComplete } = useCart();
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    
    if(!error) {
      syncComplete.current = false;
      setCart([]);
      router.push("/");
      router.refresh();
      toast.success("Signed Out Successfully")

    }
    else toast.error("SignOut Failed")
  }

  return (
    <div onClick={handleSignOut}>
      {children}
    </div> 
  )
}

export default SignOutComponent
