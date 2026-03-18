"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminAccounts } from "@/data/mockData";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const found = adminAccounts.find(
      (acc) =>
        acc.username === username &&
        acc.password === password
    );

    if (found) {
      // จำว่า login เป็นร้านไหน
      localStorage.setItem("role", "admin");
      localStorage.setItem("restaurantId", found.restaurantId);

      router.push("/admin");
    } else {
      alert("login ไม่ถูกต้อง");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F0EEE9]">
      <div className="h-[40vh] bg-[#F0EEE9] flex items-center justify-center">
        <h1 className="text-5xl tracking-[0.2em] text-gray-700">
          WELCOME
        </h1>
      </div>

      <div className="flex-1 bg-[#9F2436] rounded-t-[60px] px-10 py-16 flex flex-col justify-center max-w-[900px] w-full mx-auto">
        <div className="mb-8">
          <label className="text-gray-200 text-xs">USERNAME</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 text-white py-2 outline-none"
          />
        </div>

        <div className="mb-10">
          <label className="text-gray-200 text-xs">PASSWORD</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-gray-300 text-white py-2 outline-none"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-4 text-black rounded-full bg-[#F0EEE9] font-semibold tracking-widest"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}