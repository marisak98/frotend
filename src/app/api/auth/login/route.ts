import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // do something
  const data = await request.json();
  console.log(data);
  return NextResponse.json({ message: "Hello from login" });
}
