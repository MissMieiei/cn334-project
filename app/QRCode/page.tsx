"use client"

import { useSearchParams } from "next/navigation"
import { QRCodeSVG } from "qrcode.react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function QRPage() {

  const params = useSearchParams()
  const router = useRouter()

  const menuId = params.get("menuId")
  const qty = params.get("qty")
  const note = params.get("note")
  const total = params.get("total")

  const [success, setSuccess] = useState(false)

  const qrUrl =
    `http://localhost:3000/confirm?menuId=${menuId}&qty=${qty}&note=${note}&total=${total}`

  async function handleOrder() {
    const res = await fetch(qrUrl)
    const data = await res.json()

    if (data.success) {
      setSuccess(true)

      setTimeout(() => {router.push("/Queue")}, 2000)
    }
  }

  return (
    <main className="min-h-screen pt-30 justify-center bg-[#F0EEE9] text-[#464646] p-6">

      <div className="flex justify-between font-semibold mx-25 mb-6">
        <span className="text-lg">Total price</span>
        <span className="text-3xl">{total}</span>
      </div>

      <div className="flex justify-center">

        <QRCodeSVG value={qrUrl} size={250} />

      </div>

    </main>
  )
}