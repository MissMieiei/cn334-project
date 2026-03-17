"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import RestaurantHeader from "@/app/components/RestaurantHeader"
import QueueStack from "@/app/components/QueueStack"
import { QueueOrder } from "@/types"

type CardStatus = "waiting" | "cooking" | "ready"

function QueueContent() {
  const searchParams = useSearchParams()

  const restaurantId   = searchParams.get("restaurantId")   ?? "rest-001"
  const restaurantName = searchParams.get("restaurantName") ?? "Restaurant name"
  const menuName       = searchParams.get("menuName")       ?? "Menu name"
  const initialQueue   = Math.max(1, parseInt(searchParams.get("queueNumber") ?? "4", 10))

  const [order, setOrder] = useState<QueueOrder>({
    queueNumber: initialQueue,
    restaurantId,
    restaurantName,
    menuName,
    status: "waiting",
    createdAt: new Date().toISOString(),
  })
  const [cardStatus, setCardStatus]         = useState<CardStatus>("waiting")
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  // sync เมื่อ URL params เปลี่ยน
  useEffect(() => {
    setOrder({
      queueNumber: initialQueue,
      restaurantId,
      restaurantName,
      menuName,
      status: "waiting",
      createdAt: new Date().toISOString(),
    })
    setCardStatus("waiting")
  }, [initialQueue, restaurantId, restaurantName, menuName])

  // auto เปลี่ยนจาก cooking → ready หลัง 5 วินาที
  useEffect(() => {
    if (cardStatus !== "cooking") return
    const timer = setTimeout(() => {
      setCardStatus("ready")
    }, 5000)
    return () => clearTimeout(timer)
  }, [cardStatus])

  function handleTap() {
    if (isAnimatingOut || cardStatus !== "waiting") return

    if (order.queueNumber > 1) {
      // ลดคิวลง
      setIsAnimatingOut(true)
      setTimeout(() => {
        setOrder((prev: QueueOrder) => ({ ...prev, queueNumber: prev.queueNumber - 1 }))
        setIsAnimatingOut(false)
      }, 350)
    } else {
      // การ์ดใบสุดท้าย → เปลี่ยนเป็น cooking บนการ์ดใบเดิม
      setIsAnimatingOut(true)
      setTimeout(() => {
        setCardStatus("cooking")
        setIsAnimatingOut(false)
      }, 350)
    }
  }

  const bgColor = cardStatus === "ready" ? "bg-[#701A27]" : "bg-[#ebebeb]"

  return (
    <main className={`min-h-screen flex flex-col transition-colors duration-700 ${bgColor}`}>

      <RestaurantHeader
        restaurantName={order.restaurantName}
        menuName={order.menuName}
        light={cardStatus === "ready"}
      />

      <section className="flex-1 flex flex-col items-center justify-center px-6">

        {/* หน้ารอคิว */}
        {cardStatus === "waiting" && (
          <div>
            <QueueStack
              queueNumber={order.queueNumber}
              onTap={handleTap}
              isAnimatingOut={isAnimatingOut}
            />
          </div>
        )}

        {/* การ์ดใบเดิม เปลี่ยนสีและข้อความตาม cardStatus */}
        {(cardStatus === "cooking" || cardStatus === "ready") && (
          <div
            className={`flex items-center justify-center transition-all duration-500 ${
              cardStatus === "cooking" ? "bg-[#F9CECA]" : "bg-white"
            }`}
            style={{ width: 220, height: 220, borderRadius: 28 }}
          >
            <p
              className={`text-xl font-bold text-center leading-relaxed ${
                cardStatus === "cooking" ? "text-[#5C3A3A]" : "text-[#3A2020]"
              }`}
            >
              {cardStatus === "cooking" ? (
                <>ร้านกำลัง<br />ทำอาหาร<br />ของคุณ</>
              ) : (
                <>อาหารของคุณ<br />พร้อมรับแล้ว!</>
              )}
            </p>
          </div>
        )}
      </section>
    </main>
  )
}

export default function QueuePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#ebebeb]" />}>
      <QueueContent />
    </Suspense>
  )
}