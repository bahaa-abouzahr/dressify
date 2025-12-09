"use client"

function Preview({children, width, translate= 55}) {

  return (
    <div className={
      `absolute left-1/2  top-full mt-1 p-2 text-[12px] bg-gray-100 rounded-lg shadow-lg flex flex-col gap-1 transition duration-300 ease-out`
      }
      style={{
        width: `${width}rem`,
        transform: `translateX(-${translate}%)`,
    }}  
    >
      {children}
      
    </div>
  )
}

export default Preview
