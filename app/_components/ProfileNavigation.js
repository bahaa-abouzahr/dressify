import { isAdmin } from "../_lib/actions";
import { createClient } from "../_lib/supabase/server";
import ProfileNavigationClient from "./ProfileNavigationClient";


export default async function ProfileNavigation() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userId = user?.id;

  const is_admin = await isAdmin(userId);
  

  return <ProfileNavigationClient isAdmin={is_admin} />;
}
  