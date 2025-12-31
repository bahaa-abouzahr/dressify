import SelectCountry from "../_components/SelectCountry";
import SyncGuest from "../_components/SyncGuest";
import UpdateProfileForm from "../_components/UpdateProfileForm";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Settings",
};

async function page() {
  const session = await auth();
  if(!session) return;
  
  const country = session.user.nationality;

  return (
    <div className="flex flex-col gap-2">
      <SyncGuest session={session} />
      <h1 className="xs:text-xl text-lg">Update your Profile</h1>
      <UpdateProfileForm session={session}>
        <SelectCountry 
          name="nationality"
          id="nationality"
          className="profileFormInput shadow-sm"
          defaultCountry={country}
          session={session}
        />
      </UpdateProfileForm>
    </div>
  )
}

export default page
