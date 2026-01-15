function AccountNavItem({ children, name, pathName, href= "default"}) {

  return (
    <li 
      key={name} 
      className={`duration-300 rounded-xl h-12 w-full px-3 flex flex-row items-center 
        ${href === pathName ? 'bg-(--cream-secondary)' : ''} hover:bg-(--cream-secondary) 
        hover:text-(--hover-buttons-text) transition-colors
    `}>
      {children}
    </li>
  )
}

export default AccountNavItem
