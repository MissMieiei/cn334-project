"use client";

import { useState } from "react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  status: "เข้าครัวแล้ว" | "กำลังทำ" | "เสร็จแล้ว";
}

const initialOrders: OrderItem[] = [
  { id: "Q1", name: "ข้อมูล", quantity: 1, status: "กำลังทำ" },
  { id: "Q2", name: "ข้อมูล", quantity: 1, status: "รอ" as any },
  { id: "Q3", name: "ข้อมูล", quantity: 1, status: "รอ" as any },
  { id: "Q4", name: "ข้อมูล", quantity: 1, status: "รอ" as any },
  { id: "Q5", name: "ข้อมูล", quantity: 1, status: "รอ" as any },
];

const statusColor: any = {
  "กำลังทำ": "#9F2436",
  "รอ": "#ddd",
  "เสร็จแล้ว": "#4caf50",
};

export default function OrderListPage() {
  const [orders, setOrders] = useState(initialOrders);

  const handleStatusChange = (id: string, newStatus: any) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: newStatus } : o
      )
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#EDEBE6",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "900px" }}>
        
        {/* title */}
        <h1
          style={{
            fontSize: "22px",
            marginBottom: "16px",
            color: "#444",
            fontWeight: 600,
          }}
        >
          RESTAURANT NAME
        </h1>

        {/* card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          {/* header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 80px 150px",
              padding: "12px 20px",
              background: "#f3f3f3",
              fontSize: "13px",
              color: "#777",
            }}
          >
            <span>คิว</span>
            <span>รายการที่ลูกค้าสั่ง</span>
            <span>จำนวน</span>
            <span>สถานะ</span>
          </div>

          {/* rows */}
          {orders.map((o) => (
            <div
              key={o.id}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 80px 150px",
                padding: "14px 20px",
                borderBottom: "1px solid #eee",
                alignItems: "center",
                color: "#444"
              }}
            >
              <span>{o.id}</span>
              <span>{o.name}</span>
              <span>{o.quantity}</span>

              <select
                value={o.status}
                onChange={(e) =>
                  handleStatusChange(o.id, e.target.value)
                }
                style={{
                  padding: "4px 10px",
                  borderRadius: "20px",
                  border: "none",
                  background: statusColor[o.status],
                  color:
                    o.status === "กำลังทำ"
                      ? "#fff"
                      : "#333",
                }}
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