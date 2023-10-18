import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import client from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    const body = await req.json();
    const updatedUser = await client.user.update({
      where: {
        authId: user.id,
      },
      data: body,
    });

    const profileCompleted =
      !!updatedUser.name &&
      !!updatedUser.about &&
      !!updatedUser.profession &&
      !!updatedUser.resume &&
      !!updatedUser.resume_text

    // check if the profile is completed
    if (!updatedUser.profileCompleted && profileCompleted) {
      await client.user.update({
        where: {
          authId: user.id,
        },
        data: {
          profileCompleted: true,
        },
      });
    }
    return NextResponse.json({ msg: "profile updated" }, { status: 200 });
  } catch (error) {
    console.log("ERROR UPDATE-USER", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
