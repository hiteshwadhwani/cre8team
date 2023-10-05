import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import client from "@/lib/db";
import { Requirement } from "@prisma/client";

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, requirements, skills } = body;
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    // get user with the help of authid
    const profile = await client.user.findUnique({
      where: {
        authId: user.id,
      },
    });

    if (!profile) {
      return new NextResponse("no user found", { status: 404 });
    }

    // save project
    const newProject = await client.project.create({
      data: {
        title,
        description,
        userId: profile.id,
      },
    });

    const requirementData: [{ text: string; projectId: string }] =
      requirements.map((item: string) => ({
        text: item,
        projectId: newProject.id,
      }));

    const skillsData: [{ name: string; projectId: string }] = skills.map(
      (skill: string) => ({
        name: skill,
        projectId: newProject.id,
      })
    );


    await client.requirement.createMany({
      data: requirementData,
      skipDuplicates: true,
    });

    await client.tech.createMany({
      data: skillsData,
      skipDuplicates: true,
    });
    return NextResponse.json({ msg: "done" }, { status: 200 });
  } catch (error) {
    console.log("add-post POST ROUTE", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
