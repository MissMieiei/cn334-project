import { NextResponse } from "next/server"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)

  const order = {
    menuId: searchParams.get("menuId"),
    qty: searchParams.get("qty"),
    note: searchParams.get("note"),
    total: searchParams.get("total"),
  }

  const res = await fetch("https://httpbin.org/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order)
  })

  const data = await res.json()
  console.log(data)

  // return NextResponse.redirect(new URL("/Queue", req.url))

  return NextResponse.json({
    success: true,
    message: "Order post success",
    order
  })
}
