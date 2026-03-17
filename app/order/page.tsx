"use client"

import { useSearchParams } from "next/navigation"
import { menus } from "../../data/mockData"
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function OrderPage() {

    const params = useSearchParams()
    const menuId = params.get("menu")
    const router = useRouter()

    const menu = menus.find((m) => m.id === menuId)

    const [qty, setQty] = useState(1)
    const [note, setNote] = useState("")

    const total = (menu?.price || 0) * qty

    return (
        <main className="min-h-screen bg-[#F0EEE9] p-6">

            <div className="bg-[#CFCFCF] h-48 rounded-xl flex items-center justify-center text-gray-400 mb-6">
                Food Photo
            </div>

            <div className="flex justify-between items-center mb-1 text-[#464646] font-normal text-lg">
                <h1 className="font-semibold text-lg">
                    {menu?.name}
                </h1>

                <span className="font-medium text-2xl text-[#434343]">
                    {menu?.price}
                    <span className="font-medium ml-1 mr-1 pt-0 mt-0 text-xs text-[#A1A1A1]">
                        บาท
                    </span>
                </span>

            </div>

            <p className="mb-6 text-sm text-[#BCBCBC]" >
                {menu?.description}
            </p>


            <div className="bg-white text-xs rounded-xl h-40 flex items-center justify-center text-gray-400 mb-6">
                Add-on
            </div>

            <hr className="mb-6 text-[#CDCDCD]" />


            <p className="text-sm mb-2 text-[#464646]">
                ข้อความถึงร้าน (เช่น ไม่ใส่พริก ซอสเยอะน้อย)
            </p>

            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-white rounded-xl p-4 mb-6"
                rows={3}
            />


            <div className="flex items-center justify-center mb-6">

                <div className="flex items-center bg-white rounded-full shadow text-[#464646] z-20">

                    <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="px-4 py-2"
                    >
                        -
                    </button>

                    <span className="px-6">
                        {qty}
                    </span>

                    <button
                        onClick={() => setQty(qty + 1)}
                        className="px-4 py-2"
                    >
                        +
                    </button>

                </div>

                <div className="bg-[#9F2436] text-white pl-11 px-6 py-2 rounded-full -ml-8 z-10">
                    {total}
                </div>

            </div>


            <button
                onClick={() => router.push(
                    `/QRCode?menuId=${menu?.id}&qty=${qty}&note=${note}&total=${total}`
                )}
                className="w-full bg-[#D6D1C8] text-[#464646] py-4 rounded-full font-medium">
                ORDER
            </button>

        </main>
    )
}