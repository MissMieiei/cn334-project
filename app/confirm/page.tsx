"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function ConfirmPage() {

  const params = useSearchParams()
  const router = useRouter()


  const menuId = params.get("menuId")
  const qty = params.get("qty")
  const note = params.get("note")
  const total = params.get("total")
  const ResId = params.get("res_id")
  const canteenId = params.get("canteen")

  const [status, setStatus] = useState("loading")

  useEffect(() => {

    async function sendOrder() {

      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          canteenId,
          res_id: ResId,
          menuId,
          qty,
          note,
          total
        })
      })

      const data = await res.json()

      if (data.success) {
        setStatus("success")

        setTimeout(() => {
          router.push("/Queue")
        }, 2000)
      }
    }

    sendOrder()

  }, [])

  return (

    <main className="min-h-screen flex items-center justify-center bg-[#F0EEE9]">

      {status === "loading" && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9F2436] mx-auto mb-4"></div>
          <p className="text-lg text-[#464646]">
            Sending your order...
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="bg-white p-6 rounded-xl shadow text-center">

          <h1 className="text-2xl font-bold text-green-600 mb-2">
            Order Successful
          </h1>
          <p className="text-gray-500">
            Redirecting to queue...
          </p>
        </div>
      )}
    </main>
  )
}