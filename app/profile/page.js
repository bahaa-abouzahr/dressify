import ChangePasswordForm from "../_components/ChangePasswordForm";
import SelectCountry from "../_components/SelectCountry";
import SyncGuest from "../_components/SyncGuest"
import UpdateProfileForm from "../_components/UpdateProfileForm"
import { getProfile } from "../_lib/actions";

import { createClient } from '@/app/_lib/supabase/server';

export const metadata = {
  title: "Your Profile",
  description:
    "Manage your personal information, view order history, and update your account settings at Dressify.",
};

export default async function page() {

  const supabase = await createClient();
  const { data: {user}, error } = await supabase.auth.getUser()

  const googleAccount = user.app_metadata.provider === "google";

  // Check session after loading
  if (!user) {
    return null 
  }

  const profileUser = await getProfile(user.id)

  // const country = session.user.nationality;
  const country = profileUser?.nationality || '';

  return (
    <div className="flex flex-col gap-2 pl-0.5 pr-1">
      <SyncGuest />
      
      <UpdateProfileForm profileUser={profileUser}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="profileFormInput shadow-sm md2:text-base text-sm"
          defaultCountry={country}
        />
      </UpdateProfileForm>

      <ChangePasswordForm googleAccount={googleAccount} />
    </div>
  )
}
