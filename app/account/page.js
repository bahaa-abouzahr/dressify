import SyncGuest from "../_components/SyncGuest";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Settings",
};

async function page() {
  const session = await auth();
  if(!session) return;
  
  return (
    <div>
      My Profile
      <SyncGuest session={session} />
    </div>
  )
}

export default page
