"use client"

import { useSearchParams } from "next/navigation"
import { restaurants,canteens} from "../../data/mockData"
import { useRouter } from "next/navigation"
import { useState } from "react"
import RestaurantCard from "./components/RestaurantCard"

export default function RestaurantPage() {

    const params = useSearchParams()
    const canteenId = params.get("canteen") ?? "rest-001"
    const router = useRouter()
    const filtered = restaurants.filter(
        (r) => r.canteenId === canteenId
    )

    const [selectedType, setSelectedType] = useState("All")
    const foodTypes = ["All", "Noodle", "Rice", "Drink"]
    const canteen = canteens.find((c) => c.id === canteenId)

    return (
        <main className="min-h-screen bg-[#F0EEE9] p-6">

            {/* header */}
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={() => router.back()}
                    className="text-xl"
                >
                    ‹
                    {/* U+2039 */}
                </button>

                <h1 className="font-medium">{canteen?.name}</h1>
                {/* มี ? เอาไว้เผื่อหาไม่เจอจะไม่เด้งเดดเร่อหน้าแดง */}
            </div>

            {/* search */}
            <input
                type="text"
                placeholder="Search"
                className="w-[99%] bg-white rounded-full px-4 py-3 shadow mb-4 ml-2"
            />

            {/* food type */}
            <div className="flex gap-2 overflow-x-auto mb-6 px-4">
                {foodTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap
        ${selectedType === type
                                ? "bg-[#9F2436] text-white"
                                : "bg-gray-200"
                            }
      `}>
                        {type}
                    </button>
                ))}
            </div>

            <h2 className="mb-4 px-4 font-medium">รายการร้านอาหาร</h2>
            <div className="space-y-6 px-4">
                {filtered.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        name={restaurant.name}
                        description={restaurant.description}
                        queue={restaurant.queue}
                        id={restaurant.id}
                        canteenId={canteenId}
                    />
                ))}
            </div>
        </main>
    )
}