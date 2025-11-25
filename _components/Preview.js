import Link from "next/link"
import { auth } from "../_lib/auth"

async function Preview({children, width}) {
  const session = await auth();

  // if(!session) return null;

  return (
    <div className={
      `absolute left-1/2 -translate-x-1/2 top-full mt-1 p-2 text-[12px] bg-gray-100 rounded-lg shadow-lg opacity-0 hover:opacity-100 flex flex-col gap-1 z-20 pointer-events-none transition duration-600 ease-out group-hover:opacity-100 group-hover:pointer-events-auto`
      }
      style={{ width: `${width}rem`}}  
    >
      {children}
      
    </div>
  )
}

export default Preview
