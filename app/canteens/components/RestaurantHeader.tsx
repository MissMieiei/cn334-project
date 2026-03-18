interface RestaurantHeaderProps {
  restaurantName: string
  menuName: string
  light?: boolean
}

export default function RestaurantHeader({
  restaurantName,
  menuName,
  light = false,
}: RestaurantHeaderProps) {
  return (
    <header className="text-center pt-12 pb-4 px-6">
      <p className={`text-sm font-normal ${light ? "text-white/70" : "text-gray-500"}`}>
        {restaurantName}
      </p>
      <p className={`text-sm font-bold mt-0.5 ${light ? "text-white" : "text-gray-800"}`}>
        {menuName}
      </p>
    </header>
  )
}