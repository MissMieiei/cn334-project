"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { orders, menus, restaurants, Order } from "@/data/mockData";

type Status = "รอ" | "กำลังทำ" | "เสร็จแล้ว";

const statusStyle: Record<Status, string> = {
  "รอ": "bg-gray-200 text-gray-700",
  "กำลังทำ": "bg-[#9F2436] text-white",
  "เสร็จแล้ว": "bg-green-500 text-white",
};

export default function AdminPage() {
  const router = useRouter();
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    const restaurantId = localStorage.getItem("restaurantId");

    if (role !== "admin" || !restaurantId) {
      router.push("/login");
      return;
    }

    const filtered = orders.filter(
      (o) => o.restaurantId === restaurantId
    );
    setMyOrders(filtered);

    const r = restaurants.find((r) => r.id === restaurantId);
    setRestaurantName(r?.name || "");
  }, []);

  const getMenuName = (menuId: string) => {
    return menus.find((m) => m.id === menuId)?.name || "";
  };

  //เปลี่ยนสถานะ
  const handleStatusChange = async (id: string, newStatus: Status) => {
    setMyOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: newStatus } : o
      )
    );

    try {
      const res = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: id,
          status: newStatus,
        }),
      });

      if (res.ok) {
        alert(`ส่ง order ${id} เรียบร้อยแล้ว`);
      } else {
        alert(`order ${id} ไม่สำเร็จ`);
      }
    } catch (err) {
      alert(`error: ${(err as Error).message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDEBE6] p-10 flex justify-center">
      <div className="w-full max-w-4xl">
        {/* title */}
        <h1 className="text-xl font-semibold mb-4 text-gray-700">
          {restaurantName}
        </h1>
        {/* card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* header */}
          <div className="grid grid-cols-[80px_1fr_80px_150px] px-5 py-3 bg-gray-100 text-sm text-gray-500">
            <span>คิว</span>
            <span>รายการที่ลูกค้าสั่ง</span>
            <span>จำนวน</span>
            <span>สถานะ</span>
          </div>

          {myOrders.map((o) => (
            <div
              key={o.id}
              className="grid grid-cols-[80px_1fr_80px_150px] px-5 py-4 border-b border-gray-200 items-center text-gray-700"
            >
              <span>{o.id}</span>
              <span>{getMenuName(o.menuId)}</span>
              <span>{o.quantity}</span>

              <select
                value={o.status}
                onChange={(e) =>
                  handleStatusChange(
                    o.id,
                    e.target.value as Status
                  )
                }
                className={`px-3 py-1 rounded-full text-sm outline-none ${statusStyle[o.status]}`}
              >
                <option value="รอ">รอ</option>
                <option value="กำลังทำ">กำลังทำ</option>
                <option value="เสร็จแล้ว">เสร็จแล้ว</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}