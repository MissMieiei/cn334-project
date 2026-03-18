import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()


  const res = await fetch("https://httpbin.org/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })

  const data = await res.json()
  console.log(data)

  // return NextResponse.redirect(new URL("/Queue", req.url))

return NextResponse.json({
    success: true,
    order: body
  })
}
