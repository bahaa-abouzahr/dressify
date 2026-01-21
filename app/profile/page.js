import SelectCountry from "../_components/SelectCountry";
import SyncGuest from "../_components/SyncGuest"
import UpdateProfileForm from "../_components/UpdateProfileForm"
import { getProfile } from "../_lib/actions";
import ProfilePageServer from "./ProfilePageServer"

import { createClient } from '@/app/_lib/supabase/server';

export default async function page() {

  const supabase = await createClient();
  const { data: {user}, error } = await supabase.auth.getUser()

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
      <h1 className="xs:text-xl text-lg pl-2 mb-1">Update your Profile</h1>
      <UpdateProfileForm profileUser={profileUser}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="profileFormInput shadow-sm md2:text-base text-sm"
          defaultCountry={country}
        />
      </UpdateProfileForm>
    </div>
  )
}
