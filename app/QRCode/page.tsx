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
  const ResId = params.get("res_id")
  const canteenId = params.get("canteen")

  const qrUrl =
    `http://localhost:3000/confirm?canteen=${canteenId}&res_id=${ResId}&menuId=${menuId}&qty=${qty}&note=${note}&total=${total}}`

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