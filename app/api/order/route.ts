import { NextResponse } from "next/server"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const order = {
    menuId: searchParams.get("menuId"),
    qty: searchParams.get("qty"),
    note: searchParams.get("note"),
    total: searchParams.get("total"),
  }

  await fetch("https://httpbin.org/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order)
  })

  return NextResponse.redirect(new URL("/Queue", req.url))
}