"use client"

function Preview({children, width, previewObject}) {

  return (
    <div className={
      `absolute left-1/2  top-full mt-1 p-2 text-[12px] bg-gray-100 rounded-lg shadow-lg flex flex-col gap-1 transition duration-300 ease-out`
      }
      style={{
        width: `${width}rem`,
        transform: `translateX(-${previewObject === "cart" ? 75 : 55}%)`,
    }}  
    >
      {children}
      
    </div>
  )
}

export default Preview
