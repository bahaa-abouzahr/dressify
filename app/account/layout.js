import ProfileNavigation from "../_components/ProfileNavigation"

function layout({children}) {
  return (
    <div className="grid grid-cols-[4rem_1fr] md2:grid-cols-[12rem_1fr] h-full gap-2 md2:gap-12 md2:mx-4">
      <ProfileNavigation />
      {children}
    </div>
  )
}

export default layout
