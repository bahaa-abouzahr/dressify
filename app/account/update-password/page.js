
import UpdatePasswordForm from "@/app/_components/UpdatePasswordForm";

export const metadata = {
  title: "Set New Password",
  description:
    "Change/Update your current password with a new one",
};

async function page({ searchParams }) {
  const sp = await searchParams;
  const code = sp.code ?? "";

  return (
    <div className="flex flex-col gap-6 items-center mx-auto py-5  max-w-lg">

      <div className="flex flex-col gap-6 items-center mx-auto py-5  xs:border border-(--gray-bg) xs:rounded-2xl xs:min-w-md max-w-lg">
        <div>
          <h2 className="text-lg font-semibold">
            Set new Password
          </h2>

        </div>

        <UpdatePasswordForm code={code} />

      </div>

    </div>
  )
}

export default page
