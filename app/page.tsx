"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      
      <h1 className="text-2xl font-semibold">Select Role</h1>
      <button
        onClick={() => router.push("/canteens")}
        className="px-6 py-3 bg-gray-200 rounded-xl"
      >
        เข้าใช้งาน (User)
      </button>

      <button
        onClick={() => router.push("/login")}
        className="px-6 py-3 bg-red-700 text-white rounded-xl"
      >
        สำหรับร้านค้า (Admin)
      </button>

    </div>
  );
}