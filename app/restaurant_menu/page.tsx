"use client"

import { useSearchParams } from "next/navigation"
import { restaurants, menus } from "../../data/mockData"
import { useRouter } from "next/navigation"

export default function MenuPage() {

  const params = useSearchParams()
  const restaurantId = params.get("restaurant")
  const router = useRouter()

  const restaurant = restaurants.find((r) => r.id === restaurantId)

  const filteredMenu = menus.filter(
    (m) => m.restaurantId === restaurantId
  )

  return (
    <main className="min-h-screen bg-[#F0EEE9]">

      <div className="bg-white p-4 rounded-b-3xl shadow-md">

        <button
          onClick={() => router.back()}
          className="mb-3 text-[#464646]"
        >
          ←
        </button>

        <div className="bg-[#CFCFCF] h-40 rounded-xl mb-3 flex items-center justify-center">
          RESTAURANT PHOTO
        </div>

        <h1 className="text-[#464646] text-center font-normal text-lg">
          {restaurant?.name}
        </h1>

        <p className="text-center text-gray-500 text-xs">
          {restaurant?.description}
        </p>

      </div>


      <div className="p-6">

        <div className="flex justify-between mb-4">
          <h2 className="text-[#464646] font-medium text-lg">รายการอาหาร</h2>

          <button className="text-[#464646] bg-[#FFFFFF] px-4 py-2 rounded-full text-xs shadow-sm">
            Food type
          </button>
        </div>

        <div className="space-y-4">

          {filteredMenu.map((menu) => (

            <div
              key={menu.id}
              className="bg-white p-3 rounded-xl shadow flex items-center gap-3"
            >

              <div className="w-16 h-16 bg-[#CFCFCF] rounded-lg flex items-center justify-center text-xs">
                Food
              </div>

              <div className="flex-1 pl-2">

                <h3 className="font-medium text-[#434343]">
                  {menu.name}
                </h3>

                <p className="text-xs text-[#BCBCBC]">
                  {menu.description}
                </p>

                <p className="text-xs text-[#8E8E8E] mt-3">
                  {menu.time} นาที
                </p>

              </div>

              <div className="flex flex-col items-end gap-2 mr-2">

                <span className="font-medium text-[#434343]">
                  {menu.price} 
                  <p className="font-medium mr-1 pt-0 mt-0 text-xs text-[#A1A1A1]">
                  บาท                
                  </p>
                </span>
                 

                <button
                 onClick={()=> router.push(`/order?menu=${menu.id}`)}
                 className="bg-[#9F2436] text-white w-8 h-8 rounded-full">
                  +
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}