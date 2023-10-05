import { NextResponse } from "next/server";
import client from "@/lib/db";

export async function POST(request: Request) {
  const { authId, email, name, imageUrl } = await request.json();

  if (!authId || !email) {
    return NextResponse.json({ msg: "not enough details" }, { status: 400 });
  }

  try {
    const existingUser = await client.user.findUnique({
      where: {
        authId: authId,
      },
    });
    if (existingUser) {
      return NextResponse.json(existingUser, { status: 200 });
    } else {
      const newUser = await client.user.create({
        data: {
          authId,
          name,
          email,
          imageUrl,
        },
      });
      return NextResponse.json(newUser, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "internal server error" }, { status: 500 });
  }
}
