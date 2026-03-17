"use client"

import { useRouter } from "next/navigation"
import CanteenCard from "./components/CanteenCard"
import { canteens } from "../../data/mockData"

export default function HomePage() {

  const router = useRouter()
  const selectCanteen = (id: string) => {
    router.push(`/restaurants?canteen=${id}`)
  }

  return (
    <main className="min-h-screen bg-[#9F2436] flex flex-col">

      {/* หัว */}
      <div className="h-56 flex items-center justify-center">
        <h1 className="text-white text-3xl font-semibold">
          WELCOME
        </h1>
      </div>

      <div className="bg-[#F0EEE9] rounded-t-3xl p-6 flex-1">
        <h2 className="text-center text-[#9F2436] mb-6 font-semibold">
          Choose the canteen
        </h2>

        <div className="space-y-5">

          {canteens.map((canteen) => (
            <CanteenCard
              key={canteen.id}
              name={canteen.name}
              onClick={() => selectCanteen(canteen.id)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}